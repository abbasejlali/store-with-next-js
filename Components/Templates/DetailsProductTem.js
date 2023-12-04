import Link from "next/link";

// Modules
import Button from "../Modules/Button";

const DetailsProductTem = ({ data }) => {
  const {
    image,
    title,
    category,
    description,
    id,
    rating: { rate, count },
  } = data;

  return (
    <div
      className="w-full h-full flex flex-row justify-between
          items-start mt-[20px]  py-6 px-4 rounded-2xl shadow-lg bg-white
          "
    >
      <div className="w-full min-h-[400px] h-full flex flex-col justify-start items-start">
        <div className="flex flex-row justify-start items-start">
          <Link href="/" className="mr-1 text-[#c7c7c7]">
            Home Page
          </Link>{" "}
          /{" "}
          <Link href="/products" className="mx-1 text-[#c7c7c7]">
            Products
          </Link>{" "}
          / <h3 className="inline ml-1">{id}</h3>
        </div>
        <h3 className="inline">
          Categorys : <Link href="/">{category}</Link>
        </h3>{" "}
        <h2 className="mt-8 text-[24px] font-bold">{title}</h2>
        <p className=" text-justify w-[75%] mt-5 mb-3 text-[#6c757d] ">
          {description}
        </p>
        <h3 className="inline">Rating : {rate}</h3>
        <h3 className="inline">Amount : {count}</h3>
        <Button title="Add To Cart" />
      </div>
      <img
        src={image}
        className="object-filled  w-[400px] h-[400px]"
        alt={title}
      />
    </div>
  );
};

export default DetailsProductTem;
