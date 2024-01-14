import React, { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import LoginAdmin from './Components/LoginAdmin';
import MainPage from './Components/MainPage';
import Dashboard from './Components/Dashboard';
import Administrateurs from './Components/Administrateurs';
import Users from './Components/Users';
import Subjects from './Components/Subjects';

function AppAdmin() {
    const Navigate = useNavigate()
    const location = useLocation()
    const currentRoute = location.pathname  

    useEffect(()=>{
        if (!localStorage.admin_token) {
            Navigate('/admin/login')
        }
    },[Navigate])
  return (
    <>
        <Routes>
            <Route path='/admin/login' Component={LoginAdmin} />
        </Routes>

        {
            currentRoute !== '/admin/login' &&
            <MainPage>
                <Routes>
                    <Route path='/admin/' Component={Dashboard}/>
                    <Route path='/admin/admins' Component={Administrateurs}/>
                    <Route path='/admin/users' Component={Users}/>
                    <Route path='/admin/subjects' Component={Subjects}/>
                </Routes>
            </MainPage>
        }
    </>
  )
}

export default AppAdmin