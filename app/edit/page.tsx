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
    <div className="h-full flex flex-col">
      <EditHeader onBtnClick={() => setModalOpen(true)} />
      <Tiptap editorRef={editorRef} />
      {/* As in, do not allow the modal to render until the editor is ready */}
      {editorRef.current && (
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <EditForm htmlContent={editorRef.current.getHTML()} />
        </Modal>
      )}
    </div>
  );
}
