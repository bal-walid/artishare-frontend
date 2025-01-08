"use client";

import { useEffect, useRef, useState } from "react";
import Tiptap from "../../_ui/components/tiptap/Editor";
import { Editor } from "@tiptap/react";
import MainHeader from "../../_ui/components/blogList/MainHeader";
import Modal from "../../_ui/components/Modal";
import EditForm from "../../_ui/components/edit/EditForm";
import { fetchBlog } from "@/app/_network/blogs";
import { Blog } from "@/app/_type/blogs";
import { AuthGuard } from "@/app/contexts/AuthContext";

type paramsType = Promise<{ id?: string }>;

export default function EditPage({ params }: { params: paramsType }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | undefined>(undefined);
  const editorRef = useRef<Editor | null>(null);
  useEffect(() => {
    params.then((res) => {
      if (res.id) {
        fetchBlog(parseInt(res.id[0])).then((blog) => {
          const modifiedBody = `<h1>${blog.blog.title}</h1><h2>${blog.blog.description}</h2>${blog.blog.body}`;
          blog.blog.body = modifiedBody;
          setBlog(blog.blog);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  }, [params]);

  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen flex flex-col bg-white">
        {loading ? (
          "..."
        ) : (
          <>
            <MainHeader
              isSearchPage={false}
              isEditMode={true}
              onPublish={() => setModalOpen(true)}
            />
            <div className="flex-1">
              <Tiptap content={blog?.body} editorRef={editorRef} />
            </div>
            {editorRef.current && (
              <Modal
                overlayClassName="bg-gray-50"
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
              >
                <EditForm
                  blog={blog}
                  htmlContent={editorRef.current.getHTML()}
                />
              </Modal>
            )}
          </>
        )}
      </div>
    </AuthGuard>
  );
}
