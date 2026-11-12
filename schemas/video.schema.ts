import { z } from "zod";

export const videoIdSchema = z
  .string()
  .min(1)
  .max(128)
  .regex(/^[A-Za-z0-9_-]+$/, "ID hanya boleh alfanumerik, underscore, atau hyphen");

export const videoEntrySchema = z
  .object({
    id: videoIdSchema,
    embedUrl: z
      .string()
      .url("embedUrl harus URL valid")
      .refine((u) => u.startsWith("https://"), "embedUrl harus HTTPS")
      .refine((u) => u.startsWith("https://filecoster.com/"), "embedUrl harus dari domain filecoster.com"),
  })
  .strict();

export const videosFileSchema = z.array(videoEntrySchema);

export const displayMetadataEntrySchema = z
  .object({
    duration: z.string().min(1),
    fileSize: z.string().min(1),
    views: z.string().min(1),
    uploadDate: z.string().min(1),
  })
  .strict();

export const simulationPoolFileSchema = z.array(displayMetadataEntrySchema);

export const videoDisplayMetadataFileSchema = z.array(
  z
    .object({
      id: videoIdSchema,
      metadata: displayMetadataEntrySchema,
    })
    .strict()
);

export type VideoEntry = z.infer<typeof videoEntrySchema>;
export type DisplayMetadata = z.infer<typeof displayMetadataEntrySchema>;
export type VideoDisplayAssignment = z.infer<typeof videoDisplayMetadataFileSchema>[number];
