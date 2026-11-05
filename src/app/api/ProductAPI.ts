import { Products } from "../../lib/Types/ProductType";

export const ProductAPI = async (): Promise<Products[]> => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const data = await res.json();
  return data;
};
