import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const NavBar = () => {
  const [navBar, setNavBar] = useState(false);

  const { currentUser, logout } = useAuth();

  const handleScroll = () => {
    const state = window.scrollY;
    state > 90 ? setNavBar(true) : setNavBar(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={
        navBar
          ? "w-full top-0 left-0 py-2 px-10 flex justify-stretch items-center text-white border-b border-slate-500 z-[100] fixed bg-slate-800 duration-300 z-[100]"
          : "w-full top-0 left-0 py-2 px-10 flex justify-stretch items-center text-white border-b border-slate-500 z-[100] absolute duration-300 z-[100]"
      }
    >
      <h1 className="font-bold text-3xl md:hidden">JDB</h1>
      <h1 className="font-bold hidden md:inline-flex md:text-3xl">
        Juarez Development Blog
      </h1>
      <ul className="flex gap-4 md:gap-8 ml-auto">
        <Link
          href="/"
          className="relative overflow-hidden after:absolute after:border-b after:w-full after:h-full after:top-0 after:left-0 after:translate-x-[-110%] after:hover:translate-x-[0%] after:duration-300"
        >
          Home
        </Link>
        <Link
          href="/"
          className="relative overflow-hidden after:absolute after:border-b after:w-full after:h-full after:top-0 after:left-0 after:translate-x-[-110%] after:hover:translate-x-[0%] after:duration-300"
        >
          Posts
        </Link>
        <Link
          href="/"
          className="relative overflow-hidden after:absolute after:border-b after:w-full after:h-full after:top-0 after:left-0 after:translate-x-[-110%] after:hover:translate-x-[0%] after:duration-300"
        >
          About
        </Link>
        {!currentUser && (
          <Link
            href="/LoginForm"
            className="relative overflow-hidden after:absolute after:border-b after:w-full after:h-full after:top-0 after:left-0 after:translate-x-[-110%] after:hover:translate-x-[0%] after:duration-300"
          >
            Login
          </Link>
        )}
        {currentUser && <button onClick={() => logout()} className="relative overflow-hidden after:absolute after:border-b after:w-full after:h-full after:top-0 after:left-0 after:translate-x-[-110%] after:hover:translate-x-[0%] after:duration-300">Logout</button>}
      </ul>
    </nav>
  );
};

export default NavBar;
