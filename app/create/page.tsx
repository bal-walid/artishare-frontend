"use client";

import { AuthGuard } from "@/app/contexts/AuthContext";
import { Editor } from "@tiptap/react";
import { useRef, useState } from "react";
import MainHeader from "../_ui/components/blogList/MainHeader";
import EditForm from "../_ui/components/edit/EditForm";
import Modal from "../_ui/components/Modal";
import Tiptap from "../_ui/components/tiptap/Editor";

export default function EditPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const editorRef = useRef<Editor | null>(null);
  const openmodal = () => {
    setModalOpen(true);
  }
  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen flex flex-col bg-white">
        <MainHeader isSearchPage={false} isEditMode={true} onPublish={openmodal} />
        <div className="flex-1">
          <Tiptap editorRef={editorRef} />
        </div>
        {editorRef.current && (
          <Modal
            overlayClassName="bg-gray-50"
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
          >
            <EditForm htmlContent={editorRef.current.getHTML()} />
          </Modal>
        )}
      </div>
    </AuthGuard>
  );
}
