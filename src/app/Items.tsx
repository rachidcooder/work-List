"use client"
import React, { useEffect, useState } from 'react'
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { db } from './firebase';
import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';


interface Item {
  id: String,
  text: String,
  type: Number,
  done: boolean
}

interface User {
  uid: string; // Unique identifier for the user
  email: string | null; // Email address of the user
  displayName?: string | null; // Display name of the user (optional)
  // Date when the user account was created 
}

interface ItemsProps {
  id: number;
  user: User;
}

const Items: React.FC<ItemsProps> = ({ id, user }) => {

  const [isdone, setIsDone] = useState(false);
  // Assuming Item represents a task
  const [allTasks, setAllTasks] = useState<Item[]>([]);
  const [selectTask, setSelectTask] = useState<Item[]>([]);


  useEffect(() => {
    if (user.uid) {
      const unSub = onSnapshot(doc(db, "tasks", user.uid), (doc) => {
        if (doc.exists()) {
          const tasksData: Item[] = doc.data().tasks;
          setAllTasks(tasksData);
        }


      })

      return () => {
        unSub();
      }

    }
  }, []);

  useEffect(() => {
    if (allTasks && allTasks.length > 0) {
      setSelectTask(allTasks.filter((i) => i.type === id));
    }
  }, [id, allTasks]);



  const deleteItem = async (it: any) => {

    const userTasksRef = doc(db, 'tasks', user.uid);
    try {

      const userTasksSnapshot = await getDoc(userTasksRef);
      const userTasksData = userTasksSnapshot.data();

      if (userTasksData) {
        const tasks: Item[] = userTasksData.tasks || [];
        const updatedTasks = tasks.filter(item => item.id !== it.id);
        await updateDoc(userTasksRef, { tasks: updatedTasks });
        console.log('Item deleted from tasks array');
      } else {
        console.error('User tasks data not found');
      }
    } catch (error) {
      console.error('Error deleting item from tasks array:', error);
    }

  }
  const onDonne = async (it: any) => {
    const userTasksRef = doc(db, 'tasks', user.uid);
    try {
      const userTasksSnapshot = await getDoc(userTasksRef);
      const userTasksData = userTasksSnapshot.data();

      if (userTasksData) {
        const tasks: Item[] = userTasksData.tasks || [];
        const itemIndex = tasks.findIndex(item => item.id === it.id);

        if (itemIndex !== -1) {
          tasks[itemIndex].done = true;
          await updateDoc(userTasksRef, { tasks });

        } else {
          console.error('Item not found in tasks array');
        }
      } else {
        console.error('User tasks data not found');
      }
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className='flex flex-col'>

      {selectTask.map((item, i) => {

        return (
          <div key={i} className="pt-2 hover:bg-slate-200 rounded-sm px-1 w-full">
            <div className=" flex flex-row text-xl items-center ">

              {item.done ? <MdOutlineCheckBox size={30} onClick={() => { setIsDone(false); }} />
                : <MdOutlineCheckBoxOutlineBlank size={30} onClick={() => { setIsDone(true); onDonne(item) }} />}

              <p className=" text-2xl w-full font-medium p-2  text-gray-600">{item.text}</p>
              <MdDelete size={30} onClick={() => deleteItem(item)} className=' text-gray-600 hover:text-gray-800 ' />
            </div>
          </div>
        );
      })

      }

    </div>


  )
}

export default Items
