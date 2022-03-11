import React from 'react'

export const FilterControl = ({filterStatus, setFilterStatus}) => {
  const handleStatus = (status) => {
    setFilterStatus(status)
  } 
  
  return (
    <div className='items-statuses'>
        <span onClick={()=>handleStatus("all")}>
        All
        </span>
        <span onClick={()=>handleStatus("active")}>
        Active
        </span>
        <span onClick={()=>handleStatus("completed")}>
        Completed
        </span>
    </div>
  )
}
