import React from 'react'
import { FilterControl } from './FilterControl'
import { Task } from './Task'
import { deleteDoc, doc } from 'firebase/firestore'
import db from '../utils/firebase'

/* TASKLIST TODOS
How do we DELETE a collection from our Firestore db?

- import deleteDoc, and doc from 'firebase/firestore'
- import db from '../utils/firebase'
- forEach item in tasks, if the status is true then use deleteDoc
- use deleteDoc in clearCompleted
- deleteDoc(docRef, id) 
- docRef is (db,"tasks", id)
*/


export const TaskList = ({tasks, setTasks,filterStatus,setFilterStatus, filteredTasks}) => {

  // const clearCompleted = ()=> {
  //   //Clear's Tasks by filtering out
  //     setTasks(tasks.filter((task)=> task.status === false)) // let tasks = [{},{},{}]
  //   //With Firebase we can delete a document
    
    
  //   // Reset the filterStatus to all
  //     setFilterStatus("all")
  // }

  const clearCompleted = ()=> {
    // With firebase we can delete a document
    // For each task that is completed we can delteDoc()
    // We need to look through the taskS and for each task that has a status of true, delete that document(delteDoc())

 

    //how do we delete that document(task) from the database?

    // How do we look through each task?
    filteredTasks.forEach((item)=> {
        // And do we get access to each task with the status of true?
        if(item.status === true) {
          deleteDoc(doc(db,"tasks",item.id))
        }
    })

    setFilterStatus("all")
    
    // deleteDoc(doc(db, "tasks", id))
  }



  return (
    
    <div className='task-list-wrapper'>
        <div className='task-list'>
            {filteredTasks.map((task)=> {
        
                return <Task 
                    text = {task.text}
                    status = {task.staus}
                    tasks = {tasks}
                    setTasks = {setTasks}
                    task = {task}
                    key = {task.id}
                    filteredTasks = {filteredTasks}
                    />
            })}

        </div>

        <div className='task-items-info'>
            <div className='items-left'>
                {filteredTasks.length} items left
            </div>

            <FilterControl 
                filterStatus = {filterStatus}
                setFilterStatus = {setFilterStatus}
            />

            <div className='items-clear'>
                <span onClick={clearCompleted}>Clear Completed</span>
            </div>
        </div>

    </div>

  
  )
}
