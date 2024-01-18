import React from 'react'
import avatar from "../../../images/RyoumenSukunaIcon.jpg"

function TopBar({setOpenSideBar, setOpenSearchBar, openSearchBar}) {
  return (
    <div className='topBar-page-admin '>
      <div className={`searchBar px-5 gap-2 ${openSearchBar?'fall':''}`}>
        <i class="fa-solid fa-keyboard"></i>
        <input type='text' placeholder='Ecrire ici...'/>
        <button className='top-button' onClick={()=>setOpenSearchBar(true)}><i class="fa-solid fa-eraser"></i></button>
      </div>

      <div className={`topBar-item-section px-5 ${openSearchBar?'fall':''}`}>
        <div>
          <button className='top-button menu-button-toggle' onClick={()=>{setOpenSideBar(true)}}><i class="fa-solid fa-bars-staggered pe-none"></i></button>
          <button className='top-button' onClick={()=>setOpenSearchBar(true)}><i class="fa-solid fa-magnifying-glass pe-none"></i></button>
        </div>

        <div>
          <button className='top-button'>
            <i class="fa-solid fa-bell pe-none position-relative">
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                0<span class="visually-hidden">unread messages</span>
              </span>
            </i>
            </button>
          <button className='top-picture-drop-button' onClick={()=>alert('sdfsd')}>
            <img alt='user-avatar' src={avatar} />
            <i class="fa-solid fa-caret-down"></i>
          </button>
        </div>
      </div>
        
    </div>
  )
}

export default TopBar