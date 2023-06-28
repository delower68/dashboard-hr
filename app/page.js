'use client'

import { useAuth } from '@/hooks/useAuth'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

const Home = () => {
  const router = useRouter()
  const { user } = useAuth()
  console.log(user?.name)

  useEffect(()=>{

    if(!user?.name){

      router.push('/auth/login')
    }
    else {
      router.push('/')
    }
  },[user])

  const handleLogout = async()=>{
    await axios.get(
      "https://hr-management-1wt7.onrender.com/api/v1/logout"
    );
    localStorage.removeItem("user");
    toast.success("logout successfully");
    router.push('/auth/login');
  }

  return (
    <>
      { user?.name &&
        <div>
          <div className='flex  justify-center items-center pt-20'>
            <h1 className=' text-2xl '>
              Welcome {user?.name} to Dashboard
            </h1>


          </div>
          <div className='flex  justify-center items-center '>

          <button 
          onClick={handleLogout}
          className='mt-3 ml-5 bg-gray-300 p-2 rounded-lg'>Logout</button>
          </div>
        </div>
      }
    </>
  )
}

export default Home