const BtnAddToCart = ({ title }) => {
  // const AddToCart = () => {
  //   const today = new Date();
  //   const dd = today.getDate();
  //   const mm = today.getMonth();
  //   const yyyy = today.getFullYear();

  //   fetch("https://fakestoreapi.com/carts", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       userId: 1,
  //       data: `${yyyy}-${mm}-${"0" + dd}`,
  //       products: [{ productId, quantity: 1 }],
  //     }),
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // };

  return (
    <button
      className="hover:bg-white hover:text-[#212529] w-[90%] py-3 px-5 
          bg-[#212529] text-white mt-auto transition-all duration-300 ease-in-out
           border border-solid border-[#212529] mx-auto rounded-md text-[18px] "
      onClick={AddToCart}
    >
      {title}
    </button>
  );
};

export default BtnAddToCart;
