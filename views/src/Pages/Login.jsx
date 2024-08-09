// import { useEffect } from "react";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { IoLogoGoogleplus } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
// import Cover from "../assets/booksBg.png";
const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    })
      .then(async (res) => {
        const response = await res.json();

        if (res.ok) {
          enqueueSnackbar(response.msg, { variant: "success" });
          sessionStorage.setItem("token", "asd324dsae23dsfsdf22");
          sessionStorage.setItem("name", "Admin");
          navigate("/dashboard");
        } else {
          enqueueSnackbar(`Error: ${response.msg}`, { variant: "error" });
        }
      })
      .catch((error) => {
        enqueueSnackbar(
          `Error: ${error.msg ? error.msg : "Oops Something went wrong"}`,
          { variant: "error" }
        );
      });
  };

  return (
    <div className=" flex items-center justify-center h-screen text-3xl bg-black">
      <div className="card md:card-side bg-stone-800 shadow-xl p-5 m-5 ring-1 ring-orange-500">
        <figure>
          {/* <img
            className="rounded-2xl"
            // eslint-disable-next-line no-undef
            src={Cover}
            alt="Album"
          /> */}
        </figure>
        <div className="card-body">
          <h2 className="card-title text-orange-500 text-3xl justify-center mb-5">
            Digi Doc
          </h2>
          <div className="flex flex-col w-full border-opacity-50">
            <div className="grid h-15 card rounded-box place-items-center">
              <label className=" flex items-center gap-1 disabled">
                <span
                  className="lg:tooltip "
                  data-tip="Working on it... Will be available soon"
                >
                  <button
                    type="button"
                    className=" py-2 px-4 flex justify-center items-center 
                  hover:text-white bg-red-500 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md  rounded-lg btn-disabled"
                  >
                    <IoLogoGoogleplus className="h-10 w-5 mx-2" />
                    Sign in with Google
                  </button>
                </span>
              </label>
            </div>
            <div className="divider text-sm">OR</div>
            <div className="grid h-20 card rounded-box place-items-center">
              <label className="input input-bordered flex items-center gap-2">
                <FaUser className="h-3 w-3" />
                <input
                  type="text"
                  className="grow"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Username"
                />
              </label>
            </div>
          </div>

          <label className="input input-bordered flex items-center gap-2">
            <FaKey className="h-3 w-3" />
            <input
              type="password"
              className="grow"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </label>
          <div className="card-actions justify-end">
            <button
              className="btn bg-orange-500 hover:bg-orange-600 text-white w-full mt-5"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
