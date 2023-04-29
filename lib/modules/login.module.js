const { useAuth } = require("@components/AuthContext");
const { useRouter } = require("next/router");
const { useState } = require("react");


import React from 'react'

export const loginModule = () => {
    //USE TO PUSH BACK TO HOMEPAGE AFTER LOGGING IN
const [loginIn, setLoginIn] = useState(true);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);

const { login, signUp } = useAuth();

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
        handleRedirect();
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
    {submitHandler, setEmail, setPassword, error, loginIn, email, password, setLoginIn}
  )
}







