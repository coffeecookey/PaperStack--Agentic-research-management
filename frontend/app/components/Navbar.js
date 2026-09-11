const navLinks = [
  { label: "Home", href: "#", active: true },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Navbar() {
  return (
    <header className="relative z-10 border-b border-line">
      <div className="mx-auto flex max-w-295 flex-wrap items-center gap-x-7 gap-y-3 px-5 pt-5 pb-3.5 sm:flex-nowrap sm:px-8">
        <div className="enter-up mr-1 flex items-center" style={{ "--stagger": "0ms" }}>
          <span
            aria-hidden="true"
            className="block h-6 w-6 shrink-0 bg-ink"
            style={{
              WebkitMaskImage: "url(/logo.svg)",
              maskImage: "url(/logo.svg)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              WebkitMaskSize: "contain",
              maskSize: "contain",
            }}
          />
          <span className="sr-only">Paper Stack</span>
        </div>

        <div
          className="enter-up ml-auto flex shrink-0 gap-2.5 sm:ml-0 sm:order-3"
          style={{ "--stagger": "80ms" }}
        >
          <a
            href="#"
            className="btn-pressure inline-flex items-center gap-2 rounded-sm border border-line-strong px-4 py-2.25 text-[0.8125rem] tracking-wide whitespace-nowrap transition-colors hover:border-ink"
          >
            Log in
          </a>
          <a
            href="#"
            className="btn-pressure inline-flex items-center gap-2 rounded-sm border border-accent bg-accent px-4 py-2.25 text-[0.8125rem] font-medium tracking-wide whitespace-nowrap text-accent-ink transition-colors hover:border-accent-deep hover:bg-accent-deep"
          >
            Sign up
          </a>
        </div>

        <nav className="nav-links order-4 flex w-full gap-6 text-[0.8125rem] tracking-wide sm:order-2 sm:ml-auto sm:w-auto">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`link-underline relative pb-0.75 whitespace-nowrap transition-colors ${
                link.active
                  ? "link-underline--active text-ink"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
