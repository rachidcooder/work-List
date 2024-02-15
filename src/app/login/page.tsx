'use client'
import Link from 'next/link';
import React, { useState, FormEvent } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useRouter } from 'next/navigation'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  const onLogIn = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);


      if (res.user) {
        router.push('/');
      } else {
        setErr("email or password incorrect!")
      }

    } catch (error) {
      setErr("Something went wrong!");
      console.log(error)
    }


  }

  return (
    <main className='p-4 flex items-center justify-center bg-gray-400 h-screen' >
      <div className=' bg-white rounded-lg p-8'>
        <h1 className='text-center text-2xl font-bold '>Task Manger</h1>

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
          <span className='text-xl text-red-500 p-2'>{err}</span>
          <p className="text-sm text-gray-600 pt-3">
            Don't have an account?{' '}
            <Link href="/Register" className="text-blue-500 hover:underline font-semibold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}

export default Login
