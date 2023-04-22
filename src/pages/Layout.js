import Footer  from "@components/Footer";
import Header from "@components/Header";
import NavBar from "@components/NavBar";

import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <div className="w-full max-w-[1280px] mx-auto flex flex-col">
        <Header />
        <NavBar />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
