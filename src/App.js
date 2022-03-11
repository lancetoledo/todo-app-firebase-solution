import './App.css';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { useState, useEffect } from 'react'
import { onSnapshot,collection } from 'firebase/firestore';
import db from './utils/firebase';

/* APP TODOS
How do we GET a collection from our Firestore db?

- Import onSnapshot, colelction from firebase/firestore
- Import db from './utils/firebase
- Fetch db from firestore
- In useEffect() use onSnapshot(collectionRef, ()=>)
- map through snapshot data and setFiltered Tasks to the snapshot.data()
- Don't forget when you map through add the id
*/


// Hardcoded Tasks Data that we will ask Firebase for instead
// const data = [
//   { id: 31, text: "Finish contacts hw", status: false },
//   { id: 0, text: "Study react hooks", status: false },
//   { id: 9, text: "Finish Clever programmer challenge", status: false },
//   { id: 21, text: "Run 1 mile", status: false },
//   { id: 5, text: "Finish errands", status: false },
//   { id: 13, text: "Complete Todo App", status: false },
  
// ];



function App() {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState(tasks)
  const [filterStatus, setFilterStatus] = useState("all")



  // useEffect(()=> {
  //   const handleFilter = () => {
  //     if(filterStatus === "active") {
  //       setFilteredTasks(tasks.filter((task)=> task.status === false))
  //     }
  //     else if(filterStatus === "completed") {
  //       setFilteredTasks(tasks.filter((task)=> task.status === true))
  //     }
  //     else {
  //       setFilteredTasks(tasks)
  //     }
  //   }

  //   handleFilter()
  // },[tasks,filterStatus])

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
    <div className="App">

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

export default App;
