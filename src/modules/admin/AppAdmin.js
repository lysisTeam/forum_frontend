import React, { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import LoginAdmin from './Pages/LoginAdmin';
import MainPage from './Pages/MainPage';
// eslint-disable-next-line
import Dashboard from './Components/Dashboard';
import Administrateurs from './Components/Administrateurs';
import Users from './Components/Users';
import Subjects from './Components/Subjects';
import AdminContextProvider from './Contexts/AdminContextProvider';
import AddUser from './Components/AddUser';
import AddAdmin from './Components/AddAdmin';

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
            <AdminContextProvider>
                <MainPage>
                    <Routes>
                        {/* <Route path='/admin' Component={Dashboard}/> */}
                        <Route path='/admin' Component={Administrateurs}/>
                        <Route path='/admin/add' Component={AddAdmin}/>
                        <Route path='/admin/users' Component={Users}/>
                        <Route path='/admin/users/add' Component={AddUser}/>
                        <Route path='/admin/subjects' Component={Subjects}/>
                    </Routes>
                </MainPage>
            </AdminContextProvider>
        }
    </>
  )
}

export default AppAdmin