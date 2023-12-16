// Templates
import DetailsProductTem from "@/Components/Templates/DetailsProductTem";
import Menu from "@/Components/Layout/Menu";

const DetailsProduct = ({ ProductData, dataUser }) => {
  return (
    <Menu dataUser={dataUser.email ? true : false}>
      <div
        className="max-w-[95%] w-full min-h-[100%] h-full
        mx-auto my-[30px] flex flex-col justify-start items-start"
      >
        <h2 className="text-[35px] font-bold ">Details Product</h2>
        <DetailsProductTem data={ProductData} dataUser={dataUser} />
      </div>
    </Menu>
  );
};

export default DetailsProduct;

export async function getServerSideProps(context) {
  // fetch product
  const { params } = context;

  const res = await fetch(
    `https://fakestoreapi.com/products/${params.productsId}`
  );
  const ProductData = await res.json();

  if (!ProductData.title) {
    return {
      noyFound: true,
    };
  }

  let returnData = {
    ProductData: {},
    dataUser: {},
  };

  if (ProductData.title) {
    returnData.ProductData = ProductData;
  }

  // Authrization
  const { Access_Token, Refresh_Token } = context.req.cookies;

  if (returnData.ProductData.title) {
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

  return {
    // props: { ProductData: data },
    props: {},
  };
}
