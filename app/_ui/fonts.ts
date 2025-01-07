import { Playfair_Display_SC, Playfair_Display, Inter, Source_Code_Pro } from "next/font/google";
export const playfairSC = Playfair_Display_SC({
  weight: ["400", "700", "900"],
  variable: "--font-playfair-sc",
  subsets: ["latin", "latin-ext"], 
});

export const playfair = Playfair_Display({
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"], 
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"], 
});

export const sourceCodePro = Source_Code_Pro({
  weight: ["400"],
  variable: "--font-mono",
  subsets: ["latin", "latin-ext"], 
});
