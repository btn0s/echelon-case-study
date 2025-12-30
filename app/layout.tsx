import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Echelon Case Study",
    template: "%s | Echelon Case Study",
  },
  description:
    "Building a co-op heist game by designing the post-mortem first. A case study in AI-assisted game development.",
  keywords: [
    "game development",
    "case study",
    "co-op",
    "heist game",
    "multiplayer",
    "prototyping",
    "AI-assisted development",
  ],
  authors: [{ name: "btn0s" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Echelon Case Study",
    title: "Echelon Case Study",
    description:
      "Building a co-op heist game by designing the post-mortem first. A case study in AI-assisted game development.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Echelon Case Study",
    description:
      "Building a co-op heist game by designing the post-mortem first. A case study in AI-assisted game development.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
