import React, { useEffect, useState } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import ButtonUpload from '../Utils/ButtonUpload'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';



function ChatBarInput({responseTo,texteInput, images, setImages,setResponseTo, setShowEmojiPicker,showEmojiPicker, sendMessage, handleEmojiClick, modifMessage, modif, handleInputTextArea, handleKeyDownTextArea}) {
    
    const clickFileInput = (e) =>{
        e.preventDefault()
        document.getElementById('file-input').click()
    }

    const handleChangeFile = (e)=>{
        e.preventDefault()
        const file = e.target.files[0]

        if (file) {
            const reader = new FileReader()

            reader.onloadend = () =>{

                if (images.filter(img => img.imageReader === reader.result).length === 0) {
                    setImages(previous => [...previous ,{image: file, imageReader: reader.result}])
                }
                
            }
            reader.readAsDataURL(file)
            
        }
    }

    const handleRemoveImage = (image) =>{
        const newImages = images.filter(img => img.imageReader !== image)
        setImages(newImages)
    }

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
                <button className='bttn p-0 m-0 border-0' onClick={()=>{setResponseTo({id: null, message: "", user: ""})}}><i className="fa-solid fa-close pe-none" style={{fontSize: "0.7rem"}}></i></button>
                </div>

                <div className='mx-4'>
                <p className='m-0 p-0 texte'>{responseTo.message}</p>
                {/* <span className=''>Envoyé par {responseTo.user}</span> */}
                </div>
                <hr className='my-2'></hr>
            </div>
            }

            {
            images.length !== 0 &&
            <div className='px-2 chat-input-response'>
                <div className='d-flex gap-2 flex-wrap'>
                    {images.map((item) => (
                        <ImageListItem key={item.imageReader}>
                            <img
                                srcSet={`${item.imageReader}`}
                                src={`${item.imageReader}`}
                                alt={"zzz"}
                                loading="lazy"
                                className='rounded '
                                style={{width: '110px', height: '110px'}}
                            >
                            </img>
                            <button 
                                className='border-0 d-flex align-items-center justify-content-center' 
                                style={{
                                    width: '20px', 
                                    height: '20px',
                                    backgroundColor: 'white',
                                    borderRadius: '50%', 
                                    position:'absolute', 
                                    top: '5px', 
                                    right: '5px', 
                                    color: 'black'
                                }}
                                onClick={()=>handleRemoveImage(item.imageReader)}
                            >
                            <i class="fa-solid fa-xmark pe-none"></i>
                            </button>
                        </ImageListItem>
                    ))}
                </div>
                <hr className='my-2'></hr>
            </div>
            }
            <div className='chat-input'>
                <button className='bttn' onClick={()=>{setShowEmojiPicker(previous => !previous); document.querySelector('textarea').focus()}} tabindex="-1"><i className="fa-regular fa-face-smile pe-none"></i></button>
                {/* <input type='text' placeholder='Votre message...'/> */}
                <textarea id="exampleFormControlTextarea1" rows={1} onChange={(e)=>handleInputTextArea(e)} onKeyDown={(e)=>handleKeyDownTextArea(e)} value={texteInput}></textarea>
                <button className='bttn' onClick={clickFileInput}><i className="fa-solid fa-paperclip pe-none"></i></button>
                <input className="form-control d-none" id='file-input' type="file" accept="image/*" onChange={handleChangeFile}/>
                <button className='bttn btn-send' onClick={()=>{modif.id ? modifMessage() : sendMessage()}}><i className="fa-regular fa-paper-plane pe-none"></i></button>
            </div>
        </div>
        

    </div>
  )
}

export default ChatBarInput