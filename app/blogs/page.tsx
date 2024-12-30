import { Metadata } from "next";
import MainHeader from "../_ui/components/MainHeader";

export const metadata: Metadata = {
  title: "ArtiShare",
  description: "Main blogs section",
};

export default function Blogs() {
  return (
    <>
      <MainHeader/>
    </>
  );
}
