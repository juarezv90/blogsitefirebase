import { useAuth } from "@components/AuthContext";
import { loginModule } from "@modules/login.module";
import React from "react";

const LoginForm = () => {
  const {
    error,
    loginIn,
    setEmail,
    setPassword,
    submitHandler,
    email,
    password
  } = loginModule();

  const {currentUser } = useAuth();

  return (
    <>
      <div className="w-full md:w-[65ch] md:h-[40vh] md:flex-grow-0 mx-auto flex flex-col flex-1 justify-center items-start gap-2 md:my-10 border p-10 md:rounded-lg border-slate-500 bg-slate-700 text-white">
        {!currentUser && (
          <>
            <h1 className="font-bold text-2xl md:text-4xl">
              {loginIn ? "Login" : "Register"}
            </h1>
            <p>{error}</p>
            <input
              type="email"
              value={email}
              placeholder="Email"
              className=" md:w-[40ch] border outline-none rounded text-xl px-2 py-1 bg-inherit"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              className="md:w-[40ch] border outline-none rounded text-xl px-2 py-1 bg-inherit"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="w-full flex gap-2 mt-4">
              {/* <button
                className="border px-4 rounded py-1 text-lg hover:bg-slate-500 hover:text-white duration-300"
                onClick={() => setLoginIn(!loginIn)}
              >
                {loginIn ? "Register" : "Login"}
              </button> */}
              <button
                className="border px-4 rounded py-1 text-lg hover:bg-slate-500 hover:text-white duration-300"
                onClick={submitHandler}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LoginForm;
