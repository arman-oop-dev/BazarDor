import { todayDate } from "@/app/component/header/Navbar";
import { Button } from "@heroui/react";
import Image from "next/image";

const Banner = () => {
  return (
    <section className="container mx-auto grid grid-cols-1 items-center gap-6 overflow-hidden rounded-2xl border border-base-300 bg-white px-5 py-8 sm:px-8 sm:py-10 md:grid-cols-2 md:gap-8 md:px-10 lg:rounded-3xl lg:px-14 lg:py-12 mt-4">
      {/* Banner Content */}
      <div className="flex flex-col items-start gap-3 sm:gap-4">
        <p className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary sm:text-sm">
          {todayDate}
        </p>

        <h1 className="text-2xl font-bold leading-snug text-base-content sm:text-3xl md:text-3xl lg:text-4xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="text-sm leading-7 text-base-content/80 sm:text-base">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <Button className="mt-2 w-full bg-primary font-semibold text-primary-content sm:w-auto sm:px-6">
          সব পণ্য দেখুন
        </Button>
      </div>

      {/* Banner Image */}
      <div className="flex w-full items-center justify-center md:justify-end">
        <Image
          src="/assets/bazar-hero.png"
          alt="আজকের বাজারের পণ্য"
          width={315}
          height={263}
          priority
          className="h-auto w-3/4 max-w-[240px] object-contain sm:max-w-[280px] md:w-full md:max-w-[315px] lg:max-w-[360px]"
        />
      </div>
    </section>
  );
};

export default Banner;
