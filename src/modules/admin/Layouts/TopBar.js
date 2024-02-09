import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import avatar from "../../../images/RyoumenSukunaIcon.jpg"
import AdminContext from '../Contexts/AdminContext'
import GlobalContext from '../Contexts/GlobalContext';

function TopBar({setOpenSideBar, setOpenSearchBar, openSearchBar, openTopPictureSection, handleToggleTopPictureSection, openNotificationSection, handleToggleNotificationSection}) {
  const {admin, logout} = useContext(AdminContext)
  const {searchContent, setSearchContent, openTopBar} = useContext(GlobalContext)
  const Navigate = useNavigate()
  const location = useLocation()
  const currentRoute = location.pathname
  return (
    <div className={`topBar-page-admin ${(currentRoute === '/admin/subjects'? 'toggleable ' : '')} ${(openTopBar ? 'show shadow' : '')}`}>
      <div className={`searchBar px-5 gap-2 ${openSearchBar?'fall':''}`}>
        <i className="fa-solid fa-keyboard"></i>
        <input type='text' value={searchContent} onChange={(e)=>setSearchContent(e.target.value)} placeholder='I need someone to save me...'/>
        <button className='top-button' onClick={()=>setSearchContent("")}><i className="fa-solid fa-eraser pe-none"></i></button>
      </div>

      <div className={`topBar-item-section px-5 ${openSearchBar?'fall':''} `}>
        <div>
          <button className={`top-button menu-button-toggle ${(currentRoute === '/admin/subjects'? 'show' : '')}`} onClick={()=>{setOpenSideBar(true)}}><i className="fa-solid fa-bars-staggered pe-none"></i></button>
          {
            currentRoute !== '/admin/subjects' &&
            <button className='top-button' onClick={()=>setOpenSearchBar(true)}><i className="fa-solid fa-magnifying-glass pe-none"></i></button>
          }
          
        </div>

        <div>
          <button className='top-button button-notifications position-relative' onClick={handleToggleNotificationSection}>
            <i className="fa-solid fa-bell pe-none position-relative">
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                0<span className="visually-hidden">unread messages</span>
              </span>
            </i>

            {
              openNotificationSection &&
              <div className='notifications-drop-section rounded shadow p-3'>
                <h6 className='text-muted text-center m-0' style={{fontSize: "0.9rem"}}>aucune notification</h6>
              </div>
            }
            
          </button>
          <button className='top-picture-drop-button' onClick={handleToggleTopPictureSection}>
            <img alt='user-avatar' src={avatar} />
            <i className="fa-solid fa-caret-down"></i>

            {
              openTopPictureSection &&
              <div className='top-picture-drop-section rounded shadow p-3'>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <h6 className='p-0 m-0'>{`${admin.nom} ${admin.prenoms}`}</h6>
                    <p className='m-0 email'>{admin.email}</p>
                  </div>
                  <span className='setting-button' onClick={()=>Navigate('/admin/settings')}><i class="fa-solid fa-gear"></i></span>
                </div>
                <hr className='my-2'></hr>
                <span className='logout-button rounded pe-auto' onClick={logout}>Se déconnecter <i className="fa-solid fa-person-walking-luggage"></i></span>
              </div>
            }
            
          </button>
        </div>
      </div>
        
    </div>
  )
}

export default TopBar