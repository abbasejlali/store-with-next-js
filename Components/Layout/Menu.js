import Link from "next/link";

const Menu = ({ children, dataUser }) => {
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
        <ul className="flex flex-row justify-start items-center ">
          {dataUser === true && (
            <li className="mr-4">
              <Link href="/dashboard">Dashboard</Link>
            </li>
          )}
          {dataUser === false && (
            <li className="mr-4">
              <Link href="/signin">Login</Link>
            </li>
          )}
          <li>
            <Link href="/cart">Cart</Link>
          </li>
        </ul>
      </div>
      {children}
    </>
  );
};

export default Menu;
