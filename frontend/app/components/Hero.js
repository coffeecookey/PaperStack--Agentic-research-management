import HeroVisual from "./HeroVisual";

const readouts = [
  { label: "Papers indexed", value: "1,204" },
  { label: "Citations linked", value: "3,981" },
  { label: "Storage", value: "Local_node" },
  { label: "Sync", value: "OK", dot: true },
];

export default function Hero() {
  return (
    <main className="hero-grid relative z-10 mx-auto flex max-w-295 flex-1 flex-col justify-center px-5 pt-10 pb-14 sm:px-8 md:px-12">
      <div className="hero-visual-col">
        <HeroVisual />
      </div>

      <div className="max-w-184">
        <h1
          className="enter-up mb-5.5 text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.04] font-display font-medium tracking-tight text-balance"
          style={{ "--stagger": "120ms" }}
        >
          Welcome to
          <span className="mt-[0.06em] block font-bold text-accent">Paper Stack</span>
        </h1>

        <p
          className="enter-up mb-8.5 max-w-[46ch] text-[0.9375rem] leading-[1.75] text-ink-soft"
          style={{ "--stagger": "260ms" }}
        >
          Track papers, thread citations, and keep the marginalia that mattered, one quiet
          archive for the reading you&rsquo;re actually doing.
        </p>

        <div className="enter-up mb-9.5 flex flex-wrap gap-3.5" style={{ "--stagger": "380ms" }}>
          <a
            href="#"
            className="btn-pressure inline-flex items-center gap-2 rounded-sm border border-accent bg-accent px-5.5 py-3.25 text-[0.8125rem] tracking-wide text-accent-ink transition-colors hover:border-accent-deep hover:bg-accent-deep"
          >
            Begin your archive&nbsp;&rarr;
          </a>
          <a
            href="#"
            className="btn-pressure inline-flex items-center gap-2 rounded-sm border border-line-strong px-5.5 py-3.25 text-[0.8125rem] tracking-wide transition-colors hover:border-ink"
          >
            View the manifest
          </a>
        </div>

        <hr
          className="enter-up mb-6.5 origin-left border-line"
          style={{ "--stagger": "460ms" }}
        />

        <dl
          className="enter-up grid grid-cols-2 gap-x-7.5 gap-y-4.5 sm:grid-cols-4 sm:gap-y-0"
          style={{ "--stagger": "520ms" }}
        >
          {readouts.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-1.5 border-line pr-7.5 sm:border-r sm:last:border-r-0"
            >
              <dt className="text-[0.6875rem] tracking-[0.08em] text-ink-faint uppercase">
                {item.label}
              </dt>
              <dd className="m-0 flex items-center gap-1.5 text-sm font-medium tabular-nums">
                {item.dot && <span className="h-1.5 w-1.5 rounded-full bg-accent status-pulse" />}
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
}
