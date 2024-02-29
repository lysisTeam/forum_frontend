import React from 'react'

function Galerie({mediasOpen, setMediasOpen}) {
  return (
    <div className={`section-medias ${mediasOpen ? 'open' : ''}`}>
        <div className='p-3 top-section'>
            <h6 className='fw-bold m-0'>
                <button type="button" className=" border-0" style={{backgroundColor: "transparent"}} onClick={()=>setMediasOpen(false)}><i class="fa-solid fa-xmark"></i></button>
                &nbsp; Galérie
            </h6>
        </div>

        {/* {
            users?.map((user)=>(
            <h6>{user.nom}</h6>
            ))
        } */}
    
    </div>
  )
}

export default Galerie