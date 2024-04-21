import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const mulish = Mulish({
  subsets: ["latin"],
  // weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={mulish.className}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="w-full grow px-4">{children}</div>
            <Footer />
          </div>
        </body>
      </Providers>
    </html>
  );
}
