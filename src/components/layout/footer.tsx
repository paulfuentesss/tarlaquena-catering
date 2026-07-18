export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-olive px-6 py-10 text-cream sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-heading text-lg font-bold">Tarlaquena Catering</p>
        <p className="text-sm text-cream/70">
          &copy; {new Date().getFullYear()} Tarlaquena Catering. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
