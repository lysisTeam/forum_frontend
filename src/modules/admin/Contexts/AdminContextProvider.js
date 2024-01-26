import React, { useEffect, useState } from 'react'
import AdminContext from './AdminContext'
import axios from 'axios'
import Loader from '../Layouts/Loader'
import { useNavigate } from 'react-router-dom'
import * as bootstrap from 'bootstrap';

function AdminContextProvider({children}) {
    const [admin, setAdmin] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState('')
    const [theme, setTheme] = useState('')
    const Navigate = useNavigate()

    const apiUrl = process.env.REACT_APP_API_URL

    useEffect(()=>{

        const getAdmin = async()=>{
            // console.log(localStorage.getItem('admin_token'));
            await axios.get(apiUrl+'/api/admin/',{
                headers:{
                    token: localStorage.getItem('admin_token')
                }
            }).then(response => {
                setAdmin(response.data.admin)
                // console.log(response.data.admin)
                setTimeout(() => {
                    setIsLoaded(true)
                }, 1000);
                
            }).catch(err => {
                // console.log(err);
                setTimeout(() => {
                    setIsLoaded(true)
                }, 1000);
            })
        }

        getAdmin()
    },[apiUrl])

    const logout = () =>{
        localStorage.removeItem('admin_token')
        Navigate('/admin/login')
    }

    const showToast = (message, theme)=>{

        setMessage(message)
        setTheme(theme)
        
        setTimeout(() => {
            const toastLiveExample = document.getElementById('liveToast')
        

            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

            console.log(theme, ' /', message);

            toastBootstrap.show()
        }, 1);
    }
  return (
    <AdminContext.Provider value={{admin, logout, message, theme, showToast}}>
        {
            (!isLoaded)?
            <Loader/>
            :
            <>{children}</>
        }
    </AdminContext.Provider>
  )
}

export default AdminContextProvider