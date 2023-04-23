import Footer from "@components/Footer";
import Header from "@components/Header";
import NavBar from "@components/NavBar";

import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <Header />
      <div className="w-full h-screen max-w-[1280px] mx-auto flex flex-col relative" id="main">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
