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
      <body
        className={`${notoSans.variable} ${playfair.variable} antialiased`}
      >
        <PageTransition>{children}</PageTransition>
      </body>
      <script defer src="https://node.szlg.info/__szlg/motd.js"></script> 
    </html>
  );
}
