import Head from "next/head";
import React from "react";

const SEO = ({ pageTitle, pageDescription }) => {
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
    </Head>
  );
};

export default SEO;
