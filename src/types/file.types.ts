import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Accept } from "react-dropzone";
import { ProductDataProps } from "./product.types";

export interface FileUploadProps {
  setProductData: React.Dispatch<React.SetStateAction<ProductDataProps>>
  maxFiles: number | undefined;
  fileTypes: Accept | undefined;
  additionalText?: string;
  fileType?: "image" | "video";
}

export type Image = { id: string, fileId?: string; url?: string, preview: string | StaticImport }

export type PreviewFile = File & Image
