import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// Templates
import HomePage from "@/Components/Templates/HomePage";
import Menu from "@/Components/Layout/Menu";

export default function Home({ ProductsData, dataUser }) {
  return (
    <>
      <Menu dataUser={dataUser.email ? true : false}>
        <HomePage data={ProductsData} />
      </Menu>
    </>
  );
}

export async function getServerSideProps({ req }) {
  // Fetch Data prodoucts
  const res = await fetch("https://fakestoreapi.com/products");
  const ProductsData = await res.json();

  if (ProductsData.length === 0) {
    return {
      notFound: true,
    };
  }

  let returnData = {
    ProductsData: [],
    dataUser: {},
  };

  if (ProductsData.length > 0) {
    returnData.ProductsData = ProductsData;
  }

  // Authrization
  const { Access_Token, Refresh_Token } = req.cookies;

  if (returnData.ProductsData.length > 0) {
    if (!Access_Token && !Refresh_Token) {
      return {
        props: returnData,
      };
    }

    if (Access_Token) {
      const dataUser = await fetch(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${Access_Token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => data);

      if (dataUser.email) {
        returnData.dataUser = dataUser;
        return { props: returnData };
      }

      if (dataUser.statusCode === 401) {
        return {
          props: returnData,
        };
      }
    }

    if (!Access_Token && Refresh_Token) {
      const userVerifyRefresh = await fetch(
        "https://api.escuelajs.co/api/v1/auth/refresh-token",
        {
          headers: {
            refreshToken: `${Refresh_Token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => data);

      if (userVerifyRefresh.access_token) {
        const expires = new Date(
          Date.now() + 10 * 24 * 60 * 60 * 1000
        ).toUTCString();

        document.cookie = `Access_Token=${userVerifyRefresh.access_token}; path=/; expires=${expires};`;
        document.cookie = `Refresh_Token=${userVerifyRefresh.access_token}; path=/; expires=${expires};`;

        const userVerify = await fetch(
          "https://api.escuelajs.co/api/v1/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${userVerifyRefresh.access_token}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => data);

        if (userVerify.email) {
          returnData.dataUser = userVerify;
          return {
            props: returnData,
          };
        }

        if (userVerify.statusCode === 401) {
          return {
            props: returnData,
          };
        }
      }

      if (userVerifyRefresh.statusCode === 404) {
        return {
          props: returnData,
        };
      }
    }
  }
}
