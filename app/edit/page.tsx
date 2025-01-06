"use client";

import { useRef, useState } from "react";
import Tiptap from "../_ui/components/tiptap/Editor";
import { Editor } from "@tiptap/react";
import EditHeader from "../_ui/components/tiptap/EditHeader";
import Modal from "../_ui/components/Modal";
import EditForm from "../_ui/components/edit/EditForm";

export default function EditPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const editorRef = useRef<Editor | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <EditHeader onBtnClick={() => setModalOpen(true)} />
      <div className="flex-1">
        <Tiptap editorRef={editorRef} />
      </div>
      {editorRef.current && (
        <Modal overlayClassName="bg-gray-50" isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <EditForm htmlContent={editorRef.current.getHTML()} />
        </Modal>
      )}
    </div>
  );
}
