import Link from 'next/link';
import React from 'react'

export const NavLinks = ({ currentUser, logout }) => {
    //STYLE FOR NAVLINKS SET WITH TAILWINDCSS
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