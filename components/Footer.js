import React from 'react'
import {FaGithubSquare, FaInstagramSquare, FaLinkedin} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white mt-auto flex justify-center items-center py-3 gap-2 md:gap-4 text-[3rem]'>
      <FaLinkedin />
      <FaGithubSquare />
      <FaInstagramSquare />
    </div>
  )
}

export default Footer