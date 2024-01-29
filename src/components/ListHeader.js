import React, { useState } from 'react'
import Modal from './Modal.js'
import { useCookies } from 'react-cookie'

const ListHeader = ({ListName, getData}) => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const[ showModal, setShowModal]= useState(false)
 

  const signOut = () => {
   
    removeCookie('Email')
    removeCookie('AuthToken')
    window.location.reload()
  }
  
  return (
    <div className='list-header'>
      <h1>{ListName}</h1>
      <div className='button-container'>
        <button className='create' onClick={() => setShowModal(true)}>ADD TASK</button>
        <button className='signout' onClick={signOut}>Sign-OUT</button>
        
      </div>
      {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData}/>}
    </div>
  )
}

export default ListHeader
