import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Paper Stack — Research Archive",
  description:
    "Track papers, thread citations, and keep the marginalia that mattered — one quiet archive for the reading you're actually doing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plexMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-mono bg-bg text-ink md:h-dvh md:overflow-hidden">
        {children}
      </body>
    </html>
  );
}
