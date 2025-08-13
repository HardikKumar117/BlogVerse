import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
        <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500'>
        
        <div>
            <img src ={assets.logo} alt='logo' className='w-32 sm:w-44'/>
            <p className='max-w-[410px] mt-6'>BlogVerse is a modern platform connecting passionate readers with talented writers from around the globe. Discover compelling stories across diverse topics, follow your favorite creators to stay updated, and join a community dedicated to the power of the written word.</p>
        </div>
        
        </div>
        <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>Copyright 2025 © BlogVerse - All Rights Reserved.</p>

    </div>
    
  )
}

export default Footer