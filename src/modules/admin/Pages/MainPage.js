import React, { useContext, useEffect, useState } from 'react'
import SideBar from '../Layouts/SideBar'
import TopBar from '../Layouts/TopBar'
import AdminContext from '../Contexts/AdminContext'

function MainPage({children}) {
  const [openSideBar, setOpenSideBar] = useState(false)
  const [openSearchBar, setOpenSearchBar] = useState(false)
  const [openTopPictureSection, setOpenTopPictureSection] = useState(false)

  const {message, theme} = useContext(AdminContext)

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

      if (openTopPictureSection && ((!event.target.closest('.top-picture-drop-button')) || event.target.classList.contains('setting-button'))) {
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

  },[openSideBar, openSearchBar, openTopPictureSection, theme])


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


          <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="liveToast" className={`toast ${theme}`} role="alert" aria-live="assertive" aria-atomic="true">
                {/* <div className="toast-header">
                <strong className="me-auto">Alerte</strong>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div> */}
                <div className="toast-body text-white">
                {message}
                </div>
            </div>

          </div>



        </div>
      </div>
    </div>
  )
}

export default MainPage