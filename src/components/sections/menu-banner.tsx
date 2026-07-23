import { PlaceholderImage } from "@/components/ui/placeholder-image";

export function MenuBanner() {
  return (
    <section className="relative overflow-hidden bg-ink xl:min-h-[420px]">
      <div className="flex flex-col items-center gap-10 px-6 py-16 sm:px-10 xl:gap-0 xl:px-16 xl:py-24">
        <div className="order-2 xl:absolute xl:inset-y-0 xl:left-[calc(50%-640px)] xl:order-none">
          <div className="flex w-[280px] flex-col items-center gap-4 rounded-t-full bg-cream px-6 pt-8 pb-8 xl:h-full">
            <div className="relative aspect-square w-4/5 max-w-[220px] overflow-hidden rounded-full">
              <PlaceholderImage
                aspect="aspect-auto"
                className="h-full w-full rounded-none"
                label="Lechon Kawali photo — TODO: replace"
                alt="Crispy lechon kawali served on a platter"
              />
            </div>
            <p className="text-center text-sm font-bold tracking-wide text-ink uppercase">
              Lechon Kawali
            </p>
          </div>
        </div>

        <div className="order-1 mx-auto max-w-2xl text-center xl:order-none">
          <h1 className="font-heading text-4xl leading-[1.05] font-extrabold tracking-tight text-cream uppercase sm:text-5xl">
            Taste the Best of
            <br />
            <span className="font-accent text-3xl font-normal text-primary italic normal-case sm:text-4xl">
              Filipino Catering
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm text-cream/70 sm:text-base">
            Fresh, flavorful dishes crafted for your next celebration — from intimate
            gatherings to grand fiestas.
          </p>
        </div>

        <div className="order-3 xl:absolute xl:inset-y-0 xl:right-[calc(50%-640px)] xl:order-none">
          <div className="flex w-[280px] flex-col items-center gap-4 rounded-b-full bg-secondary px-6 pt-8 pb-8 xl:h-full">
            <div className="relative aspect-square w-4/5 max-w-[220px] overflow-hidden rounded-full">
              <PlaceholderImage
                aspect="aspect-auto"
                className="h-full w-full rounded-none"
                label="Pancit Palabok photo — TODO: replace"
                alt="A bowl of pancit palabok topped with shrimp and egg"
              />
            </div>
            <p className="text-center text-sm font-bold tracking-wide text-cream uppercase">
              Pancit Palabok
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
