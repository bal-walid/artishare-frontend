import { Metadata } from "next";
import MainHeader from "../_ui/components/blogList/MainHeader";
import BlogList from "../_ui/components/blogList/BlogList";
import { AuthGuard } from "../contexts/AuthContext";

export const metadata: Metadata = {
  title: "ArtiShare",
  description: "Main blogs section",
};

export default function Blogs() {
  return (
    <AuthGuard requireAuth={false}>
      <div className="h-full flex flex-col">
        <MainHeader />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <BlogList />
        </main>
      </div>
    </AuthGuard>
  );
}
