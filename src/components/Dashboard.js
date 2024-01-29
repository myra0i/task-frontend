import React, { useState } from 'react'
import TickIcon from './TickIcon.js'
import Progress from './Progress.js'
import Modal from './Modal.js'




const Dashboard = ({task, getData,}) => {

  const[ showModal, setShowModal]= useState(false)

const deleteItem = async() => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,{
      method: 'DELETE'
      
    })
    if(response.status === 200){
      getData()
    }
  } catch (err) {
    console.error(err)
  }
}




  return (
    <>
    
    <div className='list-item'>
        <div className='info-container'>
            <TickIcon />
            
            <p className='task-title'>{task.title}</p>
            <h3 className='task-cat'>{task.category}</h3>
            <h4 className='date'>Due: {task.date}</h4>
            <Progress progress={task.progress}/>
            
        </div>
        <div className='button-container'>
            <button className='edit' onClick={() => setShowModal(true)}>EDIT</button>
            <button className='delete'onClick={deleteItem}>DELETE</button>


        </div>
        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task} />}
      
    </div>
    </>
  )
 
}


export default Dashboard
