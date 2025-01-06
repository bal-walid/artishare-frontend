import { Metadata } from "next";
import MainHeader from "../_ui/components/blogList/MainHeader";
import BlogList from "../_ui/components/blogList/BlogList";
import BlogSideBar from "../_ui/components/blogList/BlogSidebar";

export const metadata: Metadata = {
  title: "ArtiShare",
  description: "Main blogs section",
};

export default function Blogs() {
  return (
    <div className="h-full flex flex-col">
      <MainHeader />
      <main className="flex-1 flex justify-evenly overflow-y-auto overflow-x-hidden">
        <BlogList />
        <BlogSideBar/>
      </main>
    </div>
  );
}
