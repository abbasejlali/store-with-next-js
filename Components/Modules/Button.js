const Button = ({ title }) => {
  return (
    <button
      className="hover:bg-white hover:text-[#212529] w-[90%] py-3 px-5 
          bg-[#212529] text-white mt-auto transition-all duration-300 ease-in-out
           border border-solid border-[#212529] mx-auto rounded-md text-[18px] "
    >
      {title}
    </button>
  );
};

export default Button;
