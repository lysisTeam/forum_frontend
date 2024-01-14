import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import avatar from "../../../images/avatar_25.jpg"

function SideBar() {
  const location = useLocation()
  const currentRoute = location.pathname  

  return (
    <div className='sidebar-page-admin shadow px-4 py-3'>
        <Link to={"#"} className='logo'>
            <i class="fa-brands fa-fantasy-flight-games"></i>
        </Link>
        <div className='user-small-des mt-3'>
            <img alt='user-avatar' src={avatar} />
            <h6 className='fw-bold m-0 p-0'>super admin</h6>
        </div>
        <nav className='mt-3'>
            <ul className='nav-list'>
                <li className={currentRoute === '/admin/' && "active"}>
                    <Link to={'/admin/'} ><i class="fa-solid fa-chart-column"></i> Tableau de bord</Link>
                </li>
                <li className={currentRoute === '/admin/admins' && "active"}>
                    <Link to={'/admin/admins'} className='nav-link'><i class="fa-solid fa-user-gear"></i> Administrateurs</Link>
                </li>
                <li className={currentRoute === '/admin/users' && "active"}>
                    <Link to={'/admin/users'} className='nav-link'><i class="fa-solid fa-user-large"></i> Utilisateurs</Link>
                </li>
                <li className={currentRoute === '/admin/subjects' && "active"}>
                    <Link to={'/admin/subjects'} className='nav-link'><i class="fa-regular fa-comment"></i> Thèmes de discussion</Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default SideBar