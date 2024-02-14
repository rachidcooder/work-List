"use client"
import { useEffect, useState } from "react";
import Items from "./Compoanent/items"
import { Timestamp, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { v4 as uuid } from "uuid"


interface User {
  uid: string; // Unique identifier for the user
  email: string | null; // Email address of the user
  displayName?: string | null; // Display name of the user (optional)
  // Date when the user account was created 
}



export default function Home() {
  const [tab, setTab] = useState(1);
  const [toAdd, setToAdd] = useState(false);
  const [taskType, setTasktype] = useState(0);
  const [err, setErr] = useState(false);
  const [textTask, setTexttask] = useState("");

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        const mappedUser: User = {
          uid: u.uid,
          email: u.email ? u.email : null,
          displayName: u.displayName,
        }

        setUser(mappedUser);
      }
    })
  }, [])

  const AddTask = async () => {
    if (taskType === 0) {
      setErr(true);
      return false;
    }
    if (textTask && user !== null) {
      //store task in firestore :
      try {
        const resAdd = await updateDoc(doc(db, "tasks", user.uid), {
          tasks: arrayUnion({
            id: uuid(),
            text: textTask,
            type: taskType,
            done: false,
            date: Timestamp.now(),
          })
        }
        );
        setToAdd(false);
        setTexttask("")
      } catch (error) {
        console.log(error);
      }

    }
  }


  return (
    <main className="flex h-screen  justify-center items-center ">
      <div className=" w-1/2 h-[85%] flex flex-col   bg-slate-100 rounded-md shadow-xl shadow-gray-300">
        <div className="w-full">
          <h1 className='w-full text-4xl text-blue-600 font-semibold text-center  py-4' >Task Manager</h1>
          <ul className="flex justify-between text-xl p-2 w-full space-x-2 cursor-pointer text-white">
            <li className={` ${tab == 1 ? "bg-blue-600 " : " bg-blue-400"} 
               p-1 text-center w-full rounded-md  hover:bg-blue-600`}
              onClick={() => setTab(1)}
            > day</li>
            <li className={` ${tab === 2 ? "bg-blue-600" : " bg-blue-400"} 
               p-1 text-center w-full rounded-md  hover:bg-blue-600`}
              onClick={() => setTab(2)}
            >week</li>
            <li className={` ${tab === 3 ? "bg-blue-600" : " bg-blue-400"} 
               p-1 text-center w-full rounded-md  hover:bg-blue-600`}
              onClick={() => setTab(3)}
            >month</li>
          </ul>
          <div className="p-2 ">
            {user && <Items id={tab} user={user} />}


          </div>


        </div>

        <div className=" flex h-full justify-end flex-col items-center text-center  bottom-1">
          <button className=" m-4  h-14 w-14 text-center cursor-pointer p-3 rounded-full
              bg-blue-500 text-white text-2xl font-bold items-center"
            onClick={() => setToAdd(true)}
          >+</button>
        </div>



      </div>
      {toAdd ? <div className='fixed h-screen w-full z-10 bg-black/80 top-O left-0'>
      </div> : ""
      }

      {toAdd && (<div className=" flex items-center justify-center  fixed top-0  right-0 bottom-0 left-0 z-10 duration-300">
        <div className=" bg-white rounded-md p-4 ">
          <div className="flex  pb-4">
            <h1 className=" text-center py-2S text-2xl w-full text-blue-600 font-semibold">New task</h1>
            <button className=" text-end text-2xl text-rose-700  "
              onClick={() => { setToAdd(false); setErr(false) }}
            >x</button>
          </div>

          <input type="text" placeholder="Add New task ..."
            className=" outline-none rounded-sm p-1 w-full bg-gray-200 hover:bg-gray-300 "
            value={textTask}
            onChange={(e) => setTexttask(e.target.value)}
          />
          <div className="p-3 pt-5">
            <input type="radio" className="outline-none p-2 size-5" onClick={() => setTasktype(1)} name="timePeriod" />
            <span className="text-xl p-1 font-medium text-center px-3 text-gray-900">Day</span>
            <input type="radio" className="outline-none p-2 size-5" onClick={() => setTasktype(2)} name="timePeriod" />
            <span className="text-xl p-1 font-medium text-center px-3 text-gray-900">Week</span>
            <input type="radio" className="outline-none p-2 px-3 size-5" onClick={() => setTasktype(3)} name="timePeriod" />
            <span className="text-xl p-1 font-medium text-center text-gray-900">Month</span>
          </div>

          {err && <span className=" p-2 text-center text-red-400 font-medium">Select one option</span>}
          <button className=" text-white font-bold bg-blue-600 hover:bg-blue-500 rounded-sm p-1 w-full"
            onClick={() => AddTask()}
          >Add</button>
        </div>
      </div>)
      }
    </main>
  );
}
