import React from 'react'
import ImageLetters from '../Utils/ImageLetters'
import ConfirmationModal from '../Utils/ConfirmationModal'
import ImageListItem from '@mui/material/ImageListItem';
import MessageOut from '../Utils/MessageOut';
import MessageIn from '../Utils/MessageIn';



function Messages({users, admin, messages, showMessageOptions, handleClickResponse, afficherDateMessage, handleClickOption, handleClickModif, setMessageToDelete, handleClickDelete, copyToClipboard}) {
  

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
            <MessageOut message={message} handleHover={handleHover} handleHoverLeave={handleHoverLeave} admin={admin} afficherDateMessage={afficherDateMessage} messages={true} response={ messages.filter(msg => msg.id === message.isResponseTo)[0] } users={users} handleClickModif={handleClickModif} handleClickOption={handleClickOption} setMessageToDelete={setMessageToDelete} copyToClipboard={copyToClipboard} handleClickResponse={handleClickResponse} />
            :
            <MessageIn message={message} handleHover={handleHover} handleHoverLeave={handleHoverLeave} admin={admin} afficherDateMessage={afficherDateMessage} messages={true} response={ messages.filter(msg => msg.id === message.isResponseTo)[0] } users={users} handleClickModif={handleClickModif} handleClickOption={handleClickOption} setMessageToDelete={setMessageToDelete} copyToClipboard={copyToClipboard} handleClickResponse={handleClickResponse} />


            ))
        }
        <ConfirmationModal handleClickDelete={handleClickDelete}/>
    </>
  )
}

export default Messages