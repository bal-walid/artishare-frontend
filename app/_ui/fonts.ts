import { Playfair_Display_SC, Playfair_Display, Inter, IBM_Plex_Mono } from "next/font/google";
export const playfairSC = Playfair_Display_SC({weight: ["400", "700", "900"], variable: "--font-playfair-sc"});
export const playfair = Playfair_Display({weight: ["400", "700", "900"], variable: "--font-playfair"});
export const inter = Inter({variable: "--font-inter"});
export const ibmPlexMono = IBM_Plex_Mono({weight: ["400"], variable:"--font-mono"});