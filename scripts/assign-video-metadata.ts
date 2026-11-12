import { promises as fs } from "node:fs";
import { randomInt } from "node:crypto";
import path from "node:path";
import {
  videosFileSchema,
  simulationPoolFileSchema,
  videoDisplayMetadataFileSchema,
  type DisplayMetadata,
} from "../schemas/video.schema";

const ROOT = process.cwd();
const VIDEOS_PATH = path.join(ROOT, "data", "videos.json");
const POOL_PATH = path.join(ROOT, "data", "simulation-pool.json");
const ASSIGN_PATH = path.join(ROOT, "data", "video-display-metadata.json");
const LOCK_PATH = path.join(ROOT, "data", ".assign.lock");

async function readJson(file: string): Promise<unknown> {
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw);
}

async function writeJsonWithBackup(file: string, data: unknown): Promise<void> {
  const tmp = `${file}.tmp`;
  const bak = `${file}.bak`;
  const content = JSON.stringify(data, null, 2) + "\n";
  await fs.writeFile(tmp, content, "utf8");
  await fs.copyFile(file, bak).catch(() => undefined);
  await fs.rename(tmp, file);
}

async function withLock<T>(fn: () => Promise<T>): Promise<T> {
  let handle: fs.FileHandle | undefined;
  try {
    handle = await fs.open(LOCK_PATH, "wx");
  } catch {
    console.error(`\nLock file exists: ${LOCK_PATH}`);
    console.error(
      "Another instance may be running, or a previous run failed. " +
        "If you are sure nothing else is running, delete the lock file and retry.\n"
    );
    process.exit(1);
  }
  try {
    return await fn();
  } finally {
    await handle.close();
    await fs.unlink(LOCK_PATH).catch(() => undefined);
  }
}

function comboKey(m: DisplayMetadata): string {
  return JSON.stringify([m.duration, m.fileSize, m.views, m.uploadDate]);
}

async function run(): Promise<void> {
  const [videosRaw, poolRaw, assignRaw] = await Promise.all([
    readJson(VIDEOS_PATH),
    readJson(POOL_PATH),
    readJson(ASSIGN_PATH),
  ]);

  const videos = videosFileSchema.parse(videosRaw);
  const pool = simulationPoolFileSchema.parse(poolRaw);
  const assignments = videoDisplayMetadataFileSchema.parse(assignRaw);

  // Duplicate video IDs
  const videoIds = new Set<string>();
  for (const v of videos) {
    if (videoIds.has(v.id)) throw new Error(`Duplicate video ID: ${v.id}`);
    videoIds.add(v.id);
  }

  // Duplicate assignment IDs + duplicate combos among assignments
  const assignedIds = new Set<string>();
  const assignedCombos = new Set<string>();
  for (const a of assignments) {
    if (assignedIds.has(a.id)) throw new Error(`Duplicate assignment ID: ${a.id}`);
    assignedIds.add(a.id);
    const k = comboKey(a.metadata);
    if (assignedCombos.has(k))
      throw new Error(`Duplicate metadata combo already assigned: ${k}`);
    assignedCombos.add(k);
  }

  // Duplicate combos within pool
  const poolCombos = new Set<string>();
  for (const p of pool) {
    const k = comboKey(p);
    if (poolCombos.has(k))
      throw new Error(`Duplicate metadata combo in pool: ${k}`);
    poolCombos.add(k);
  }

  // Assigned combo must not also exist in pool
  for (const k of assignedCombos) {
    if (poolCombos.has(k))
      throw new Error(`Combo already assigned is still present in pool: ${k}`);
  }

  const unassigned = videos.filter((v) => !assignedIds.has(v.id));

  if (unassigned.length === 0) {
    console.log("Nothing to assign. All videos already have metadata.");
    return;
  }

  if (pool.length < unassigned.length) {
    console.error(
      `\nPool insufficient. Need ${unassigned.length} combo(s), available ${pool.length}.`
    );
    console.error(
      "Add more combinations to data/simulation-pool.json and retry.\n"
    );
    process.exit(1);
  }

  const newPool = [...pool];
  const newAssignments = [...assignments];

  for (const video of unassigned) {
    const idx = randomInt(newPool.length);
    const [picked] = newPool.splice(idx, 1);
    newAssignments.push({ id: video.id, metadata: picked });
  }

  newAssignments.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));

  // Validate before writing
  simulationPoolFileSchema.parse(newPool);
  videoDisplayMetadataFileSchema.parse(newAssignments);

  await writeJsonWithBackup(ASSIGN_PATH, newAssignments);
  await writeJsonWithBackup(POOL_PATH, newPool);

  console.log(`Assigned metadata to ${unassigned.length} video(s).`);
  console.log(`Pool remaining: ${newPool.length}`);
  console.log(`Assignments total: ${newAssignments.length}`);
}

withLock(run).catch((err) => {
  console.error("\nError:", err instanceof Error ? err.message : err);
  process.exit(1);
});
