import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { DeliveryTruck } from "./ui/delivery-truck-icon";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import { ProductDataProps } from "@/types/product.types";

const defaultImages = [
  "/pine-bonsai.jpeg",
  "/lavenderSoap3.jpg",
  "/aquaBliss2.jpg",
];

export default function ProductCard({
  productData,
}: {
  productData: ProductDataProps;
}) {
  return (
    <div className="fixed z-50 top-30 p-2 flex flex-col border border-neutral-700 rounded-sm w-68 h-fit min-w-44 minh-[15rem] max-w-76 max-h-104">
      <div className="flex-4">
        <Carousel className="">
          <CarouselContent className="">
            {productData.images.length > 0
              ? productData.images.map((image) => (
                  <CarouselItem
                    className="flex justify-center items-center"
                    key={image.id}
                  >
                    <Image
                      src={image?.url || image.preview}
                      width={200}
                      height={200}
                      alt="Product Image"
                    />
                  </CarouselItem>
                ))
              : defaultImages.map((image) => (
                  <CarouselItem
                    className="flex justify-center items-center"
                    key={image}
                  >
                    <Image
                      src={image}
                      width={200}
                      height={200}
                      alt="Product Image"
                    />
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex-3 px-2 py-1">
        <div className="flex justify-between pr-4">
          <h2 className="">{productData.title}</h2>
          {productData.inventory > 0 ? (
            <Badge variant="outline" className="text-green-400">
              In Stock
            </Badge>
          ) : (
            <Badge variant="outline" className="text-red-500">
              Out of Stock
            </Badge>
          )}
        </div>
        <div className="space-x-1">
          {productData.tags.map((item) => (
            <Badge
              key={item.value}
              variant="outline"
              className="text-[8px] font-light"
            >
              {item.value}
            </Badge>
          ))}
        </div>
        <div className="text-xs my-1 mx-1 space-x-2">
          <span className="text-sky-500">₹{productData.price}</span>
          {/* <span className="line-through text-neutral-500">₹1,499</span>
            <span className="text-sky-500">₹1,199</span> */}
        </div>
        <div className="text-[11px]">
          {productData.description.length > 130
            ? productData.description.slice(0, 130) + " . . ."
            : productData.description}
        </div>
        <div className="text-xs flex space-x-2 mt-2 italic">
          <span className="text-neutral-400">Delivery Time</span>
          <DeliveryTruck stroke="#737373" className="size-5" />
          <span className="text-neutral-400">
            {productData.deliveryTime} Days
          </span>
        </div>
        <div className="mt-2 space-x-2 flex justify-between">
          <div className="flex gap-5 justify-around">
            <span className="">
              <HeartIcon />
            </span>
            <span className="">
              <ShoppingCartIcon />
            </span>
          </div>
          <Button variant="outline" className="h-8">
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
}
