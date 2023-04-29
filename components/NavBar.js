import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { NavLinks } from "./NavLinks";

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
       + " min-w-[380px]"}
    >
      <h1 className="font-bold text-lg sm:text-xl md:inline-flex md:text-2xl">
        Juarez Development Blog
      </h1>
      <ul className="md:gap-4 lg:gap-8 ml-auto hidden md:flex">
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
