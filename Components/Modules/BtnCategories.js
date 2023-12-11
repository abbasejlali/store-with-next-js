import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BtnCategories = ({ title }) => {
  const router = useRouter();
  const [value, setValue] = useState({
    popular: false,
    cheapest: false,
  });

  const changeHandeler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.checked });
  };

  useEffect(() => {
    if (value.popular) {
      router.push({ pathname: "/products/", query: { popular: true } });
    }
    if (value.cheapest) {
      router.push({ pathname: "/products/", query: { cheapest: true } });
    }

    if (!value.popular && !value.cheapest) {
      router.push({ pathname: "/products/", query: {} });
    }
  }, [value]);



  return (
    <div className="w-full mb-3 h-fit flex flex-row justify-start items-center">
      <div className=" relative mt-[3px] w-fit  h-fit ">
        <input
          type="checkbox"
          className="appearance-none cursor-pointer bg-red 
               w-[16px] h-[16px] relative border border-solid border-[#212529]
                rounded-sm shadow-lg z-50 "
          name={title}
          onChange={changeHandeler}
          id={title}
          value={`${() =>
            title === "popular"
              ? value.popular
              : title === "cheapest" && value.cheapest}`}
        />

        {value.popular || value.cheapest ? (
          <span
            className={`transition-all ease-in-out duration-300 absolute z-0 cursor-pointer top-[4px] left-[2px] bg-[#ffde36] w-[12px] h-[12px] rounded-sm `}
          ></span>
        ) : null}
      </div>
      <label htmlFor={title} className="ml-2 ">
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </label>
    </div>
  );
};

export default BtnCategories;
