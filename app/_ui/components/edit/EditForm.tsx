import parseArticleHtml from "@/lib/parseArticleHtml";
import ImagePicker from "./ImagePicker";
import { Input } from "@/components/ui/input";
import TagInput from "./TagInput";
import { useState } from "react";

interface EditFormProps {
  htmlContent: string;
}

const inputStyleClasses =
  "p-0 pt-1 pb-1 mb-3 rounded-none border-b border-opacity-15 border-black outline-none shadow-none focus-visible:ring-0";

const EditForm = ({ htmlContent }: EditFormProps) => {
  const { title, subtitle, images } = parseArticleHtml(htmlContent);
  const [pickingImage, setPickingImage] = useState<boolean>(false);
  return (
    <div className="w-full grid grid-cols-2">
      <div className="p-10">
        <h4 className="mb-3 font-bold text-lg opacity-80">Story Preview</h4>
        <ImagePicker
          onPickingImage={() => setPickingImage(!pickingImage)}
          pickingImage={pickingImage}
          images={images}
        />
        {!pickingImage && (
          <>
            <Input
              defaultValue={title || ""}
              className={`${inputStyleClasses} font-medium-title font-bold !text-xl mt-4`}
            />
            <Input
              defaultValue={subtitle || ""}
              className={`${inputStyleClasses} font-medium-subtitle font-light text-medium-gray !text-base`}
            />
          </>
        )}

        <p className="text-sm opacity-70">
          <strong>Note</strong>: Changes here will affect how your story appears
          in public places like Medium’s homepage and in subscribers’ inboxes —
          not the contents of the story itself.
        </p>
      </div>
      <div className="p-10">
        <h4 className="mb-3 font-bold text-lg opacity-80">Tags</h4>
        <p className="opacity-90">
          Add up to 5 topics so readers know what your story is about.
        </p>
        <TagInput />
      </div>
    </div>
  );
};
export default EditForm;
