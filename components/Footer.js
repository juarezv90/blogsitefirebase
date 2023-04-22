import React from 'react'
import {FaGithubSquare, FaInstagramSquare, FaLinkedin} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='bg-black text-white mt-auto flex justify-center items-center py-3 gap-2 md:gap-4'>
      <FaLinkedin className='w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem]'/>
      <FaGithubSquare className='w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem]'/>
      <FaInstagramSquare className='w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem]'/>
    </div>
  )
}

export default Footer