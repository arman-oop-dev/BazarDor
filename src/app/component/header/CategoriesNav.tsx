import { CategoryAPI } from "@/app/api/CategoriesNameAPI";
import CategoriesNavLinks from "./CategoriesNavLinks";

const CategoriesNav = async () => {
  const fetchData = await CategoryAPI();

  return <CategoriesNavLinks categories={fetchData} />;
};

export default CategoriesNav;
