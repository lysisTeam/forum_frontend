import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import GlobalContext from '../Contexts/GlobalContext'

function AddAdmin() {
    const [nom, setNom] = useState("")
    const [prenoms, setprenoms] = useState("")
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [autorisation, setAutorisation] = useState(0)
    const [repeatPassword, setRepeatPassword] = useState('')
    const [success, setSuccess] = useState(false)
    const [showSpinner, setShowSpinner] = useState(false)

    const {showToast} = useContext(GlobalContext)

    const Navigate = useNavigate() 
    const apiUrl = process.env.REACT_APP_API_URL

    const handleSubmit = async(e)=>{
        e.preventDefault()

        setShowSpinner(true)

        await axios.post(apiUrl+'/api/admin/register',{
            nom: nom,
            email: email,
            prenoms: prenoms,
            password:password,
            autorisation:autorisation,
            passwordRepeat: repeatPassword
            // role: role
        },{
            headers:{
                token: localStorage.admin_token
            }
        })
        .then((response)=>{
            setSuccess(true)

            setShowSpinner(false)

            // console.log(response);
            setTimeout(() => {
                Navigate('/admin')
            }, 2000);
            
        })
        .catch((err)=>{
            setShowSpinner(false)

            // setTextError(err.response.data.error)
            // setCallError(true)

            // console.log(err)

            showToast(err.response.data.error, "bg-danger")
        })
    }
  return (
    <div className='add-user-section'>
        <Link to={'/admin'} className='btn fw-bold fs-6 btn-back' ><i class="fa-solid fa-angle-left"></i> Revenir à la liste</Link>
        <div className='mb-5'>
            <div className='bg-white p-4 mt-4 rounded shadow border position-relative'>
                {/* <AlertError textError={textError} callError={callError} setCallError={setCallError}/> */}
                <h6 className='fw-bold'>Données personnelles</h6>
                <form className='py-4' onSubmit={handleSubmit}>
                    <div className='row'>
                    <div className="mb-3 col-12 col-md-6 col-lg-6">
                        <label htmlFor="name" className="form-label">Nom*</label>
                        <input type="text" className="form-control" id="name" name='name' value={nom} onChange={(e)=>setNom(e.target.value)} required/>
                    </div>
                    <div className="mb-3 col-12 col-md-6 col-lg-6">
                        <label htmlFor="prenoms" className="form-label">Prénoms*</label>
                        <input type="text" className="form-control" id="prenoms" name='prenoms' value={prenoms} onChange={(e)=>setprenoms(e.target.value)} required/>
                    </div>
                    </div>
                    
                    
                    <div className='row'>
                        <div className="mb-3 col-12 col-lg-6 col-md-6">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email*</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                        </div>
                        
                        <div className="mb-3 col-12 col-lg-6 col-md-6">
                            <label htmlFor="" className="form-label">Autorisation*</label>
                            <select class="form-select" aria-label="Default select example" value={autorisation} onChange={e => setAutorisation(e.target.value)}>
                                <option value="0" selected>administrateur</option>
                                <option value="1">Super administrateur</option>
                            </select>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='mb-3 col-12 col-md-6 col-lg-6'>
                            <label htmlFor="inputPassword5" className="form-label">Mot de passe temporaire*</label>
                            <div class="input-group">
                                {/* <button class="btn btn-outline-secondary" type="button" id="button-addon1" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top"><i class="fa-solid fa-arrows-rotate"></i></button> */}
                                <input type="password" className="form-control" aria-labelledby="passwordHelpBlock" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                            </div>
                        </div>
                        <div className='mb-3 col-12 col-md-6 col-lg-6'>
                            <label htmlFor="inputPassword5" className="form-label">Repetez le mot de passe temporaire*</label>
                            <input type="password" className="form-control" aria-labelledby="passwordHelpBlock" value={repeatPassword} onChange={(e)=>setRepeatPassword(e.target.value)} required/>
                        </div>
                    </div>

                    <div className='d-flex justify-content-center mt-4'>
                        <button type="submit" className={`btn-submit btn ${(success)?'success':''} rounded shadow`}> {(!success)?'Valider':'Etudiant ajouté avec succès'}
                        
                        {
                            (!success)?
                                (!showSpinner)?
                                <i class="fa-solid fa-paper-plane"></i>
                                :
                                <div className="spinner-border" style={{width:"1.5rem", height: "1.5rem"}} role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            :
                            <i class="fa-solid fa-check-double fa-shake"></i>
                        }
                        </button>
                    </div>
                    
                </form>
            </div>
            {/* <AddPic image={image} setImage={setImage}/> */}
        </div>
    </div>
  )
}

export default AddAdmin