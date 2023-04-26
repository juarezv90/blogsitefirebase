import Footer from "@components/Footer";
import Header from "@components/Header";
import NavBar from "@components/NavBar";
import SEO from "@components/SEO";

import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col">
      <SEO pageTitle={"Juarez Development Blog"} pageDescription={"A site dedicated to sharing my experiences in switching careers and growing in the programming field."} />
      <NavBar />
      <Header />
      <div className="flex-1 w-full max-w-[1280px] mx-auto flex flex-col relative" id="main">
        {children} 
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
