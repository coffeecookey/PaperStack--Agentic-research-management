const links = ["Home", "About", "Contact"];

export default function Footer() {
  return (
    <footer className="relative z-10 mx-auto flex w-full max-w-295 flex-wrap items-center justify-between gap-3.5 border-t border-line px-5 pt-5.5 pb-8 text-xs text-ink-faint sm:px-8">
      <span>PAPER STACK — built for messy readers, who become great researchers</span>
      <div className="flex gap-5">
        {links.map((label) => (
          <a key={label} href="#" className="text-ink-soft transition-colors hover:text-ink">
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
