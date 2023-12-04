import Card from "./Card";

const Cards = ({ data, title }) => {
  return (
    <div className="w-[95%] mx-auto my-[30px] flex flex-col justify-start items-start ">
      <h2 className="text-[35px] font-bold">{title}</h2>
      <div
        className="w-full flex flex-row justify-between flex-nowrap 
          items-start mt-[20px]  py-6 px-4 rounded-2xl shadow-lg bg-white
          overflow-x-auto
          "
        id="scrollbar"
      >
        {data.length > 0 ? <Card data={data} /> : <h3>Loading....</h3>}
      </div>
    </div>
  );
};

export default Cards;
