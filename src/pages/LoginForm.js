import { useAuth } from "@components/AuthContext";
import { useRouter } from "next/router";
import React, { useState } from "react";

const LoginForm = () => {
  const [loginIn, setLoginIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login, signUp, currentUser, logout } = useAuth();

  const router = useRouter();
  const handleRedirect = () => {
    router.push("/");
  };

  async function submitHandler() {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    if (loginIn) {
      try {
        await login(email, password);
        setError(null);
      } catch (err) {
        setError("User Email or Password incorrect");
      } finally {
        if (error === null) {
          setEmail("");
          setPassword("");
        }
      }
      return;
    }

    try {
      await signUp(email, password);
      setError(null);
    } catch (error) {
      console.log(error);
    } finally {
      if (error === null) {
        setEmail("");
        setPassword("");
      }
    }
  }

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
        {currentUser && handleRedirect()}
      </div>
    </>
  );
};

export default LoginForm;
