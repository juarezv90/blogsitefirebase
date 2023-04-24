import React from 'react'
import {FaGithubSquare, FaInstagramSquare, FaLinkedin} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white mt-auto flex justify-center items-center py-3 gap-2 md:gap-4 text-[3rem] flex-shrink-0'>
      <FaLinkedin className='hover:text-gray-500 duration-300 hover:scale-110'/>
      <FaGithubSquare className='hover:text-gray-500 duration-300 hover:scale-110'/>
      <FaInstagramSquare className='hover:text-gray-500 duration-300 hover:scale-110'/>
    </div>
  )
}

export default Footer