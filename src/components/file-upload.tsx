"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileUploadProps, PreviewFile } from "@/types/file.types";
import { upload } from "@imagekit/next";

const defaultFileInputTypes = {
  "image/*": [],
  "application/*": [],
  "audio/mpeg": [".mp3"],
  "video/*": [],
  "text/*": [],
};

export default function FileUpload({
  setProductData,
  maxFiles,
  fileTypes,
  additionalText = "",
  fileType,
}: FileUploadProps) {
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function validateFile(file: File) {
    if (fileType === "image" && !file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return false;
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
      return false;
    }
    return true;
  }

  async function uploadFile(file: PreviewFile) {
    if (!file || !validateFile(file)) return;

    setUploading(true);
    setError(null);

    try {
      const auth = await fetch("/api/auth/imagekit/auth").then((r) => r.json());

      const res = await upload({
        file,
        fileName: `${Date.now()}-${file.name}`,
        token: auth.token,
        signature: auth.signature,
        expire: auth.expire,
        publicKey: auth.publicKey,
        folder: "/seller/products",
      });

      setUploading(false);

      setFiles((prev) => {
        const nextFiles = prev.map((f) =>
          f.name === file.name ? { ...f, fileId: res.fileId, url: res.url } : f
        );
        setProductData((prevProduct) => ({
          ...prevProduct,
          images: nextFiles.map((file) => ({
            ...file,
            fileId: file.fileId,
            url: file.url,
          })),
        }));
        return nextFiles;
      });
    } catch (error) {
      setError("Upload Failed");
      console.log(error);
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const mapped = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: `${file.name}-${Date.now()}-${Math.random()}`,
        })
      ) as PreviewFile[];

      setFiles((prev) => {
        const nextFiles = [...prev, ...mapped];

        // Update productData based on nextFiles (not old files)
        setProductData((prevProduct) => ({
          ...prevProduct,
          images: nextFiles.map((file) => ({
            id: file.id,
            url: file?.url,
            preview: file.preview,
          })),
        }));

        return nextFiles;
      });

      mapped.forEach((previewFile) => {
        uploadFile(previewFile);
      });
    },
    [setProductData, uploadFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: maxFiles,
    accept: fileTypes || defaultFileInputTypes,
    onDrop,
    multiple: true,
  });

  async function deleteFile(fileId: string | undefined) {
    if (!fileId) return;
    setFiles((prev) => {
      const nextFiles = prev.filter((file) => file.fileId !== fileId);

      setProductData((prevProduct) => ({
        ...prevProduct,
        images: nextFiles.map((file) => ({
          id: file.id,
          url: file.url,
          preview: file.preview,
        })),
      }));

      return nextFiles;
    });

    try {
      const response = await fetch("/api/auth/imagekit/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId }),
      });
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }

  function removeImage(Id: string) {
    setFiles(files.filter((file) => file.fileId !== Id));
  }

  return (
    <div className="space-y-4">
      {/* Drag & Drop Box */}
      <div
        {...getRootProps()}
        className={`border rounded-xl p-6 cursor-pointer transition 
          ${isDragActive ? "border-2 border-[#02ff81be] bg-[#014e0169] text-[#02ff81ef]" : "border-neutral-700 text-neutral-500"}
        `}
      >
        <input {...getInputProps()} />
        <p className="text-center text-sm font-normal italic">
          {isDragActive
            ? "Drop the files here..."
            : "Drag & drop files here, or click to select"}
        </p>
        <p className="text-center text-sm font-normal italic">
          {isDragActive ? "" : "(" + additionalText + ")"}
        </p>
      </div>

      {/* Preview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="relative group border rounded-lg overflow-hidden"
          >
            <Image
              src={file.preview}
              width={100}
              height={100}
              className="object-cover"
              alt={file.name || "Image"}
            />

            {/* Delete Button */}
            {!uploading && (
              <button
                onClick={() => deleteFile(file.fileId)}
                className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                disabled={uploading}
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
