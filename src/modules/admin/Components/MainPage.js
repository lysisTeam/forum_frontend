import React, { useEffect, useState } from 'react'
import SideBar from '../Layouts/SideBar'
import TopBar from '../Layouts/TopBar'

function MainPage({children}) {
  const [openSideBar, setOpenSideBar] = useState(false)
  const [openSearchBar, setOpenSearchBar] = useState(false)

  useEffect(()=>{
    // fonction pour fermer le sidebar au resize > 1200px
    const handleResize = () =>{
      if (document.documentElement.clientWidth > 1200) {
        setOpenSideBar(false)

      }
      
    }

    // fonction pour fermer le sidebar au click sur le document
    const handleClose = (event) =>{
      if (openSideBar && (!event.target.closest('.sidebar-page-admin') || event.target.closest('.nav-list li a'))) {
        setOpenSideBar(false)
      }

      if (openSearchBar && (!event.target.closest('.searchBar'))) {
        setOpenSearchBar(false)
      }
    }

    //evenements fermer sidebar
    window.addEventListener("resize",handleResize)
    document.addEventListener('mousedown', handleClose);


    console.log(openSearchBar);
    return () => {
      window.removeEventListener("resize",handleResize)
      document.removeEventListener('mousedown', handleClose);
    };

  },[openSideBar, openSearchBar])
  return (
    <div className='main-page-admin d-flex'>
      <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
      <div className='section-container-pages'>
        <TopBar setOpenSideBar={setOpenSideBar} setOpenSearchBar={setOpenSearchBar} openSearchBar={openSearchBar} />
        <div className={`container-views-admin ${openSideBar?'overlay':''} `}>
          <div className='container'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage