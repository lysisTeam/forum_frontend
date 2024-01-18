import React from 'react'

function TopBar({setIsOpen}) {
  return (
    <div className='topBar-page-admin px-5'>
        <button className='top-button menu-button-toggle' onClick={()=>{setIsOpen(true)}}><i class="fa-solid fa-bars-staggered pe-none"></i></button>
        <button className='top-button'><i class="fa-solid fa-magnifying-glass pe-none"></i></button>
    </div>
  )
}

export default TopBar