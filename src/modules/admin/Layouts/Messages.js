import React from 'react'
import ImageLetters from './ImageLetters'


function Messages({users, admin, messages, showMessageOptions, handleClickResponse, afficherDateMessage, handleClickOption}) {
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

  return (
    <>
        {
            messages.length !== 0 && users.length !== 0 &&
            messages.map(message => (
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
                <span className='name fst-italic'>Moi, {afficherDateMessage(message.updatedAt)}</span>
                <div className='px-3 py-2 rounded message-container'>
                    {/* {message.contenue.replace(/\n/g, "<br>")} */}

                    <div className='pl-5'>
                        {
                            message.isResponseTo &&
                            <div className='response-section pl-5'>
                            <i className="fa-solid fa-reply" style={{fontSize: "0.6rem"}}></i>
                            <div className='response' dangerouslySetInnerHTML={{ __html: messages.filter(msg => msg.id === message.isResponseTo)[0].contenue.replace(/\n/g, "<br>") }} />
                            <span className='response-name'>
                            Envoyé par&nbsp;
                            {
                                messages.filter(msg => msg.id === message.isResponseTo)[0].id_user !== admin._id ?

                                users.find(user => user._id === messages.filter(msg => msg.id === message.isResponseTo)[0].id_user)?.nom
                                : 
                                "moi"
                            }
                            </span>
                            {/* {afficherDateMessage(messages.filter(msg => msg.id === message.isResponseTo)[0].updatedAt)} */}
                            <hr className='my-1'></hr>
                            </div>
                        }
                    
                    <div dangerouslySetInnerHTML={{ __html: message.contenue.replace(/\n/g, "<br>") }} />
                    </div>

                    

                    <span data-icon="tail-out" className="coin">
                    <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 8 13"><title>tail-out</title><path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path><path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path></svg>
                    </span>

                    <div className='section-message-option'>
                    <button className='btn btn-option' onClick={handleClickOption}><i className="fa-solid fa-ellipsis-vertical pe-none"></i></button>
                    <div className='message-options shadow'>
                        <button className=''><i className="fa-regular fa-copy"></i> Copier</button>
                        <button className='btn-response' name={message.id} onClick={()=>{handleClickResponse(message)}}>
                        <i className="fa-solid fa-reply"></i> Repondre
                        </button>
                        <button className=''><i className="fa-solid fa-pen"></i> Modifier</button>
                        <button className=''><i className="fa-regular fa-trash-can"></i> Supprimer</button>
                    </div>
                    </div>
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
                <span className='name fst-italic'>{users.find(user => user._id === message.id_user)?.nom}, {afficherDateMessage(message.updatedAt)}</span>
                <div className='px-3 py-2 rounded message-container'>

                    <div className='pl-5'>
                        {
                            message.isResponseTo &&
                            <div className='response-section pl-5'>
                            <i className="fa-solid fa-reply" style={{fontSize: "0.6rem"}}></i>
                            <div className='response' dangerouslySetInnerHTML={{ __html: messages.filter(msg => msg.id === message.isResponseTo)[0].contenue.replace(/\n/g, "<br>") }} />
                            <span className='response-name'>Envoyé par&nbsp;{users.find(user => user._id === messages.filter(msg => msg.id === message.isResponseTo)[0].id_user)?.nom}</span>
                            {/* {afficherDateMessage(messages.filter(msg => msg.id === message.isResponseTo)[0].updatedAt)} */}
                            <hr className='my-1'></hr>
                            </div>
                        }
                        
                        <div dangerouslySetInnerHTML={{ __html: message.contenue.replace(/\n/g, "<br>") }} />
                    </div>
                    {/* <span className='time'>11:50</span> */}

                    <span data-icon="tail-in" className="coin">
                        <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 8 13"><title>tail-in</title><path opacity="0.13" fill="#0000000" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path><path fill="currentColor" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path></svg>
                    </span>
                    
                    <div className='section-message-option'>
                        <button className='btn btn-option' onClick={handleClickOption}><i className="fa-solid fa-ellipsis-vertical pe-none"></i></button>
                        <div className='message-options shadow'>
                        <button className=''><i className="fa-regular fa-copy"></i> Copier</button>
                        <button className='' name={message.id} onClick={()=>{handleClickResponse(message)}}>
                            <i className="fa-solid fa-reply pe-none"></i> 
                            Repondre
                        </button>
                        </div>
                    </div>
                    
                    {/* texte.replace(/\n/g, "<br>"); */}
                </div>
                </div>
            </div>

            
            ))
            
        }
    </>
  )
}

export default Messages