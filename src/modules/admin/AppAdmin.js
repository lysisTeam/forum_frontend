import React, { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useJwt } from "react-jwt";
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
import Settings from './Components/Settings';
import GlobalContextProvider from './Contexts/GlobalContextProvider';
import Alerte from './Layouts/Alerte';
import SocketContextProvider from './Contexts/SocketContextProvider';


function AppAdmin() {
    const Navigate = useNavigate()
    const location = useLocation()
    const currentRoute = location.pathname 
    const { decodedToken } = useJwt(localStorage.admin_token || "") 
    

    useEffect(()=>{
        if (!localStorage.admin_token) {
            Navigate('/admin/login')
        }
        else{
            if (decodedToken) {
                // console.log("expired : ",decodedToken)
                const isTokenExpired = decodedToken.exp < Date.now() / 1000;
                // console.log(isTokenExpired);
                try {
                    if (isTokenExpired) {
                        // Le token a expiré, redirigez vers la page de connexion
                        console.log("expiré");
                        localStorage.removeItem('admin_token')
                        
                        Navigate('/admin/login')
                    }
                }catch (error) {
                    Navigate('/admin/login')
                }
            }
            

        }
    },[Navigate, decodedToken])
  return (
    <>
    
    <GlobalContextProvider>
        
            <Routes>
                <Route path='/admin/login' Component={LoginAdmin} />
            </Routes>

            {
                currentRoute !== '/admin/login' &&
                <AdminContextProvider>
                    <SocketContextProvider>
                        <MainPage>
                            <Routes>
                                {/* <Route path='/admin' Component={Dashboard}/> */}
                                <Route path='/admin' Component={Administrateurs}/>
                                <Route path='/admin/add' Component={AddAdmin}/>
                                <Route path='/admin/settings' Component={Settings}/>
                                <Route path='/admin/users' Component={Users}/>
                                <Route path='/admin/users/add' Component={AddUser}/>
                                <Route path='/admin/subjects' Component={Subjects}/>
                            </Routes>
                        </MainPage>
                    </SocketContextProvider>
                </AdminContextProvider>
            }

            <Alerte/>
    </GlobalContextProvider>
    
    </>
  )
}

export default AppAdmin