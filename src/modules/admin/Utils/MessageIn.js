import React from 'react'
import ImageLetters from './ImageLetters'
import ImageListItem from '@mui/material/ImageListItem';


function MessageIn({message, handleHover, handleHoverLeave, afficherDateMessage, response, admin, users, handleClickModif, handleClickOption, setMessageToDelete, copyToClipboard, handleClickResponse}) {
    const apiUrl = process.env.REACT_APP_API_URL
    
    return (
    <div className='message-entrant' onMouseOver={(e)=>handleHover(e)} onMouseLeave={(e)=>handleHoverLeave(e)} key={message._id}>
   
        {
        (users.find(user => user._id === message.id_user)?.photo)?
        <img alt='pp' src={apiUrl+'/'+users.find(user => user._id === message.id_user)?.photo}/>
        :
        <ImageLetters nom={users.find(user => user._id === message.id_user)?.nom || ""} prenoms={users.find(user => user._id === message.id_user)?.prenoms || ""}></ImageLetters>
        }
        
        <div>
        <span className='name fst-italic'>{users.find(user => user._id === message.id_user)?.nom}, {afficherDateMessage(message.createdAt)}</span>
        <div className='rounded message-container py-0'>

        <div className='pl-5'>
                {
                    message.isResponseTo && !message.deleted &&
                    <div className='response-section rounded py-1 px-2 mx-1 mt-1'>
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
                                        </>
                                }

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
                            message.files && message.files.length !== 0 && (message.files.filter(file => file.type === 'document').length !== 0) &&
                            <div className='d-flex gap-2 flex-wrap px-1 py-1 flex-column'>
                                {message.files.map((item) => (
                                    item.type === 'document' &&
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
                        {
                            message.contenue !== "" && 
                            <div className='px-3 py-2' dangerouslySetInnerHTML={{ __html: message.contenue.replace(/\n/g, "<br>") }} />
                        }
                    </div>
                    :
                    <div className='px-3 py-2' style={{fontStyle: 'italic', fontSize: '0.8rem', color: '#5d5d5d'}}><i class="fa-solid fa-ban"></i> Vous avez supprimé ce méssage</div>
                }

                {
                    message.modified && !message.deleted &&
                    <p className='m-0 text-end px-3 pb-1' style={{fontStyle: 'italic', fontSize: '0.8rem', color: '#5d5d5d'}}>Ce message a été modifié</p>
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
  )
}

export default MessageIn