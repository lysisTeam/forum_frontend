import React, { useEffect, useState } from 'react'
import AdminContext from './AdminContext'
import axios from 'axios'
import Loader from '../Layouts/Loader'

function AdminContextProvider({children}) {
    const [admin, setAdmin] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)

    const apiUrl = process.env.REACT_APP_API_URL

    useEffect(()=>{

        const getAdmin = async()=>{
            await axios.get(apiUrl+'/api/admin/',{
                headers:{
                    token: localStorage.getItem('admin_token')
                }
            }).then(response => {
                setAdmin(response.data.admin)
                setIsLoaded(true)
            }).catch(err => {
                console.log(err);
                setIsLoaded(true)
            })
        }

        getAdmin()
    },[apiUrl])
  return (
    <AdminContext.Provider value={{admin}}>
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