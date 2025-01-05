'use client'

import { useRef, useState } from "react";
import Tiptap from "../_ui/components/tiptap/Editor";
import { Editor } from "@tiptap/react";
import EditHeader from "../_ui/components/tiptap/EditHeader";
import Modal from "../_ui/components/Modal";
export default function EditPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const editorRef = useRef<Editor | null>(null);
  return (
    <div className="h-full flex flex-col">
      <EditHeader onBtnClick={() => setModalOpen(true)}/>
      <Tiptap editorRef={editorRef} />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>{""}</Modal>
    </div>
  );
}
