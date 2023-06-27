'use client'

import { useAuth } from '@/hooks/useAuth'
import React from 'react'

const Home = () => {
  const {user} = useAuth()
  return (
    <div className='flex justify-center items-center pt-20'>
      <h1 className=' text-2xl '>
      Welcome {user?.name} to Dashboard
      </h1>
    </div>
  )
}

export default Home