import { ProductDataProps } from "./product.types";
import {z} from "zod"

export interface CreateProductFormProps {
  productData: ProductDataProps;
  setProductData: React.Dispatch<React.SetStateAction<ProductDataProps>>;
}

export const TagSchema = z.object({
  id: z.string(),
  name: z.string()
})

export const ImageSchema = z.object({
  id: z.string(),
  fileId: z.string(),
  url: z.string(),
  preview: z.union([z.string(), z.any()])
})

export const ProductDataSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(TagSchema),
  inventory: z.number(),
  price: z.number(),
  deliveryTime: z.number(),
  images: z.array(ImageSchema)
})

export type ProductData = z.infer<typeof ProductDataSchema>;