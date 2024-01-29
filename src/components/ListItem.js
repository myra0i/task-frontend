import React from 'react';

const ListItem = ({task}) => {
 
  return (
   
    <div className='card-container'>
     
    <div className='card-wrapper'>
      <div className='card-top'> </div>
      <div className='task-holder'>
      <label className='card-header'>{task.title}</label>
      <textarea rows={6} className='task-container'>{task.description}</textarea>
      <div className='task-cat'>{task.category}</div>
      
    <div className='prog'>{task.progress === 100 ? 'Complete' : 'Incomplete'}</div>

 
      
      </div>


      
      
      
      </div>
    </div>
  )
}

export default ListItem
