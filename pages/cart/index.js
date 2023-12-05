const index = () => {
  return (
    <div
      className="max-w-[95%] w-full h-full mx-auto my-[30px] flex flex-row 
      justify-between items-start  "
    >
      <div
        className="max-w-[65%] w-full flex flex-col justify-start 
          items-start  py-6 px-4 rounded-2xl shadow-lg bg-white"
      >
        proucts
      </div>
      <div
        className="max-w-[30%] w-full flex flex-col justify-start 
          items-start  py-6 px-4 rounded-2xl shadow-lg bg-white"
      >
        maths
      </div>
    </div>
  );
};

export default index;
