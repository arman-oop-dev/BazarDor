export const CategoryProductAPI = async (slug: string) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(slug)}`,
  );

  return res.json();
};
