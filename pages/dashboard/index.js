//Template
import Menu from "@/Components/Layout/Menu";

const Dashboard = ({ dataUser }) => {
  return (
    <Menu dataUser={dataUser.email ? true : false}>
      <h2>Wellcome to Dashboard - {dataUser.name}</h2>
    </Menu>
  );
};

export default Dashboard;

export async function getServerSideProps({ req }) {
  // Authrization
  const { Access_Token, Refresh_Token } = req.cookies;

  if (!Access_Token && !Refresh_Token) {
    return {
      props: { dataUser: null },
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

    if (dataUser.email) return { props: { dataUser } };

    if (dataUser.statusCode === 401) {
      return {
        props: {
          dataUser: null,
        },
        redirect: { destination: "/signin" },
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
        return {
          props: {
            dataUser: userVerify,
          },
        };
      }

      if (userVerify.statusCode === 401) {
        return {
          props: {
            dataUser: null,
          },
          redirect: { destination: "/signin" },
        };
      }
    }

    if (userVerifyRefresh.statusCode === 404) {
      return {
        props: {
          dataUser: null,
        },
        redirect: { destination: "/signin" },
      };
    }
  }
}
