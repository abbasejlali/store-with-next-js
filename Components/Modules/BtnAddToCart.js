const BtnAddToCart = ({ title, dataUser }) => {
  const handleAddToCart = () => {
    if (dataUser.email) {
      alert("Add to Cart");
    } else {
      alert("Please login first");
    }
  };
  return (
    <>
      <button
        className="hover:bg-white hover:text-[#212529]  py-3 px-5 
          bg-[#212529] text-white mt-auto transition-all duration-300 ease-in-out
           border  w-full border-solid text-center border-[#212529] mx-auto rounded-md text-[18px] "
        onClick={handleAddToCart}
      >
        {title}
      </button>
    </>
  );
};

export default BtnAddToCart;
