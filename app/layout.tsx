import "./globals.css";
import { playfairSC, playfair, inter, sourceCodePro } from "./_ui/fonts";
import { JetBrains_Mono } from "next/font/google";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceCodePro.variable} ${playfairSC.variable} ${playfair.variable} ${inter.variable} ${inter.className} antialiased h-dvh flex flex-col overflow-y-auto overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
