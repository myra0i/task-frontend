import React from 'react'
import {useState} from 'react';
import {useCookies} from 'react-cookie'





const Modal = ({mode, setShowModal, getData, task}) => {
 
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const editMode = mode === "edit" ? true :false 
  const [markedDates, setMarkedDates] = useState([]);

  
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    description: editMode ? task.description : null,
    category: editMode ? task.category:null,
    date: editMode ? task.date : null
  })


  const fetchDates = async () => {
   
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/dates`);
      const data = await response.json();
      setMarkedDates(data);
    } catch (error) {
      console.log(error);
    } 
  };

  const postData = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
        
      })
      if(response.status === 200){
        setShowModal(false)
        getData()  
        await fetchDates()
      }
    } catch (err) {
      console.error(err)
      
    }
  }


  const editData = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
      })
      if(response.status === 200) {
      setShowModal(false)
      getData()
      await fetchDates() 
      .then((data) => setMarkedDates(data))
    
      
      }
     
      
    } catch (err) {
      console.error(err)
    }

  }
 

  const handleChange = (e)=>{
    
    const {name, value} = e.target

    setData(data =>({
      ...data,
      [name] : value
    }))
    
  }
  return (
    <div className='overlay'>
      <div className='modal'>
        <div className='form-title-container'>
          <h3>{mode} task</h3>
          <button onClick={()=>setShowModal(false)}>X</button>
        </div>

        <form>
          <input 
          required
          maxLength={30}
          placeholder=' Task Name'
          name='title'
          value={data.title}
          onChange={handleChange}/>

          <input
          placeholder='Task description'
          name='description'
          value={data.description}
          onChange={handleChange}
          />
          
          
          <label for="range">Drag to select your progress</label>
          <input
          required
          type='range'
          id='range'
          min="0" 
          max="100" 
          name='progress'
          value={data.progress}
          onChange={handleChange}
          
          />

           <label>Task category</label>
           <input
           placeholder='e.g., work, personal, urgent'
           name='category'
           value={data.category}
           onChange={handleChange}
           
           />

          <label>Task Due Date</label>
          <input
           name='date'
           value={data.date}
           placeholder='dd-mm-yyyy'
           onChange={handleChange}
           />

          <input className={mode}
           type='submit' onClick={editMode ? editData : postData}/>
          
        </form>

      </div>
      
    </div>
  )
}

export default Modal
