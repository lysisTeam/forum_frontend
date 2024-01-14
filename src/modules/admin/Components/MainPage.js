import React from 'react'
import SideBar from '../Layouts/SideBar'
import TopBar from '../Layouts/TopBar'

function MainPage({children}) {

  return (
    <div className='main-page-admin d-flex'>
      <SideBar/>
      <div className='section-container-pages'>
        <TopBar/>
        <div className='container-views-admin'>
          <div className='container'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage