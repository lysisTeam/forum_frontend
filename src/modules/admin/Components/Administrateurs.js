import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminContext from '../Contexts/AdminContext'
import axios from 'axios'
import PlaceholderTable from '../Layouts/PlaceholderTable'

function Administrateurs() {
  const [admins, setAdmins] = useState([])

  const [showPlaceholder, setShowPlaceholder] = useState(true)
  const [showOptions, setShowOptions] = useState(false)
  const [selectedAdmins, setSelectedAdmins] = useState([])

  let clickCount = 0;
  const apiUrl = process.env.REACT_APP_API_URL
  const {showToast, admin} = useContext(AdminContext)


  useEffect(()=>{


    const getAdmins = async()=>{
      await axios.get(apiUrl+'/api/admin/all',{
        headers: {
          token: localStorage.admin_token
        }
      })
      .then((response)=>{
        // console.log(response.data.admins.filter(one_admin => one_admin._id !== admin._id));
        setAdmins(response.data.admins.filter(one_admin => one_admin._id !== admin._id))
        setTimeout(() => {
          setShowPlaceholder(false)
        }, 500);
        
        // console.log(response.data);
      })
      .catch((err)=>{
        console.log(err);
      })
    }

    getAdmins()

    // fonction pour fermer le sidebar au click sur le document
    const handleClose = (e) =>{
      if (showOptions && (!e.target.closest('.td-option-section'))) {
        document.querySelector('.td-option-section.show').classList.remove('show')
        setTimeout(() => {
          setShowOptions(false)
          if (document.querySelector('.container-list table')) {
            document.querySelector('.container-list table').classList.remove('disable-hover')
          }
        }, 200);
      }
    }

    //evenements fermer sidebar
    document.addEventListener('mousedown', handleClose);


    return () => {
      document.removeEventListener('mousedown', handleClose);
    };

  },[apiUrl, setAdmins, selectedAdmins, showOptions])

  //cocher ou decocher une checkbox
  const handleChange = (e) =>{
    // console.log(e.target.parentElement.parentElement);
    if (e.target.checked) {
      const newTab = [...selectedAdmins, e.target.id]
      setSelectedAdmins(newTab)

      e.target.parentElement.parentElement.classList.add('selected')
    }else{
      const newTab = selectedAdmins.filter(id => id !== e.target.id)
      setSelectedAdmins(newTab)
      document.querySelector('.container-list thead .form-check-input').checked = false

      e.target.parentElement.parentElement.classList.remove('selected')
    }
  }

  //cocher ou decocher toutes les checkboxs
  const handleChangeAll = (e) =>{
    if (e.target.checked) {
      document.querySelectorAll('.container-list tbody .form-check-input').forEach(checkbox=>{
        checkbox.checked = true

        checkbox.parentElement.parentElement.classList.add('selected')
      })

      setSelectedAdmins([])
      const listAllAdmins = admins.map(one_admin => one_admin._id)
      setSelectedAdmins(listAllAdmins)
    }else{
      document.querySelectorAll('.container-list tbody .form-check-input').forEach(checkbox=>{
        checkbox.checked = false

        checkbox.parentElement.parentElement.classList.remove('selected')
      })

      setSelectedAdmins([])
    }
  }

  const toggleOptions = (e) =>{
    if (!showOptions) {
      setShowOptions(true)
      document.querySelector('.container-list table').classList.add('disable-hover')

      setTimeout(() => {
        e.target.parentElement.lastChild.classList.remove('d-none')
      }, 1);
      
      
      setTimeout(() => {
        e.target.parentElement.lastChild.classList.add('show')
        console.log(showOptions);
      }, 2);
    }
  }

  const handleDelete = async (ids) =>{
    // console.log(ids);
    await axios.delete(apiUrl+'/api/admin/delete',{
      data: {ids:ids},
      headers:{
        token: localStorage.admin_token
      }
    })
    .then((response)=>{
      // console.log(response);
      const newTab = admins.filter(one_admin => !response.data.userDeleted.includes(one_admin._id))
      setAdmins(newTab)
      setSelectedAdmins([])
      setShowOptions(false)
    })
    .catch(err=>{
      setShowOptions(false)
      console.log(err);
    })
  }

  const tripleClick = (ids) =>{
    
    clickCount++;

    if (clickCount === 1) {
      setTimeout(() => {
        if (clickCount === 1 || clickCount === 2) {
          // Un seul clic, ou deux clics
          showToast(`Il pourrait s'agir d'un click accidentel, Cliquez trois fois pour supprimer !`,"bg-danger")
        }
        clickCount = 0;
      }, 700);
    } else if (clickCount === 3) {
      // triple-clic détecté
      handleDelete(ids)
      clickCount = 0;
    }

  }
  
  return (
    <div>
        <h4 className='fw-bold'>Administrateurs</h4>

        <div className='container-list rounded shadow  mt-4'>
          <div className={`container-list-top px-3 ${(selectedAdmins.length !== 0)?'selected':''}`}>
          
            {
              (selectedAdmins.length !== 0)?
              <div className='d-flex justify-content-between align-items-center w-100'>
                <h6 className='fw-bold m-0 text-primary'>{`${selectedAdmins.length} selectionné${(selectedAdmins.length === 1)?'':'s'}`}</h6>
                <button className='btn' onClick={()=>tripleClick(selectedAdmins)} ><i className="fa-solid fa-trash-can text-danger pe-none"></i></button>
              </div>
              :
              <div className='d-flex justify-content-between align-items-center w-100'>
                <h6 className='fw-bold m-0'>Liste des administrateurs</h6>
                {
                  admin.autorisation === 1 &&
                  <Link to={'/admin/add'} className='btn btn-outline-dark btn-sm' ><i className="fa-regular fa-square-plus"></i> Nouvel administrateur</Link>
                }
                
              </div>
              
            }
          </div>
          <table className={`table ${admins?.length !== 0?'table-hover':''} table-borderless border-bottom`}>
            <thead className='m-3'>
              <tr >
                <th scope="col"><input className={`form-check-input ${admin.autorisation && admins.length !== 0? '' : 'pe-none'}`} type="checkbox" value="" onChange={handleChangeAll} aria-label="Checkbox for following text input"/></th>
                <th scope="col">Admin</th>
                <th scope="col">Nom d'utilisateur</th>
                <th scope="col">Email</th>
                <th scope="col">Rôle</th>
                {/* <th scope="col">Classe</th> */}
                <th scope="col"></th>
              </tr>
            </thead>
            {
              (showPlaceholder)?
              <PlaceholderTable/>
              :
              <tbody>
                {
                  admins.length === 0?
                    <tr>
                      <td colspan="6">
                        <h6 className='text-center text-muted'>Aucun administrateur ajouté <br/> 
                          <Link to={'/admin/add'} className='btn btn-light btn-sm text-muted' ><i className="fa-regular fa-square-plus"></i> Cliquez ici pour ajouter</Link>
                        </h6>
                      </td>
                    </tr>
                  
                  :
                    admins?.map(one_admin =>(
                      <tr key={one_admin._id}>
                        <th scope="row"><input className={`form-check-input ${admin.autorisation? '' : 'pe-none'}`} type="checkbox" value="" id={one_admin._id} onChange={handleChange} aria-label="Checkbox for following text input"/></th>
                        {/* <td className='td-profil-pic'><img alt='pp' src={pp}/></td> */}
                        <td className='td-profil-pic text-capitalize'><img alt='pp' src={(one_admin.photo)?apiUrl+'/'+one_admin.photo:'https://i.pinimg.com/originals/38/3d/e0/383de0cdfd99a0dc1edb98e2481b8468.jpg'}/>&nbsp;&nbsp;&nbsp;&nbsp;{`${one_admin.nom} ${one_admin.prenoms}`}</td>
                        <td>{`${one_admin.username}`}</td>
                        <td>{`${one_admin.email}`}</td>
                        <td className='text-capitalize'>{`${one_admin.autorisation? 'super administrateur':' administrateur'}`}</td>
                        {/* <td>{`${one_admin.classe}`}</td> */}
                        <td className='position-relative' style={{'textAlign': 'end'}}>
                          <button className={`btn ${(showOptions)?'pe-none':''}`} onClick={toggleOptions}><i className="fa-solid fa-ellipsis-vertical pe-none"></i></button>
                          {
                            showOptions &&
                            <div className='td-option-section rounded shadow d-flex flex-column d-none'>
                              {/* <button className='btn fw-bold'><i className="fa-solid fa-clock-rotate-left"></i>&nbsp; Réini. le mot de passe</button> */}
                              <button className='btn fw-bold'><i className="fa-solid fa-eye"></i>&nbsp; Voir l'activité</button>
                              {
                                admin.autorisation === 1 &&
                                <button className='btn text-danger fw-bold' onClick={()=>{tripleClick([one_admin._id])}}><i className="fa-solid fa-trash-can pe-none"></i>&nbsp; Supprimer</button>
                              }
                              
                            </div>
                          }
                        </td>
                      </tr>
                    ))

                  
              
                }
              </tbody>
              
            }
          </table>
          <h6 className='text-end text-muted'><i className="fa-brands fa-fantasy-flight-games"></i>&nbsp;&nbsp;</h6>
        </div>
    </div>
  )
}

export default Administrateurs