import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold tracking-wide text-coral uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-3xl font-extrabold tracking-tight text-ink uppercase sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
