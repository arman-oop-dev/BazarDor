import { ProductAPI } from "@/app/api/ProductAPI";
import { unitToBangla } from "@/lib/Types/UnitType";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const ScrollingBar = async () => {
  const fetchData = await ProductAPI();

  const products = [...fetchData, ...fetchData];

  return (
    <section className="w-full overflow-hidden border-t border-base-200">
      <div className="flex w-max animate-scroll items-center whitespace-nowrap">
        {products.map((item, index) => {
          const percentage =
            item.yesterday === 0
              ? 0
              : ((item.today - item.yesterday) / item.yesterday) * 100;

          const isIncreased = percentage > 0;
          const isDecreased = percentage < 0;

          return (
            <div
              key={`${item.id}-${index}`}
              className="flex shrink-0 items-center gap-1.5 border-r border-base-200 px-3 py-2 text-[10px] sm:gap-2 sm:px-4 sm:text-xs"
            >
              <span className="text-[11px]">{item.categoryIcon}</span>

              <span className="font-medium text-base-content/80">
                {item.nameBn}
              </span>

              <span className="text-base-content/70">
                {item.today.toLocaleString("bn-BD")} {unitToBangla(item.unit)}
              </span>

              <span
                className={`
                  flex items-center gap-0.5 font-bold
                  ${
                    isIncreased
                      ? "text-error"
                      : isDecreased
                        ? "text-success"
                        : "text-base-content/50"
                  }
                `}
              >
                {isIncreased ? (
                  <FaCaretUp />
                ) : isDecreased ? (
                  <FaCaretDown />
                ) : null}
                {Math.abs(percentage).toLocaleString("bn-BD", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                %
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ScrollingBar;
