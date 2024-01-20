import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertError from '../Layouts/AlertError'

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
            Navigate('/admin')
        })
        .catch((err)=>{
            // console.log(err.response.data.error);
            setTextError(err.response.data.error)
            setCallError(true)


        })
        setShowSpinner(false)
    }

  return (
    <div className='login-page d-flex justify-content-center align-items-center px-4'>
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
    </div>
  )
}

export default LoginAdmin