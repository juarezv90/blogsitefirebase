import Link from "next/link";
import React from "react";
import { FaGithubSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white mt-auto flex justify-center items-center py-3 gap-2 md:gap-4 text-[3rem] flex-shrink-0">
      <Link href={"https://www.linkedin.com/in/victor-juarez-b7a04b22a/"} target="_blank">
        <FaLinkedin className="hover:text-gray-500 duration-300 hover:scale-110" />
      </Link>
      <Link href={"https://github.com/juarezv90?tab=repositories"} target="_blank">
        <FaGithubSquare className="hover:text-gray-500 duration-300 hover:scale-110" />
      </Link>
      <Link href={"/"}>
        <FaInstagramSquare className="hover:text-gray-500 duration-300 hover:scale-110" />
      </Link>
    </div>
  );
};

export default Footer;
