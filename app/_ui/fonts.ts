import { Playfair_Display_SC, Playfair_Display, Inter, Source_Code_Pro } from "next/font/google";
export const playfairSC = Playfair_Display_SC({weight: ["400", "700", "900"], variable: "--font-playfair-sc"});
export const playfair = Playfair_Display({weight: ["400", "700", "900"], variable: "--font-playfair"});
export const inter = Inter({variable: "--font-inter"});
export const sourceCodePro = Source_Code_Pro({weight: ["400"], variable:"--font-mono"});