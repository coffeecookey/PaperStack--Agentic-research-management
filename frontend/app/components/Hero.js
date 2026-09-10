import Image from "next/image";

const readouts = [
  { label: "Papers indexed", value: "1,204" },
  { label: "Citations linked", value: "3,981" },
  { label: "Storage", value: "Local_node" },
  { label: "Sync", value: "OK", dot: true },
];

export default function Hero() {
  return (
    <main className="relative z-10 mx-auto grid max-w-295 grid-cols-1 items-start gap-14 px-5 pt-8 pb-14 sm:px-8 sm:pt-10 md:mx-0 md:max-w-none md:flex-1 md:min-h-0 md:grid-cols-[minmax(0,40rem)_1fr] md:grid-rows-1 md:items-stretch md:gap-10 md:overflow-hidden md:pt-10 md:pb-10 md:pr-0 md:pl-[max(2rem,calc((100vw-73.75rem)/2+2rem))]">
      <div className="md:self-center">
        <h1 className="mb-5.5 text-[clamp(2.6rem,4.6vw,4.15rem)] leading-[1.04] font-display font-medium tracking-tight text-balance">
          Welcome to
          <span className="mt-[0.06em] block font-bold text-accent">Paper Stack</span>
        </h1>

        <p className="mb-8.5 max-w-[46ch] text-[0.9375rem] leading-[1.75] text-ink-soft">
          Track papers, thread citations, and keep the marginalia that mattered — one quiet
          archive for the reading you&rsquo;re actually doing.
        </p>

        <div className="mb-9.5 flex flex-wrap gap-3.5">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-sm border border-accent bg-accent px-5.5 py-3.25 text-[0.8125rem] tracking-wide text-accent-ink transition-colors hover:border-accent-deep hover:bg-accent-deep"
          >
            Begin your archive&nbsp;&rarr;
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-sm border border-line-strong px-5.5 py-3.25 text-[0.8125rem] tracking-wide transition-colors hover:border-ink"
          >
            View the manifest
          </a>
        </div>

        <hr className="mb-6.5 border-line" />

        <dl className="grid grid-cols-2 gap-x-7.5 gap-y-4.5 sm:grid-cols-4 sm:gap-y-0">
          {readouts.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-1.5 border-line pr-7.5 sm:border-r sm:last:border-r-0"
            >
              <dt className="text-[0.6875rem] tracking-[0.08em] text-ink-faint uppercase">
                {item.label}
              </dt>
              <dd className="m-0 flex items-center gap-1.5 text-sm font-medium tabular-nums">
                {item.dot && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative aspect-380/672 overflow-hidden md:aspect-auto md:-mt-10 md:-mb-10 md:h-[calc(100%+5rem)]">
        <Image
          src="/home.jpg"
          alt="Illustration of a laptop showing terminal text, resting on a stack of papers on a wooden desk"
          fill
          className="object-cover object-top"
          sizes="(min-width: 768px) 55vw, 90vw"
          priority
        />
      </div>
    </main>
  );
}
