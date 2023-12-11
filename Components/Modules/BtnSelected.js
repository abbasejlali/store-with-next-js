import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BtnSelected = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const changeHandeler = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (value) {
      router.push({ pathname: "/products/", query: { category: value } });
    }
    if (!value) {
      router.push({ pathname: "/products/", query: {} });
    }
  }, [value]);

  useEffect(() => {
    if (router.query.category) {
      const { category } = router.query;
      setValue(category);
    }
  }, [router.query]);

  return (
    <>
      <label
        htmlFor="countries"
        className="block ml-1 mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select an Categorys
      </label>
      <select
        id="countries"
        className="bg-white shadow-lg  outline-none border border-solid  border-[#eee] text-[#212529] text-sm rounded-lg focus:border-2 focus:ring-[#ffde36] focus:border-[#ffde36] block w-full p-2.5 "
        value={value}
        onChange={changeHandeler}
      >
        <option value="">Choose a Category</option>
        <option value="men">men's clothing</option>
        <option value="jewelery">Jewelery</option>
        <option value="electronics">Electronics</option>
        <option value="women">Women's clothing</option>
      </select>
    </>
  );
};

export default BtnSelected;
