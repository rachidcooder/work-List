'use client'
import Link from 'next/link';
import React, { FormEvent, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { navigate } from 'next/navigation';


function page() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegester = (event: FormEvent) => {
    event.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

  }

  return (
    <div className='p-4 flex items-center justify-center bg-gray-400 h-screen' >
      <div className=' bg-white rounded-lg p-8 '>
        <h1 className='text-center text-xl font-bold'>Todo App</h1>
        <form className=' flex flex-col' onSubmit={onRegester}>

          <input type='text' placeholder='Name ' className='p-1 my-1 outline-none hover:bg-gray-200'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input type='email' placeholder='email ' className='p-1  my-1 outline-none hover:bg-gray-200'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type='password' placeholder='password' className='p-1  my-1 outline-none hover:bg-gray-200'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit' className=' bg-blue-600 rounded p-1 mt-3 text-white' >Register</button>

          <p className="text-sm text-gray-600 pt-3">
            Don't have an account?{' '}
            <Link href="/login" className="text-blue-500 hover:underline font-semibold">
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default page
