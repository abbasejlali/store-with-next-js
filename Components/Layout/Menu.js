import Link from "next/link";

const Menu = ({ children }) => {
  return (
    <>
      <div className="w-[95%] h-[100px] my-6 mx-auto flex flex-row justify-between items-start ">
        <ul className="flex flex-row justify-start items-center ">
          <li className="mr-4">
            <Link href="/">Home</Link>
          </li>
          <li className="">
            <Link href="/products">Products</Link>
          </li>
        </ul>
        <Link href="/cart">Cart</Link>
      </div>
      {children}
    </>
  );
};

export default Menu;
