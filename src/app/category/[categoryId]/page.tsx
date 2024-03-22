"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Slash, StarIcon } from "lucide-react";

import HouseLine from "@/../public/Icons/HouseLine.svg";
import RatingFillStar from "@/../public/Icons/RatingFillStar.svg";
import RatingLineStar from "@/../public/Icons/RatingLineStar.svg";
import placeholder from "@/../public/Icons/placeholder.svg";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ComboboxFilters } from "@/components/ui/combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import ScrollToTopButton from "@/components/ScrollToTopButton";

type FiltersDataItem = {
  title: string;
  type: string;
  isSearch: boolean,
  values: string[];
};
const FiltersData: FiltersDataItem[] = [
  {  
    title: "Brand",
    type: "Checkbox",
    isSearch: true,
    values: [ "Brand 1", "Brand 2", "Brand 3", "Brand 4", "Brand 5", "Brand 6", "Brand 7", "Brand 8", "Brand 9", "Brand 10", "Brand 11", "Brand 12", "Brand 13", "Brand 14", "Brand 15" ]
  },
  {
    title: "Fabric type",
    type: "Checkbox",
    isSearch: true,
    values: [ "Fabric type 1", "Fabric type 2", "Fabric type 3", "Fabric type 4", "Fabric type 5", "Fabric type 6", "Fabric type 7", "Fabric type 8", "Fabric type 9", "Fabric type 10", "Fabric type 11", "Fabric type 12", "Fabric type 13", "Fabric type 14", "Fabric type 15" ]
  },
  {
    title: "Size",
    type: "Tiles",
    isSearch: true,
    values: [ "2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "32", "34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60" ]
  },
  {
    title: "Color",
    type: "Checkbox",
    isSearch: true,
    values: [ "Color 1", "Color 2", "Color 3", "Color 4", "Color 5", "Color 6", "Color 7", "Color 8", "Color 9", "Color 10", "Color 11", "Color 12", "Color 13", "Color 14", "Color 15" ]
  },
  {
    title: "Price",
    type: "Price",
    isSearch: false,
    values: [ "0" ]
  },
  {
    title: "Customer reviews",
    type: "Rating",
    isSearch: false,
    values: [ "5", "4", "3", "2", "1" ]
  },
];

type FiltersComboboxDataItem = {
  value: string;
  label: string;
};
const FiltersComboboxData: FiltersComboboxDataItem[] = [
  {
    value: "aswd",
    label: "Aswd",
  },
  {
    value: "qwerty",
    label: "Qwerty",
  }
];

export default function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  useEffect(() => {
    if (params.categoryId) {
      console.log(`Loading page for category ${params.categoryId}`);
    }
  }, [params.categoryId]);

  return (
    <main className="flex flex-col items-center max-w-screen-xl py-10 grow w-full mx-auto">
      <section className="w-full flex items-left gap-1">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">
                  <Image src={HouseLine} width={24} height={24} alt="Home" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/category">Category {params.categoryId}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/category/subcategory">Subcategory {params.categoryId}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Products {params.categoryId}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>
      <section className="w-full flex items-left pt-4">
        <span className="text-[36px] font-semibold">Title</span>
      </section>
      <section className="flex max-sm:flex-col lg:flex-row w-full pt-8 gap-6">
        <div className="flex flex-col gap-2 basis-[385px] max-md:w-full">
          {Array.from({ length: FiltersData.length }).map((_, index) => (
            <FiltersCard key={index} item={FiltersData[index]}/>
          ))}
        </div>
        <div className="grow">
          {/* Filters here */}
          <div className="w-full flex justify-between items-center">
            <div>
              <ComboboxFilters data={FiltersComboboxData} />
            </div>
            <div className="flex gap-2">
              <div>
                <Select>
                  <SelectTrigger className="max-w-[283px] w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mostpopular">Most popular</SelectItem>
                    <SelectItem value="tocheap">From expensive to cheap</SelectItem>
                    <SelectItem value="toexpensive">From cheap to expensive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex">
                {/* Switch card template here*/}
              </div>
            </div>
          </div>
          <br/>
          <hr></hr>
          <br/>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-max gap-6 items-center justify-center">
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductCard
                price={29}
                title={"Product " + index}
                quantity={index}
                key={index}
              />
            ))}
          </div>
          {/* Pagination here */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>
      <ScrollToTopButton />
    </main>
  );
}

