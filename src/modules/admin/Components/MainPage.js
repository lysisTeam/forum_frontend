import React, { useEffect, useState } from 'react'
import SideBar from '../Layouts/SideBar'
import TopBar from '../Layouts/TopBar'

function MainPage({children}) {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(()=>{

    const handleResize = () =>{
      if (document.documentElement.clientWidth > 1200) {
        setIsOpen(false)

      }
      
    }

    const handleClose = (event) =>{
      if (isOpen && (!event.target.closest('.sidebar-page-admin') || event.target.closest('.nav-list li a'))) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize",handleResize)
    document.addEventListener('mousedown', handleClose);

    return () => {
      window.removeEventListener("resize",handleResize)
      document.removeEventListener('mousedown', handleClose);
    };

  },[isOpen])
  return (
    <div className='main-page-admin d-flex'>
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className='section-container-pages'>
        <TopBar setIsOpen={setIsOpen}/>
        <div className={`container-views-admin ${isOpen?'overlay':''} `}>
          <div className='container'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage