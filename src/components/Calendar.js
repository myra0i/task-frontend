import React, { useState } from 'react'
import Calendars from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendar = (task) => {
 
  const [tgl, setTgl] = useState(task.date)



 
  
  return (
    <div className='calendar-box'>
       
      <Calendars onChange={setTgl} value={tgl} />
      
        
    
      
  
     </div>
  )
  }

export default Calendar
