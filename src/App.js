import { useEffect, useState } from 'react'
import ListHeader from './components/ListHeader.js'
import ListItem from './components/ListItem.js'
import Dashboard from './components/Dashboard.js'
import Auth from './components/Auth.js'
import {useCookies} from 'react-cookie'
import Calendar from './components/Calendar.js'




function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const [tasks, setTasks] = useState(null)



  const getData = async() => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
     const json = await response.json()
     setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(()=> {
    if(authToken) {
      getData()
    }
  }
 )
  
  const sortedTasks = tasks?.sort((a, b)=> new Date(a.date) - new Date(b.date))
  
 

  return (
    <div className='app'>
      {!authToken && <Auth/>}

      {
        authToken && 
        <>
        <ListHeader ListName={'Let Us Organize You World'} getData={getData}/>
       <Calendar />
       <p className='task-name'>Welcome:{userEmail}</p>
      {sortedTasks?.map( (task) => <ListItem key={task.id} task = {task} getData={getData}/>)}
      {sortedTasks?.map( (task) => <Dashboard key={task.id} task = {task} getData={getData} />)}
        </>
      }
    </div>
  );
}

export default App;
