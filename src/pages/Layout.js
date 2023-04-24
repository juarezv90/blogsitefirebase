import Footer from "@components/Footer";
import Header from "@components/Header";
import NavBar from "@components/NavBar";

import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col">
      <NavBar />
      <Header />
      <div className=" w-full max-w-[1280px] mx-auto flex flex-col relative" id="main">
        {children} 
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
