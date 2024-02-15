'use client'
import Link from 'next/link';
import React, { FormEvent, useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase.js'
import { useRouter } from 'next/navigation'
import { doc, setDoc } from 'firebase/firestore';


function Register() {
  const [err, setErr] = useState("");
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onRegester = async (event: FormEvent) => {
    event.preventDefault();

    if (!name || !email || !password) {
      setErr("all information required!");
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (res.user) {
        await setDoc(doc(db, 'users', res.user.uid), {
          uid: res.user.uid,
          displayName: name,
          email,
        });
        await setDoc(doc(db, 'tasks', res.user.uid), { tasks: [] });
        router.push('/');
      } else {
        setErr("email already used !");
      }


    } catch (error) {
      setErr("Something went wrong!");
      if (error)
        console.log(error)
    }



  }

  return (
    <main className='p-4 flex items-center justify-center bg-gray-400 h-screen' >
      <div className=' bg-white rounded-lg p-8 '>
        <div>
          <h1 className='text-center text-xl font-bold'>Task Manger</h1>
        </div>
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
          <button type='submit' className=' bg-blue-600 rounded p-1 mt-3 text-white hover:bg-blue-700' >Register</button>
          {err && <span className='text-xl text-red-500 p-2'>{err}</span>}
          <p className="text-sm text-gray-600 pt-3">
            Don&apos;t have an account?{' '}
            <Link href="/login" className="text-blue-500 hover:underline font-semibold">
              Login
            </Link>
          </p>

        </form>
      </div>
    </main>
  )
}

export default Register
