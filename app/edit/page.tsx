import EditHeader from "../_ui/components/EditHeader";
import Editor from "../_ui/components/Editor";

export default function EditPage() {
  return (
    <div className="h-full flex flex-col gap-8">
      <EditHeader/>
      <Editor/>
    </div>
  );
}
