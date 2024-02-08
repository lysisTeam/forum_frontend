import React, { useContext } from 'react'
import GlobalContext from '../Contexts/GlobalContext'
import { Link } from 'react-router-dom'

function Subjects() {
  const {setOpenSideBar, openTopBar, setOpenTopBar} = useContext(GlobalContext)
  return (
    <div className='position-relative subjects p-2'>
      <button className={`button-toggle-top-bar ${openTopBar? 'fall' : ''}`} onClick={()=>{setOpenTopBar(previous => !previous)}}><i className="fa-solid fa-angle-down pe-none"></i></button>
      
      <div className='first-section rounded p-3'>
        <h5 className='fw-bold'>Rooms publiques</h5>
        <hr className='my-2'></hr>
        <button className='btn btn-dark btn-sm w-100 mb-5'><i class="fa-solid fa-plus"></i> Nouvelle Room</button>

        
        <div className='liste-rooms'>
          <h6 className='text-muted text-center fw-bold p-5 mt-5'><i class="fa-regular fa-face-surprise"></i> Aucune room en vu</h6>
        </div>
      </div>
      <div className='second-section rounded'>
        
      </div>
      
    </div>
  )
}

export default Subjects