import { CategoryProductAPI } from "@/app/api/CategoryProduct";
import LoadingSpinner from "@/app/component/Loading";
import { Products } from "@/lib/Types/ProductType";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CategoryProducts from "./CategoryProducts";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;
  const pageDetails: Products[] = await CategoryProductAPI(slug);

  if (!pageDetails || pageDetails.length === 0) notFound();

  const { categoryIcon, categoryNameBn } = pageDetails[0];
  const totalPost = pageDetails.length.toLocaleString("bn-BD");

  return (
    <main className="container mx-auto">
      <Suspense fallback={<LoadingSpinner />}>
        <section className="mt-2.5 flex flex-col justify-between gap-4 rounded-xl border border-divider bg-base-100 p-3 sm:flex-row sm:items-center sm:gap-5 sm:p-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-default-100 text-2xl sm:size-16 sm:text-3xl">
            <span>{categoryIcon}</span>
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <h1 className="text-2xl font-bold text-base-content">
              {categoryNameBn}
            </h1>
            <p className="text-sm text-base-content/70">{`${totalPost}টি পণ্যের আজকের দাম ও পরিবর্তন`}</p>
          </div>
        </section>

        <CategoryProducts products={pageDetails} />
      </Suspense>
    </main>
  );
};

export default Page;
