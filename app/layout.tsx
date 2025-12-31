import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
    default: "Echelon: A Game Design Case Study",
    template: "%s | Echelon Case Study",
  },
  description:
    "Nine prototypes, one game. A case study in breaking down a complex multiplayer game into answerable design questions.",
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
    title: "Echelon: A Game Design Case Study",
    description:
      "Nine prototypes. One game. Breaking down a complex design problem into answerable questions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Echelon: A Game Design Case Study",
    description:
      "Nine prototypes. One game. Breaking down a complex design problem into answerable questions.",
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
        <Analytics />
      </body>
    </html>
  );
}
