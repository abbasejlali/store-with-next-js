import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Modules
import Card from "../Modules/Card";
import BtnCategories from "../Modules/BtnCategories";
import BtnSelected from "../Modules/BtnSelected";

const ProductsPage = ({ data }) => {
  const [dataCutomize, setDataCustomize] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (router.query.cheapest) {
      const CheapestProducts = data.filter((product) => product.price <= 50);
      setDataCustomize(CheapestProducts);
    }
    if (router.query.popular) {
      const PopularProducts = data.filter(
        (product) => product.rating.rate >= 4
      );
      setDataCustomize(PopularProducts);
    }
    if (router.query.category) {
      const CategoryProducts = data.filter(
        (product) => product.category.split("'")[0] === router.query.category
      );
      setDataCustomize(CategoryProducts);
    }
    if (
      !router.query.popular &&
      !router.query.cheapest &&
      !router.query.category
    ) {
      setDataCustomize(data);
    }
  }, [router.query]);

  return (
    <div className="w-[95%] flex-wrap sm:flex-nowrap	 mx-auto my-[30px] flex flex-row justify-between items-start ">
      <div
        className="sm:max-w-[25%] mx-w-full w-full min-h-full h-full flex flex-col justify-start flex-wrap
       items-start  py-6 px-4 rounded-2xl mb-5 sm:mb-0 shadow-lg bg-white"
      >
        <h2 className="mb-5 text-[18px] text-bold">Filter</h2>
        <BtnCategories title="popular" />
        <BtnCategories title="cheapest" />
        <BtnSelected />
      </div>

      <div
        className="sm:max-w-[70%]  mx-w-full w-full min-h-full h-full flex flex-row justify-between flex-wrap
        items-start  py-6 px-4 rounded-2xl shadow-lg bg-white"
      >
        {data.length > 0 ? (
          dataCutomize.length > 0 ? (
            <Card data={dataCutomize} wrap={true} />
          ) : (
            <Card data={data} wrap={true} />
          )
        ) : (
          <h2>Loading</h2>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
