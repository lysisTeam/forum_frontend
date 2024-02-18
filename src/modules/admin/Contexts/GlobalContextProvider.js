import React, { useEffect, useState } from 'react'
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

    const [db, setDB] = useState(null);


    const showToast = (message, theme)=>{

        setMessage(message)
        setTheme(theme)
        
        setTimeout(() => {
            const toastLiveExample = document.getElementById('liveToast')
        

            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)



            toastBootstrap.show()
        }, 1);
    }

    useEffect(()=>{
      const request = window.indexedDB.open("db", 1);

      request.onerror = () => {
        console.error('Erreur lors de l\'ouverture de la base de données');
      };

      request.onsuccess = (event) => {
        const database = event.target.result;
        setDB(database);
      };

      request.onupgradeneeded = (event) => {
        const database = event.target.result;
        if (!database.objectStoreNames.contains("rooms")) {
          const objectStore = database.createObjectStore("rooms", { keyPath: 'id', autoIncrement: true });
          // Définir d'autres index si nécessaire
        }
      };

    },[])

    const addData = (objectStoreName, data) => {
      if (db) {
        const transaction = db.transaction([objectStoreName], 'readwrite');
        const store = transaction.objectStore(objectStoreName);
        // const dataToAdd = { message: 'Hello, World!' };
        const request = store.add(data);
  
        request.onsuccess = () => {
          console.log('Données ajoutées avec succès');
        };
  
        request.onerror = () => {
          console.error('Erreur lors de l\'ajout des données');
        };
      }
    };
  return (
    <GlobalContext.Provider value={{message, theme, showToast, searchContent, setSearchContent, openSideBar, setOpenSideBar, openTopBar, setOpenTopBar, db, addData}}>
        {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider