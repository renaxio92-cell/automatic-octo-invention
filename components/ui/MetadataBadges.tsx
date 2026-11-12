import { Calendar, Clock, Eye, HardDrive } from "lucide-react";
import type { DisplayMetadata } from "@/schemas/video.schema";

interface MetadataBadgesProps {
  metadata: DisplayMetadata | null;
}

export function MetadataBadges({ metadata }: MetadataBadgesProps) {
  if (!metadata) {
    return (
      <p className="text-sm text-muted">
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
    <ul className="flex flex-wrap gap-2.5">
      {items.map(({ icon: Icon, label, value }) => (
        <li
          key={label}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-text"
        >
          <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
          <span className="sr-only">{label}:</span>
          <span className="font-medium">{value}</span>
        </li>
      ))}
    </ul>
  );
}
