import type { Metadata } from "next";
import "./globals.css";
import { playfairSC, playfair, inter } from "./_ui/fonts";

export const metadata: Metadata = {
  title: "Home Page",
  description: "This is the home page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfairSC.variable} ${playfair.variable} ${inter.variable} ${inter.className} antialiased h-dvh flex flex-col overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
