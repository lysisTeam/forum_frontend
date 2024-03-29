import React, { useContext, useEffect, useState } from 'react'
import ImageLetters from './ImageLetters'
import AdminContext from '../Contexts/AdminContext'
import CustomizedSwitches from './CheckSwitch'

function ProfilModal({currentRoom, users}) {
  const apiUrl = process.env.REACT_APP_API_URL
  const {admin} = useContext(AdminContext)
  const [number, setNumber] = useState(3)

//   useEffect(()=>{
    
//   },[])

  return (
    <>
        <div class="modal fade" id="profil" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content ">
                    <div class="modal-header">
                        <div className='profil-photo'>
                            {
                                (currentRoom.cover)?
                                <img alt='cover' src={apiUrl+'/'+currentRoom.cover}/>
                                :
                                <ImageLetters nom={currentRoom.titre || ""} prenoms={""} size={120} fs={25}></ImageLetters>
                            }
                        </div>
                        <button className='btn-close-modal' data-bs-dismiss="modal" aria-label="Close">x</button>
                    </div>

                    <div className='modal-body'>
                        <div className='entete-body'>
                            <h4 className='fw-bold text-center text-dark m-1'>{currentRoom.titre}</h4>
                            <p className='text-center text-muted' style={{fontSize: "0.75rem"}}>Créé par&nbsp;
                            {
                                currentRoom.id_createur === admin._id ?
                                "vous"
                                :
                                users.find(user => user._id === currentRoom.id_createur)?.nom
                            }
                            </p>
                            <button className='btn-update'><i class="fa-solid fa-pen"></i></button>
                        </div>
                        <div className='list-button'>
                            <button className=''><i class="bi bi-chat-dots"></i> Envoyer un message</button>
                            <button className=''><i class="bi bi-telephone"></i> Lancer un appel vocal</button>
                            <button className=''><i class="bi bi-camera-video"></i> Lancer un appel vidéo</button>
                            <button className=''><i class="bi bi-images"></i> Voir les médias</button>
                        </div>
                        <div className='my-5'>
                            <p className='mb-2' style={{fontSize: '0.8rem'}}>{`${currentRoom.members?.length} PARTICIPANT${currentRoom.members?.length < 2 ? '' : 'S'}`}</p>
                            <div className='liste-members'>
                                <div className='add-members rounded'>
                                    <div className='plus-span img'><i class="fa-solid fa-plus"></i></div>
                                    <div className='name' data-bs-target="#add-members" data-bs-toggle="modal" data-bs-dismiss="modal">Ajouter des participants</div>
                                </div>
                                {
                                    currentRoom.members?.slice(0, number)?.map((member)=>(
                                        <div className='add-members rounded'>
                                            {
                                                (users.find(user => user._id === member.id)?.photo)?
                                                <img alt='pp' src={apiUrl+'/'+users.find(user => user._id === member.id)?.photo}/>
                                                :
                                                <ImageLetters nom={users.find(user => user._id === member.id )?.nom || ""} prenoms={users.find(user => user._id === member.id)?.prenoms || ""}></ImageLetters>
                                                }
                                            <div className='name'>
                                                {users.find(user => user._id === member.id)?.nom} {users.find(user => user._id === member.id)?.prenoms} {(member.id === admin._id)? "( Vous )" : ""}
                                                {
                                                    (member.id !== admin._id) && (member.id !== currentRoom.id_createur) &&
                                                    <button className='delete-user rounded-5'>Supprimer</button>
                                                }

                                                {
                                                    (member.id === currentRoom.id_createur) &&
                                                    <span className='text-muted fw-none' style={{fontSize: '0.8rem'}}>Créateur</span>
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    currentRoom.members?.length > 3 && currentRoom.members?.length !== number &&
                                    <p className='text-muted text-end mt-2' style={{fontSize: '0.8rem', cursor: 'pointer'}} onClick={()=>setNumber(currentRoom.members?.length)}>Afficher plus</p>
                                }
                                
                            </div>
                        </div>

                        <div className='my-5 mb-0'>
                            <p className='mb-2' style={{fontSize: '0.8rem'}}>PARAMETRES DE LA ROOM</p>
                            <div className='list-button-params'>
                                
                                <div className='param-btns'>
                                    Masquer la room pour les étudiants
                                    <CustomizedSwitches check={false}/>
                                </div>

                                <div className='param-btns'>
                                    Envoyer des messages ( étudiants )
                                    <CustomizedSwitches check={true}/>
                                </div>

                                <div className='param-btns'>
                                    Notifications
                                    <CustomizedSwitches check={true}/>
                                </div>
                                <button className='text-danger border-0'>Supprimer la room</button>
                                {/* <button className='text-danger border-0'>Quitter la room</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="add-members" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">Modal 2</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Hide this modal and show the first with the button below.
                </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" data-bs-target="#profil" data-bs-toggle="modal">Back to first</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ProfilModal