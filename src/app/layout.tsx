import type { Metadata } from "next";
import {
  Geist_Mono,
  Montserrat,
  Nunito,
  Playwrite_ID,
  Quicksand,
} from "next/font/google";
import "./globals.css";

import { siteConfig } from "@/config/site";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playwriteId = Playwrite_ID({
  variable: "--font-playwrite-id",
  weight: "variable",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — o mercado dos iPhones`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${nunito.variable} ${montserrat.variable} ${quicksand.variable} ${geistMono.variable} ${playwriteId.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-white text-ink"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
