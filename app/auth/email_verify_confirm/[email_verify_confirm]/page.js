'use client';
import AuthLayout from '@/components/AuthLayout';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const Email_verify_confirm = () => {
  const pathname = usePathname();
    const email = pathname.split('email_verify_confirm/')[1] ;

    console.log(email)
  return (
    <AuthLayout>
    <div className="container mx-auto px-4 mt-48 h-full">
    <div className="flex content-center items-center justify-center h-full">
      <div className="w-full lg:w-4/12 ">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-600  border-0">
          <div className="rounded-t mb-0 px-6 py-6">
            <div className="text-center">
              <h6 className=" text-[#d1cbba] text-md font-bold">
              <span className='text-gray-200'>{email}</span> has been verified.
              </h6>
            </div>
            <div className="bg-gray-800 text-center text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 mt-4">
              <Link href='/auth/login' >
              Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </AuthLayout>
  )
}

export default Email_verify_confirm