import { X, CloudUpload } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import Image from "next/image";

interface SingleImageUploadProps {
    value: string;
    onChange: (value: string) => void;
    onRemove: () => void;
}

export const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
    value,
    onChange,
    onRemove,
}) => {
    return (
        <div className="space-y-4">
            {value ? (
                <div className="space-y-2">
                    <div className="relative w-full h-72 rounded-lg overflow-hidden">
                        <Image src={value} alt="Upload" fill className="object-cover" />
                        <Button
                            onClick={onRemove}
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 z-10"
                        >
                            <X size={16} />
                        </Button>
                    </div>
                    <CldUploadWidget uploadPreset="fxoxzzan" onUpload={(result: any) => onChange(result.info.secure_url)}>
                        {({ open }) => (
                            <Button onClick={() => open()} type="button">
                                <CloudUpload className="mr-2" size={16} />
                                Change Image
                            </Button>
                        )}
                    </CldUploadWidget>
                </div>
            ) : (
                <CldUploadWidget uploadPreset="fxoxzzan" onUpload={(result: any) => onChange(result.info.secure_url)}>
                    {({ open }) => (
                        <Button onClick={() => open()} type="button">
                            <CloudUpload className="mr-2" size={16} />
                            Upload Image
                        </Button>
                    )}
                </CldUploadWidget>
            )}
        </div>
    );
};
