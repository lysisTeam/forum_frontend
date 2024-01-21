import React, { useEffect, useState } from 'react'
import SideBar from '../Layouts/SideBar'
import TopBar from '../Layouts/TopBar'

function MainPage({children}) {
  const [openSideBar, setOpenSideBar] = useState(false)
  const [openSearchBar, setOpenSearchBar] = useState(false)
  const [openTopPictureSection, setOpenTopPictureSection] = useState(false)

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

      if (openTopPictureSection && (!event.target.closest('.top-picture-drop-button'))) {
        document.querySelector('.top-picture-drop-section').classList.remove('show')
        setTimeout(() => {
          setOpenTopPictureSection(false)
        }, 200);
      }
    }

    //evenements fermer sidebar
    window.addEventListener("resize",handleResize)
    document.addEventListener('mousedown', handleClose);


    return () => {
      window.removeEventListener("resize",handleResize)
      document.removeEventListener('mousedown', handleClose);
    };

  },[openSideBar, openSearchBar, openTopPictureSection])


  const handleToggleTopPictureSection = (e) => {

    if ((!e.target.closest('.top-picture-drop-section'))) {
      if (!openTopPictureSection) {
        setOpenTopPictureSection(true)
        setTimeout(() => {
          document.querySelector('.top-picture-drop-section').classList.add('show')
        }, 1);
        
      }else{
        document.querySelector('.top-picture-drop-section').classList.remove('show')
        setTimeout(() => {
          setOpenTopPictureSection(false)
        }, 200);
      }

    }
   
    
    e.stopPropagation()
  }
  return (
    <div className='main-page-admin d-flex'>
      <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
      <div className={`section-container-pages ${openSideBar?'overlay':''} `}>
        <TopBar setOpenSideBar={setOpenSideBar} setOpenSearchBar={setOpenSearchBar} openSearchBar={openSearchBar} openTopPictureSection={openTopPictureSection} handleToggleTopPictureSection={handleToggleTopPictureSection}/>
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