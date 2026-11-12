import { Calendar, Clock, Eye, HardDrive } from "lucide-react";
import type { DisplayMetadata } from "@/schemas/video.schema";

interface MetadataBadgesProps {
  metadata: DisplayMetadata | null;
}

export function MetadataBadges({ metadata }: MetadataBadgesProps) {
  if (!metadata) {
    return (
      <p className="text-xs text-[--color-muted]">
        Metadata video belum tersedia.
      </p>
    );
  }

  const items = [
    { icon: Clock, label: "Durasi", value: metadata.duration },
    { icon: HardDrive, label: "Ukuran", value: metadata.fileSize },
    { icon: Eye, label: "Dilihat", value: metadata.views },
    { icon: Calendar, label: "Unggah", value: metadata.uploadDate },
  ];

  return (
    <ul className="flex flex-wrap gap-2">
      {items.map(({ icon: Icon, label, value }) => (
        <li
          key={label}
          className="inline-flex items-center gap-1.5 rounded-md border border-[--color-border] bg-[--color-surface] px-2.5 py-1 text-xs text-[--color-muted]"
        >
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only">{label}:</span>
          <span className="text-[--color-text]">{value}</span>
        </li>
      ))}
    </ul>
  );
}
