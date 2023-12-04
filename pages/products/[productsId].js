import Link from "next/link";
import { useRouter } from "next/router";

// Templates
import DetailsProductTem from "@/Components/Templates/DetailsProductTem";

const DetailsProduct = ({ DetalisData }) => {
  const router = useRouter();
  
  if (router.isFallback)
    return (
      <h2 className="fixed top-[50%] left-[50%] text-[30px] -translate-x-[50%] -translate-y-[50%] ">
        Loading...
      </h2>
    );

  return (
    <div
      className="max-w-[95%] w-full min-h-[100%] h-full
     mx-auto my-[30px] flex flex-col justify-start items-start   "
    >
      <h2 className="text-[50px] font-bold ">Details Product</h2>
      <DetailsProductTem data={DetalisData} />
    </div>
  );
};

export default DetailsProduct;

export async function getStaticPaths() {
  const prodoctsId = ["1", "2", "3"];
  const paths = prodoctsId.map((prodoct) => ({
    params: { productsId: prodoct },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  const res = await fetch(
    `https://fakestoreapi.com/products/${params.productsId}`
  );
  const data = await res.json();

  return {
    props: { DetalisData: data },
    revalidate: 10, //10s
  };
}
