import { serverAddress } from "@/app/_config/main";
import { imgAddress } from "@/app/_config/main";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
interface ImagePickerProps {
  images: string[];
  selectedImage: string;
  setSelectedImage: (image: string) => void;
  onPickingImage: () => void;
  pickingImage: boolean;
}

const ImagePicker = ({
  images,
  onPickingImage,
  pickingImage,
  selectedImage,
  setSelectedImage,
}: ImagePickerProps) => {
  if (!images.length) {
    return (
      <div className="w-full bg-[#FAFAFA] h-[200px] flex items-center justify-center text-center">
        <div className="px-6 space-y-3">
          <ImageIcon className="w-8 h-8 text-gray-400 mx-auto" />
          <span className="text-sm text-gray-600 block">
            Include a high-quality image in your story to make it more inviting
            to readers.
          </span>
        </div>
      </div>
    );
  }

  if (pickingImage) {
    return (
      <div className="bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
        <div className="p-3 border-b border-gray-100">
          <Button
            onClick={onPickingImage}
            variant="ghost"
            className="text-sm h-8 px-3 text-gray-600 hover:text-gray-900"
          >
            Done
          </Button>
        </div>
        <div className="h-[330px] overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-200 
                ${
                  image === selectedImage
                    ? "ring-2 ring-green-500 ring-offset-2"
                    : "hover:ring-2 hover:ring-green-400 hover:ring-offset-2"
                }`}
              onClick={() => {
                setSelectedImage(image.replace(imgAddress, ""));
              }}
            >
              <Image
                alt="preview"
                fill
                className="object-cover"
                src={serverAddress + image}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[200px] relative">
      <Image
        width={400}
        height={200}
        alt=""
        className="border rounded-sm w-full h-full object-cover"
        src={serverAddress + selectedImage}
      />
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
