import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BtnCategories = ({ title }) => {
  const router = useRouter();
  const [value, setValue] = useState({
    popular: false,
    cheapest: false,
  });

  const changeHandeler = (e) => {
    setValue({ ...value, [e.target.id]: e.target.checked });
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
          type="radio"
          className="appearance-none cursor-pointer bg-transparent 
               w-[16px] h-[16px] relative border border-solid border-[#212529]
                rounded-sm shadow-lg z-50 before:content-[''] before:w-[11px] before:h-[11px]
                 before:rounded-sm before:scale-0 before:transition-all before:ease-in-out before:duration-300
                 before:shodow-sm checked:before:scale-100 checked:before:bg-[#ffde36] before:absolute
                 flex flex-col justify-center items-center "
          name="btnCategories"
          onClick={changeHandeler}
          id={title}
          value={`${
            title === "popular"
              ? value.popular
              : title === "cheapest" && value.cheapest
          }`}
        />
      </div>
      <label htmlFor={title} className="ml-2 ">
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </label>
    </div>
  );
};

export default BtnCategories;
