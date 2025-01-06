import { Button } from "@/components/ui/button"
import { ImageIcon } from 'lucide-react'
import Image from "next/image"

interface ImagePickerProps {
  images: string[]
  selectedImage: string
  setSelectedImage: (image: string) => void
  onPickingImage: () => void
  pickingImage: boolean
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
      <div className="w-full bg-gray-50 rounded-lg border border-gray-100 h-[200px] flex items-center justify-center text-center transition-colors duration-200 hover:bg-gray-100">
        <div className="px-6 space-y-3">
          <ImageIcon className="w-8 h-8 text-gray-400 mx-auto" />
          <span className="text-sm text-gray-600 block">
            Include a high-quality image in your story to make it more inviting to readers.
          </span>
        </div>
      </div>
    )
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
                ${image === selectedImage 
                  ? 'ring-2 ring-green-500 ring-offset-2' 
                  : 'hover:ring-2 hover:ring-green-400 hover:ring-offset-2'
                }`}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                alt="preview"
                fill
                className="object-cover"
                src={image}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative group rounded-lg overflow-hidden bg-gray-900">
      <img 
        className="w-full h-[200px] object-cover transition-opacity duration-200 group-hover:opacity-75" 
        src={selectedImage} 
        alt="Preview"
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Button
          variant="secondary"
          onClick={onPickingImage}
          className="rounded-full shadow-lg bg-white/90 hover:bg-white text-gray-900 border-0"
        >
          Change Preview Image
        </Button>
      </div>
    </div>
  )
}

export default ImagePicker

