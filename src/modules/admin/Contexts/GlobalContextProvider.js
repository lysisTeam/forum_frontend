import React, { useState } from 'react'
import GlobalContext from './GlobalContext'
import * as bootstrap from 'bootstrap';

function GlobalContextProvider({children}) {

    const [message, setMessage] = useState('')
    const [theme, setTheme] = useState('')

    //variable pour l'input de la recherche
    const [searchContent, setSearchContent] = useState("")

    //variable pour l'ouveruture du menu
    const [openSideBar, setOpenSideBar] = useState(false)

    //variable pour l'ouveruture du menu
    const [openTopBar, setOpenTopBar] = useState(false)


    const showToast = (message, theme)=>{

        setMessage(message)
        setTheme(theme)
        
        setTimeout(() => {
            const toastLiveExample = document.getElementById('liveToast')
        

            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)



            toastBootstrap.show()
        }, 1);
    }
  return (
    <GlobalContext.Provider value={{message, theme, showToast, searchContent, setSearchContent, openSideBar, setOpenSideBar, openTopBar, setOpenTopBar}}>
        {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider