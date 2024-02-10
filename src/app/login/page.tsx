'use client'
import Link from 'next/link';
import React, { useState, FormEvent } from 'react'

function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogIn = (e: FormEvent) => {
    e.preventDefault();

    console.log("email : ", email);
    console.log("password : ", password);
  }

  return (
    <div className='p-4 flex items-center justify-center bg-gray-400 h-screen' >
      <div className=' bg-white rounded-lg p-8'>
        <h1 className='text-center text-2xl font-bold '>Todo App</h1>

        <form className=' flex flex-col space-w-3' onSubmit={onLogIn}>
          <input type='email' placeholder='email ' className='p-1 my-1 outline-none hover:bg-gray-200'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type='password' placeholder='password' className='p-1  my-1 outline-none hover:bg-gray-200'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit' className=' bg-blue-600 rounded p-1  my-1 mt-3 text-white'>Log in</button>
          <p className="text-sm text-gray-600 pt-3">
            Don't have an account?{' '}
            <Link href="/Register" className="text-blue-500 hover:underline font-semibold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default page
