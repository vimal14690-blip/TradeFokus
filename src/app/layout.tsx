import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "tradeFokus | Global Commodity Trading Platform – Agri & Industrial Exports from India",
  description: "tradeFokus connects global buyers with verified Indian exporters of 45+ agricultural and industrial commodities – Cashew, Rice, Pulses, Copper, Aluminium & more. No MOQ. Fast logistics. Real partnerships.",
  keywords: "commodity trading, cashew export, agri commodities, industrial commodities, India export, copper cathode, aluminium ingots, rice export, pulses, spices, B2B trade, import export, no minimum order",
  authors: [{ name: "tradeFokus – VERSAVERDE LLP" }],
  creator: "tradeFokus",
  publisher: "VERSAVERDE LLP",
  metadataBase: new URL("https://www.tradefokus.com"),
  alternates: {
    canonical: "https://www.tradefokus.com",
  },
  openGraph: {
    title: "tradeFokus | Global Commodity Trading – Agri & Industrial Exports",
    description: "Connect with verified Indian suppliers of 45+ commodities. Cashew, Rice, Copper, Aluminium & more. No MOQ. Export to 100+ countries.",
    url: "https://www.tradefokus.com",
    siteName: "tradeFokus",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "tradeFokus | Global Commodity Trading Platform",
    description: "B2B commodity export platform. 45+ agri & industrial products. No MOQ. Export to 100+ countries from India.",
    creator: "@tradefokus",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
