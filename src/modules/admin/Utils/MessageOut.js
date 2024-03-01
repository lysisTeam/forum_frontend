import React, { useEffect } from 'react'
import ImageListItem from '@mui/material/ImageListItem';
import AudioPlayer from './AudioPlayer';


function MessageOut({message, handleHover, handleHoverLeave, afficherDateMessage, response, admin, users, handleClickModif, handleClickOption, setMessageToDelete, copyToClipboard, handleClickResponse}) {
    const apiUrl = process.env.REACT_APP_API_URL
    // useEffect(()=>{
    //     console.log(message);
    // },[])
  return (
    <div className='message-sortant' onMouseOver={(e)=>handleHover(e)} onMouseLeave={(e)=>handleHoverLeave(e)} key={message._id}>
        <span className='name fst-italic'>Vous, {afficherDateMessage(message.createdAt)}</span>
        <div className=' rounded message-container py-0'>
            {/* {message.contenue.replace(/\n/g, "<br>")} */}

            <div className='pl-5'>
                {
                    message.isResponseTo && !message.deleted &&
                    <div className={`response-section rounded py-1 px-2 mx-1 mt-1 ${response?.deleted ? 'blur' : ''}`}>
                        <div className='d-flex justify-content-between gap-5 align-items-end'>
                            <div>
                                <i className="fa-solid fa-reply" style={{fontSize: "0.6rem"}}></i>

                                {
                                    response?.contenue ?
                                    <div className='response'>
                                        {
                                            response?.files.length !== 0 &&
                                            <>
                                                {
                                                    response?.files[0].type === 'image' &&
                                                    <><i class="fa-regular fa-image"></i> </>
                                                }

                                                {
                                                    response?.files[0].type === 'document' &&
                                                    <><i class="fa-regular fa-file"></i> Doc : </>
                                                }
                                            </>
                                        }
                                        <span className='' dangerouslySetInnerHTML={{ __html: response?.contenue.replace(/\n/g, "<br>") }} />
                                    </div>
                                    :
                                        response?.files.length !== 0 &&
                                        <>
                                            {
                                                response?.files[0].type === 'image' &&
                                                <div style={{marginLeft: '15px'}}><i class="fa-regular fa-image"></i> Image</div>
                                            }

                                            {
                                                response?.files[0].type === 'document' &&
                                                <div style={{marginLeft: '15px'}}><i class="fa-regular fa-file"></i> Doc : {response?.files[0].name}</div>
                                            }

                                            {
                                                response?.files[0].type === 'audio' &&
                                                <div style={{marginLeft: '15px'}}><i class="fa-solid fa-microphone"></i> Message vocal</div>

                                            }
                                        </>
                                }

                                {/* <span className='response-name'>
                                Envoyé par&nbsp;
                                {
                                    response?.id_user !== admin._id ?

                                    users?.find(user => user._id === response.id_user)?.nom
                                    : 
                                    "Vous"
                                }
                                </span> */}

                                <span className='response-name'>
                                    Envoyé par&nbsp;
                                    {
                                        response?.id_user !== admin._id ?

                                        users?.find(user => user._id === response.id_user)?.nom
                                        : 
                                        "Vous"
                                    }
                                </span>
                            
                            </div>
                            {
                                response?.files.length !== 0 && response?.files[0]?.type === 'image' &&
                                <img className='rounded' style={{width: '45px', height: '45px', objectFit: 'cover'}} src={apiUrl + '/' + response?.files[0]?.path}></img>
                            }
                        </div>
                        {/* {afficherDateMessage(response.updatedAt)} */}
                        <hr className='my-1'></hr>
                    </div>
                }
            
                {
                    !message.deleted ?
                    <div>
                        {
                            message.files && message.files.length !== 0 && (message.files.filter(file => file.type === 'image').length !== 0) &&
                            <div className='d-flex gap-2 flex-wrap px-1 py-1 flex-column'>
                                {message.files.map((item) => (
                                    item.type === 'image' &&
                                    <ImageListItem key={item.path}>
                                        <img
                                            srcSet={`${apiUrl}/${item.path}`}
                                            src={`${apiUrl}/${item.path}`}
                                            alt={"image-message"}
                                            loading="lazy"
                                            className='rounded '
                                            // style={{maxHeight: '280px', width: "auto", maxWidth:'100%' ,cursor:'pointer'}}
                                        >
                                        </img>
                                    </ImageListItem>
                                ))}
                            </div>
                        }
                        {
                            message.files && message.files.length !== 0 && (message.files.filter(file => file.type === 'document').length !== 0) &&
                            <div className='d-flex gap-2 flex-wrap px-1 py-1 flex-column'>
                                {message.files.map((item) => (
                                    item.type === 'document' &&
                                    <div className='doc-in-input rounded p-2'>
                                        <div>
                                            <span className='m-0 p-0'>Fichier document</span>
                                            <h6 className='text-dark'>{item.name}</h6>
                                        </div>

                                        <div className='d-flex justify-content-between'>
                                            <span className='m-0 p-0'>{item.size < 1048576 ? (item.size / 1024).toFixed(0) + 'ko' : (item.size / 1048576).toFixed(2) + 'mo'}</span>
                                            <i class="fa-regular fa-file-pdf text-muted"></i>
                                        </div>

                                        <a 
                                            className='border-0 d-flex align-items-center justify-content-center p-1 text-muted' 
                                            style={{
                                                // width: '25px', 
                                                // height: '25px',
                                                backgroundColor: 'transparent',
                                                // borderRadius: '50%', 
                                                position:'absolute', 
                                                top: '10px', 
                                                right: '5px', 
                                                // color: 'black'
                                            }}
                                            target='_blank'
                                            // onClick={()=>handleDownload(`${apiUrl}/${item.path}`)}
                                            href={`${apiUrl}/${item.path}`}
                                        >
                                        <i class="fa-solid fa-download pe-none"></i>
                                        
                                        </a>
                    
                                    </div>
                                ))}
                            </div>
                        }
                        {
                            message.contenue !== "" && 
                            <div className='px-3 py-2' dangerouslySetInnerHTML={{ __html: message.contenue.replace(/\n/g, "<br>") }} />
                        }

                        {
                            message.files && message.files.length !== 0 && message.files[0].type === 'audio'&&
                            // <audio src={`${apiUrl}/${message.files[0].path}`} controls />
                            <AudioPlayer audio={`${apiUrl}/${message.files[0].path}`} />

                        }
                    </div>
                    :
                    <div className='px-3 py-2' style={{fontStyle: 'italic', fontSize: '0.8rem', color: '#a5a5a5'}}><i class="fa-solid fa-ban"></i> Vous avez supprimé ce méssage</div>
                }

                {
                    message.modified && !message.deleted &&
                    <p className='m-0 text-end px-3 pb-1' style={{fontStyle: 'italic', fontSize:'0.7rem', color: '#a5a5a5'}}>Ce message a été modifié</p>
                }
            </div>


            <span data-icon="tail-out" className="coin">
                <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 8 13"><title>tail-out</title><path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path><path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path></svg>
            </span>

            {
                !message.deleted &&
                <div className='section-message-option'>
                    <button className='bttn btn-option' onClick={handleClickOption}><i className="fa-solid fa-ellipsis-vertical text-muted pe-none" style={{fontSize: '0.75rem'}}></i></button>
                    <div className='message-options shadow'>
                        <button className='' onClick={()=>copyToClipboard(message.contenue)}><i className="fa-regular fa-copy pe-none"></i> Copier</button>
                        <button className='btn-response' name={message.id} onClick={()=>{handleClickResponse(message)}}>
                        <i className="fa-solid fa-reply"></i> Repondre
                        </button>
                        {
                            message.contenue &&
                        <button className='' onClick={()=>handleClickModif(message)}><i className="fa-solid fa-pen pe-none"></i> Modifier</button>

                        }
                        <button className='btn-delete' data-bs-toggle="modal" data-bs-target="#confirmation" onClick={ ()=>setMessageToDelete(message.id || message._id) }><i className="fa-regular fa-trash-can pe-none"></i> Supprimer</button>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default MessageOut