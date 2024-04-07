import { Banner } from "@/components/MainPage/Banner";
import { SingInUpBanner } from "@/components/MainPage/SingInUpBanner";
import { CarouselCategory } from "@/components/MainPage/CarouselCategory";

import ScrollToTopButton from "@/components/ScrollToTopButton";
import { ProductsBlock } from "@/components/Product/ProductsBlock";

export default function Home() {
  return (
    <>
      <main className="max-w-[1600px] w-full grow pt-4 mx-auto">
        <Banner />
        <section className="py-6">
          <CarouselCategory />
        </section>
        <section className="px-4">
          <div className="py-6 border-y">
            <ProductsBlock title="Trending deals" />
          </div>
        </section>
        <div className="py-6">
          <CarouselCategory />
        </div>
        <section className="px-4">
          <div className="py-6 border-y">
            <ProductsBlock title="Sale" />
          </div>
        </section>
        <section className="pt-6 pb-16 px-4">
          <SingInUpBanner />
        </section>
      </main>

      <ScrollToTopButton />
    </>
  );
}
