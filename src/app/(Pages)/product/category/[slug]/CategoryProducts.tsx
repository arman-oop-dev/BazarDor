"use client";

import { Products } from "@/lib/Types/ProductType";
import { unitToBangla } from "@/lib/Types/UnitType";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

type SortKey = "default" | "priceAsc" | "priceDesc";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "default", label: "ডিফল্ট" },
  { key: "priceAsc", label: "দাম: কম থেকে বেশি" },
  { key: "priceDesc", label: "দাম: বেশি থেকে কম" },
];

export default function CategoryProducts({
  products,
}: {
  products: Products[];
}) {
  const [sort, setSort] = useState<SortKey>("default");

  const sorted = useMemo(() => {
    if (sort === "priceAsc")
      return [...products].sort((a, b) => a.today - b.today);

    if (sort === "priceDesc")
      return [...products].sort((a, b) => b.today - a.today);

    return products;
  }, [products, sort]);

  return (
    <>
      {/* Sort */}
      <section className="mt-2.5 flex flex-col gap-2 rounded-xl border border-base-300 bg-base-100 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <p id="sort-label" className="text-sm font-semibold text-base-content">
          পণ্যের তালিকা
          <span className="ml-2 text-xs font-normal text-base-content/60">
            ({products.length.toLocaleString("bn-BD")} টি পণ্য)
          </span>
        </p>

        <div
          role="radiogroup"
          aria-labelledby="sort-label"
          className="-mx-1 flex gap-2 overflow-x-auto px-1 [scrollbar-width:none]"
        >
          {SORTS.map((s) => {
            const active = sort === s.key;

            return (
              <button
                key={s.key}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setSort(s.key)}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  active
                    ? "border-primary bg-primary text-primary-content"
                    : "border-base-content/20 text-base-content hover:bg-base-200"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Products */}
      <section className="mt-2.5 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 md:grid-cols-3">
        {sorted.map((item) => {
          const percentage =
            item.yesterday > 0
              ? Math.abs(((item.today - item.yesterday) / item.yesterday) * 100)
              : 0;

          const isIncreased = item.today > item.yesterday;
          const isDecreased = item.today < item.yesterday;

          return (
            <Link
              href={`/product/${item.id}`}
              key={item.id}
              className="group flex min-w-0 flex-col justify-between gap-4 rounded-xl border border-base-300 bg-base-100 p-3 transition-all duration-300 hover:border-primary/50 hover:shadow-sm sm:p-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-base-200 text-xl sm:size-12 sm:text-2xl">
                  {item.image}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-bold text-base-content transition-colors group-hover:text-primary sm:text-base">
                    {item.nameBn}
                  </h3>

                  <p className="mt-1 text-xs text-base-content/60">
                    প্রতি {unitToBangla(item.unit)}
                  </p>
                </div>
              </div>

              <div className="flex items-end justify-between gap-2 border-t border-base-300 pt-3">
                <div className="min-w-0">
                  <p className="text-xs text-base-content/60">আজকের দাম</p>

                  <p className="mt-1 truncate text-sm font-bold text-base-content sm:text-base">
                    {item.today.toLocaleString("bn-BD")} টাকা
                  </p>
                </div>

                {isIncreased || isDecreased ? (
                  <p
                    className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold sm:text-xs ${
                      isIncreased
                        ? "bg-error/10 text-error"
                        : "bg-success/10 text-success"
                    }`}
                  >
                    {isIncreased ? <FaCaretUp /> : <FaCaretDown />}
                    {percentage.toLocaleString("bn-BD", {
                      maximumFractionDigits: 2,
                    })}
                    %
                  </p>
                ) : (
                  <p className="shrink-0 rounded-full bg-base-200 px-2 py-1 text-[10px] font-semibold text-base-content/60 sm:text-xs">
                    অপরিবর্তিত
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
}
