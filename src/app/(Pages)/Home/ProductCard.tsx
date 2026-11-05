import { ProductAPI } from "@/app/api/ProductAPI";
import { unitToBangla } from "@/lib/Types/UnitType";
import Link from "next/link";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

interface ProductCardProps {
  type?: "all" | "increase" | "decrease";
}

const ProductCard = async ({ type = "all" }: ProductCardProps) => {
  const fetchAPI = await ProductAPI();

  // Filter Products
  const filteredProducts = fetchAPI.filter((item) => {
    if (type === "increase") {
      return item.today > item.yesterday;
    }

    if (type === "decrease") {
      return item.today < item.yesterday;
    }

    return true;
  });

  // Display Products
  const displayProducts =
    type === "all" ? filteredProducts : filteredProducts.slice(0, 6);

  return (
    <section className="w-full">
      {/* Product Count */}
      {type === "all" && (
        <div className="mb-4 flex items-center justify-between gap-2">
          <p className="text-xs text-base-content/60 sm:text-sm">
            মোট{" "}
            <span className="font-bold text-base-content">
              {displayProducts.length.toLocaleString("bn-BD")}
            </span>
            টি পণ্য দেখানো হচ্ছে
          </p>
        </div>
      )}

      {/* Product Grid */}
      {displayProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
          {displayProducts.map((item) => {
            // Calculate Price Percentage
            const percentage =
              item.yesterday > 0
                ? Math.abs(
                    ((item.today - item.yesterday) / item.yesterday) * 100,
                  )
                : 0;

            const isIncreased = item.today > item.yesterday;
            const isDecreased = item.today < item.yesterday;

            return (
              <Link
                href={`/product/${item.id}`}
                key={item.id}
                className="
                  group flex min-w-0 flex-col
                  rounded-xl border border-base-300
                  bg-base-100 p-3
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-primary/40
                  hover:shadow-lg hover:shadow-base-content/5
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-primary
                  sm:p-4
                "
              >
                {/* Product Information */}
                <div className="flex min-w-0 items-center gap-3">
                  {/* Product Image */}
                  <div
                    className="
                    flex size-11 shrink-0 items-center
                    justify-center rounded-xl
                    bg-base-200 text-2xl
                    transition-transform duration-300
                    group-hover:scale-105
                    sm:size-12
                  "
                  >
                    {item.image}
                  </div>

                  {/* Product Name */}
                  <div className="min-w-0 flex-1">
                    <h3
                      className="
                      truncate text-sm font-bold
                      text-base-content
                      transition-colors duration-200
                      group-hover:text-primary
                      sm:text-base
                    "
                    >
                      {item.nameBn}
                    </h3>

                    <p className="mt-1 text-[11px] text-base-content/55 sm:text-xs">
                      প্রতি {unitToBangla(item.unit)}
                    </p>
                  </div>
                </div>

                {/* Price Information */}
                <div
                  className="
                  mt-4 flex items-end justify-between
                  gap-2 border-t border-base-200 pt-3
                "
                >
                  {/* Today's Price */}
                  <div className="min-w-0">
                    <p className="text-[11px] text-base-content/55 sm:text-xs">
                      আজকের দাম
                    </p>

                    <p
                      className="
                      mt-1 truncate text-base font-extrabold
                      tracking-tight text-base-content
                      sm:text-lg
                    "
                    >
                      {item.today.toLocaleString("bn-BD")}
                      <span className="ml-1 text-xs font-medium text-base-content/60">
                        টাকা
                      </span>
                    </p>
                  </div>

                  {/* Price Change */}
                  {isIncreased || isDecreased ? (
                    <div
                      className={`
                      flex shrink-0 items-center gap-0.5
                      rounded-full px-2.5 py-1
                      text-[10px] font-bold sm:text-xs
                      ${
                        isIncreased
                          ? "bg-error/10 text-error"
                          : "bg-success/10 text-success"
                      }
                    `}
                    >
                      {isIncreased ? (
                        <FaCaretUp className="text-sm" />
                      ) : (
                        <FaCaretDown className="text-sm" />
                      )}
                      {percentage.toLocaleString("bn-BD", {
                        maximumFractionDigits: 2,
                      })}
                      %
                    </div>
                  ) : (
                    <span
                      className="
                      shrink-0 rounded-full
                      bg-base-200 px-2.5 py-1
                      text-[10px] font-semibold
                      text-base-content/60 sm:text-xs
                    "
                    >
                      অপরিবর্তিত
                    </span>
                  )}
                </div>

                {/* Previous Price */}
                <div
                  className="
                  mt-2 flex items-center justify-between
                  text-[10px] text-base-content/50
                  sm:text-[11px]
                "
                >
                  <span>গতকালের দাম</span>

                  <span className="font-medium">
                    {item.yesterday.toLocaleString("bn-BD")} টাকা
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div
          className="
          flex flex-col items-center justify-center
          rounded-xl border border-dashed border-base-300
          bg-base-200/30 px-4 py-12 text-center
        "
        >
          <div
            className="
            mb-3 flex size-14 items-center
            justify-center rounded-full bg-base-200
            text-2xl
          "
          >
            🛒
          </div>

          <h3 className="text-sm font-bold text-base-content sm:text-base">
            কোনো পণ্য পাওয়া যায়নি
          </h3>

          <p className="mt-1 text-xs text-base-content/50">
            এই মুহূর্তে দেখানোর মতো কোনো পণ্য নেই।
          </p>
        </div>
      )}
    </section>
  );
};

export default ProductCard;
