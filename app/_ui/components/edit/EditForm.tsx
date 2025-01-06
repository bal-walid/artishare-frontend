import parseArticleHtml from "@/lib/parseArticleHtml";
import formatArticle from "@/lib/formatArticle";
import ImagePicker from "./ImagePicker";
import { Input } from "@/components/ui/input";
import TagInput from "./TagInput";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

interface EditFormProps {
  htmlContent: string;
}

interface EditFormData {
  title: string;
  subtitle: string;
  selectedImage: string;
  tags: string[];
}

const inputStyleClasses =
  "p-0 pt-1 pb-1 mb-3 rounded-none border-b border-opacity-15 border-black outline-none shadow-none focus-visible:ring-0";

const EditForm = ({ htmlContent }: EditFormProps) => {
  const { title, subtitle, images } = useMemo(
    () => parseArticleHtml(htmlContent),
    [htmlContent]
   );
  const [formData, setFormData] = useState<EditFormData>({
    title,
    subtitle,
    selectedImage: images[0] || "",
    tags: [],
  });
  const handlePublish = () => {
    const articleData = {...formData, html: formatArticle(htmlContent)};
    console.log(articleData);
  }
  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({ ...formData, title });
  };
  const updateSubtitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const subtitle = e.target.value;
    setFormData({ ...formData, subtitle });
  };
  const setSelectedImage = (image: string) => {
    setFormData({ ...formData, selectedImage: image });
  };
  const addTag = (tag: string) => {
    const tags = formData.tags;
    const newTags = [...tags, tag.trim()];
    setFormData({ ...formData, tags: newTags });
  };
  const deleteTag = (tagName: string) => {
    const tags = formData.tags;
    const newTags = tags.filter((tag) => tag !== tagName);
    setFormData({ ...formData, tags: newTags });
  };
  const [pickingImage, setPickingImage] = useState<boolean>(false);
  return (
    <div className="w-full grid grid-cols-2">
      <div className="p-10">
        <h4 className="mb-3 font-bold text-lg opacity-80">Story Preview</h4>
        <ImagePicker
          onPickingImage={() => setPickingImage(!pickingImage)}
          pickingImage={pickingImage}
          selectedImage={formData.selectedImage}
          setSelectedImage={setSelectedImage}
          images={images}
        />
        {!pickingImage && (
          <>
            <Input
              value={formData.title}
              onChange={updateTitle}
              className={`${inputStyleClasses} font-medium-title font-bold !text-xl mt-4`}
            />
            <Input
              value={formData.subtitle}
              onChange={updateSubtitle}
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
        <TagInput tags={formData.tags} addTag={addTag} deleteTag={deleteTag} />
        <Button
          className="mt-5 p-0 rounded-full py-2 px-4 h-auto"
          variant={"success"}
          onClick={handlePublish}
        >
          Publish now
        </Button>
      </div>
    </div>
  );
};
export default EditForm;
