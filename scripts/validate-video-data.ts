import { promises as fs } from "node:fs";
import path from "node:path";
import {
  videosFileSchema,
  simulationPoolFileSchema,
  videoDisplayMetadataFileSchema,
} from "../schemas/video.schema";

const ROOT = process.cwd();

async function readJson(file: string): Promise<unknown> {
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw);
}

async function main(): Promise<void> {
  const [vRaw, pRaw, aRaw] = await Promise.all([
    readJson(path.join(ROOT, "data", "videos.json")),
    readJson(path.join(ROOT, "data", "simulation-pool.json")),
    readJson(path.join(ROOT, "data", "video-display-metadata.json")),
  ]);

  const videos = videosFileSchema.parse(vRaw);
  const pool = simulationPoolFileSchema.parse(pRaw);
  const assignments = videoDisplayMetadataFileSchema.parse(aRaw);

  const errors: string[] = [];
  const warnings: string[] = [];

  const videoIds = new Set<string>();
  for (const v of videos) {
    if (videoIds.has(v.id)) errors.push(`Duplicate video ID: ${v.id}`);
    videoIds.add(v.id);
  }

  const assignIds = new Set<string>();
  for (const a of assignments) {
    if (assignIds.has(a.id)) errors.push(`Duplicate assignment for ID: ${a.id}`);
    assignIds.add(a.id);
  }

  const combos = new Map<string, string>();
  const addCombo = (m: unknown, owner: string) => {
    const key = JSON.stringify(m);
    const prev = combos.get(key);
    if (prev) errors.push(`Duplicate combo (${prev} vs ${owner}): ${key}`);
    else combos.set(key, owner);
  };
  assignments.forEach((a) => addCombo(a.metadata, `assignment:${a.id}`));
  pool.forEach((p, i) => addCombo(p, `pool[${i}]`));

  for (const v of videos) {
    if (!assignIds.has(v.id))
      warnings.push(
        `Video ${v.id} has no metadata assignment yet (run: npm run assign-metadata).`
      );
  }
  for (const a of assignments) {
    if (!videoIds.has(a.id))
      warnings.push(`Assignment references unknown video ID: ${a.id}`);
  }

  if (errors.length > 0) {
    console.error("Validation FAILED:");
    for (const e of errors) console.error("  -", e);
    process.exit(1);
  }

  if (warnings.length > 0) {
    console.warn("Warnings:");
    for (const w of warnings) console.warn("  -", w);
  }

  console.log(
    `Data valid. Videos: ${videos.length}, Assignments: ${assignments.length}, Pool: ${pool.length}.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
