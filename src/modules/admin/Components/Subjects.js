import React, { useContext } from 'react'
import GlobalContext from '../Contexts/GlobalContext'

function Subjects() {
  const {setOpenSideBar, openTopBar, setOpenTopBar} = useContext(GlobalContext)
  return (
    <div className='position-relative'>
      <button className={`button-toggle-top-bar ${openTopBar? 'fall' : ''}`} onClick={()=>{setOpenTopBar(previous => !previous)}}><i className="fa-solid fa-angle-down pe-none"></i></button>
      <h4 className='fw-bold'>Thèmes de discussion</h4>
        
    </div>
  )
}

export default Subjects