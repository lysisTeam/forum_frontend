import React, { useEffect, useState } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


function ChatBarInput({responseTo,texteInput, setTest,setResponseTo, setShowEmojiPicker,showEmojiPicker, sendMessage, handleEmojiClick, modifMessage, modif, handleInputTextArea, handleKeyDownTextArea}) {
  return (
    <div className='container pb-1 d-flex flex-column gap-2 justify-content-end'>
        {
            showEmojiPicker &&
            <div className='emoji-section'>
                <Picker data={data} onEmojiSelect={handleEmojiClick} locale={'fr'} previewPosition={'none'} searchPosition={'none'} emojiSize={18} emojiButtonSize={33} />
            </div>
        }
        
        <div className='chat-input-section rounded shadow p-2'>
            {
            responseTo.id &&
            <div className='px-2 chat-input-response'>
                <div className='d-flex justify-content-between align-items-center'>
                <i className="fa-solid fa-reply" style={{fontSize: "0.6rem"}}></i>
                <button className='btn p-0 m-0 border-0' onClick={()=>{setResponseTo({id: null, message: "", user: ""})}}><i className="fa-solid fa-close pe-none" style={{fontSize: "0.7rem"}}></i></button>
                </div>

                <div className='mx-4'>
                <p className='m-0 p-0 texte'>{responseTo.message}</p>
                {/* <span className=''>Envoyé par {responseTo.user}</span> */}
                </div>
                <hr className='my-2'></hr>
            </div>
            }
            <div className='chat-input'>
            <button className='btn' onClick={()=>{setShowEmojiPicker(previous => !previous); document.querySelector('textarea').focus()}} tabindex="-1"><i className="fa-regular fa-face-smile pe-none"></i></button>
            {/* <input type='text' placeholder='Votre message...'/> */}
            <textarea id="exampleFormControlTextarea1" rows={1} onChange={(e)=>handleInputTextArea(e)} onKeyDown={(e)=>handleKeyDownTextArea(e)} value={texteInput}></textarea>
            <button className='btn'><i className="fa-solid fa-paperclip"></i></button>
            <button className='btn btn-send' onClick={()=>{modif.id ? modifMessage() : sendMessage()}}><i className="fa-regular fa-paper-plane pe-none"></i></button>
            </div>
        </div>
        

    </div>
  )
}

export default ChatBarInput