import { Metadata } from "next";
import MainHeader from "../_ui/components/MainHeader";
import BlogList from "../_ui/components/BlogList";

export const metadata: Metadata = {
  title: "ArtiShare",
  description: "Main blogs section",
};

export default function Blogs() {
  return (
    <div className="h-full flex flex-col">
      <MainHeader/>
      <main className="flex-1 overflow-y-auto"><BlogList/></main>
    </div>
  );
}
