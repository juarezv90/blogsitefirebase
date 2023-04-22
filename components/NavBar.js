import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <nav className='w-full bg-blue-600 relative top-0 left-0 p-4 flex justify-stretch items-center text-white'>
      <h1 className='font-bold text-3xl md:hidden'>JDB</h1>
      <h1 className='font-bold hidden md:inline-flex md:text-3xl'>Juarez Development Blog</h1>
      <ul className='flex gap-2 ml-auto'>
        <Link href="/">Home</Link>
        <Link href="/">Posts</Link>
        <Link href="/">About</Link>
      </ul>
    </nav>
  )
}

export default NavBar