import "./globals.css";
import { playfairSC, playfair, inter } from "./_ui/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfairSC.variable} ${playfair.variable} ${inter.variable} ${inter.className} antialiased h-dvh flex flex-col overflow-y-auto`}
      >
        {children}
      </body>
    </html>
  );
}
