import { Category } from "../../lib/Types/CategoryTypeNav";

export const CategoryAPI = async (): Promise<Category[]> => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );
  const data = await res.json();
  return data;
};
