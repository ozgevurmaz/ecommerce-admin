import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { CloudUpload, X, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  onRemove,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const maxVisibleImages = 2;

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  const handleNext = () => {
    if (startIndex + maxVisibleImages < value.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  // Get visible images based on current start index
  const visibleImages = value.slice(startIndex, startIndex + maxVisibleImages);

  // Calculate grid layout based on number of images
  const getGridClasses = () => {
    if (visibleImages.length === 0) return "";
    if (visibleImages.length === 1) return "grid-cols-1";
    return "grid-cols-2";
  };

  return (
    <div className="w-full">
      {value.length > 0 && (
        <div className="relative">
          <div className={`grid ${getGridClasses()} gap-4 mb-4`}>
            {visibleImages.map((url, index) => (
              <div
                key={url}
                className={`h-72 w-full relative rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-lg`}
              >
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-all duration-300 z-10"></div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <Button
                    onClick={() => onRemove(url)}
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8 rounded-full shadow-md"
                  >
                    <X size={16} />
                  </Button>
                </div>
                <Image
                  src={url}
                  alt="Product image"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>

          {value.length > 2 && (
            <>
              <button
                onClick={handlePrev}
                disabled={startIndex === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-card rounded-full shadow-lg p-2 transition-all ${startIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'opacity-80 hover:opacity-100'
                  }`}
              >
                <ChevronLeft size={24} className="text-foreground" />
              </button>

              <button
                onClick={handleNext}
                disabled={startIndex + maxVisibleImages >= value.length}
                className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-card rounded-full shadow-lg p-2 transition-all ${startIndex + maxVisibleImages >= value.length ? 'opacity-40 cursor-not-allowed' : 'opacity-80 hover:opacity-100'
                  }`}
              >
                <ChevronRight size={24} className="text-foreground" />
              </button>
            </>
          )}
        </div>
      )}

      <div className="flex items-center gap-4">
        <CldUploadWidget uploadPreset="fxoxzzan" onUpload={onUpload}>
          {({ open }) => {
            return (
              <Button
                onClick={() => open()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground space-x-2 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <CloudUpload className="mr-2" size={18} />
                <span>Upload Image</span>
              </Button>
            );
          }}
        </CldUploadWidget>

        {value.length > 0 && (
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              {value.length} {value.length === 1 ? 'image' : 'images'} uploaded
            </p>
            {value.length > 3 && (
              <p className="text-sm text-muted-foreground">
                (showing {startIndex + 1}-{Math.min(startIndex + maxVisibleImages, value.length)} of {value.length})
              </p>
            )}
          </div>
        )}
      </div>

      {value.length === 0 && (
        <div className="mt-8 border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center">
          <div className="bg-muted p-3 rounded-full mb-4">
            <Plus className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground">No images</h3>
          <p className="mt-1 text-sm text-muted-foreground">Upload product images to showcase your items</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;