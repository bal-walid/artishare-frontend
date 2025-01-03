import Editor from "../_ui/components/tiptap/Editor";
import EditHeader from "../_ui/components/tiptap/EditHeader";
export default function EditPage() {
  return (
    <div className="h-full flex flex-col">
      <EditHeader />
      <Editor />
    </div>
  );
}
