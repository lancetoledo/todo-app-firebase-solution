import React, { useState } from 'react'
import { addDoc, collection,doc,setDoc } from 'firebase/firestore'
import db from '../utils/firebase'

/* TASKINPUT TODOS
How do we ADD a document(task) to Firestore?

- import addDoc and collection from firebase/firestore
- import db from ../utils/firebase.js
- make handleForm async/await
- await addDoc()
- Pass collectionRef and payload to addDoc()


*/

export const TaskInput = ({tasks,setTasks,filteredTasks,userId}) => {

    const [input, setInput] = useState("")

    const handleChange = (e)=> {
      setInput(e.target.value)
    }

    // const handleForm = (e) => {
    //     e.preventDefault()

    const generateId = (array) => {
        // This variable should hold an array of all the ids
        const taskIDs = array.map((item)=> item.id)

        console.log(taskIDs)
        if(taskIDs.length === 0) {
            return 0
        } else {
            return  Math.max(...taskIDs) + 1
        }
        
    }

    //     // Create a new todo object
    //     const newTask = {
    //         id: generateId(tasks),
    //         text: input,
    //         status: false
    //     }

     

    //     // How do I add a new task to the list

  


    //     setTasks([newTask,...tasks])
    // }

    // const handleForm = async (e) => {
    //     e.preventDefault()
       
    //     if(input) {
    //         const collectionRef = collection(db, "tasks")
    //         const payload = {
    //             text: input.trim(),
    //             status: false
    //         }
    //         await addDoc(collectionRef,payload)
    //         setInput("")
    //     }

    // }

    // Personalized User Handleform
    const handleForm = async (e) => {
        e.preventDefault()

        if(input) {
            const newTask = {
                text: input.trim(),
                status: false,
                id: generateId(filteredTasks)
            }
            filteredTasks.push(newTask)

            let tasksRef =  filteredTasks
            const docRef = doc(db,"users", userId)
            // payload is what do you want the document to look like
            console.log(tasksRef)
            const payload = {
                tasks: tasksRef
            }
            // updates the database
            setDoc(docRef, payload)
            setInput('')
        }
    }

  return (
    <div className='task-input'>
        <div className= 'check'>
            <div className='check-mark'>
                {/* insert image here */}
            </div>
        </div>
        <div className='new-todo-input'>
            <form onSubmit={handleForm}>
                <input value = {input} onChange={handleChange} id='todo-input' type="text" placeholder='Create a new todo...' />
            </form>
        </div>
  </div>
  )
}
