import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCloseCircle } from "react-icons/ai";

export const NavLinks = ({ currentUser, logout }) => {
  const linkStyle =
    "relative overflow-hidden before:absolute before:h-full before:border-t before:translate-x-[110%] before:hover:-translate-x-[0%] before:w-full before:duration-300 after:absolute after:border-b after:w-full after:h-full after:top-0 after:left-0 after:translate-x-[-110%] after:hover:translate-x-[0%] after:duration-300";

  return (
    <>
      <Link href="/" className={linkStyle}>
        Home
      </Link>
      <Link href="/PostsPage" className={linkStyle}>
        Posts
      </Link>
      <Link href="/About" className={linkStyle}>
        About
      </Link>
      {!currentUser && (
        <Link href="/LoginForm" className={linkStyle}>
          Login
        </Link>
      )}
      {currentUser && (
        <Link href={"/AddPost"} className={linkStyle}>
          Add Post
        </Link>
      )}

      {currentUser && (
        <button onClick={() => logout()} className={linkStyle}>
          Logout
        </button>
      )}
    </>
  );
};

const NavBar = () => {
  const [navBar, setNavBar] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);

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
          ? "w-full top-0 left-0 py-2 px-10 flex justify-stretch items-center text-white border-b border-slate-500 z-[100] fixed bg-slate-800 duration-300"
          : "w-full top-0 left-0 py-2 px-10 flex justify-stretch items-center text-white border-b border-slate-500 z-[100] absolute duration-300"
      }
    >
      <h1 className="font-bold text-xl md:inline-flex md:text-3xl">
        Juarez Development Blog
      </h1>
      <ul className="md:gap-8 ml-auto hidden md:flex">
        <NavLinks currentUser={currentUser} logout={logout} />
      </ul>

      <GiHamburgerMenu
        className="ml-auto text-2xl md:hidden cursor-pointer hover:text-slate-500 hover:scale-125 duration-300"
        onClick={() => setShowSideNav(true)}
      />
      <div
        className={
          "duration-300 w-full h-screen absolute top-0 left-0 bg-black bg-opacity-50 text-black md:hidden" +
          (!showSideNav && " translate-x-[-120%]")
        }
        onClick={() => setShowSideNav(false)}
      >
        <div className="w-[20ch] relative h-screen bg-white flex flex-col gap-2 px-2">
          <AiOutlineCloseCircle
            className="absolute top-2 right-2 z-[100] text-red-500 text-xl cursor-pointer"
            onClick={() => setShowSideNav(false)}
          />
          <h1 className="w-full text-3xl select-none text-center border-b border-black py-2">
            Menu:
          </h1>
          <NavLinks currentUser={currentUser} logout={logout} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
