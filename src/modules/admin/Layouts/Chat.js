import React, { useEffect } from 'react'
import image from '../../../images/Robot Cosmonaut.jpg'

function Chat({currentRoom}) {
  const apiUrl = process.env.REACT_APP_API_URL

  useEffect(()=>{
    


  },[currentRoom])

  const resizeTextArea = (e) =>{
    e.target.style.height = 'auto'; // Réinitialisez la hauteur à auto
    e.target.style.height = (e.target.scrollHeight) + 'px'; // Ajustez la hauteur en fonction du contenu
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
              <img alt='cover' src={(currentRoom.cover)?apiUrl+'/'+currentRoom.cover: image}/>
              <div>
                <h6 className='m-0 fw-bold'>{currentRoom.titre} &nbsp;&nbsp; <i class="fa-solid fa-gears"></i></h6>
                <span>{`${currentRoom.members.length} participant${currentRoom.members.length === 0 ? '' : 's'}`}</span>
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
              {/*message entrant */}
              <div className='message-entrant'>
                <div className='px-3 py-2 rounded'>
                    Bonjour <br></br>qsdcsfdvc effdv qsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdv
                    <span className='time'>11:50</span>
                </div>
              </div>

              {/*message sortant */}
              <div className='message-sortant'>
                <div className='px-3 py-2 rounded'>
                    Bonjour <br></br>qsdcsfdvc effdv qsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdv
                    <span className='time'>11:50</span>
                </div>
              </div>

               {/*message entrant */}
               <div className='message-entrant'>
                <div className='px-3 py-2 rounded'>
                    Bonjour <br></br>qsdcsfdvc effdv qsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdv
                    <span className='time'>11:50</span>
                </div>
              </div>

              {/*message sortant */}
              <div className='message-sortant'>
                <div className='px-3 py-2 rounded'>
                    Bonjour <br></br>qsdcsfdvc effdv qsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdvqsdcsfdvc effdv
                    <span className='time'>11:50</span>
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