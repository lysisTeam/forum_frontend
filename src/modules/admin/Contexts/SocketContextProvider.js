import React, { useEffect, useState } from 'react'
import SocketContext from './SocketContext'
import socketIOClient from "socket.io-client"

function SocketContextProvider({children}) {
    const [socket, setSocket] = useState(null)

    useEffect(()=>{
        const newSocket = socketIOClient( process.env.REACT_APP_API_URL )

        setSocket( newSocket )

        return () =>{
            newSocket.disconnect()
        }
    },[])


  return (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
  )
}

export default SocketContextProvider