import React, { useContext, useEffect, useMemo, useState } from 'react'
import SocketContext from './SocketContext'
import {io} from "socket.io-client"
// import GlobalContext from './GlobalContext'
import AdminContext from './AdminContext'

function SocketContextProvider({children}) {
    const socket = useMemo( () => io(process.env.REACT_APP_API_URL), [])
    const {admin} = useContext(AdminContext)

    useEffect(()=>{
      // console.log(socket);
      if (admin._id) {
        socket.emit('add-user', admin._id)
      }

      return () => {
        socket.emit('disconnect-user', admin._id)

        // socket.disconnect();
        
      };

    },[socket, admin._id])

  return (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
  )
}

export default SocketContextProvider