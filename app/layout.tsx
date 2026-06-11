import type { Metadata } from "next";
import { Noto_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import PageTransition from "./components/PageTransition";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Adományozás - Szent László Gimnázium",
  description: "Támogassa a Szent László Gimnázium projektjeit adományával.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <head>
        <script>
            // Create BP element on the window
            window["bp"] = window["bp"] || function () {
                (window["bp"].q = window["bp"].q || []).push(arguments);
            };
            window["bp"].l = 1 * new Date();
    
            // Insert a script tag on the top of the head to load bp.js
            scriptElement = document.createElement("script");
            firstScript = document.getElementsByTagName("script")[0];
            scriptElement.async = true;
            scriptElement.src = 'https://pixel.barion.com/bp.js';
            firstScript.parentNode.insertBefore(scriptElement, firstScript);
            window['barion_pixel_id'] = 'BP-0000000000-00';            

            // Send init event
            bp('init', 'addBarionPixelId', window['barion_pixel_id']);
        </script>

        <noscript>
            <img height="1" width="1" style="display:none" alt="Barion Pixel" src="https://pixel.barion.com/a.gif?ba_pixel_id='BP-0000000000-00'&ev=contentView&noscript=1">
        </noscript>
      </head>
      <body
        className={`${notoSans.variable} ${playfair.variable} antialiased`}
      >
        <PageTransition>{children}</PageTransition>
      </body>

    </html>
  );
}
