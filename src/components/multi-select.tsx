"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command";
import { FieldLabel } from "./ui/field";
import { ProductDataProps, tags } from "@/types/product.types"
import type { Tag } from "@/types/product.types"

export default function MultiSelect({
  setProductData,
}: {
  setProductData: React.Dispatch<React.SetStateAction<ProductDataProps>>
}) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Tag[]>([])

  const toggleItem = (item: Tag) => {
    const exists = selected.find((i) => i.value === item.value)

    if (exists) {
      setSelected(() => {
        const filtered = selected.filter((i) => i.value !== item.value)
        setProductData(prev => ({...prev, tags: filtered}))
        return filtered
      });
    } else {
      setSelected(()=>{
        const newArray = [...selected, item]
        setProductData(prev => ({...prev, tags: newArray}))
        return newArray
      });
    }
  };

  const removeItem = (value: string) => {
    setSelected(()=>{
      const newArray = selected.filter((i) => i.value !== value)
      setProductData((prev) => ({ ...prev, tags: newArray }));
      return newArray
    })
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Selected Badges */}
      <FieldLabel>Tags</FieldLabel>

      {/* Multi Select Input */}
      <div className="grid grid-cols-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="border rounded-md px-4 py-2 text-sm text-left cursor-pointer text-muted-foreground">
              Select Tags
            </div>
          </PopoverTrigger>

          <PopoverContent className="p-0 w-[250px]">
            <Command>
              <CommandInput placeholder="Search categories..." />

              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandGroup>
                  {tags.map((item) => {
                    const isSelected = selected.some(
                      (i) => i.value === item.value
                    );
                    return (
                      <CommandItem
                        key={item.value}
                        onSelect={() => toggleItem(item)}
                        className="cursor-pointer"
                      >
                        <div
                          className={`mr-2 h-4 w-4 rounded-sm border ${
                            isSelected ? "bg-green-600" : "opacity-40"
                          }`}
                        ></div>
                        {item.label}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-wrap gap-2">
        {selected.map((item) => (
          // <Badge
          //   key={item.value}
          //   variant={"outline"}
          //   onClick={() => removeItem(item.value)}
          //   className="
          //     cursor-pointer hover:bg-[#570e00c2] hover:border-[#ff2f0065] hover:text-[hsl(0,93%,88%)]
          //     transition-all"
          // >
          //   {item.label}
          // </Badge>
          <Badge
            key={item.value}
            onClick={() => removeItem(item.value)}
            className="
              cursor-pointer text-xs border-[#02ff8113] bg-[#014e0169] text-[#02ff81ab]
              hover:bg-[#74282877] hover:border-[#fd181815] hover:text-[#ff5959]
              transition-all ease-in-out duration-300"
          >
            {item.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
