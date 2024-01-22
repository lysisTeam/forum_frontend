import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AddPic from '../Layouts/AddPic'
import axios from 'axios'
import AlertError from '../Layouts/AlertError'

function AddUser() {
    const [image, setImage] = useState(null)
    const [nom, setNom] = useState("")
    const [prenoms, setprenoms] = useState("")
    const [specialite, setSpecialite] = useState("")
    const [classe, setClasse] = useState("")
    // const [username, setusername] = useState("")
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [imageReader, setImageReader] = useState(null)

    const [showSpinner, setShowSpinner] = useState(false)
    const [success, setSuccess] = useState(false)

    const [textError,setTextError] = useState('')
    const [callError,setCallError] = useState(false)

    const Navigate = useNavigate() 
    const apiUrl = process.env.REACT_APP_API_URL

    const clickFileInput = (e) =>{
        e.preventDefault()
        document.getElementById('file').click()
    }

    const handleChange = (e)=>{
        e.preventDefault()
        const file = e.target.files[0]

        if (file) {
            const reader = new FileReader()
            reader.onloadend = () =>{
                setImageReader(reader.result)
                setImage(e.target.files[0])
            }
            reader.readAsDataURL(file)
        }

    }

    const deletePic = () => {
        setImageReader(null)
        setImage(null)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()

        setShowSpinner(true)

        await axios.post(apiUrl+'/api/user/create-user',{
            image: image,
            nom: nom,
            email: email,
            prenoms: prenoms,
            specialite: specialite,
            classe: classe,
            password:password,
            passwordRepeat: repeatPassword
            // role: role
        },{
            headers:{
                "Content-Type": "multipart/form-data",
                token: localStorage.admin_token
            }
        })
        .then((response)=>{
            setSuccess(true)

            setShowSpinner(false)

            // console.log(response);
            setTimeout(() => {
                Navigate('/admin/users')
            }, 2000);
            
        })
        .catch((err)=>{
            setShowSpinner(false)

            setTextError(err.response.data.error)
            setCallError(true)

            // console.log(err)
        })
    }

  return (
    <div className='add-user-section'>
        <Link to={'/admin/users'} className='btn fw-bold fs-6 btn-back' ><i class="fa-solid fa-angle-left"></i> Revenir à la liste</Link>
        <div className='mb-5'>
            <div className='bg-white p-4 mt-4 rounded shadow border position-relative'>
                <AlertError textError={textError} callError={callError} setCallError={setCallError}/>
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
                    
                    
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email*</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                    </div>
                    <div className='row'>
                        <div className="mb-3 col-12 col-lg-6 col-md-6">
                            <label htmlFor="specialite" className="form-label">Spécialité*</label>
                            <input type="text" className="form-control" id="specialite" name='specialite' value={specialite} onChange={(e)=>setSpecialite(e.target.value)} required/>
                        </div>
                        
                        <div className="mb-3 col-12 col-lg-6 col-md-6">
                            <label htmlFor="classe" className="form-label">Classe*</label>
                            <input type="text" className="form-control" id="classe" name='classe' value={classe} onChange={(e)=>setClasse(e.target.value)} required/>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='mb-3 col-12 col-md-6 col-lg-6'>
                            <label htmlFor="inputPassword5" className="form-label">Mot de passe*</label>
                            <input type="password" className="form-control" aria-labelledby="passwordHelpBlock" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                        </div>
                        <div className='mb-3 col-12 col-md-6 col-lg-6'>
                            <label htmlFor="inputPassword5" className="form-label">Repetez le mot de passe*</label>
                            <input type="password" className="form-control" aria-labelledby="passwordHelpBlock" value={repeatPassword} onChange={(e)=>setRepeatPassword(e.target.value)} required/>
                        </div>
                    </div>

                    <hr></hr>
                    <div className='d-flex justify-content-between align-items-center flex-wrap gap-3'>
                        <div className='d-flex gap-2 align-items-center'>
                            <div className='position-relative pic-preference-section'>
                                {/* <img className='pic-preference' alt='' src={'https://i.pinimg.com/originals/38/3d/e0/383de0cdfd99a0dc1edb98e2481b8468.jpg'}></img> */}
                                {
                                    (!imageReader)?
                                    <img className='pic-preference' alt=''  src={'https://i.pinimg.com/originals/38/3d/e0/383de0cdfd99a0dc1edb98e2481b8468.jpg'}></img>
                                    :
                                    <img className='pic-preference' alt=''  src={imageReader}></img>
                                }
                                <button className='overlay d-flex justify-content-center align-items-center' onClick={clickFileInput}>
                                {
                                    (!imageReader)?
                                        <i class="fa-solid fa-square-plus" style={{color: 'white'}}></i>
                                    :
                                        <i class="fa-solid fa-pen-to-square" style={{color: 'white'}}></i>
                                }
                                
                                </button>
                                <input className="form-control d-none" id='file' type="file" accept="image/*" onChange={handleChange} />
                            </div>
                                
                            <div>
                                <h6 className='fw-bold m-0'>Photo de profil</h6>
                                <p className='text-muted m-0' style={{fontSize: '13px'}}>Taille idéale : 400px x 400px</p>
                            </div>
                        </div>
                        {/* <button type="button" className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#updatePic">Ajouter une photo</button> */}
                        {
                            (imageReader) &&
                            <div>
                                <button onClick={deletePic} className='btn btn-outline-secondary btn-sm'><i class="fa-solid fa-trash-can"></i> Supprimer la photo</button>
                            </div>
                        }
                        
                    </div>
                    <hr></hr>

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
            <AddPic image={image} setImage={setImage}/>
        </div>
    </div>
  )
}

export default AddUser