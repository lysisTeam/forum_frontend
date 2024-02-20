import React, { useContext, useEffect, useState } from 'react'
// import image from '../../../images/Robot Cosmonaut.jpg'
// import avatar from "../../../images/avatar.jpg"
import ImageLetters from './ImageLetters'
import axios from 'axios'
import AdminContext from '../Contexts/AdminContext'
import SocketContext from '../Contexts/SocketContext'
import ChatBarInput from './ChatBarInput'
import Messages from './Messages'


function Chat({currentRoom, setRooms}) {
  const apiUrl = process.env.REACT_APP_API_URL
  const [mediasOpen, setMediasOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const {admin} = useContext(AdminContext)
  const [users, setUsers] = useState([])
  const [messageArrival, setMessageArrival] = useState(null)

  const [showMessageOptions, setShowMessageOptions] = useState(false)

  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const [texteAEnvoyer, setTexteAEnvoyer] = useState("")

  const [responseTo, setResponseTo] = useState({id: null, message: "", user: ""})

  const [modif, setModif] = useState({id: null, message: ""})

  const [messageToDelete, setMessageToDelete] = useState(null)

  const socket = useContext(SocketContext)

  useEffect(()=>{
    setShowEmojiPicker(false)
    setTexteAEnvoyer("")
    setShowMessageOptions(false)
    setResponseTo({id: null, message: "", user: ""})

    if (document.querySelector('textarea')) {
      document.querySelector('textarea').style.height = "22px"
    }
    
    // setTimeout(() => {
    //   var objDiv = document.querySelector('.section-messages');
    //     if (objDiv) {
    //       objDiv.scroll({
    //         top: objDiv.scrollHeight,
    //         behavior: "smooth",
    //       });
    //     }
    //   }, 1);


    const getMessages = async()=>{
      
        if (currentRoom._id) {
          await axios.get(`${apiUrl}/api/message/${currentRoom?._id}/admin`,{
            headers: {
              token: localStorage.admin_token
            }
          })
          .then(response =>{
            setMessages(afficherFileMessages(response.data.messages))
            document.querySelector("textarea").rows = 1

            setTimeout(() => {
              var objDiv = document.querySelector('.section-messages');
                objDiv.scroll({
                  top: objDiv.scrollHeight,
                  // behavior: "smooth",
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

    const handleClose = (e) =>{
      // console.log(e.target);
      // console.log(showMessageOptions);
      if ((!e.target.closest('.message-options')) && document.querySelector('.message-options.show')) {
        setShowMessageOptions(false)
        document.querySelector('.message-options.show').classList.remove('show')
        document.querySelectorAll('.btn-option').forEach(btn => {
          btn.style.display = 'none'
        })
      }

    }
    
    document.addEventListener('mousedown', handleClose);
    document.addEventListener('onscroll', handleClose)
    return () => {
      document.removeEventListener('mousedown', handleClose);
    };
  },[currentRoom, apiUrl])


  const sendMessage = async()=>{
    if (texteAEnvoyer) {
      await axios.post(`${apiUrl}/api/message/send-message/${currentRoom._id}/admin`,{
        type: "message",
        contenue: texteAEnvoyer,
        isResponseTo: responseTo.id || null
      },{
        headers: {
          token: localStorage.admin_token
        }
      })
      .then((response)=>{
        setMessages(previous => [...previous, response.data.message])

        setRooms(previous => previous.filter(rm => rm._id !== response.data.room._id))
        setRooms(previous => [response.data.room, ...previous])

        document.querySelector('textarea').style.height = "22px"
        setTimeout(() => {
          var objDiv = document.querySelector('.section-messages');
            objDiv.scroll({
              top: objDiv.scrollHeight,
              behavior: "smooth",
            });
        }, 1);
        setTexteAEnvoyer("")
        setResponseTo({id: null, message: "", user: ""})
        
        socket.emit('message:send', {message: response.data.message, users: users.filter(user => user._id !== admin._id)})
        
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  }

  const modifMessage = async()=>{
    if (modif.id && texteAEnvoyer) {
      await axios.put(`${apiUrl}/api/message/${modif.id}/admin`,{
        contenue: texteAEnvoyer,
        modified: true
      },{
        headers: {
          token: localStorage.admin_token
        }
      })
      .then((response)=>{
        setMessages(afficherFileMessages(response.data.messages))

        console.log(response);
        
        if (response.data.room) {
          setRooms(previous => previous.filter(rm => rm._id !== response.data.room._id))
          setRooms(previous => [response.data.room, ...previous])
        }
        
        setTexteAEnvoyer("")
        document.querySelector('textarea').style.height = "22px"
        setModif({id: null, message: ""})
        socket.emit('message:modified', {message: response.data.messageModified, users: users.filter(user => user._id !== admin._id)})
        
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  }


  useEffect(()=>{
    socket.on('message:receive', (data)=>{

      setRooms(previous => previous.filter(rm => rm._id !== data.room._id))
      setRooms(previous => [data.room, ...previous])

      if (data.message.id_room === currentRoom._id) {
        setMessageArrival(data.message)
      }
      
    })
    
  },[socket, currentRoom._id, setRooms])

  useEffect(()=>{
    if (messageArrival) {
      console.log(messageArrival);


      setMessages(previous => [...previous, messageArrival])

      setTimeout(() => {
        console.log(document.querySelectorAll('.btn-response')[document.querySelectorAll('.btn-response').length - 1]);
        const btn = document.querySelectorAll('.btn-response')[document.querySelectorAll('.btn-response').length - 1]
        
        btn.addEventListener('click', () => handleClickResponse(messageArrival))
        
      }, 1);
      // console.log(messageArrival);
      setTimeout(() => {
        var objDiv = document.querySelector('.section-messages');
          objDiv.scroll({
            top: objDiv.scrollHeight,
            behavior: "smooth",
          });
      }, 2);
    }
  },[messageArrival])

  useEffect(()=>{
    socket.on('message:receive-updated', (data)=>{
      // console.log(data);
      if (data.room) {
        setRooms(previous => previous.filter(rm => rm._id !== data.room._id))
        setRooms(previous => [data.room, ...previous])
      }
      
      if (data.idRoom === currentRoom._id) {
        setMessages(afficherFileMessages(data.messages))
      }
      
    })
    
  },[socket, currentRoom._id])

  const afficherDateMessage = (createdAt)=>{
    const dateMessage = new Date(createdAt);
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
                // console.log(dateMessage);
                // console.log(avantHier(dateActuelle));
                // console.log(dateMessage > avantHier(dateActuelle));
            }
            if (message.type !== 'info') {
              fileMessages.push({ type: 'entete', contenue: enteteDate});
            }
            
            datePrecedente = dateMessage;
        }

        // Ajouter le message
        fileMessages.push({ id: message._id ,type: message.type, contenue: message.contenue,  id_room: message.id_room, id_user: message.id_user, isResponseTo: message.isResponseTo ,createdAt: message.createdAt, updatedAt: message.updatedAt, modified: message.modified, deleted: message.deleted});
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

  const resizeTextArea = (e) =>{
    const textArea = document.querySelector('textarea')
    textArea.style.height = 'auto'; // Réinitialisez la hauteur à auto
    textArea.style.height = (textArea.scrollHeight) + 'px'; // Ajustez la hauteur en fonction du contenu

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

  const handleEmojiClick = (emoji, event)=>{
    console.log(emoji);
    setTexteAEnvoyer(previous => previous + emoji.emoji)
  }

  const handleClickOption = (e)=>{
    e.target.parentElement.querySelector('.message-options').classList.add('show')
    setShowMessageOptions(true)
  }

  const handleClickResponse = (message) =>{
    // users.find(user => user._id === message.id_user)?.nom
    
    setResponseTo({id: message._id || message.id, message: message.contenue}); 
    setShowMessageOptions(false);
    if (document.querySelector('.message-options.show')) {
      document.querySelector('.message-options.show').classList.remove('show')
      
    }
  }

  const handleClickModif = (message) =>{
    // users.find(user => user._id === message.id_user)?.nom
    setResponseTo({id: null, message: "", user: ""})

    setModif({id: message.id || message._id, message: message})
    setTexteAEnvoyer(message.contenue)

    document.querySelector('textarea').focus()
    setTimeout(() => {
      resizeTextArea()
    }, 1);
    

    setShowMessageOptions(false);
    if (document.querySelector('.message-options.show')) {
      document.querySelector('.message-options.show').classList.remove('show')
      
    }
  }

  const handleClickResetModif = () =>{
    // users.find(user => user._id === message.id_user)?.nom
    setResponseTo({id: null, message: "", user: ""})
    setModif({id: null, message: ""})

    setTexteAEnvoyer("")

    if (document.querySelector('textarea')) {
      document.querySelector('textarea').style.height = "22px"
    }
  }


  const handleClickDelete = async() =>{
    // console.log(messageToDelete);
    if (messageToDelete) {
      await axios.put(`${apiUrl}/api/message/${messageToDelete}/admin`,{
        deleted: true
      },{
        headers: {
          token: localStorage.admin_token
        }
      })
      .then((response)=>{
        setMessages(afficherFileMessages(response.data.messages))
        
        if (response.data.room) {
          setRooms(previous => previous.filter(rm => rm._id !== response.data.room._id))
          setRooms(previous => [response.data.room, ...previous])
        }
        
        handleClickResetModif()

        setMessageToDelete(null)

        socket.emit('message:modified', {message: response.data.messageModified, users: users.filter(user => user._id !== admin._id)})
        

        document.querySelector('.close-confirmation').click()
        
      })
      .catch((error)=>{
        console.log(error);
      })
    }
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
                  <h6 className='m-0 fw-bold'>{currentRoom.titre} &nbsp;&nbsp; <i className="fa-solid fa-gear"></i></h6>
                  <span>{`${currentRoom.members.length} participant${currentRoom.members.length < 2 ? '' : 's'}`}</span>
                </div>
              
              </div>
              <div className='btns'>
                <button className='btn btn-top-bar' onClick={()=>setMediasOpen(previous => !previous)}><i className="bi bi-images pe-none"></i></button>
                <button className='btn btn-top-bar'><i className="bi bi-person-fill-add"></i></button>
                <button className='btn btn-top-bar'><i className="bi bi-telephone-fill"></i></button>
                {/* <button className='btn btn-top-bar'><i className="fa-solid fa-video"></i></button> */}
              </div>
            </div>
            <div className='chat-body'>
              {
                modif.id && 
                <div className='section-modif'>
                  <div className='container'>
                    <div className='message-sortant'>
                      <button className='btn' onClick={handleClickResetModif}><i class="fa-regular fa-circle-xmark display-6 text-muted pe-none"></i></button>
                      <div className='msg-ss'>
                        <span className='name fst-italic'>Moi, {afficherDateMessage(modif.message.createdAt)}</span>
                        <div className='px-3 py-2 rounded message-container shadow'>
                            <div className='pl-5'>
                              <div dangerouslySetInnerHTML={{ __html: modif.message.contenue.replace(/\n/g, "<br>") }} />
                            </div>

                            <span data-icon="tail-out" className="coin">
                              <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 8 13"><title>tail-out</title><path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path><path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path></svg>
                            </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
              
              <div className='container section-messages'>
                <Messages users={users} admin={admin} messages={messages} handleClickResponse={handleClickResponse} afficherDateMessage={afficherDateMessage} handleClickOption={handleClickOption} showMessageOptions={showMessageOptions} handleClickModif={handleClickModif} setMessageToDelete={setMessageToDelete} handleClickDelete={handleClickDelete} />
              </div>
            </div>

            <div className='chat-bottom-bar'>
              <ChatBarInput responseTo={responseTo} setResponseTo={setResponseTo} setShowEmojiPicker={setShowEmojiPicker} setTexteAEnvoyer={setTexteAEnvoyer} texteAEnvoyer={texteAEnvoyer} showEmojiPicker={showEmojiPicker} sendMessage={sendMessage} handleEmojiClick={handleEmojiClick} resizeTextArea={resizeTextArea} modifMessage={modifMessage} modif={modif}/>
            </div>
          </div>

          <div className={`section-medias ${mediasOpen ? 'open' : ''}`}>
            <div className='p-3 top-section'>
              <h6 className='fw-bold m-0'>Galérie du groupe</h6>
              <button type="button" className="btn-close btn-sm border-0" aria-label="Close" onClick={()=>setMediasOpen(false)}></button>
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