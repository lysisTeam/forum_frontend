import React from 'react'
import EmojiPicker  from "emoji-picker-react"


function ChatBarInput({responseTo, setResponseTo, setShowEmojiPicker, setTexteAEnvoyer, texteAEnvoyer, showEmojiPicker, sendMessage, handleEmojiClick}) {
    const resizeTextArea = (e) =>{
        e.target.style.height = 'auto'; // Réinitialisez la hauteur à auto
        e.target.style.height = (e.target.scrollHeight) + 'px'; // Ajustez la hauteur en fonction du contenu

        // console.log(document.querySelector('.chat-input-section').clientHeight);
        // console.log(e.target.clientHeight);

        setTimeout(() => {
            scroll()
        }, 2);
    
    }
    
    const scroll = () =>{
        var objDiv = document.querySelector('.section-messages');

        console.log(objDiv.scrollHeight - objDiv.clientHeight);
        console.log(objDiv.scrollTop);

        objDiv.scroll({
            top: objDiv.scrollTop + 22,
            behavior: "smooth",
        });
        
    }
  return (
    <div className='container pb-1 d-flex flex-column gap-2 justify-content-end'>
        {
            showEmojiPicker &&
            <div className='emoji-section'>
                <EmojiPicker onEmojiClick={handleEmojiClick} height={400} width={300}/>
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
            <button className='btn' onClick={()=>setShowEmojiPicker(previous => !previous)}><i className="fa-regular fa-face-smile pe-none"></i></button>
            {/* <input type='text' placeholder='Votre message...'/> */}
            <textarea id="exampleFormControlTextarea1" rows={1} onChange={(e)=>{resizeTextArea(e); setTexteAEnvoyer(e.target.value)}} value={texteAEnvoyer}></textarea>
            <button className='btn'><i className="fa-solid fa-paperclip"></i></button>
            <button className='btn btn-send' onClick={()=>sendMessage()}><i className="fa-regular fa-paper-plane pe-none"></i></button>
            </div>
        </div>
        

    </div>
  )
}

export default ChatBarInput