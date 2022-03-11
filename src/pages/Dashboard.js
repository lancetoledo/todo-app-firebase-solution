import React from 'react'
import { TaskInput } from '../components/TaskInput';
import { TaskList } from '../components/TaskList';
import { useState, useEffect } from 'react'
import { onSnapshot,collection } from 'firebase/firestore';
import db from '../utils/firebase';

export const Dashboard = () => {
    const [tasks, setTasks] = useState([])
    const [filteredTasks, setFilteredTasks] = useState(tasks)
    const [filterStatus, setFilterStatus] = useState("all")
    useEffect(()=> {
        const unsub = onSnapshot(collection(db,"tasks"), (snapshot)=> {
          let todos = snapshot.docs.map((doc)=> ({...doc.data(), id:doc.id}))
          setFilteredTasks(todos)
          const handleFilter = () => {
            if(filterStatus === "active") {
              setFilteredTasks(todos.filter((task)=> task.status === false))
            }
            else if(filterStatus === "completed") {
              setFilteredTasks(todos.filter((task)=> task.status === true))
            }
            else {
              setFilteredTasks(todos)
            }
          }
      
          handleFilter()
        })
    
        // Clean up function when the component unmounts remove the sideEffect
        return unsub
    
      }, [filterStatus])
    
    
      return (
        <div className="Dashboard">
    
          <div className='container'>
    
            <div className='header'>
              <h1>TODO</h1>
              <img src='./images/icon-sun.svg' alt='sun'/>
            </div>
    
            {/* ADD TO TASK INPUT COMPONENT */}
           <TaskInput tasks = {tasks} setTasks = {setTasks}/>
    
            {/* MAKE A TASK LIST COMPONENT */}
           <TaskList 
            tasks = {tasks}
            setTasks = {setTasks}
            filterStatus = {filterStatus}
            setFilterStatus = {setFilterStatus}
            filteredTasks = {filteredTasks}
            />
          </div>
    
        </div>
      );
}
