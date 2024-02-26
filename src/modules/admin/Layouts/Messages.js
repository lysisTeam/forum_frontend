import React from 'react'
import ImageLetters from '../Utils/ImageLetters'
import ConfirmationModal from '../Utils/ConfirmationModal'
import ImageListItem from '@mui/material/ImageListItem';



function Messages({users, admin, messages, showMessageOptions, handleClickResponse, afficherDateMessage, handleClickOption, handleClickModif, setMessageToDelete, handleClickDelete, copyToClipboard}) {
  const apiUrl = process.env.REACT_APP_API_URL

  const handleHover = (e) =>{
    if (e.target.querySelector('.btn-option') && !showMessageOptions) {
      e.target.querySelector('.btn-option').style.display = "inline-block"
    }
    
  }

  const handleHoverLeave = (e) =>{
    if (e.target.querySelector('.btn-option') && !showMessageOptions) {
      e.target.querySelector('.btn-option').style.display = "none"
    }
  }

  const handleDownload = (downloadUrl) => {
    // Logique de téléchargement ou URL à télécharger
  
    const fileName = 'your-file.zip';
    // Créer un lien temporaire pour déclencher le téléchargement
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    // Nettoyer après le téléchargement
    document.body.removeChild(link);
  };

  return (
    <>
        {
            messages.length !== 0 && users.length !== 0 &&
            messages?.map(message => (
            message.type === 'info'?
            <div className='sentence-info' key={message._id}>
                <div className='rounded'>
                <span>{message.contenue}</span>
                
                </div>
            </div>
            :
            message.type === 'entete'?
            <div className='sentence-entete' key={message._id}>
                <div className='rounded-5'>
                <span>{message.contenue}</span>
                
                </div>
                <div className='line'>

                </div>
            </div>
            :
            message.id_user === admin._id ?
            <div className='message-sortant' onMouseOver={(e)=>handleHover(e)} onMouseLeave={(e)=>handleHoverLeave(e)} key={message._id}>
                <span className='name fst-italic'>Vous, {afficherDateMessage(message.createdAt)}</span>
                <div className=' rounded message-container py-2'>
                    {/* {message.contenue.replace(/\n/g, "<br>")} */}

                    <div className='pl-5'>
                        {
                            message.isResponseTo && !message.deleted &&
                            <div className='response-section rounded py-1 px-2 mx-2'>
                                <i className="fa-solid fa-reply" style={{fontSize: "0.6rem"}}></i>
                                <div className='response' dangerouslySetInnerHTML={{ __html: messages.filter(msg => msg.id === message.isResponseTo)[0]?.contenue.replace(/\n/g, "<br>") }} />
                                <span className='response-name'>
                                Envoyé par&nbsp;
                                {
                                    messages.filter(msg => msg.id === message.isResponseTo)[0]?.id_user !== admin._id ?

                                    users?.find(user => user._id === messages.filter(msg => msg.id === message.isResponseTo)[0].id_user)?.nom
                                    : 
                                    "Vous"
                                }
                                </span>
                                {/* {afficherDateMessage(messages.filter(msg => msg.id === message.isResponseTo)[0].updatedAt)} */}
                                <hr className='my-1'></hr>
                            </div>
                        }
                    
                        {
                            !message.deleted ?
                            <div>
                                {
                                    message.files && message.files.length !== 0 &&
                                    <div className='d-flex gap-2 flex-wrap px-2 py-1 flex-column'>
                                        {message.files.map((item) => (
                                            item.path.substr(-3,3) !== 'pdf' &&
                                            <ImageListItem key={item.path}>
                                                <img
                                                    srcSet={`${apiUrl}/${item.path}`}
                                                    src={`${apiUrl}/${item.path}`}
                                                    alt={"zzz"}
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
                                    message.files && message.files.length !== 0 &&
                                    <div className='d-flex gap-2 flex-wrap px-2 py-1 flex-column'>
                                        {message.files.map((item) => (
                                            item.path.substr(-3,3) === 'pdf' &&
                                            <div className='doc-in-input rounded p-2'>
                                                <div>
                                                    <span className='m-0 p-0'>Fichier pdf</span>
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

                                <div className='px-3' dangerouslySetInnerHTML={{ __html: message.contenue.replace(/\n/g, "<br>") }} />
                            </div>
                            :
                            <div className='px-3' style={{fontStyle: 'italic', fontSize: '0.8rem', color: '#a5a5a5'}}><i class="fa-solid fa-ban"></i> Vous avez supprimé ce méssage</div>
                        }

                        {
                            message.modified && !message.deleted &&
                            <p className='m-0 text-end px-3' style={{fontStyle: 'italic', fontSize:'0.7rem', color: '#a5a5a5'}}>Ce message a été modifié</p>
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
            :
            <div className='message-entrant' onMouseOver={(e)=>handleHover(e)} onMouseLeave={(e)=>handleHoverLeave(e)} key={message._id}>
                
                {
                (users.find(user => user._id === message.id_user)?.photo)?
                <img alt='pp' src={apiUrl+'/'+users.find(user => user._id === message.id_user)?.photo}/>
                :
                <ImageLetters nom={users.find(user => user._id === message.id_user)?.nom || ""} prenoms={users.find(user => user._id === message.id_user)?.prenoms || ""}></ImageLetters>
                }
                
                <div>
                <span className='name fst-italic'>{users.find(user => user._id === message.id_user)?.nom}, {afficherDateMessage(message.createdAt)}</span>
                <div className='rounded message-container py-2'>

                    <div className='pl-5'>
                        {
                            message.isResponseTo && !message.deleted &&
                            <div className='response-section pl-5 rounded py-1 px-2 mx-2'>
                                <i className="fa-solid fa-reply" style={{fontSize: "0.6rem"}}></i>
                                <div className='response' dangerouslySetInnerHTML={{ __html: messages.filter(msg => msg.id === message.isResponseTo)[0].contenue.replace(/\n/g, "<br>") }} />
                                <span className='response-name'>Envoyé par&nbsp;{users.find(user => user._id === messages.filter(msg => msg.id === message.isResponseTo)[0].id_user)?.nom}</span>
                                {/* {afficherDateMessage(messages.filter(msg => msg.id === message.isResponseTo)[0].updatedAt)} */}
                                <hr className='my-1'></hr>
                            </div>
                        }
                        {
                            !message.deleted ?
                            <div>
                                {
                                    message.files && message.files.length !== 0 &&
                                    <div className='d-flex gap-2 flex-wrap px-2 py-1 flex-column'>
                                        {message.files.map((item) => (
                                            item.path.substr(-3,3) !== 'pdf' &&
                                            <ImageListItem key={item.path}>
                                                <img
                                                    srcSet={`${apiUrl}/${item.path}`}
                                                    src={`${apiUrl}/${item.path}`}
                                                    alt={"zzz"}
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
                                    message.files && message.files.length !== 0 &&
                                    <div className='d-flex gap-2 flex-wrap px-2 py-1 flex-column'>
                                        {message.files.map((item) => (
                                            item.path.substr(-3,3) === 'pdf' &&
                                            <div className='doc-in-input rounded p-2'>
                                                <div>
                                                    <span className='m-0 p-0'>Fichier pdf</span>
                                                    <h6 className='text-dark'>{item.name}</h6>
                                                </div>

                                                <div className='d-flex justify-content-between'>
                                                    <span className='m-0 p-0'>{item.size < 1048576 ? (item.size / 1024).toFixed(0) + 'ko' : (item.size / 1048576).toFixed(2) + 'mo'}</span>
                                                    <i class="fa-regular fa-file-pdf text-muted"></i>
                                                </div>

                                                <button 
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
                                                    // onClick={()=>handleRemoveImage(item.image.name, false)}
                                                >
                                                <i class="fa-solid fa-download pe-none"></i>
                                                </button>
                            
                                            </div>
                                        ))}
                                    </div>
                                }
                                <div className='px-3' dangerouslySetInnerHTML={{ __html: message.contenue.replace(/\n/g, "<br>") }} />
                            </div>
                            :
                            <div className='px-3' style={{fontStyle: 'italic', fontSize: '0.8rem', color: '#5d5d5d'}}><i class="fa-solid fa-ban"></i> Ce méssage a été supprimé</div>
                        }
                        
                        {
                            message.modified && !message.deleted &&
                            <p className='m-0 text-end px-3' style={{fontStyle: 'italic', fontSize:'0.7rem', color: '#5d5d5d'}}>Ce message a été modifié</p>
                        }
                    </div>
                    {/* <span className='time'>11:50</span> */}

                    <span data-icon="tail-in" className="coin">
                        <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 8 13"><title>tail-in</title><path opacity="0.13" fill="#0000000" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path><path fill="currentColor" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path></svg>
                    </span>
                    {
                        !message.deleted &&
                        <div className='section-message-option'>
                            <button className='bttn btn-option' onClick={handleClickOption}><i className="fa-solid fa-ellipsis-vertical text-muted pe-none" style={{fontSize: '0.75rem'}}></i></button>
                            <div className='message-options shadow'>
                            <button className='' onClick={()=>copyToClipboard(message.contenue)}><i className="fa-regular fa-copy pe-none"></i> Copier</button>
                            <button className='' name={message.id} onClick={()=>{handleClickResponse(message)}}>
                                <i className="fa-solid fa-reply pe-none"></i> 
                                Repondre
                            </button>
                            </div>
                        </div>
                    }
                    
                    
                    {/* texte.replace(/\n/g, "<br>"); */}
                </div>
                </div>
            </div>

            ))
        }
        <ConfirmationModal handleClickDelete={handleClickDelete}/>
    </>
  )
}

export default Messages