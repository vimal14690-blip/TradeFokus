import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "tradeFokus | Global Commodity Trading Platform – Agri & Industrial Exports from India",
  description: "tradeFokus connects global buyers with verified Indian exporters of 45+ agricultural and industrial commodities – Cashew, Rice, Pulses, Copper, Aluminium & more. No MOQ. Fast logistics. Real partnerships.",
  keywords: "commodity trading, cashew export, agri commodities, industrial commodities, India export, copper cathode, aluminium ingots, rice export, pulses, spices, B2B trade, import export, no minimum order",
  authors: [{ name: "tradeFokus – VERSAVERDE LLP" }],
  creator: "tradeFokus",
  publisher: "VERSAVERDE LLP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
