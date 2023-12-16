import { useRouter } from "next/router";
import { useState } from "react";

// Template
import Menu from "@/Components/Layout/Menu";

const SignIn = ({ dataUser }) => {
  const router = useRouter();

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    const data = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: value.email,
        password: value.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);

    if (data.message === "Unauthorized") {
      alert("Email or password is incorrect");
    }

    if (data.access_token) {
      const expires = new Date(
        Date.now() + 10 * 24 * 60 * 60 * 1000
      ).toUTCString();
      document.cookie = `Access_Token=${data.access_token}; path=/; expires=${expires};`;
      document.cookie = `Refresh_Token=${data.refresh_token}; path=/; expires=${expires};`;

      const dataUser = await fetch(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => data);

      if (dataUser.email) router.push("/dashboard");
    }
  };

  if (!dataUser)
    return (
      <Menu dataUser={false}>
        <div
          className="max-w-[400px] relative top-[0] left-[50%] 
      -translate-x-[50%] w-full min-h-[200px] h-full bg-white 
      rounded-lg p-4 flex flex-col justify-center items-center
      box-content	
    "
        >
          <input
            type="email"
            value={value.email}
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="w-[95%] h-[45px] mb-4 outline-none pl-2 shadow-sm
         border border-solid box-content  border-[#eee] rounded-md text-[#212529]"
          />
          <input
            type="password"
            value={value.password}
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="w-[95%] h-[45px] mb-4 outline-none pl-2 shadow-sm
         border border-solid box-content border-[#eee] rounded-md text-[#212529]"
          />

          <button
            className="bg-[#eee] px-4 py-3 self-start text-[#212529] rounded-lg shoadow-md "
            onClick={handleClick}
          >
            Sign In
          </button>
        </div>
      </Menu>
    );
};

export default SignIn;

export async function getServerSideProps(context) {
  const { Access_Token, Refresh_Token } = context.req.cookies;

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

    if (dataUser.email)
      return { props: { dataUser }, redirect: { destination: "/dashboard" } };

    if (dataUser.statusCode === 401) {
      return {
        props: {
          dataUser: null,
        },
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
          redirect: { destination: "/dashboard" },
        };
      }

      if (userVerify.statusCode === 401) {
        return {
          props: {
            dataUser: null,
          },
        };
      }
    }

    if (userVerifyRefresh.statusCode === 404) {
      return {
        props: {
          dataUser: null,
        },
      };
    }
  }
}
