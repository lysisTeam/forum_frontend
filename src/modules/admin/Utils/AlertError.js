import React, { useEffect, useState } from 'react'

function AlertError({textError, callError, setCallError}) {
    const [error,setError] = useState('')
    const [showAlert,setShowAlert] = useState(false)

    

    useEffect(()=>{
        const showError = () =>{

            setError(textError)
            setShowAlert(true)
            
            setTimeout(() => {
                if (document.querySelector('.bottom-line span')) {
                    document.querySelector('.bottom-line span').style.width = 0
                }
            }, 100);
            
            setTimeout(() => {
                 // document.querySelector('.bottom-line span').style.visibility = 'hidden'
                 if (document.querySelector('.bottom-line span')) {
                    document.querySelector('.bottom-line span').style.width = '100%'
                }
                 
                 setShowAlert(false)
                 setCallError(false)
            }, 3100);
       
            
        }

        if (callError) showError()
    },[callError, textError, setCallError])
  return (
    <>
        {
            (showAlert) &&
            <div className="alert fw-bold py-1 shadow" role="alert">
                {error}
                <div className='bottom-line'><span ></span></div>
            </div>
        }
    </>
  )
}

export default AlertError