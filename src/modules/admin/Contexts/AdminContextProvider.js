import React, { useEffect, useState } from 'react'
import AdminContext from './AdminContext'
import axios from 'axios'
import Loader from '../Utils/Loader'
import { useNavigate } from 'react-router-dom'

function AdminContextProvider({children}) {
    const [admin, setAdmin] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
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

  return (
    <AdminContext.Provider value={{admin, setAdmin, logout}}>
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