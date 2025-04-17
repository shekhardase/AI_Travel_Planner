import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'


const Hero = () => {
    return (
        <div className='flex flex-col items-center mx-56 gap-9'>
            <h1 className='font-extrabold text-[55px] text-center uppercase mt-10'>
                <span className='text-blue-900'>
                    "THE WORLD IS A BOOK, AND
                </span>
                <span className='text-[#f56551]'> THOSE WHO DO NOT TRAVEL READ ONLY ONE PAGE."
                </span>
            </h1>
            <p className='text-lg text-gray-700 text-center mt-4 font-medium'>
                Discover unforgettable experiences with the power of AI. Let us help you plan your next adventure, tailored to your preferences and aspirations.
            </p>
          <Link to={'/Title'}>
          <Button>
                Get Started, It's Free!
            </Button>
          </Link>
        </div>
    )
}

export default Hero