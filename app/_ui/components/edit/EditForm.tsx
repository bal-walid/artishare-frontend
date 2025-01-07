import { useAuthContext } from "@/app/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import formatArticle from "@/lib/formatArticle";
import parseArticleHtml from "@/lib/parseArticleHtml";
import { useMemo, useState } from "react";
import ImagePicker from "./ImagePicker";
import TagInput from "./TagInput";
import { createBlog } from "@/app/_network/blogs";
import { CreateBlog } from "@/app/_type/blogs";

interface EditFormProps {
  htmlContent: string;
}

const inputStyleClasses =
  "p-0 pt-2 pb-2 mb-4 rounded-none border-b transition-colors duration-200 border-black/10 hover:border-black/20 focus:border-black/30 outline-none shadow-none focus-visible:ring-0 bg-transparent";

const EditForm = ({ htmlContent }: EditFormProps) => {
  const { user } = useAuthContext();
  const { title, description, images } = useMemo(
    () => parseArticleHtml(htmlContent),
    [htmlContent]
  );
  console.log(images);
  const [formData, setFormData] = useState<CreateBlog>({
    title,
    description,
    preview: images[0] || "",
    categories: [],
    body: "",
  });

  const [pickingImage, setPickingImage] = useState<boolean>(false);

  const handlePublish = async () => {
    const articleData = { ...formData, body: formatArticle(htmlContent) };
    await createBlog(articleData);
  };

  return (
    <div className="w-full grid md:grid-cols-2   mx-auto bg-white rounded-xl shadow-lg">
      <div className="p-8 md:p-10 space-y-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            Story Preview
          </h4>
          <p className="text-sm text-gray-600">
            This is how your story will appear in feeds
          </p>
        </div>

        <ImagePicker
          onPickingImage={() => setPickingImage(!pickingImage)}
          pickingImage={pickingImage}
          selectedImage={formData.preview}
          setSelectedImage={(image) =>
            setFormData({ ...formData, preview: image })
          }
          images={images}
        />

        {!pickingImage && (
          <div className="space-y-4">
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Write a title..."
              className={`${inputStyleClasses} font-medium text-xl text-gray-900`}
            />
            <Input
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Write a description..."
              className={`${inputStyleClasses} text-base text-gray-600`}
            />
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <p className="text-sm text-gray-600">
            <strong className="text-gray-900">Note:</strong> Changes here will
            affect how your story appears in public places like users&apos; homepage
            not the contents of the story itself.
          </p>
        </div>
      </div>

      <div className="border-t md:border-none border-gray-100">
        <div className="p-8 md:p-10 space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Tags</h4>
            <p className="text-sm text-gray-600">
              Add up to 5 topics so readers know what your story is about
            </p>
          </div>

          <TagInput
            tags={formData.categories}
            addTag={(category_id) =>
              setFormData({
                ...formData,
                categories: [...formData.categories, category_id],
              })
            }
            deleteTag={(category_id) =>
              setFormData({
                ...formData,
                categories: formData.categories.filter(
                  (t) => t !== category_id
                ),
              })
            }
          />
          <div className="pt-2 flex max-lg:flex-col max-lg:items-start max-lg:gap-3 justify-between items-center">
            <Button
              onClick={handlePublish}
              className="max-lg:order-2 max-sm:mx-auto rounded-full px-6 py-2  bg-green-600 hover:bg-green-700 text-white transition-colors duration-200"
            >
              Publish now
            </Button>
            <p className="text-sm text-gray-600 bg-hero-bg p-4 max-sm:py-2 rounded-lg flex gap-2 max-sm:w-full max-sm:flex-col">
              <span>Created By : </span>
              <span className="text-gray-900">
                {user?.first_name} {user?.last_name}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
