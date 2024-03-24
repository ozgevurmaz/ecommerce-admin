import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { CloudUpload, X } from "lucide-react";
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
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap item-center gap-4">
        {value.map((url) => (
          <div
          key={url}
            className={`w-[200px] h-[200px] relative ${
              value.length === 0 ? "hidden" : ""
            }`}
          >
            <div className="absolute top-0 right-0 bg-red-600 rounded-lg">
              <Button
                onClick={() => onRemove(url)}
                className="p-1 text-white"
              >
                <X />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover"
              width={200}
              height={200}
            />{" "}
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="fxoxzzan" onUpload={onUpload}>
        {({ open }) => {
          return (
            <Button
              onClick={() => open()}
              className="bg-orange text-white space-x-2"
            >
              <CloudUpload />
              <p>Upload an Image</p>
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
