import { PlaceholderImage } from "@/components/ui/placeholder-image";

export function MenuBanner() {
  return (
    <section className="relative overflow-hidden bg-ink xl:min-h-[480px]">
      <div className="flex flex-col items-center gap-10 px-6 py-16 sm:px-10 lg:flex-row lg:justify-center lg:gap-12 xl:flex-col xl:min-h-[480px] xl:justify-center xl:gap-0 xl:px-16 xl:py-24">
        <div className="order-2 hidden xl:absolute xl:inset-y-0 xl:left-[max(4rem,calc(50%-640px))] xl:order-none xl:flex xl:items-end">
          <div className="relative flex w-[280px] flex-col items-center rounded-t-full bg-cream px-6 pt-8 pb-8 xl:h-[370px]">
            <div className="flex flex-col items-center gap-4 xl:absolute xl:top-10 xl:left-1/2 xl:w-[232px] xl:-translate-x-1/2">
              <div className="relative aspect-square w-11/12 max-w-[240px] overflow-hidden rounded-full">
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
        </div>

        <div className="order-2 -mb-16 shrink-0 xl:hidden">
          <div className="relative flex w-[280px] flex-col items-center gap-4 rounded-t-full bg-secondary px-6 pt-8 pb-8 lg:h-[440px]">
            <div className="relative aspect-square w-11/12 max-w-[240px] overflow-hidden rounded-full lg:absolute lg:top-10 lg:left-1/2 lg:-translate-x-1/2">
              <PlaceholderImage
                aspect="aspect-auto"
                className="h-full w-full rounded-none"
                label="Pancit Palabok photo — TODO: replace"
                alt="A bowl of pancit palabok topped with shrimp and egg"
              />
            </div>
            <p className="text-center text-sm font-bold tracking-wide text-cream uppercase lg:absolute lg:bottom-8 lg:left-1/2 lg:-translate-x-1/2">
              Pancit Palabok
            </p>
          </div>
        </div>

        <div className="order-1 mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-md lg:text-left xl:order-none xl:mx-auto xl:max-w-2xl xl:text-center">
          <h1 className="font-heading text-4xl leading-[1.05] font-extrabold tracking-tight text-cream uppercase sm:text-5xl">
            Taste the Best of
            <br />
            <span className="font-accent text-3xl font-normal text-primary italic normal-case sm:text-4xl">
              Filipino Catering
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm text-cream/70 sm:text-base lg:mx-0 xl:mx-auto">
            Fresh, flavorful dishes crafted for your next celebration — from intimate
            gatherings to grand fiestas.
          </p>
        </div>

        <div className="order-3 hidden xl:absolute xl:inset-y-0 xl:right-[max(4rem,calc(50%-640px))] xl:order-none xl:flex xl:items-start">
          <div className="relative flex w-[280px] flex-col items-center rounded-b-full bg-secondary px-6 pt-8 pb-8 xl:h-[370px]">
            <div className="flex flex-col items-center gap-4 xl:absolute xl:bottom-10 xl:left-1/2 xl:w-[232px] xl:-translate-x-1/2">
              <p className="text-center text-sm font-bold tracking-wide text-cream uppercase">
                Pancit Palabok
              </p>
              <div className="relative aspect-square w-11/12 max-w-[240px] overflow-hidden rounded-full">
                <PlaceholderImage
                  aspect="aspect-auto"
                  className="h-full w-full rounded-none"
                  label="Pancit Palabok photo — TODO: replace"
                  alt="A bowl of pancit palabok topped with shrimp and egg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
