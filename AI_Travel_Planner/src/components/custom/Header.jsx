import React from 'react'
import logo from "/Images/Logo.png"
import { Button } from '../ui/button'

export const Header = () => {
    return (
        <div className='p-3 shadow-sm flex justify-between items-center px-9'>
            <img src={logo} className='h-12 w-34' alt="Logo" />
            <Button>
                Sign In
            </Button>
        </div>
    )
}
