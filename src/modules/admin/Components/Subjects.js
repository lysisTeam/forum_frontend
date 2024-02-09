import React, { useContext, useEffect, useState } from 'react'
import GlobalContext from '../Contexts/GlobalContext'
import { Link } from 'react-router-dom'

import image from '../../../images/Robot Cosmonaut.jpg'
import Chat from '../Layouts/Chat'
import axios from 'axios'

function Subjects() {
  const {setOpenSideBar, openTopBar, setOpenTopBar} = useContext(GlobalContext)
  const [isLoaded, setIsLoaded] = useState(false)
  const [rooms, setRooms] = useState([])
  const [currrentRoom, setCurrentRoom] = useState({})

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

  },[setOpenTopBar, currrentRoom])
  return (
    <div className='position-relative subjects p-2'>
      <button className={`button-toggle-top-bar ${openTopBar? 'fall' : ''}`} onClick={()=>{setOpenTopBar(previous => !previous)}}><i className="fa-solid fa-angle-down pe-none"></i></button>
      
      <div className='first-section rounded'>
        <button className='btn add-room-button shadow'><i class="fa-solid fa-plus"></i></button>

        <div className='p-3 pb-0'>
          <div className='d-flex justify-content-between align-items-center'>
            <h6 className='fw-bold m-0'>Toutes les rooms</h6>
            <span class="badge text-bg-dark">13</span>
          </div>

          <div className='search-room'>
            <input type='text' placeholder='search...'/>
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        
        
        <div className='liste-rooms mt-1'>
          {
            !isLoaded ?
            [1,2,3].map((n)=>(
              <div className='d-flex gap-3 px-3 py-3 overflow-hidden' aria-hidden="true">
                <a class="btn btn-secondary disabled placeholder" style={{width: "45px", height: "45px", borderRadius: "50%" }} aria-disabled="true"></a>
                <div className='flex-grow-1 overflow-hidden col-6'>
                  <p class="card-text placeholder-glow m-0">
                    <span class="placeholder col-7"></span>
                  </p>

                  <p class="card-text placeholder-glow">
                    <span class="placeholder col-12"></span>
                  </p>
                </div>
              </div>
            ))

            :
            rooms?.map((room)=>(
              <div className={`liste-rooms-item px-3 py-3 overflow-hidden ${currrentRoom._id === room._id ? 'active' : ''} `} key={room._id} onClick={()=>setCurrentRoom(room)}>
                <img src={image} alt='test'/>
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

        
          
          <h6 className='text-center text-muted mt-3'><i className="fa-brands fa-fantasy-flight-games"></i></h6>
        </div>
      </div>
      <div className='second-section rounded'>
        <Chat currrentRoom={currrentRoom} />
      </div>
      
    </div>
  )
}

export default Subjects