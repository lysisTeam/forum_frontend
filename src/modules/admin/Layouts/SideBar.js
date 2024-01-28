import React, { useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import avatar from "../../../images/RyoumenSukunaIcon.jpg"
import AdminContext from '../Contexts/AdminContext'

function SideBar({openSideBar}) {
  const location = useLocation()
  const currentRoute = location.pathname  
  const {admin} = useContext(AdminContext)

  useEffect(()=>{
    // console.log(openSideBar);
  },[openSideBar])

  return (
    <div className={`sidebar-page-admin shadow-sm px-3 py-3 ${openSideBar?'open':''} ${(currentRoute === '/admin/subjects'? 'hide' : '')}` }>
        <div className='d-flex justify-content-center'>
            <Link to={"#"} className='logo '>
                <i className="fa-brands fa-fantasy-flight-games py-2"></i>
            </Link>
            </div>
        <div className='user-small-des mt-4'>
            <img alt='user-avatar' src={avatar} />
            <h6 className='fw-bold m-0 p-0'>super {admin?.nom}</h6>
        </div>
        <nav className='mt-4'>
            <ul className='nav-list'>
                {/* <li className={currentRoute === '/admin'? "active" : ""}>
                    <Link to={'/admin'} ><i className="fa-solid fa-chart-column"></i>Tableau de bord</Link>
                </li> */}
                <li className={currentRoute === '/admin' || currentRoute === '/admin/add' || currentRoute === '/admin/settings'? "active" : ""}>
                    <Link to={'/admin'} className='nav-link'><i className="fa-solid fa-user-gear"></i>Administrateurs</Link>
                </li>
                <li className={currentRoute === '/admin/users' || currentRoute === '/admin/users/add'? "active" : ""}>
                    <Link to={'/admin/users'} className='nav-link'><i className="fa-solid fa-user-large"></i>Etudiants</Link>
                </li>
                <li className={currentRoute === '/admin/subjects'? "active" : ""}>
                    <Link to={'/admin/subjects'} className='nav-link'><i className="fa-regular fa-comment"></i>Rooms publiques</Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default SideBar