const FiltersCard = ({ item }: { item: FiltersDataItem }) => {
  return (
    <div className="max-h-[414px] p-6 pt-3 bg-gray-200 rounded-lg shadow">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>{item["title"]}</AccordionTrigger>
          <AccordionContent>
              { item["isSearch"] ? <Input placeholder="Search..." className="mb-3" /> : <></>}
              <ScrollArea>
                <ul className="list-none p-0 m-0 max-h-[272px] ">
                  <FilterCardVariation title={item["title"]} type={item["type"]} values={item["values"]}/>
                </ul>
              </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const FilterCardVariation = ({
  title,
  type,
  values,
}: {
  title: string,
  type: string,
  values: string[],
}) => {
  switch(type)
  {
    case "Checkbox":
      {
        return(
          <>
            {Array.from({ length: values.length }).map((_, index) => (
              <li key={index} className="flex items-center space-x-2 pb-1">
                <Checkbox id={title + index} />
                <label className="text-base" htmlFor={title + index}>{values[index]}</label>
              </li>
            ))}
          </>
        );
      }
    case "Tiles":
      {
        return(
          <>
            <ToggleGroup variant="outline" type="multiple" className={`grid grid-cols-5 max-[340px]:grid-cols-4 max-[250px]:grid-cols-3 max-[180px]:grid-cols-2`}> 
              {Array.from({ length: values.length }).map((_, index) => (
                <ToggleGroupItem key={title + index} value={values[index]} aria-label={"Toggle" + values[index]}>
                  {values[index]}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </>
        );
      }
    case "Price":
      {
        return(
          <>
            <div className="h-full overflow-hidden">
              <div className="flex justify-between w-full pb-3">
                <div className="flex justify-center items-center gap-2">
                  <Input className="max-w-[64px]" value={"0"}></Input>
                  <span className="font-bold">—</span>
                  <Input className="max-w-[64px]" value={"100"}></Input>
                </div>
                <div>
                  <Button variant={"ghost"} className="bg-gray-300">Save</Button>
                </div>
              </div>
              <div className="h-[20px]">
                <Slider defaultValue={[15, 90]} max={100} step={1}/>
              </div>
            </div>
          </>
        );
      }
    case "Rating":
      {
        return(
          <>
            {Array.from({ length: values.length }).map((_, index) => (
              <li key={index} className="flex items-center space-x-2 pb-2">
                <Checkbox id={title + index} />
                <label className="text-base flex gap-[3.44px]" htmlFor={title + index}>
                  {Array.from({ length: 5 - index }).map((_, _index) => (
                    <Image
                      key={_index} 
                      src={RatingFillStar}
                      alt="placeholder"
                    />
                  ))}
                  {Array.from({ length: index }).map((_, _index) => (
                    <Image
                      key={_index} 
                      src={RatingLineStar}
                      alt="placeholder"
                      fill={false}
                    />
                  ))}
                </label>
              </li>
            ))}
          </>
        );
      }
  }
};


const ProductCard = ({
  title,
  price,
  quantity,
}: {
  title: string;
  price: number;
  quantity: number;
}) => {
  const priceParts = price.toFixed(2).split(".");
  const whole = priceParts[0];
  const fraction = priceParts[1];
  const isOutOfStock = quantity === 0;

  return (
    <Card className="max-w-sm w-full border-0 hover:ring-1 ring-gray-300 shadow-none transition-shadow duration-300 relative">
      <CardHeader className="pb-0">
        <div className="relative aspect-square">
          <Image src={placeholder} fill={true} alt="Placeholder" />
          <div className="absolute top-6 left-0 rounded-e-xl bg-gray-100 px-2 pl-4 pr-6">
            -24%
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-3 flex flex-col justify-center items-center">
          <span className="text-lg line-clamp-2">{title}</span>
          <div className="pb-3 flex gap-3 items-center">
            <div className="flex items-center gap-1">
              <StarIcon width={16} height={16} />
              <span className="text-sm">4.7</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle width={16} height={16} />
              <span className="text-sm">228</span>
            </div>
          </div>
          <div>
            <span className="text-xl">${whole}</span>
            <sup>{fraction}</sup>
            <sub className="ml-2 line-through text-gray-400">$39.99</sub>
          </div>
        </div>
      </CardContent>
      {isOutOfStock && (
        <div className="absolute inset-0 bg-gray-200/50">
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center max-w-[230px] w-full">
            <span className="text-2xl">Out of Stock</span>
            <Button className="mt-4">Notify when available</Button>
          </div>
        </div>
      )}
    </Card>
  );
};
