import React, { useEffect } from 'react'
import image from '../../../images/Robot Cosmonaut.jpg'
import avatar from "../../../images/avatar.jpg"
import ImageLetters from './ImageLetters'

function Chat({currentRoom}) {
  const apiUrl = process.env.REACT_APP_API_URL

  useEffect(()=>{
    setTimeout(() => {
      var objDiv = document.querySelector('.section-messages');
        if (objDiv) {
          objDiv.scroll({
            top: objDiv.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 1);


  },[currentRoom])

  const resizeTextArea = (e) =>{
    e.target.style.height = 'auto'; // Réinitialisez la hauteur à auto
    e.target.style.height = (e.target.scrollHeight) + 'px'; // Ajustez la hauteur en fonction du contenu

    console.log(document.querySelector('.chat-input-section').clientHeight);
    console.log(e.target.scrollHeight);

    setTimeout(() => {
      document.querySelector('.section-chat .chat-open .chat-bottom-bar').style.height = (document.querySelector('.chat-input-section').clientHeight + 43) + 'px'
    }, 1);

    setTimeout(() => {
      var objDiv = document.querySelector('.section-messages');
        objDiv.scroll({
          top: objDiv.scrollHeight,
          behavior: "smooth",
        });
    }, 2);
    

  }
  return (
    <div className='section-chat'>
      {
        Object.keys(currentRoom).length === 0?
        <div className='d-flex justify-content-center align-items-center h-100' style={{backgroundColor: "#eff3f6"}}>
            <h6 className='text-muted'>Les messages s'afficheront ici</h6>
        </div>
        :
        <div className='chat-open'>
          <div className='chat-top-bar px-3 shadow'>
            <div className='top-cover'>
                {
                  (currentRoom.cover)?
                  <img alt='cover' src={apiUrl+'/'+currentRoom.cover}/>
                  :
                  <ImageLetters nom={currentRoom.titre || ""} prenoms={""}></ImageLetters>
                }
              <div>
                <h6 className='m-0 fw-bold'>{currentRoom.titre} &nbsp;&nbsp; <i class="fa-solid fa-gears"></i></h6>
                <span>{`${currentRoom.members.length} participant${currentRoom.members.length < 2 ? '' : 's'}`}</span>
              </div>
             
            </div>
            <div className='btns'>
              <button className='btn btn-top-bar'><i class="bi bi-images"></i></button>
              <button className='btn btn-top-bar'><i class="bi bi-person-fill-add"></i></button>
              <button className='btn btn-top-bar'><i class="bi bi-telephone-fill"></i></button>
              {/* <button className='btn btn-top-bar'><i class="fa-solid fa-video"></i></button> */}
            </div>
          </div>
          <div className='chat-body'>
            <div className='container section-messages'>
              {/*message sortant */}
              <div className='sentence-info'>
                <div className='rounded'>
                  <span>Abdul Mounirou a créé ce groupe</span>
                </div>
              </div>

              {/*message entrant */}
              <div className='message-entrant'>
                {/* <img alt='user-avatar' src={avatar} /> */}
                <ImageLetters nom={"Mounirou" || ""} prenoms={"Abdul Kodir" || ""}></ImageLetters>
                <div>
                  <span className='name'>Abdul mounirou</span>
                  <div className='px-3 py-2 rounded message-container'>
                      Bonjour
                      <span className='time'>11:50</span>

                      <span data-icon="tail-in" class="coin">
                        <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-in</title><path opacity="0.13" fill="#0000000" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path><path fill="currentColor" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path></svg>
                      </span>
                  </div>
                </div>
              </div>

              {/*message entrant */}
              <div className='message-entrant'>
                <img alt='user-avatar' src={avatar} />
                {/* <ImageLetters nom={"Mounirou" || ""} prenoms={"Abdul Kodir" || ""}></ImageLetters> */}
                <div>
                  <span className='name'>Abdul mounirou</span>
                  <div className='px-3 py-2 rounded message-container'>
                      Bonjour, comment tu vas ?
                      <span className='time'>11:50</span>

                      <span data-icon="tail-in" class="coin">
                        <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-in</title><path opacity="0.13" fill="#0000000" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path><path fill="currentColor" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path></svg>
                      </span>
                  </div>
                </div>
              </div>

              {/*message sortant */}
              <div className='sentence-info'>
                <div className='rounded'>
                  <span>Abdul Mounirou a ajouté abdul-aziz à cette conversation</span>
                </div>
              </div>

              {/*message sortant */}
              <div className='message-sortant'>
                <span className='name'>Moi</span>
                <div className='px-3 py-2 rounded message-container'>
                    Bonjour
                    <span className='time'>11:50</span>

                    <span data-icon="tail-out" class="coin">
                      <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-out</title><path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path><path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path></svg>
                    </span>
                </div>
              </div>

              
        
            </div>
          </div>

          <div className='chat-bottom-bar'>
            <div className='container pb-1 d-flex align-items-end'>
              <div className='chat-input-section rounded shadow p-2'> 
                <button className='btn'><i class="fa-regular fa-face-smile"></i></button>
                {/* <input type='text' placeholder='Votre message...'/> */}
                <textarea id="exampleFormControlTextarea1" rows={1} onChange={(e)=>resizeTextArea(e)}></textarea>
                <button className='btn'><i class="fa-solid fa-paperclip"></i></button>
                <button className='btn btn-send'><i class="fa-regular fa-paper-plane"></i></button>
              </div>
            </div>
            
          </div>
        </div>
      }
        
    </div>
  )
}

export default Chat