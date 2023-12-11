// Template
import ProductsPage from "@/Components/Templates/ProductsPage";

const Products = ({ data }) => {
  return (
    <div>
      <ProductsPage data={data} />
    </div>
  );
};

export default Products;

export async function getServerSideProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  if (data.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
}
