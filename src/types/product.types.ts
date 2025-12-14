import { Image } from "./file.types";

export type Tag = { label: string; value: string };

export const tags: Tag[] = [
  { label: "Vegetables", value: "veg" },
  { label: "Fruits", value: "fruits" },
  { label: "Seeds", value: "seeds" },
  { label: "Plants", value: "plant" },
  { label: "Equipment", value: "equip" },
];

export interface ProductDataProps {
  title: string
  description: string
  tags: Tag[]
  inventory: number
  price: number
  deliveryTime: number
  images: Image[]
}