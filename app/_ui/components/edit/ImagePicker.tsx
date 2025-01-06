import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ImagePickerProps {
  images: string[];
  selectedImage: string;
  setSelectedImage: (image : string) => void;
  onPickingImage: () => void;
  pickingImage: boolean;
}

const ImagePicker = ({
  images,
  onPickingImage,
  pickingImage,
  selectedImage,
  setSelectedImage
}: ImagePickerProps) => {

  if (!images.length) {
    return (
      <div className="w-full bg-[#FAFAFA] h-[200px] flex items-center justify-center text-center">
        <span className="mx-20 text-center opacity-50 leading-5">
          Include a high-quality image in your story to make it more inviting to
          readers.
        </span>
      </div>
    );
  }
  if (pickingImage) {
    return (
      <div className="h-[330px] overflow-y-auto p-4 bg-[#fafafa] flex flex-wrap gap-2 content-start">
        <Button
          onClick={onPickingImage}
          variant={"mediumLike"}
          className="w-full text-sm h-auto justify-start p-0 -mb-1 font-normal"
        >
          Done
        </Button>
        {images.map((image, index) => (
          <img
            key={index}
            className={
              "w-28 h-28 object-cover border-[3px] hover:border-green-300" +
              (image === selectedImage ? " border-green-500" : "")
            }
            src={image}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="w-full h-[200px] relative">
      <img className="w-full h-full object-cover" src={selectedImage} />
      <Button
        variant={"mediumLike"}
        onClick={onPickingImage}
        className="rounded-full border border-white text-white hover:text-white bg-black bg-opacity-70
        hover:bg-opacity-100 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-sm focus-visible:outline-none"
      >
        Change Preview Image
      </Button>
    </div>
  );
};
export default ImagePicker;
