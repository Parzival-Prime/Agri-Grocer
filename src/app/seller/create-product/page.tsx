"use client"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import ProductCard from "@/components/product-card";
import { CreateProductForm } from "@/components/forms/create-product-form";
import { useState } from "react";
import { ProductDataProps } from "@/types/product.types";

function FormSection({productData, setProductData}:{productData: ProductDataProps, setProductData: React.Dispatch<React.SetStateAction<ProductDataProps>>}) {
  return (
    <div className="">
      <div className="flex justify-center">
        {/* <h1 className="text-3xl mt-5 font-sans">Form Section</h1> */}
      </div>
      <div className="pl-15 mt-8 mb-4">
        <CreateProductForm productData={productData} setProductData={setProductData} />
      </div>
    </div>
  );
}

function PreviewSection({productData}: {productData: ProductDataProps}) {
  return (
    <div className="flex">
      <div
        className="fixed top-5 w-[1.5px] h-full bg-linear-to-b 
    from-transparent via-neutral-500/60 to-transparent"
      ></div>
      <div className="w-full ">
        <div className="flex items-center justify-center my-15">
          <ProductCard productData={productData} />
        </div>
      </div>
    </div>
  );
}


export default function page() {
  const [productData, setProductData] = useState<ProductDataProps>({
    title: "Pine Bonsai",
    description: "A beautifully handcrafted Bonsai Pine plant, nurtured for perfect miniature growth. Ideal for home décor, gifting, and adding a natural aesthetic to any space.",
    tags: [{ label: "Plants", value: "plant" }],
    inventory: 1,
    price: 1000,
    deliveryTime: 5,
    images: []
  })
  return (
    <div className="h-dvh px-2">
      <div className="my-4 mx-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/seller">Seller</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>create product</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="pl-6 text-2xl font-bold my-4 mt-7">
        Create Product
        <div className="text-sm font-normal text-neutral-400">
          Add product details visible to customers.
        </div>
      </div>
      <div className="grid grid-cols-2 m-9">
        <FormSection  productData={productData} setProductData={setProductData} />
        <PreviewSection productData={productData} />
      </div>
    </div>
  );
}
