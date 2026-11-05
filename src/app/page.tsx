import { Suspense } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

import Banner from "./(Pages)/Home/Banner";
import ProductCard from "./(Pages)/Home/ProductCard";
import LoadingSpinner from "./component/Loading";

const Page = () => {
  return (
    <main className="min-h-screen w-full">
      {/* Hero Banner */}
      <Banner />

      <Suspense fallback={<LoadingSpinner />}>
        <div className="container mx-auto space-y-8 px-3 py-6 sm:px-5 sm:py-8 lg:space-y-10">
          {/* Price Increased Products */}
          <section className="overflow-hidden rounded-xl border border-base-300 bg-base-100 p-3 sm:rounded-2xl sm:p-5 lg:p-6">
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-base-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-error/10 sm:h-10 sm:w-10">
                  <FaCaretUp className="text-xl text-error sm:text-2xl" />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-base-content sm:text-lg">
                    আজ দাম বেড়েছে
                  </h2>

                  <p className="mt-0.5 text-[10px] text-base-content/50 sm:text-xs">
                    যেসব পণ্যের দাম আজ বৃদ্ধি পেয়েছে
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-full bg-error/10 px-2.5 py-1 text-[10px] font-semibold text-error sm:px-3 sm:text-xs">
                Price Up
              </span>
            </div>

            <ProductCard type="increase" />
          </section>

          {/* Price Decreased Products */}
          <section className="overflow-hidden rounded-xl border border-base-300 bg-base-100 p-3 sm:rounded-2xl sm:p-5 lg:p-6">
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-base-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10 sm:h-10 sm:w-10">
                  <FaCaretDown className="text-xl text-success sm:text-2xl" />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-base-content sm:text-lg">
                    আজ দাম কমেছে
                  </h2>

                  <p className="mt-0.5 text-[10px] text-base-content/50 sm:text-xs">
                    যেসব পণ্যের দাম আজ হ্রাস পেয়েছে
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-semibold text-success sm:px-3 sm:text-xs">
                Price Down
              </span>
            </div>

            <ProductCard type="decrease" />
          </section>

          {/* All Products */}
          <section className="overflow-hidden rounded-xl border border-base-300 bg-base-100 p-3 sm:rounded-2xl sm:p-5 lg:p-6">
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-base-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 sm:h-10 sm:w-10">
                  <span className="text-lg">🛒</span>
                </div>

                <div>
                  <h2 className="text-sm font-bold text-base-content sm:text-lg">
                    সব পণ্য
                  </h2>

                  <p className="mt-0.5 text-[10px] text-base-content/50 sm:text-xs">
                    সকল পণ্যের বর্তমান বাজার দর
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-full bg-base-200 px-2.5 py-1 text-[10px] font-semibold text-base-content/70 sm:px-3 sm:text-xs">
                All Products
              </span>
            </div>

            <ProductCard type="all" />
          </section>
        </div>
      </Suspense>
    </main>
  );
};

export default Page;
