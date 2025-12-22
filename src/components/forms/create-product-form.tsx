"use client"

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MultiSelect from "@/components/multi-select";
import FileUpload from "@/components/file-upload";
import { CreateProductFormProps, ProductDataSchema } from "@/types/form.types"
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";

const fileTypes = {
  "image/jpeg": [".jpeg", ".jpg"],
  "image/png": [".png"],
};



export function CreateProductForm({
  productData,
  setProductData,
}: CreateProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof ProductDataSchema>>({
    resolver: zodResolver(ProductDataSchema),
    defaultValues: {
        title: "",
        description: "",
        tags: [],
        inventory: 0,
        price: 0,
        deliveryTime: 0,
        images: []
    }
  })

  async function onSubmit (data: z.infer<typeof ProductDataSchema>){
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/seller/create-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(res => res.json())

      if(res?.success){
        toast.success(res.message)
      } else {
        toast.error(res.error)
      }
    } catch (error) {
      toast.error("Form Submission failed.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Title of Product
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder="Pine Bonsai"
                  required
                  value={productData.title}
                  onChange={(e) =>
                    setProductData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </Field>

              {/* Images Input */}
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Select Images
                </FieldLabel>
                <FileUpload
                  setProductData={setProductData}
                  maxFiles={5}
                  fileTypes={fileTypes}
                  additionalText="Only *.jpeg, *.jpg, *.png files will be accepted"
                />
                <FieldDescription>
                  Select Multiple Relevant Images, in right sequence.
                </FieldDescription>
              </Field>

              {/* Product Quantity Input */}
              <div className="grid grid-cols-2 gap-5">
                <Field>
                  <FieldLabel htmlFor="product-quantity">
                    Product Quantity in Inventory
                  </FieldLabel>
                  <Input
                    id="product-quantity"
                    placeholder="100"
                    onChange={(e) =>
                      setProductData((prev) => ({
                        ...prev,
                        inventory: Number(e.target.value),
                      }))
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="product-price">Product Price</FieldLabel>
                  <Input
                    id="product-price"
                    placeholder="₹1000"
                    required
                    onChange={(e) =>
                      setProductData((prev) => ({
                        ...prev,
                        price: Number(e.target.value),
                      }))
                    }
                  />
                </Field>
              </div>

              <MultiSelect setProductData={setProductData} />
            </FieldGroup>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="product-description">
                  Description
                </FieldLabel>
                <Textarea
                  id="product-description"
                  placeholder="write a relevant description"
                  value={productData.description}
                  onChange={(e) =>
                    setProductData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </Field>
            </FieldGroup>
            <div className="grid grid-cols-2 gap-5">
              <Field>
                <FieldLabel htmlFor="delivery-time">
                  Delivery Time in working Days
                </FieldLabel>
                <Input
                  id="delivery-time"
                  placeholder="6"
                  type="number"
                  required
                  value={productData.deliveryTime}
                  onChange={(e) =>
                    setProductData((prev) => ({
                      ...prev,
                      deliveryTime: Number(e.target.value),
                    }))
                  }
                />
              </Field>
            </div>
          </FieldSet>

          {/* <FieldSeparator /> */}

          <Field orientation="horizontal">
            <Button type="submit" disabled={isSubmitting}>Create</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
