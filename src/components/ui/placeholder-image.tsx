import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type PlaceholderImageProps = {
  label: string;
  aspect?: string;
  src?: string;
  alt?: string;
  className?: string;
};

// TODO: replace with real photography — pass `src` once available, this renders a labeled
// stand-in so no external placeholder-image service/network dependency is required.
export function PlaceholderImage({
  label,
  aspect = "aspect-[4/3]",
  src,
  alt,
  className,
}: PlaceholderImageProps) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden rounded-2xl", aspect, className)}>
        <Image src={src} alt={alt ?? label} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-olive/30 bg-gradient-to-br from-mustard/20 to-olive/20 p-4 text-center",
        aspect,
        className
      )}
    >
      <ImageIcon className="size-6 text-olive/60" aria-hidden />
      <span className="text-xs font-medium text-olive/70">{label}</span>
    </div>
  );
}
