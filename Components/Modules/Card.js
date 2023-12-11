import Link from "next/link";

const Card = ({ data, wrap }) => {
  return (
    <>
      {data.length > 0 &&
        data.map((product) => (
          <div
            className={`min-w-[200px]  max-w-[200px] w-[200px] h-[300px] no-scrollbar border border-solid
                 border-[#eee] flex flex-col justify-start items-center 
                 shadow-md rounded-lg mr-3 bg-white px-2 py-3 ${
                   wrap
                     ? "mb-6 mob:max-w-[200px] mob:w-[200px] mob:mr-3 mr-0 w-full max-w-full"
                     : null
                 } `}
            key={product.id}
          >
            <img
              src={`${product.image}`}
              alt={product.title}
              className="object-contain w-[150px] h-[150px]"
            />
            <Link
              href={`/products/${product.id}`}
              className=" mt-6 overflow-hidden text-ellipsis whitespace-nowrap w-full "
            >
              {product.title}
            </Link>
            <div className="w-full mt-auto flex flex-row justify-between items-center">
              <span className="font-bold">Price :</span>
              <span className="text-[#3d3d3d]">{product.price}</span>
            </div>
          </div>
        ))}
    </>
  );
};

export default Card;
