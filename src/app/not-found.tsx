import Link from "next/link";
import { FaArrowLeft, FaRegCompass } from "react-icons/fa";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <section className="w-full max-w-lg rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex size-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <FaRegCompass className="text-4xl" />
        </div>

        <h1 className="mt-6 text-7xl font-extrabold tracking-tight text-primary sm:text-8xl">
          404
        </h1>

        <h2 className="mt-4 text-xl font-bold text-base-content sm:text-2xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-base-content/60">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে অথবা এই ঠিকানায় কোনো
          পেজ নেই।
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-content transition-colors hover:opacity-90"
        >
          <FaArrowLeft />
          হোম পেজে ফিরে যান
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
