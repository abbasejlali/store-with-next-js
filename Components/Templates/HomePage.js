// Modules
import Cards from "../Modules/Cards";

const HomePage = ({ data }) => {
  // Filters
  const PopularProducts = data.filter((product) => product.rating.rate >= 4);
  const CheapestProducts = data.filter((product) => product.price <= 50);

  return (
    <>
      <Cards title="The Most Popular Products" data={PopularProducts} />
      <Cards title="The cheapest products" data={CheapestProducts} />
    </>
  );
};

export default HomePage;
