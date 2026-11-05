import Image from "next/image";
import Link from "next/link";
import AuthLink from "./AuthLink";
import CategoriesNav from "./CategoriesNav";
import ScrollingBar from "./ScrollingBar";

export const todayDate = new Date().toLocaleDateString("bn-BD", {
  dateStyle: "full",
});

const Navbar = async () => {
  return (
    <section className="sticky top-0 z-50 w-full border-b border-base-200 bg-white">
      <header className="container mx-auto max-w-6xl px-3 sm:px-5">
        {/* Row 1: Logo, Date and Authentication */}
        <div className="flex min-h-14 items-center justify-between gap-3 py-1.5 sm:min-h-16">
          {/* Logo and Date */}
          <div className="flex flex-col items-start gap-0.5">
            <Link
              href="/"
              className="flex items-center transition-opacity duration-200 hover:opacity-80"
            >
              <Image
                src="/assets/logo.png"
                alt="logo"
                width={120}
                height={120}
                priority
                className="h-auto w-24 sm:w-32"
              />
            </Link>

            {/* Today's Date */}
            <p className="text-[9px] font-medium leading-tight text-base-content/60 sm:text-[10px]">
              {todayDate}
            </p>
          </div>

          {/* Authentication */}
          <div className="flex shrink-0 items-center">
            <AuthLink />
          </div>
        </div>

        {/* Row 2: Category Navigation */}
        <div className="border-t border-base-200">
          <CategoriesNav />
        </div>
      </header>

      {/* Row 3: Scrolling Price Bar */}
      <div className="w-full overflow-hidden border-t border-base-200 bg-[#FAFCFA]">
        <div className="container mx-auto max-w-6xl">
          <ScrollingBar />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
