"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import placeholder from "@/../public/Icons/placeholder.svg";
import Image from "next/image";
import { SignInUpButtons } from "@/components/SignInUpModal/SignInUpModals";

export const SingInUpBanner = () => {
  return (
    <Card className="w-full bg-gray-100 border-none">
      <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <Image
          src={placeholder}
          alt="Placeholder"
          className="w-full sm:max-w-40 xl:max-w-md object-cover max-h-[260px]"
        />
        <div className="flex-1">
          <div className="mb-6 text-center">
            <h2 className="text-2xl lg:text-3xl xl:text-4xl whitespace-nowrap font-semibold mb-3">
              Be aware of the variety
            </h2>
            <p className="text-lg lg:text-2xl xl:text-3xl">
              Join, choose and buy with confidence!
            </p>
          </div>
          <div className="flex justify-center items-center gap-6">
            <SignInUpButtons variant="banner" />
          </div>
        </div>
        <Image
          src={placeholder}
          alt="Placeholder"
          className="w-full sm:max-w-40 xl:max-w-md object-cover max-h-[260px]"
        />
      </CardContent>
    </Card>
  );
};
