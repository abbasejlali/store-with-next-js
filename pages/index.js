import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// Templates
import HomePage from "@/Components/Templates/HomePage";

export default function Home({ data }) {
  return <HomePage data={data} />;
}

export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  if (data.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
    revalidate: 10, //10s
  };
}
