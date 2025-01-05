import parseArticleHtml from "@/lib/parseArticleHtml";
import ImagePicker from "./ImagePicker";
import { Input } from "@/components/ui/input";

interface EditFormProps {
  htmlContent: string;
}

const inputStyleClasses =
  "p-0 pt-1 pb-1 mb-3 rounded-none border-b border-opacity-15 border-black outline-none shadow-none focus-visible:ring-0";

const EditForm = ({ htmlContent }: EditFormProps) => {
  const {title, subtitle} = parseArticleHtml(htmlContent);
  return (
    <div className="w-full grid grid-cols-2">
      <div className="p-10">
        <h4>Story Preview</h4>
        <ImagePicker />
        <Input
          defaultValue={title || ''}
          className={`${inputStyleClasses} font-medium-title font-bold !text-xl mt-4`}
        />
        <Input
          defaultValue={subtitle || ''}
          className={`${inputStyleClasses} font-medium-subtitle font-light text-medium-gray !text-base`}
        />
        <p className="text-sm opacity-70">
          <strong>Note</strong>: Changes here will affect how your story appears
          in public places like Medium’s homepage and in subscribers’ inboxes —
          not the contents of the story itself.
        </p>
      </div>
      <div className="p-10">
        <h4>Tags</h4>
      </div>
    </div>
  );
};
export default EditForm;
