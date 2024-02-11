import axios from 'axios'
import React, { useContext, useState } from 'react'
import GlobalContext from '../Contexts/GlobalContext'

function AddRoomModal({setRooms}) {
    const [image, setImage] = useState(null)
    const [titre, setTitre] = useState('')
    const [theme, setTheme] = useState('')
    const [imageReader, setImageReader] = useState(null)

    const [showSpinner, setShowSpinner] = useState(false)

    const {showToast} = useContext(GlobalContext)

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
            theme_de_discussion: theme
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
    <div class="modal fade" id="addRoomModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addRoomModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header" data-bs-theme="dark">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Ajouter une room</h1>
                    <button type="button" className="btn-close text-white close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
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
                                    <i class="fa-solid fa-square-plus fs-3" style={{color: 'white'}}></i>
                                :
                                    <i class="fa-solid fa-pen-to-square fs-3" style={{color: 'white'}}></i>
                            }
                            
                            </button>
                            
                            {
                                imageReader &&
                                <button className='btn-delete btn btn-dark' onClick={()=>deletePic()}><i class="fa-solid fa-trash"></i></button>
                            }
                            
                            <input className="form-control d-none" id='file' type="file" accept="image/*" onChange={handleChange}/>
                        </div>

                        <div className='flex-grow-1 p-2 rounded'>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label fw-bold">Titre</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required placeholder='Ex: Les hooks de React...' value={titre} onChange={(e)=>setTitre(e.target.value)}/>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label fw-bold">Thèmes de discussion</label>
                                <input type="text" class="form-control" id="exampleInputPassword1" placeholder='Ex: Programmation web...' required value={theme} onChange={(e)=>setTheme(e.target.value)}/>
                            </div>
                            <div className='mt-3 text-end'>
                                <button type="submit" class="btn btn-dark btn-sm">
                                    Ajouter la room &nbsp;
                                    {
                                        (!showSpinner)?
                                        <i class="fa-solid fa-plus"></i>
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
                {/* <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Understood</button>
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default AddRoomModal