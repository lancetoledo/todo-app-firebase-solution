import React from 'react'
import { TaskInput } from '../components/TaskInput';
import { TaskList } from '../components/TaskList';
import { useState, useEffect } from 'react'
import { onSnapshot,collection,doc } from 'firebase/firestore';
import db from '../utils/firebase';

import {auth} from "../utils/firebase"
import {signOut} from "firebase/auth"

export const Dashboard = () => {
    const [tasks, setTasks] = useState([])
    const [filteredTasks, setFilteredTasks] = useState(tasks)
    const [filterStatus, setFilterStatus] = useState("all")

    const [user, setUser] = useState({})

    const logout = async () => 
    {
        await signOut(auth)
        window.location = "/"
    }

    // useEffect(()=> {
    //     const unsub = onSnapshot(collection(db,"tasks"), (snapshot)=> {
    //       let todos = snapshot.docs.map((doc)=> ({...doc.data(), id:doc.id}))
    //       setFilteredTasks(todos)
    //       const handleFilter = () => {
    //         if(filterStatus === "active") {
    //           setFilteredTasks(todos.filter((task)=> task.status === false))
    //         }
    //         else if(filterStatus === "completed") {
    //           setFilteredTasks(todos.filter((task)=> task.status === true))
    //         }
    //         else {
    //           setFilteredTasks(todos)
    //         }
    //       }
      
    //       handleFilter()
    //     })
    
    //     // Clean up function when the component unmounts remove the sideEffect
    //     return unsub
    
    //   }, [filterStatus])
    

    useEffect(()=> 
    {
        // Set the user in the useState when the authentication state has changed
        auth.onAuthStateChanged((currentUser) => 
        {
            
            if(currentUser) {
                setUser(currentUser.uid);
            } else {
                console.log("ERROR PLEASE SIGN IN")
                window.location = "https://www.free404.com/construction/404.html"
            }
        })
        
        // Set the wallet using the data from Firestore
        onSnapshot(doc(db, "users", `${user}`), (snapshot) => 
        {
            // let todos = snapshot.docs.map((doc)=> ({...doc.data(), id:doc.id}))
            let todos =  snapshot.data().tasks.map((doc)=> doc)
    
            const handleFilter = () => {
                if (filterStatus === "active") {
                  return setFilteredTasks(todos.filter((task) => task.status === false));
                } else if (filterStatus === "completed") {
                  return setFilteredTasks(todos.filter((task) => task.status === true));
                } else {
                  return setFilteredTasks(todos);
                }
              };
              handleFilter();
      
        })
    }, [user,filterStatus,tasks])
    
      return (
        <div className="Dashboard">
    
          <div className='container'>
    
            <div className='header'>
              <h1>TODO</h1>
              <img src='./images/icon-sun.svg' alt='sun'/>
            </div>
    
            {/* ADD TO TASK INPUT COMPONENT */}
           <TaskInput tasks = {tasks} setTasks = {setTasks} userId ={user} filteredTasks = {filteredTasks}/>
    
            {/* MAKE A TASK LIST COMPONENT */}
           <TaskList 
            tasks = {tasks}
            setTasks = {setTasks}
            filterStatus = {filterStatus}
            setFilterStatus = {setFilterStatus}
            filteredTasks = {filteredTasks}
            userId = {user}
            />
          </div>
          <h3 onClick={logout}>Logout</h3>
        </div>
      );
}
