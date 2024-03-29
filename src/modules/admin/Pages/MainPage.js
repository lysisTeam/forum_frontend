import React, { useContext, useEffect, useState } from 'react'
import SideBar from '../Layouts/SideBar'
import TopBar from '../Layouts/TopBar'
import { motion } from 'framer-motion';
import { useLocation } from 'react-router';
import GlobalContext from '../Contexts/GlobalContext';

function MainPage({children}) {
  const [openSearchBar, setOpenSearchBar] = useState(false)
  const [openTopPictureSection, setOpenTopPictureSection] = useState(false)
  const [openNotificationSection, setOpenNotificationSection] = useState(false)

  const location = useLocation()
  const currentRoute = location.pathname 
  

  const {setSearchContent, searchContent, openSideBar, setOpenSideBar} = useContext(GlobalContext)

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
        if (event.target.closest('.nav-link')) {
          setSearchContent("")
        }
      }

      if (searchContent && event.target.closest('.nav-link')) {
        setSearchContent("")
      }

      if (openTopPictureSection && ((!event.target.closest('.top-picture-drop-button')) || event.target.classList.contains('setting-button'))) {
        document.querySelector('.top-picture-drop-section').classList.remove('show')
        setTimeout(() => {
          setOpenTopPictureSection(false)
        }, 200);
        
      }

      if (openNotificationSection && ((!event.target.closest('.notifications-drop-section')) )) {
        document.querySelector('.notifications-drop-section').classList.remove('show')
        setTimeout(() => {
          setOpenNotificationSection(false)
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

  },[openSideBar, openSearchBar, openTopPictureSection,openNotificationSection, setSearchContent, searchContent])

  //Fonction pour affciher et cacher la section sous top pic picture
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

  //Fonction pour affciher et cacher la section notification
  const handleToggleNotificationSection = (e) => {

    if ((!e.target.closest('.notifications-drop-section'))) {
      if (!openNotificationSection) {
        setOpenNotificationSection(true)
        setTimeout(() => {
          document.querySelector('.notifications-drop-section').classList.add('show')
        }, 1);
        
      }else{
        document.querySelector('.notifications-drop-section').classList.remove('show')
        setTimeout(() => {
          setOpenNotificationSection(false)
        }, 200);
      }

    }
   
    e.stopPropagation()
  }

  return (
    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.5 }} className='main-page-admin d-flex'>
      <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
      <div className={`section-container-pages ${openSideBar?'overlay':''} `}>
        <TopBar setOpenSideBar={setOpenSideBar} setOpenSearchBar={setOpenSearchBar} openSearchBar={openSearchBar} openTopPictureSection={openTopPictureSection} handleToggleTopPictureSection={handleToggleTopPictureSection} openNotificationSection={openNotificationSection} handleToggleNotificationSection={handleToggleNotificationSection} />
          <div className={`container-views-admin ${(currentRoute === '/admin/subjects'? 'remove-border-radius dismiss-padding' : '')}`}>
            <div className={`${(currentRoute === '/admin/subjects'? '' : 'container')}`}>
              {children}
            </div>
          </div>
      </div>
    </motion.div>
  )
}

export default MainPage