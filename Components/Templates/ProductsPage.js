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

  // sasasasas

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const totalPages2 = Math.ceil(dataCutomize.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  let DataItems = data.slice(startIndex, endIndex);
  let DataCutomizeItems = dataCutomize.slice(startIndex, endIndex) || null;

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
            <Card data={DataCutomizeItems} wrap={true} />
          ) : (
            <Card data={DataItems} wrap={true} />
          )
        ) : (
          <h2>Loading</h2>
        )}
      </div>

      <div className="fixed bottom-[30px] left-[40px] flex flex-row justify-center items-center w-fit h-fit ">
        {Array.from(
          { length: `${dataCutomize.length > 0 ? totalPages2 : totalPages}` },
          (_, i) => i + 1
        ).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`${
              pageNumber === currentPage ? "bg-[#ffde36] " : "bg-white"
            }  px-4 py-2 
            rounded-md shodow-sm mr-3
          `}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
