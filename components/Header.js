import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="w-full h-[300px] duration-300 relative grid px-4 py-[4rem]">
      <Image
        src={"/assets/header.jpg"}
        fill
        className="object-cover object-center absolute top-0 left-0"
        priority
        alt="Blog Header"
      />
      <div className="absolute top-0 left-0 w-full h-full from-black to-slate-400 bg-gradient-to-b opacity-50"></div>
      <div className="w-full h-full z-50 grid lg:grid-cols-2 content-center text-white">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl text-center md:text-4xl font-bold">
            Welcome to my Developer Blog
          </h1>
          <p className="p-4 md:w-[40ch] md:text-base">
            Come travel with me through my journey into development and
            programming. Watch me explore in this digital world and discuss
            feature I find pretty interesting
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
