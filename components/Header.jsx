"use client"
import Image from "next/image";
import React from 'react'
import { useAuth } from "@clerk/nextjs";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from 'next/link';

const Header = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className='fixed top-0 inset-x-0 z-50 flex items-center justify-between px-10 py-3 border-b border-white/7 backdrop-blur-xl'>
    {/* Logo or Brand Name */}
    <Link href = {"/"} >
   <Image 
  src='/mockingbird.png' 
  alt="MockMind Logo"
  width={100}
  height={100}
  className="h-14 w-auto" 
/>
   </Link>
  
    { /* Sign in */ }
    <div className = "flex items-center gap-3">
      {!isSignedIn ? (
        <>
              <SignInButton mode = "modal" />
              <SignUpButton mode="modal">
                <button className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
        </>
      ) : (
        <UserButton />
      )}
    </div>
    </nav>
  )
}

export default Header