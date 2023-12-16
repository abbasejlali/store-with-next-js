import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Template
import Menu from "@/Components/Layout/Menu";

const SignUp = ({ dataUser }) => {
  const router = useRouter();
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleChange = async (e) => {
    if (e.target.name === "avatar") {
      // console.log(e.target.files[0]);

      let formdata = new FormData();
      formdata.append("image", e.target.files[0]);

      const apiKey = "16e88f64289940f8ee24ae780b4ab6ac";

      const UploadImg = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formdata,
        }
      )
        .then((res) => res.json())
        .then((data) => data);
      console.log(UploadImg);

      if (UploadImg.status === 200) {
        setValue({
          ...value,
          avatar: UploadImg.data.url,
        });
      }
    }

    if (!(e.target.name === "avatar"))
      setValue({
        ...value,
        [e.target.name]: e.target.value,
      });
  };

  useEffect(() => {
    console.log(value);
  }, [value]);

  const handleClick = async () => {
    if (value.name && value.email && value.password && value.avatar) {
      const data = await fetch("https://api.escuelajs.co/api/v1/users/", {
        method: "POST",
        body: JSON.stringify({
          name: value.name,
          email: value.email,
          password: value.password,
          avatar: value.avatar,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => data);

      if (data.email) {
        router.push("/signin");
      }
    }
    if (!value.avatar) {
      alert("Please wait until the photo is uploaded");
    }
  };

  if (!dataUser)
    return (
      <Menu dataUser={false}>
        <div
          className="max-w-[400px] relative top-[0] left-[50%] 
      -translate-x-[50%] w-full min-h-[200px] h-full bg-white 
      rounded-lg p-4 flex flex-col justify-center items-center box-content
      "
        >
          <input
            type="text"
            value={value.name}
            name="name"
            onChange={handleChange}
            placeholder="Name"
            className="w-[95%] h-[45px] mb-4 outline-none pl-2 shadow-sm
         border border-solid border-[#eee] rounded-md box-content text-[#212529]"
          />
          <input
            type="email"
            value={value.email}
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="w-[95%] h-[45px] mb-4 outline-none pl-2 shadow-sm
         border border-solid  border-[#eee] box-content rounded-md text-[#212529]"
          />
          <input
            type="password"
            value={value.password}
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="w-[95%] h-[45px] mb-4 outline-none pl-2 shadow-sm
         border border-solid border-[#eee] box-content rounded-md text-[#212529]"
          />
          <input
            type="file"
            // value={value.avatar}
            name="avatar"
            onChange={handleChange}
            placeholder="Image"
            className="w-[95%] h-[45px] mb-4 outline-none pl-2 shadow-sm
         border border-solid border-[#eee] box-content rounded-md text-[#212529]"
          />

          <button
            className="bg-[#eee] px-4 py-3 self-start text-[#212529] rounded-lg shoadow-md "
            onClick={handleClick}
          >
            Sign Up
          </button>
        </div>
      </Menu>
    );
};

export default SignUp;

export async function getServerSideProps({ req }) {
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
