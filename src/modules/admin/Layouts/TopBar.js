import React, { useContext } from 'react'
import avatar from "../../../images/RyoumenSukunaIcon.jpg"
import AdminContext from '../Contexts/AdminContext'

function TopBar({setOpenSideBar, setOpenSearchBar, openSearchBar, openTopPictureSection, handleToggleTopPictureSection}) {
  const {admin, logout} = useContext(AdminContext)
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
          <button className='top-picture-drop-button' onClick={handleToggleTopPictureSection}>
            <img alt='user-avatar' src={avatar} />
            <i class="fa-solid fa-caret-down"></i>

            {
              openTopPictureSection &&
              <div className='top-picture-drop-section rounded shadow p-3'>
                <h6 className='p-0 m-0'>{`${admin.nom} ${admin.prenoms}`}</h6>
                <p className='m-0 email'>{admin.email}</p>
                <hr className='my-2'></hr>
                <span className='logout-button rounded pe-auto' onClick={logout}>Se déconnecter <i class="fa-solid fa-person-walking-luggage"></i></span>
              </div>
            }
            
          </button>
        </div>
      </div>
        
    </div>
  )
}

export default TopBar