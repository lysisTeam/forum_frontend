import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertError from '../Layouts/AlertError'
import * as bootstrap from 'bootstrap';
import { motion } from 'framer-motion';

function LoginAdmin() {
    const [username,setUsername] = useState('')
    const [password,setpassword] = useState('')

    const [textError,setTextError] = useState('')
    const [callError,setCallError] = useState(false)
    
    const [showSpinner,setShowSpinner] = useState(false)
    const Navigate = useNavigate()  
    const apiUrl = process.env.REACT_APP_API_URL
    
    useEffect(()=>{
        if (localStorage.admin_token) {
            Navigate('/admin')
        }
    },[Navigate])

    const handleSubmit = async(e) =>{
        e.preventDefault()
        setShowSpinner(true)
        
        await axios.post(apiUrl+'/api/admin/login',{
            username: username,
            password: password
        })
        .then(response =>{
            console.log(response);
            localStorage.setItem('admin_token',response.data.token)
            setTimeout(() => {
                Navigate('/admin')
            }, 1);
        })
        .catch((err)=>{
            // console.log(err.response.data.error);
            // setTextError(err.response.data.error)
            // setCallError(true)
            showToast(err.response.data.error)


        })
        setShowSpinner(false)
    }

    const showToast = (message)=>{
        const toastLiveExample = document.getElementById('liveToast')

        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        setTextError(message)
        toastBootstrap.show()
    }

  return (
    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.5 }} className='login-page d-flex justify-content-center align-items-center px-4'>
        <div className='login-wild-section d-flex gap-2'>
            <div className='login-left-section rounded shadow'></div>
            <div className='login-right-section rounded shadow p-3 d-flex flex-column justify-content-center gap-5'>
                <AlertError textError={textError} callError={callError} setCallError={setCallError}/>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h1 className='fw-bold p-0 m-0'>Se connecter</h1>
                    <p className='m-0 p-0'>Content de vous revoir !!!</p>
                </div>
                <form onSubmit={(e)=>handleSubmit(e)}>
                      <div className="mb-3">
                          <label htmlFor="exampleInputEmail1" className="form-label">Nom d'utilisateur</label>
                          <input type="text" className="form-control fw-bold fs-5" id="exampleInputEmail1" aria-describedby="emailHelp" required value={username} onChange={(e)=>setUsername(e.target.value)} />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="exampleInputPassword1" className="form-label">Mot de passe</label>
                          <input type="password" className="form-control fw-bold fs-5" id="exampleInputPassword1" required value={password} onChange={(e)=>setpassword(e.target.value)}/>
                      </div>
                      <div className='d-flex justify-content-center mt-4'>
                        <button type="submit" className="btn-submit rounded">Se connecter 
                        {
                            (!showSpinner)?
                            <i className="fa-solid fa-right-to-bracket"></i>
                            :
                            <div className="spinner-border" style={{width:"1.5rem", height: "1.5rem"}} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        }
                        </button>
                      </div>
                  </form>
            </div>
        </div>

        <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="liveToast" className="toast bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
                {/* <div className="toast-header">
                <strong className="me-auto">Alerte</strong>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div> */}
                <div className="toast-body text-white">
                {textError}
                </div>
            </div>
        </div>
    </motion.div>
  )
}

export default LoginAdmin