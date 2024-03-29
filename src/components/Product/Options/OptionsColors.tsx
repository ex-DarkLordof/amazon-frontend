"use client";
import { useEffect, useState } from "react";
import { AdditionalProductDataTypes, ColorsData } from "./types";
import clsx from "clsx";
import { useSearhParamsTools } from "@/lib/router";
import { cn } from "@/lib/utils";

const type: AdditionalProductDataTypes = "colors";

export const OptionColors = ({ data }: { data: ColorsData }) => {
  const searchParams = useSearhParamsTools();
  // const [index, setIndex] = useState<number>();
  const [index, setIndex] = useState<number | undefined>(() => {
    const defaultValue = searchParams.get(type);

    if (defaultValue) {
      const index = data.findIndex((s) => s.title === defaultValue);

      if (index !== -1 && data[index].isAvailable) {
        return index;
      } else {
        // remove invalid parameter
        searchParams.set(type, undefined);
      }
    }
    return undefined;
  });

  const onSelect = (i: number) => () => {
    setIndex(i);
    searchParams.set(type, data[i].title);
  };

  return (
    <div className="w-full">
      <p className="text-base lg:text-2xl">
        <span>Color</span>
        <span className="font-semibold ml-4">
          {index !== undefined ? data[index].title : "None"}
        </span>
      </p>
      <div
        role="input"
        className="flex lg:flex-wrap gap-1 lg:gap-3 mt-2 lg:mt-4 overflow-y-auto pb-1 lg:pb-0"
      >
        {data.map((s, i) => {
          const item = data[i];
          const isSelected = index === i;

          return (
            <div
              className={cn(
                "min-w-11 max-w-14 w-full aspect-square flex justify-center items-center rounded-md border-2 cursor-pointer p-2.5",
                {
                  "border-gray-300": !isSelected,
                  "border-black": isSelected,
                  //   "text-gray-300 bg-gray-100 cursor-not-allowed overflow-hidden relative before:absolute before:-top-4 before:-bottom-4 before:rotate-45 before:bg-gray-300 before:w-[2px]":
                  //     !item.isAvailable,
                  "cursor-not-allowed relative before:absolute before:inset-0 before:bg-gray-100/80":
                    !item.isAvailable,
                }
              )}
              key={item.hex}
              title={item.title}
              onClick={item.isAvailable ? onSelect(i) : undefined}
            >
              <div
                className="aspect-square w-full min-w-4 rounded-sm"
                style={{ backgroundColor: item.hex }}
              />
              {!item.isAvailable && (
                <svg className="w-full h-full absolute stroke-gray-300 stroke-2">
                  <line x1="0" y1="100%" x2="100%" y2="0" />
                </svg>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
