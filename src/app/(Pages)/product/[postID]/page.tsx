import { ProductAPI } from "@/app/api/ProductAPI";
import { auth } from "@/lib/auth";
import { unitToBangla } from "@/lib/Types/UnitType";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  FaArrowLeft,
  FaCaretDown,
  FaCaretUp,
  FaChartLine,
  FaMapMarkerAlt,
} from "react-icons/fa";

interface ProductPageProps {
  params: Promise<{ postID: string }>;
}

const ProductDetails = async ({ params }: ProductPageProps) => {
  // Check Better Auth session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const { postID } = await params;

  const details = await ProductAPI();

  const postDetails = details.find((item) => item.id.toString() === postID);

  if (!postDetails) {
    notFound();
  }

  // Price Difference
  const different = Math.abs(
    postDetails.yesterday - postDetails.today,
  ).toLocaleString("bn-BD");

  // Price Message
  let priceMessage = "";

  if (postDetails.today > postDetails.yesterday) {
    priceMessage = `গতকালের তুলনায় আজ দাম বেড়েছে ${different} টাকা`;
  } else if (postDetails.today < postDetails.yesterday) {
    priceMessage = `গতকালের তুলনায় আজ দাম কমেছে ${different} টাকা`;
  } else {
    priceMessage = "গতকালের তুলনায় আজ দাম অপরিবর্তিত রয়েছে";
  }

  const isIncreased = postDetails.change.dir === "up";
  const isDecreased = postDetails.change.dir === "down";

  const changeColor = isIncreased
    ? "text-error"
    : isDecreased
      ? "text-success"
      : "text-base-content/60";

  const changeBackground = isIncreased
    ? "bg-error/10"
    : isDecreased
      ? "bg-success/10"
      : "bg-base-200";

  // Market Price Calculations
  const marketPrices = postDetails.markets;

  const maxRetailPrice =
    marketPrices.length > 0
      ? Math.max(...marketPrices.map((item) => item.max))
      : 0;

  const minRetailPrice =
    marketPrices.length > 0
      ? Math.min(...marketPrices.map((item) => item.min))
      : 0;

  const averageRetailPrice =
    marketPrices.length > 0
      ? marketPrices.reduce(
          (total, item) => total + (item.min + item.max) / 2,
          0,
        ) / marketPrices.length
      : 0;

  // Market Rows
  const marketRows = marketPrices.map((item) => ({
    ...item,
    average: Math.round((item.min + item.max) / 2),
  }));

  return (
    <main className="container mx-auto max-w-6xl space-y-5 px-3 py-5 sm:px-5 sm:py-7">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-xs text-base-content/50 sm:text-sm">
          <li>
            <Link href="/" className="transition-colors hover:text-primary">
              হোম
            </Link>
          </li>

          <li className="text-base-content/30">/</li>

          <li>{postDetails.categoryNameBn}</li>

          <li className="text-base-content/30">/</li>

          <li className="font-semibold text-primary" aria-current="page">
            {postDetails.nameBn}
          </li>
        </ol>
      </nav>

      {/* Product Details */}
      <section className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-5 lg:p-6">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          {/* Product Information */}
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-base-200 text-3xl sm:size-16 sm:text-4xl">
              {postDetails.image}
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-lg font-extrabold text-base-content sm:text-xl lg:text-2xl">
                {postDetails.nameBn}
              </h1>

              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-base-content/60 sm:text-sm">
                <span>প্রতি {unitToBangla(postDetails.unit)}</span>

                <span className="text-base-content/30">|</span>

                <span>{postDetails.categoryNameBn}</span>
              </div>

              <p
                className={`mt-2 flex items-center gap-1.5 text-xs font-semibold sm:text-sm ${changeColor}`}
              >
                {isIncreased ? (
                  <FaCaretUp className="text-base" />
                ) : isDecreased ? (
                  <FaCaretDown className="text-base" />
                ) : null}

                {priceMessage}
              </p>
            </div>
          </div>

          {/* Today's Price */}
          <div className="flex shrink-0 items-center justify-between gap-5 rounded-xl bg-base-200/70 px-4 py-3 sm:min-w-40 sm:flex-col sm:items-center sm:gap-1 sm:px-6 sm:py-4">
            <div className="sm:text-center">
              <p className="text-xs font-medium text-base-content/60">
                আজকের দাম
              </p>

              <p className="mt-1 text-2xl font-extrabold tracking-tight text-base-content sm:text-3xl">
                {postDetails.today.toLocaleString("bn-BD")}
              </p>

              <p className="text-[11px] text-base-content/50">
                টাকা / {unitToBangla(postDetails.unit)}
              </p>
            </div>

            {/* Percentage */}
            <div
              className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold ${changeBackground} ${changeColor}`}
            >
              {isIncreased ? (
                <FaCaretUp />
              ) : isDecreased ? (
                <FaCaretDown />
              ) : null}
              {postDetails.change.pct.toLocaleString("bn-BD")}%
            </div>
          </div>
        </div>
      </section>

      {/* Price Summary */}
      <section className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-5 lg:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <FaChartLine className="text-lg text-primary" />
          </div>

          <div>
            <h2 className="text-base font-bold text-base-content sm:text-lg">
              দামের সারসংক্ষেপ
            </h2>

            <p className="mt-0.5 text-[11px] text-base-content/50 sm:text-xs">
              বাজারের সর্বনিম্ন, সর্বোচ্চ এবং গড় মূল্য
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {/* Lowest Price */}
          <div className="rounded-xl border border-success/20 bg-success/5 p-4 transition-colors hover:bg-success/10 sm:p-5">
            <p className="text-xs font-medium text-base-content/60">
              সর্বনিম্ন দাম
            </p>

            <p className="mt-2 text-2xl font-extrabold tracking-tight text-success sm:text-3xl">
              {minRetailPrice.toLocaleString("bn-BD")}
              <span className="ml-1 text-xs font-medium">টাকা</span>
            </p>

            <p className="mt-2 text-[11px] text-base-content/50">
              সবচেয়ে কম দামের বাজার
            </p>
          </div>

          {/* Highest Price */}
          <div className="rounded-xl border border-error/20 bg-error/5 p-4 transition-colors hover:bg-error/10 sm:p-5">
            <p className="text-xs font-medium text-base-content/60">
              সর্বাধিক দাম
            </p>

            <p className="mt-2 text-2xl font-extrabold tracking-tight text-error sm:text-3xl">
              {maxRetailPrice.toLocaleString("bn-BD")}
              <span className="ml-1 text-xs font-medium">টাকা</span>
            </p>

            <p className="mt-2 text-[11px] text-base-content/50">
              সবচেয়ে বেশি দামের বাজার
            </p>
          </div>

          {/* Average Price */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 transition-colors hover:bg-primary/10 sm:p-5">
            <p className="text-xs font-medium text-base-content/60">গড় দাম</p>

            <p className="mt-2 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
              {Math.round(averageRetailPrice).toLocaleString("bn-BD")}
              <span className="ml-1 text-xs font-medium">টাকা</span>
            </p>

            <p className="mt-2 text-[11px] text-base-content/50">
              প্রতি {unitToBangla(postDetails.unit)}-এর হিসাবে
            </p>
          </div>
        </div>
      </section>

      {/* Market Price Details */}
      <section className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-5 lg:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <FaMapMarkerAlt className="text-lg text-primary" />
          </div>

          <div>
            <h2 className="text-base font-bold text-base-content sm:text-lg">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <p className="mt-0.5 text-[11px] text-base-content/50 sm:text-xs">
              বিভিন্ন বাজারের সর্বনিম্ন ও সর্বাধিক মূল্য
            </p>
          </div>
        </div>

        {marketRows.length > 0 ? (
          <>
            {/* Mobile: Market Cards */}
            <div className="space-y-3 sm:hidden">
              {marketRows.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-base-300 bg-base-100 p-4 transition-colors hover:bg-base-200/40"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-base-content">
                        {item.market}
                      </h3>

                      <p className="mt-1 text-[11px] text-base-content/50">
                        {item.division}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
                      #{(index + 1).toLocaleString("bn-BD")}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 divide-x divide-base-300 text-center">
                    <div className="px-1">
                      <p className="text-[10px] text-base-content/50">
                        সর্বনিম্ন
                      </p>

                      <p className="mt-1 text-xs font-bold text-success">
                        {item.min.toLocaleString("bn-BD")}
                      </p>

                      <p className="text-[10px] text-base-content/50">টাকা</p>
                    </div>

                    <div className="px-1">
                      <p className="text-[10px] text-base-content/50">
                        সর্বাধিক
                      </p>

                      <p className="mt-1 text-xs font-bold text-error">
                        {item.max.toLocaleString("bn-BD")}
                      </p>

                      <p className="text-[10px] text-base-content/50">টাকা</p>
                    </div>

                    <div className="px-1">
                      <p className="text-[10px] text-base-content/50">গড়</p>

                      <p className="mt-1 text-xs font-bold text-primary">
                        {item.average.toLocaleString("bn-BD")}
                      </p>

                      <p className="text-[10px] text-base-content/50">টাকা</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Market Table */}
            <div className="hidden overflow-x-auto rounded-xl border border-base-300 sm:block">
              <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                <thead className="bg-base-200/70">
                  <tr className="border-b border-base-300 text-base-content/70">
                    <th className="px-5 py-4 font-semibold">বাজার</th>
                    <th className="px-5 py-4 font-semibold">বিভাগ</th>
                    <th className="px-5 py-4 text-right font-semibold">
                      সর্বনিম্ন
                    </th>
                    <th className="px-5 py-4 text-right font-semibold">
                      সর্বাধিক
                    </th>
                    <th className="px-5 py-4 text-right font-semibold">
                      গড় দাম
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {marketRows.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-base-200 last:border-b-0 transition-colors hover:bg-base-200/40"
                    >
                      <td className="px-5 py-4 font-semibold text-base-content">
                        {item.market}
                      </td>

                      <td className="px-5 py-4 text-base-content/60">
                        {item.division}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-right font-medium text-success">
                        {item.min.toLocaleString("bn-BD")} টাকা
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-right font-medium text-error">
                        {item.max.toLocaleString("bn-BD")} টাকা
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-right font-bold text-primary">
                        {item.average.toLocaleString("bn-BD")} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          /* Empty Market State */
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-base-300 bg-base-200/30 px-4 py-12 text-center">
            <FaMapMarkerAlt className="mb-3 text-3xl text-base-content/30" />

            <h3 className="text-sm font-bold text-base-content">
              কোনো বাজারের তথ্য পাওয়া যায়নি
            </h3>

            <p className="mt-1 text-xs text-base-content/50">
              এই পণ্যের বাজারভিত্তিক মূল্য এখনো পাওয়া যায়নি।
            </p>
          </div>
        )}
      </section>

      {/* Back to Home */}
      <div className="flex justify-center pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-base-300 px-5 py-2.5 text-xs font-semibold text-base-content transition-all duration-200 hover:border-primary hover:bg-primary/5 hover:text-primary sm:text-sm"
        >
          <FaArrowLeft />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
};

export default ProductDetails;
