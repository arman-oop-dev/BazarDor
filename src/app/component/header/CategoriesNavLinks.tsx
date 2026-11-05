"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
  id: number | string;
  slug: string;
  icon: string;
  nameBn: string;
}

const CategoriesNavLinks = ({ categories }: { categories: Category[] }) => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Categories"
      className="scrollbar-hide flex items-center justify-center gap-4 overflow-x-auto whitespace-nowrap px-3 py-2 sm:gap-6"
    >
      {categories.map((item) => {
        const href = `/product/category/${item.slug}`;
        const isActive = pathname === href;

        return (
          <Link
            key={item.id}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`
              relative flex shrink-0 items-center gap-1.5
              py-1 text-[11px] font-semibold
              transition-colors duration-200
              sm:text-xs
              ${
                isActive
                  ? "text-success"
                  : "text-base-content/75 hover:text-success"
              }
            `}
          >
            <span className="text-[11px]">{item.icon}</span>

            <span>{item.nameBn}</span>

            {isActive && (
              <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-success" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default CategoriesNavLinks;
