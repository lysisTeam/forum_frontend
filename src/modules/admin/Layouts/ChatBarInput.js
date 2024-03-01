import React, { useEffect, useRef, useState } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import ImageListItem from '@mui/material/ImageListItem';



function ChatBarInput({setIsRecording, isRecording, responseTo, texteInput, images, setImages,setResponseTo, setShowEmojiPicker,showEmojiPicker, sendMessage, handleEmojiClick, modifMessage, modif, handleInputTextArea, handleKeyDownTextArea}) {
    const apiUrl = process.env.REACT_APP_API_URL

    const [audioURL, setAudioURL] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);

    let mediaRecorder = useRef(null);
    let timerInterval = useRef(null);

    const [timer, setTimer] = useState("00:00")

    const clickFileInput = (e) =>{
        e.preventDefault()
        document.getElementById('file-input').click()
    }

    const handleChangeFile = (e)=>{
        e.preventDefault()
        const file = e.target.files[0]

        if (file) {
            console.log(file);
            
            if (file.type === "application/pdf") {
                setImages(previous => [...previous ,{image: file}])
                
            }else{
                const reader = new FileReader()

                reader.onloadend = () =>{

                    if (images.filter(img => img.imageReader === reader.result).length === 0) {
                        setImages(previous => [...previous ,{image: file, imageReader: reader.result}])
                    }
                    
                }
                reader.readAsDataURL(file)
            }
            
        }
    }

    const handleRemoveImage = (image, isImage) =>{
        var newImages = []

        if (isImage) {
            newImages = images.filter(img => img.imageReader !== image)
        }else{
            newImages = images.filter(img => img.image.name !== image)
        }

        setImages(newImages)
    }

    const startRecord = ()=>{
      setIsRecording(true)
      afficherTimer(0)

      navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.ondataavailable = handleDataAvailable;
        mediaRecorder.current.start();
        setIsRecording(true);
      })
      .catch(error => console.error('Error accessing microphone:', error));

    }


    const stopRecord = ()=>{
        if (mediaRecorder) {
            mediaRecorder.current.stop();
            setIsRecording(false);
            clearTimer()
        }
    }

    const cancelRecord = () =>{
        if (mediaRecorder) {
            mediaRecorder.current.ondataavailable = null
            mediaRecorder.current.stop();
            setIsRecording(false);
            clearTimer()
        }
    }

    function afficherTimer(second) {
        var seconds = second;
        // Afficher le timer chaque seconde
        timerInterval.current = setInterval(function() {
            seconds++;
            var minutes = Math.floor(seconds / 60);
            var remainingSeconds = seconds % 60;
    
            // Ajouter un zéro devant les nombres < 10
            var minutesStr = minutes < 10 ? "0" + minutes : minutes;
            var secondsStr = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
    
            // Afficher le timer
            setTimer(minutesStr + ":" + secondsStr);
        }, 1000); // Répéter toutes les 1000 ms (1 seconde)
    }

    const clearTimer = ()=>{
        clearInterval(timerInterval.current)
        setTimer("00:00")
    }

    function convertBlobToMp3(blob) {
        const file = new File(blob, "record.wav", { type: 'audio/wav' });
        return file
    }

    const handleDataAvailable = (event) => {
        if (event.data.size > 0) {
            const file = convertBlobToMp3([event.data]);
            // setAudioFile(file)
            sendMessage(file)
        }
    };

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
                    <button className='bttn p-0 m-0 border-0' onClick={()=>{setResponseTo({id: null, message: "", user: "", file: "", fileType: null})}}><i className="fa-solid fa-close pe-none" style={{fontSize: "0.7rem"}}></i></button>
                </div>

                
                <div className='mx-4 d-flex justify-content-between gap-5 align-items-end'>
                    <p className='m-0 p-0 texte'>
                        {
                            responseTo.message ?
                            <>
                                {
                                    responseTo.fileType === 'Image' &&
                                    <><i class="fa-regular fa-image"></i> </>
                                }

                                {
                                    responseTo.fileType === 'Document' &&
                                    <><i class="fa-regular fa-file"></i> Doc : </>
                                }

                                {responseTo.message}
                            </>

                            :
                            <>
                                {
                                    responseTo.fileType === 'Image' &&
                                    <div><i class="fa-regular fa-image"></i> Image</div>
                                }

                                {
                                    responseTo.fileType === 'Document' &&
                                    <div><i class="fa-regular fa-file"></i> Doc : {responseTo.file.name}</div>
                                }

                                {
                                    responseTo.fileType === 'Audio' &&
                                    <><i class="fa-solid fa-microphone"></i> Message vocal </>
                                }
                            </>

                        }
                        
                    </p>
                    {
                        responseTo.fileType && responseTo.fileType === 'Image' &&
                        <img className='rounded' style={{width: '45px', height: '45px', objectFit: 'cover'}} src={apiUrl + '/' + responseTo.file.path}></img>
                    }
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
                        item.imageReader ?
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
                                    backgroundColor: 'black',
                                    borderRadius: '50%', 
                                    position:'absolute', 
                                    top: '5px', 
                                    right: '5px', 
                                    color: 'white'
                                }}
                                onClick={()=>handleRemoveImage(item.imageReader, true)}
                            >
                            <i class="fa-solid fa-xmark pe-none"></i>
                            </button>
                        </ImageListItem>
                        :
                        <div className='doc-in-input rounded p-2'>
                            <div>
                                <span className='m-0 p-0'>Fichier pdf</span>
                                <h6 className='text-dark'>{item.image.name}</h6>
                            </div>

                            <div className='d-flex justify-content-between'>
                                <span className='m-0 p-0'>{item.image.size < 1048576 ? (item.image.size / 1024).toFixed(0) + 'ko' : (item.image.size / 1048576).toFixed(2) + 'mo'}</span>
                                <i class="fa-regular fa-file-pdf text-muted"></i>
                            </div>
                            <button 
                                className='border-0 d-flex align-items-center justify-content-center' 
                                style={{
                                    width: '20px', 
                                    height: '20px',
                                    backgroundColor: 'black',
                                    borderRadius: '50%', 
                                    position:'absolute', 
                                    top: '5px', 
                                    right: '5px', 
                                    color: 'white'
                                }}
                                onClick={()=>handleRemoveImage(item.image.name, false)}
                            >
                            <i class="fa-solid fa-xmark pe-none"></i>
                            </button>
                        </div>
                    ))}
                </div>
                <hr className='my-2'></hr>
            </div>
            }
            <div className='chat-input'>
                {
                    !isRecording ?
                    <button className='bttn' onClick={()=>{setShowEmojiPicker(previous => !previous); document.querySelector('textarea').focus()}} tabindex="-1"><i className="fa-regular fa-face-smile pe-none"></i></button>
                    :
                    <button className='bttn d-flex gap-2 align-items-start' onClick={cancelRecord}>
                        <i class="fa-regular fa-circle-dot fa-beat text-danger pe-none"></i>
                        <span className='' style={{fontSize: "0.8rem"}}>{timer}</span>
                    </button>

                }
                {/* <input type='text' placeholder='Votre message...'/> */}
                {
                    !isRecording ?
                    <textarea id="exampleFormControlTextarea1" placeholder='Votre message...' rows={1} onChange={(e)=>handleInputTextArea(e)} onKeyDown={(e)=>handleKeyDownTextArea(e)} value={texteInput}></textarea>
                    :
                    <div className='w-100 h-100 d-flex align-items-center'>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress color="secondary" />
                        </Box>
                    </div>
                }
                
                <input className="form-control d-none" id='file-input' type="file" accept="image/jpeg,image/png,image/jpg,application/pdf" onChange={handleChangeFile}/>
                {
                    !modif.id &&
                    <>
                        {
                            !isRecording &&
                            <button className='bttn px-2' onClick={clickFileInput}><i className="fa-solid fa-paperclip pe-none"></i></button>
                        }
                    
                        
                        
                        {
                            !texteInput && images.length === 0 &&
                            <button className='bttn px-2' onClick={isRecording ? cancelRecord : startRecord}>
                                {
                                    isRecording ?
                                    <i class="fa-regular fa-circle-xmark"></i>
                                    :
                                    <i class="fa-solid fa-microphone-lines pe-none"></i>
                                }
                                
                            </button>
                        }

                        
                    </>
                }
                
                <button className={`bttn btn-send ${ texteInput || images.length !== 0 || isRecording ? '' : 'disabled'}`} onClick={()=>{ modif.id ? modifMessage() : ( isRecording ? stopRecord() : sendMessage() ) }}>
                    {
                        !modif.id ?
                            <i className="fa-regular fa-paper-plane pe-none"></i>
                        :
                            <i class="fa-solid fa-check"></i>
                    }
                </button>
            </div>
        </div>
        

    </div>
  )
}

export default ChatBarInput