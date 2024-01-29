import React, { useContext, useEffect, useState } from 'react'
import AdminContext from '../Contexts/AdminContext'

import { motion } from 'framer-motion';
import axios from 'axios';
import GlobalContext from '../Contexts/GlobalContext';

function Settings() {
  const [nom, setNom] = useState("")
    const [prenoms, setPrenoms] = useState("")
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('')
    const [email, setEmail] = useState('')
    const [autorisation, setAutorisation] = useState(0)

    
    const [showSpinner, setShowSpinner] = useState(false)

    const [isEditing, setIsEditing] = useState(false)
    const [isEditingPassword, setIsEditingPassword] = useState(false)

    const {admin, setAdmin} = useContext(AdminContext)
    const {showToast} = useContext(GlobalContext)

    const apiUrl = process.env.REACT_APP_API_URL

    useEffect(()=>{
        setNom(admin.nom)
        setPrenoms(admin.prenoms)
        setEmail(admin.email)
        setAutorisation(admin.autorisation)
    },[admin])

    const handleSubmit = async(e)=>{
      e.preventDefault()
      setShowSpinner(true)

      await axios.put(apiUrl+'/api/admin/'+admin._id, {
        nom: nom,
        prenoms: prenoms,
        email: email,
        oldPassword: password,
        password: newPassword || admin.password,
        passwordRepeat: newPasswordRepeat
      },{
        headers:{
            token: localStorage.getItem('admin_token')
        }
      })
      .then((response)=>{
        setAdmin(response.data.admin)
        handleCancel(response.data.admin)
        showToast("Sauvegarde réussie","bg-success")
        
      })
      .catch((err)=>{
        console.log(err);
        showToast(err.response.data,"bg-danger")
        setShowSpinner(false)
      })

    }

    const handleCancel = (admin) =>{
        setNom(admin.nom)
        setPrenoms(admin.prenoms)
        setEmail(admin.email)

        setPassword('')
        setNewPassword('')
        setNewPasswordRepeat('')

        setIsEditing(false)
        setIsEditingPassword(false)

        setShowSpinner(false)
    }
  return (
    <motion.div initial={{ opacity: 0}} animate={{ opacity: 1}} exit={{ opacity: 0}} transition={{ duration: 0.5 }} className='add-user-section'>
        <div className='mb-5'>
        <h4 className='fw-bold'>Paramètres</h4>
            <div className='bg-white p-4 pb-2 mt-4 rounded shadow border position-relative'>
                {/* <AlertError textError={textError} callError={callError} setCallError={setCallError}/> */}
                <form className='personal-form' onSubmit={handleSubmit}>
                    {/* <hr></hr> */}
                    <div className='d-flex justify-content-between align-items-center mb-4'>
                      <h6 className='fw-bold'>Données personnelles</h6>
                      {
                        (isEditing)?
                        <div className='d-flex gap-1'>
                            <button className='btn btn-sm btn-outline-secondary' type="button" onClick={()=>handleCancel(admin)}>Annuler</button>
                            <button className='btn btn-sm btn-dark' type="submit">
                            Sauvegarder les changements &nbsp;
                            {
                                (!showSpinner)?
                                <i className="fa-solid fa-floppy-disk"></i>
                                :
                                <div className="spinner-border" style={{width:"1rem", height: "1rem"}} role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            }
                                
                            </button>
                        </div>
                        :
                        <button className='btn btn-sm btn-outline-dark' type="button" onClick={()=>{handleCancel(admin); setIsEditing(true)}} >Editer</button>
                      }
                    </div>
                    
                    <div className='row'>
                    <div className="mb-3 col-12 col-md-6 col-lg-6">
                        <label htmlFor="name" className="form-label">Nom*</label>
                        <input type="text" className="form-control" id="name" name='name' value={nom} onChange={(e)=>setNom(e.target.value)} required disabled={!isEditing}/>
                    </div>
                    <div className="mb-3 col-12 col-md-6 col-lg-6">
                        <label htmlFor="prenoms" className="form-label">Prénoms*</label>
                        <input type="text" className="form-control" id="prenoms" name='prenoms' value={prenoms} onChange={(e)=>setPrenoms(e.target.value)} required disabled={!isEditing}/>
                    </div>
                    </div>
                    
                    
                    <div className='row'>
                        <div className="mb-3 col-12 col-lg-6 col-md-12">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email*</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" value={email} onChange={(e)=>setEmail(e.target.value)} required disabled={!isEditing}/>
                        </div>

                        <div className="mb-3 col-12 col-lg-6 col-md-6">
                            <label htmlFor="" className="form-label">Autorisation*</label>
                            <select className="form-select" aria-label="Default select example" value={autorisation} onChange={e => setAutorisation(e.target.value)} disabled>
                                <option value="0">administrateur</option>
                                <option value="1">Super administrateur</option>
                            </select>
                        </div>
                        
                    </div>
                </form>

                <form onSubmit={handleSubmit}>
                    <hr></hr>
                    <div className='d-flex justify-content-between align-items-center mb-4'>
                      <h6 className='fw-bold'>Mon mot de passe</h6>
                      {
                        (isEditingPassword)?
                        <div className='d-flex gap-1'>
                            <button className='btn btn-sm btn-outline-secondary' type="button" onClick={()=>handleCancel(admin)}>Annuler</button>
                            <button className='btn btn-sm btn-dark' type="submit">
                                Sauvegarder le nouveau mot de passe &nbsp;
                                {
                                (!showSpinner)?
                                <i className="fa-solid fa-floppy-disk"></i>
                                :
                                <div className="spinner-border" style={{width:"1rem", height: "1rem"}} role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            }
                            </button>
                        </div>
                        :
                        <button className='btn btn-sm btn-outline-dark' type='button' onClick={()=>{handleCancel(admin); setIsEditingPassword(true)}}>Editer mon mot de passe</button>
                      }
                    </div>
                    <div className={`row section-mdp ${isEditingPassword? 'show' : ''} `}>
                        <div className='mb-3 col-12 col-md-12 col-lg-12'>
                            <label htmlFor="inputPassword5" className="form-label">Mot de passe actuel*</label>
                            <div className="input-group">
                                {/* <button className="btn btn-outline-secondary" type="button" id="button-addon1" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top"><i className="fa-solid fa-arrows-rotate"></i></button> */}
                                <input type="password" className="form-control" aria-labelledby="passwordHelpBlock" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                            </div>
                        </div>
                        <div className='mb-3 col-12 col-md-6 col-lg-6'>
                            <label htmlFor="inputPassword5" className="form-label">Nouveau mot de passe*</label>
                            <div className="input-group">
                                {/* <button className="btn btn-outline-secondary" type="button" id="button-addon1" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top"><i className="fa-solid fa-arrows-rotate"></i></button> */}
                                <input type="password" className="form-control" aria-labelledby="passwordHelpBlock" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} required />
                            </div>
                        </div>
                        <div className='mb-3 col-12 col-md-6 col-lg-6'>
                            <label htmlFor="inputPassword5" className="form-label">Repetez le nouveau mot de passe*</label>
                            <input type="password" className="form-control" aria-labelledby="passwordHelpBlock" value={newPasswordRepeat} onChange={(e)=>setNewPasswordRepeat(e.target.value)} required/>
                        </div>
                    </div>

                    {/* <div className='d-flex justify-content-center mt-4'>
                        <button type="submit" className={`btn-submit btn ${(success)?'success':''} rounded shadow`}> {(!success)?'Valider':'Etudiant ajouté avec succès'}
                        
                        {
                            (!success)?
                                (!showSpinner)?
                                <i className="fa-solid fa-paper-plane"></i>
                                :
                                <div className="spinner-border" style={{width:"1.5rem", height: "1.5rem"}} role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            :
                            <i className="fa-solid fa-check-double fa-shake"></i>
                        }
                        </button>
                    </div> */}
                </form>
                <hr></hr>
                <h6 className='text-end text-muted'><i className="fa-brands fa-fantasy-flight-games"></i>&nbsp;&nbsp;</h6>
            </div>
            {/* <AddPic image={image} setImage={setImage}/> */}
        </div>
    </motion.div>
  )
}

export default Settings