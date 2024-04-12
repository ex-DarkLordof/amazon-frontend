import { textAvatar } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Sheet, SheetClose, SheetContent } from "../ui/sheet";
import type { Review } from "./types";
import { Separator } from "../ui/separator";
import React from "react";
import { ChevronLeft, ChevronRight, StarIcon, X } from "lucide-react";
import clsx from "clsx";
import { formatReviewDate } from "@/lib/date";
import { Button } from "../ui/button";
import { ReviewTags } from "./ReviewTags";
import { getRatesCountString } from "@/lib/review";
import { useScreenSize } from "@/lib/media";
import { Drawer, DrawerClose, DrawerContent } from "../ui/drawer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";

interface ReviewCardProps {
  review?: Review;
  isOpen: boolean;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  closeModal: () => void;
}

export const ReviewCardFull = ({
  isOpen,
  review,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  closeModal,
}: ReviewCardProps) => {
  const isDesktop = useScreenSize({ minSize: "lg" });

  const onOpenChange = (value: boolean) => {
    if (!value) closeModal();
  };

  if (!review) return null;

  if (isDesktop) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent
          className="sm:max-w-full w-[40vw] flex flex-col"
          hideClose={true}
        >
          <div className="flex flex-col gap-6 grow">
            <ReviewHeaderDesktop
              review={review}
              hasPrev={hasPrev}
              hasNext={hasNext}
              onPrev={onPrev}
              onNext={onNext}
            />
            <Separator orientation="horizontal" />
            <ReviewBody review={review} />
            <ReviewFooter review={review} />
          </div>
          {!!review.images?.length && (
            <ReviewImageCarouselDesktop images={review.images} />
          )}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <>
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent className="h-[45vh]">
          <div className="px-4 py-3 h-full flex flex-col gap-3 overflow-y-auto">
            <ReviewHeaderMobile
              review={review}
              hasPrev={hasPrev}
              hasNext={hasNext}
              onPrev={onPrev}
              onNext={onNext}
            />
            <ReviewBody review={review} />
            <ReviewFooter review={review} />
          </div>
          {!!review.images?.length && (
            <ReviewImageCarouselMobile images={review.images} />
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

interface BasePartProps {
  review: Review;
}

interface HeaderControlsProps {
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

interface ReviewImageCarouselProps {
  images: string[];
}

interface ReviewHeaderProps extends BasePartProps, HeaderControlsProps {}

const HeaderControls = ({
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: HeaderControlsProps) => {
  return (
    <div className="flex items-center gap-6">
      <button
        className="group rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        disabled={!hasPrev}
        onClick={onPrev}
      >
        <ChevronLeft className="group-disabled:stroke-gray-300" />
      </button>
      <button
        className="group rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        disabled={!hasNext}
        onClick={onNext}
      >
        <ChevronRight className="group-disabled:stroke-gray-300" />
      </button>
    </div>
  );
};

const ReviewImageCarouselDesktop = ({ images }: ReviewImageCarouselProps) => {
  return (
    // width + parent padding
    <div className="fixed top-0 bottom-0 -translate-x-[calc(60vw+1.5rem)] w-[60vw] px-6">
      <Carousel
        opts={{
          align: "center",
        }}
      >
        <CarouselContent>
          {images.map((img, index) => {
            return (
              <CarouselItem className="h-screen py-[15%] w-full" key={index}>
                <div className="h-full w-full mx-auto relative">
                  <Image
                    src={img}
                    alt="Placeholder"
                    fill={true}
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

const ReviewImageCarouselMobile = ({ images }: ReviewImageCarouselProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 -translate-y-full">
      <Carousel
        opts={{
          align: "center",
        }}
      >
        <CarouselContent>
          {images.map((img, index) => {
            return (
              <CarouselItem className="max-h-[55vh] h-screen py-3" key={index}>
                <div className="h-full relative">
                  <Image
                    src={img}
                    alt="Placeholder"
                    fill={true}
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

const ReviewHeaderDesktop = ({
  review,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: ReviewHeaderProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 mr-auto">
        <Avatar>
          <AvatarImage src={review.user.avatar} />
          <AvatarFallback>{textAvatar(review.user.fullName)}</AvatarFallback>
        </Avatar>
        <div className="text-sm xl:text-base">
          <span>{review.user.fullName}</span>
          <div className="flex items-center gap-2 h-5">
            <span>{review.user.location}</span>
            <Separator orientation="vertical" />
            <span>{formatReviewDate(review.createdAt)}</span>
          </div>
        </div>
      </div>
      <HeaderControls
        hasPrev={hasPrev}
        hasNext={hasNext}
        onPrev={onPrev}
        onNext={onNext}
      />
      <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary ml-[10%]">
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </SheetClose>
    </div>
  );
};

const ReviewHeaderMobile = ({
  review,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: ReviewHeaderProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-full flex justify-between items-center">
        <HeaderControls
          hasPrev={hasPrev}
          hasNext={hasNext}
          onPrev={onPrev}
          onNext={onNext}
        />
        <DrawerClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary ml-[10%]">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </DrawerClose>
      </div>
      <Separator orientation="horizontal" />
      <div className="w-full flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={review.user.avatar} />
            <AvatarFallback>{textAvatar(review.user.fullName)}</AvatarFallback>
          </Avatar>
          <span>{review.user.fullName}</span>
        </div>
        <div className="text-xs text-end">
          <p>{review.user.location}</p>
          <p>{formatReviewDate(review.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

const ReviewBody = ({ review }: BasePartProps) => {
  const starsElements = React.useMemo(() => {
    if (!review) return [];
    const maxRating = 5;
    const elems = [];
    for (let i = 0; i < maxRating; i++) {
      elems.push(
        <StarIcon
          className={clsx("w-4 h-4", i < review.rating && "fill-black")}
          key={i}
        />
      );
    }
    return elems;
  }, [review.rating]);

  return (
    <div className="grow">
      <div className="mb-4">
        <div className="flex items-center gap-2 lg:gap-4 h-5 text-xs lg:text-base">
          <div className="flex items-center gap-1 h-full">{starsElements}</div>
          {review.options.map((opt, i) => (
            <React.Fragment key={i}>
              <Separator orientation="vertical" />
              <span>
                {opt.title}: {opt.value}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <p className="font-semibold">{review.title}</p>
        <p className="whitespace-pre-line">{review.text}</p>
      </div>
      {!!review.tags?.length && <ReviewTags tags={review.tags} />}
    </div>
  );
};

const ReviewFooter = ({ review }: BasePartProps) => {
  return (
    <div>
      <Separator orientation="horizontal" />
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2 mt-3 lg:mt-6">
        <div className="flex gap-4">
          <Button variant={review.isRatedByUser ? "default" : "outline"}>
            Helpful
          </Button>
          <Button variant={"outline"}>Report</Button>
        </div>
        <span className="text-sm lg:text-base">
          {getRatesCountString(review)}
        </span>
      </div>
    </div>
  );
};
