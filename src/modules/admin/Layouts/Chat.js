import React, { useContext, useEffect, useState } from 'react'
// import image from '../../../images/Robot Cosmonaut.jpg'
// import avatar from "../../../images/avatar.jpg"
import ImageLetters from './ImageLetters'
import axios from 'axios'
import AdminContext from '../Contexts/AdminContext'


function Chat({currentRoom}) {
  const apiUrl = process.env.REACT_APP_API_URL
  const [mediasOpen, setMediasOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const {admin} = useContext(AdminContext)
  const [users, setUsers] = useState([])

  const [texteAEnvoyer, setTexteAEnvoyer] = useState("")

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


    const getMessages = async()=>{
      
        if (currentRoom._id) {
          await axios.get(`${apiUrl}/api/message/${currentRoom?._id}/admin`,{
            headers: {
              token: localStorage.admin_token
            }
          })
          .then(response =>{
            // console.log(response);
            console.log(afficherFileMessages(response.data.messages));
            setMessages(afficherFileMessages(response.data.messages))
            document.querySelector("textarea").rows = 1
            setTimeout(() => {
              var objDiv = document.querySelector('.section-messages');
                objDiv.scroll({
                  top: objDiv.scrollHeight,
                  behavior: "smooth",
                });
            }, 1);
          })
          .catch(error=>{
            console.log(error);
          })
        }
    
    }

    const getStudents = async()=>{
      await axios.post(apiUrl+'/api/user',
      {
        ids: (currentRoom.members?.filter(member => member.isAdmin === false))?.map(member => member['id'])
      },
      {
        headers: {
          token: localStorage.admin_token
        }
      })
      .then((response)=>{
        // console.log(response.data.users);
        setUsers(previous => previous.concat(response.data.users))


        
      })
      .catch((err)=>{
        console.log(err);
      })
    }

    const getAdmins = async()=>{
      await axios.post(apiUrl+'/api/admin',{
        ids: (currentRoom.members?.filter(member => member.isAdmin === true))?.map(member => member['id'])
      },{
        headers: {
          token: localStorage.admin_token
        }
      })
      .then((response)=>{
        setUsers(response.data.admins)
      
        getStudents()
        
      })
      .catch((err)=>{
        console.log(err);
      })
    }

    getAdmins()
    getMessages()

    
  },[currentRoom, apiUrl])

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

  const handleHover = (e) =>{
    if (e.target.querySelector('.btn-option')) {
      e.target.querySelector('.btn-option').style.opacity = "1"
    }
    
  }

  const handleHoverLeave = (e) =>{
    if (e.target.querySelector('.btn-option')) {
      e.target.querySelector('.btn-option').style.opacity = "0"
    }
  }

  const sendMessage = async()=>{
    if (texteAEnvoyer) {
      await axios.post(`${apiUrl}/api/message/send-message/${currentRoom._id}/admin`,{
        type: "message",
        contenue: texteAEnvoyer
      },{
        headers: {
          token: localStorage.admin_token
        }
      })
      .then((response)=>{
        setMessages(previous => [...previous, response.data.message])
        document.querySelector('textarea').style.height = "22px"
        setTimeout(() => {
          var objDiv = document.querySelector('.section-messages');
            objDiv.scroll({
              top: objDiv.scrollHeight,
              behavior: "smooth",
            });
        }, 1);
        setTexteAEnvoyer("")
      })
      .catch((error)=>{
        console.log(error);
      })
    }
    
  }

  const afficherDateMessage = (updatedAt)=>{
    const dateMessage = new Date(updatedAt);
    const heure = dateMessage.getHours().toString().padStart(2, '0');
    const minute = dateMessage.getMinutes().toString().padStart(2, '0');
    return `${heure}:${minute}`;
  }

  
  
  function afficherFileMessages(messages) {
    let datePrecedente = null;
    const fileMessages = [];

    messages.forEach(message => {
        const dateMessage = new Date(message.createdAt);
        const dateActuelle = new Date();

        

        // Ajouter l'en-tête de date si la date du message est différente de la date précédente
        if (!datePrecedente || !memeJour(datePrecedente, dateMessage)) {
            let enteteDate = '';
            if (memeJour(dateMessage, dateActuelle)) {
                enteteDate = 'Aujourd\'hui';
            } else if (memeJour(hier(dateActuelle), dateMessage)) {
                enteteDate = 'Hier';
            } else if (dateMessage < avantHier(dateActuelle)) {
              // Si la date du message est d'au moins avant-hier, afficher le nom du jour
              enteteDate = dateMessage.toLocaleDateString('fr-FR', { weekday: 'long' });
            } else if (dateMessage < semainePassee(dateActuelle)) {
              // Si la date du message est plus ancienne que une semaine, afficher la date au format jour/mois/année
              enteteDate = dateMessage.toLocaleDateString('fr-FR');
            } else {
                enteteDate = afficherDate(dateMessage);
            }
            if (message.type !== 'info') {
              fileMessages.push({ type: 'entete', contenue: enteteDate});
            }
            
            datePrecedente = dateMessage;
        }

        // Ajouter le message
        fileMessages.push({ type: message.type, contenue: message.contenue,  id_room: message.id_room, id_user: message.id_user, createdAt: message.createdAt, updatedAt: message.updatedAt});
    });

    return fileMessages;
  }

  // Fonction pour vérifier si deux dates sont le même jour
  function memeJour(date1, date2) {
      return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
  }

  // Fonction pour obtenir la date d'hier
  function hier(date) {
      const hier = new Date(date);
      hier.setDate(date.getDate() - 1);
      return hier;
  }

  // Fonction pour obtenir la date d'avant-hier
  function avantHier(date) {
    const avantHier = new Date(date);
    avantHier.setDate(date.getDate() - 2);
    return avantHier;
  }

  // Fonction pour obtenir la date d'une semaine passée
  function semainePassee(date) {
    const semainePassee = new Date(date);
    semainePassee.setDate(date.getDate() - 7);
    return semainePassee;
  }

  // Fonction pour afficher la date sous forme de chaîne formatée
  function afficherDate(date) {
      const jour = date.getDate().toString().padStart(2, '0');
      const mois = (date.getMonth() + 1).toString().padStart(2, '0');
      const annee = date.getFullYear();
      return `${jour}/${mois}/${annee}`;
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
          
          <div className='chat-open-conversation'>
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
                <button className='btn btn-top-bar' onClick={()=>setMediasOpen(previous => !previous)}><i class="bi bi-images pe-none"></i></button>
                <button className='btn btn-top-bar'><i class="bi bi-person-fill-add"></i></button>
                <button className='btn btn-top-bar'><i class="bi bi-telephone-fill"></i></button>
                {/* <button className='btn btn-top-bar'><i class="fa-solid fa-video"></i></button> */}
              </div>
            </div>
            <div className='chat-body'>
              <div className='container section-messages'>
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
                    <div className='message-sortant' onMouseOver={(e)=>handleHover(e)} onMouseLeave={(e)=>handleHoverLeave(e)}>
                      <span className='name fst-italic'>Moi, {afficherDateMessage(message.updatedAt)}</span>
                      <div className='px-3 py-2 rounded message-container'>
                          {/* {message.contenue.replace(/\n/g, "<br>")} */}

                          <div dangerouslySetInnerHTML={{ __html: message.contenue.replace(/\n/g, "<br>") }} />

                          <span data-icon="tail-out" class="coin">
                            <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-out</title><path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path><path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path></svg>
                          </span>

                          <button className='btn btn-option'><i class="fa-solid fa-ellipsis-vertical"></i></button>
                      </div>
                    </div>
                    :
                    <div className='message-entrant' onMouseOver={(e)=>handleHover(e)} onMouseLeave={(e)=>handleHoverLeave(e)}>
                      
                      {
                        (users.find(user => user._id === message.id_user)?.photo)?
                        <img alt='pp' src={apiUrl+'/'+users.find(user => user._id === message.id_user)?.photo}/>
                        :
                        <ImageLetters nom={users.find(user => user._id === message.id_user)?.nom || ""} prenoms={users.find(user => user._id === message.id_user)?.prenoms || ""}></ImageLetters>
                      }
                      
                      <div>
                        <span className='name fst-italic'>{users.find(user => user._id === message.id_user)?.nom}, {afficherDateMessage(message.updatedAt)}</span>
                        <div className='px-3 py-2 rounded message-container'>

                          <div dangerouslySetInnerHTML={{ __html: message.contenue.replace(/\n/g, "<br>") }} />
                            {/* <span className='time'>11:50</span> */}

                            <span data-icon="tail-in" class="coin">
                              <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13"><title>tail-in</title><path opacity="0.13" fill="#0000000" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path><path fill="currentColor" d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path></svg>
                            </span>

                            <button className='btn btn-option'><i class="fa-solid fa-ellipsis-vertical"></i></button>
                            {/* texte.replace(/\n/g, "<br>"); */}
                        </div>
                      </div>
                    </div>

                    
                  ))
                }
              
              </div>
            </div>

            <div className='chat-bottom-bar'>
              <div className='container pb-1 d-flex align-items-end'>
                <div className='chat-input-section rounded shadow p-2'> 
                  <button className='btn'><i class="fa-regular fa-face-smile"></i></button>
                  {/* <input type='text' placeholder='Votre message...'/> */}
                  <textarea id="exampleFormControlTextarea1" rows={1} onChange={(e)=>{resizeTextArea(e); setTexteAEnvoyer(e.target.value)}} value={texteAEnvoyer}></textarea>
                  <button className='btn'><i class="fa-solid fa-paperclip"></i></button>
                  <button className='btn btn-send' onClick={()=>sendMessage()}><i class="fa-regular fa-paper-plane pe-none"></i></button>
                </div>
              </div>
              
            </div>
          </div>

          <div className={`section-medias ${mediasOpen ? 'open' : ''}`}>
            <div className='p-3 top-section'>
              <h6 className='fw-bold m-0'>Galérie du groupe</h6>
              <button type="button" class="btn-close btn-sm border-0" aria-label="Close" onClick={()=>setMediasOpen(false)}></button>
            </div>

            {/* {
              users?.map((user)=>(
                <h6>{user.nom}</h6>
              ))
            } */}
            
          </div>
        </div>
      }
        
    </div>
  )
}

export default Chat