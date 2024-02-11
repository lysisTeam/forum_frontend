import React, { useContext, useEffect, useState } from 'react'
import GlobalContext from '../Contexts/GlobalContext'

import image from '../../../images/Robot Cosmonaut.jpg'
import avatar from "../../../images/avatar.jpg"
import Chat from '../Layouts/Chat'
import axios from 'axios'
import AddRoomModal from '../Layouts/AddRoomModal'

function Subjects() {
  const { openTopBar, setOpenTopBar} = useContext(GlobalContext)
  const [isLoaded, setIsLoaded] = useState(false)
  const [rooms, setRooms] = useState([])
  const [currentRoom, setCurrentRoom] = useState({})

  const apiUrl = process.env.REACT_APP_API_URL

  useEffect(()=>{
    setOpenTopBar(false)

    const getRooms = async()=>{
      await axios.get(apiUrl+'/api/room/admin',{
        headers:{
            token: localStorage.getItem('admin_token')
        }
    }).then(response => {
        setRooms(response.data.rooms)
        setTimeout(() => {
          setIsLoaded(true)
        }, 1000);
        
    }).catch(err => {
        console.log(err);
        setTimeout(() => {
          setIsLoaded(true)
        }, 1000);
    })
    }

    getRooms()


  },[setOpenTopBar, currentRoom, apiUrl])
  return (
    <div className='position-relative subjects p-2'>
      <button className={`button-toggle-top-bar ${openTopBar? 'fall' : ''}`} onClick={()=>{setOpenTopBar(previous => !previous)}}>
        <i className="fa-solid fa-angle-down pe-none"></i>
      </button>
      
      <div className='first-section rounded'>
        <button className='btn add-room-button shadow' data-bs-toggle="modal" data-bs-target="#addRoomModal">
          <i className="fa-solid fa-plus"></i>
          {
            isLoaded && rooms.length === 0 &&
            <i className="fa-solid fa-down-long fa-bounce"></i>
          }
        </button>

        <div className=''>
          <div className='d-flex justify-content-between align-items-center top-tiny-bar px-3'>
            <h6 className='fw-bold m-0'>Rooms</h6>
            <img alt='user-avatar' src={avatar} />
          </div>

          <div className='search-room m-3 mb-0'>
            <input type='text' placeholder='search...'/>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        
        
        <div className='liste-rooms mt-1'>
          {
            !isLoaded ?
            [1,2,3].map((n)=>(
              <div className='d-flex gap-3 px-3 py-3 overflow-hidden' aria-hidden="true">
                <button className="btn btn-secondary disabled placeholder" style={{width: "45px", height: "45px", borderRadius: "50%" }} aria-disabled="true"></button>
                <div className='flex-grow-1 overflow-hidden col-6'>
                  <p className="card-text placeholder-glow m-0">
                    <span className="placeholder col-7"></span>
                  </p>

                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-12"></span>
                  </p>
                </div>
              </div>
            ))

            :
            rooms?.map((room)=>(
              <div className={`liste-rooms-item px-3 py-3 overflow-hidden ${currentRoom._id === room._id ? 'active' : ''} `} key={room._id} onClick={()=>setCurrentRoom(room)}>
                <img alt='cover' src={(room.cover)?apiUrl+'/'+room.cover: image}/>
                
                <div className='flex-grow-1 overflow-hidden col-6 d-flex flex-column justify-content-center gap-1'>
                  <div className='d-flex justify-content-between align-items-center overflow-hidden '>
                    <h6 className=''>{room.titre}</h6>
                    <span style={{fontSize: "0.8rem"}}>3 jours</span>
                  </div>
                  <p className=''>aucun message...</p>
                </div>
              </div>
            ))

          }

          
          <h6 className='text-center text-muted mt-3'>Aucune room pour l'instant</h6>
          <h6 className='text-center text-muted mt-3'><i className="fa-brands fa-fantasy-flight-games"></i></h6>
        </div>
        
      </div>
      <div className='second-section rounded'>
        <Chat currentRoom={currentRoom} />
      </div>
      <AddRoomModal setRooms={setRooms}/>
    </div>
  )
}

export default Subjects