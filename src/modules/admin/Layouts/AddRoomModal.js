import axios from 'axios'
import React, { useContext, useState } from 'react'
import GlobalContext from '../Contexts/GlobalContext'
import AdminContext from '../Contexts/AdminContext'

function AddRoomModal({setRooms}) {
    const [image, setImage] = useState(null)
    const [titre, setTitre] = useState('')
    const [theme, setTheme] = useState('')
    const [imageReader, setImageReader] = useState(null)

    const [showSpinner, setShowSpinner] = useState(false)

    const {showToast} = useContext(GlobalContext)

    const {admin} = useContext(AdminContext)

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

        await axios.post(apiUrl+'/api/room/admin',{
            image: image,
            titre: titre,
            theme_de_discussion: theme,
            nom_createur: admin.nom + ' ' + admin.prenoms.split(' ')[0]
            // role: role
        },{
            headers:{
                "Content-Type": "multipart/form-data",
                token: localStorage.admin_token
            }
        })
        .then((response)=>{
            console.log(response);
            

            setTimeout(() => {
                setRooms(previous => [response.data.room, ...previous])
                setShowSpinner(false)
                document.querySelector('.close-modal').click()
                setImage(null)
                setTitre("")
                setTheme("")
                showToast("Room ajoutée avec succès", "bg-success")
            }, 2000);
            
        })
        .catch((err)=>{
            setShowSpinner(false)
            showToast(err.response.data.error, "bg-danger")
        })
    }
  return (
    <div className="modal fade" id="addRoomModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="addRoomModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
                <div className="modal-header" data-bs-theme="dark">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Ajouter une room</h1>
                    <button type="button" className="btn-close text-white close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form className='d-flex gap-3 form-add-room' onSubmit={handleSubmit}>
                        <div className='image-input rounded'>
                            {
                                (!imageReader)?
                                <span className='text-center text-muted'>Cliquez ici pour ajouter une image de couverture</span>
                                :
                                <img alt=''  src={imageReader}></img>
                            }
                            <button className='overlay d-flex justify-content-center align-items-center' onClick={clickFileInput}>
                            {
                                (!imageReader)?
                                    <i className="fa-solid fa-square-plus fs-3" style={{color: 'white'}}></i>
                                :
                                    <i className="fa-solid fa-pen-to-square fs-3" style={{color: 'white'}}></i>
                            }
                            
                            </button>
                            
                            {
                                imageReader &&
                                <button className='btn-delete btn btn-dark' onClick={()=>deletePic()}><i className="fa-solid fa-trash"></i></button>
                            }
                            
                            <input className="form-control d-none" id='file' type="file" accept="image/*" onChange={handleChange}/>
                        </div>

                        <div className='flex-grow-1 p-2 rounded'>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Titre</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required placeholder='Ex: Les hooks de React...' value={titre} onChange={(e)=>setTitre(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label fw-bold">Thèmes de discussion</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" placeholder='Ex: Programmation web...' required value={theme} onChange={(e)=>setTheme(e.target.value)}/>
                            </div>
                            <div className='mt-3 text-end'>
                                <button type="submit" className="btn btn-dark btn-sm">
                                    Ajouter la room &nbsp;
                                    {
                                        (!showSpinner)?
                                        <i className="fa-solid fa-plus"></i>
                                        :
                                        <div className="spinner-border" style={{width:"1.5rem", height: "1.5rem"}} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    }
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {/* <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Understood</button>
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default AddRoomModal