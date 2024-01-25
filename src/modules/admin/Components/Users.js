import React, { useContext, useEffect, useState } from 'react'
// import pp from '../../../images/avatar_25.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PlaceholderTable from '../Layouts/PlaceholderTable'
import AdminContext from '../Contexts/AdminContext'

function Users() {
  const [showPlaceholder, setShowPlaceholder] = useState(true)
  const [showOptions, setShowOptions] = useState(false)
  const [students, setStudents] = useState([])
  const [selectedStudents, setSelectedStudents] = useState([])
  const apiUrl = process.env.REACT_APP_API_URL
  const {showToast} = useContext(AdminContext)

  let clickCount = 0;
  

  useEffect(()=>{


    const getStudents = async()=>{
      await axios.get(apiUrl+'/api/user/all',{
        headers: {
          token: localStorage.admin_token
        }
      })
      .then((response)=>{
        // console.log(response.data.users);
        setStudents(response.data.users)
        setTimeout(() => {
          setShowPlaceholder(false)
        }, 500);
        
        // console.log(response.data);
      })
      .catch((err)=>{
        console.log(err);
      })
    }

    getStudents()

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

  },[apiUrl, setStudents, selectedStudents, showOptions])

  //cocher ou decocher une checkbox
  const handleChange = (e) =>{
    // console.log(e.target.parentElement.parentElement);
    if (e.target.checked) {
      const newTab = [...selectedStudents, e.target.id]
      setSelectedStudents(newTab)

      e.target.parentElement.parentElement.classList.add('selected')
    }else{
      const newTab = selectedStudents.filter(id => id !== e.target.id)
      setSelectedStudents(newTab)
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

      setSelectedStudents([])
      const listAllStudents = students.map(student => student._id)
      setSelectedStudents(listAllStudents)
    }else{
      document.querySelectorAll('.container-list tbody .form-check-input').forEach(checkbox=>{
        checkbox.checked = false

        checkbox.parentElement.parentElement.classList.remove('selected')
      })

      setSelectedStudents([])
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
    await axios.delete(apiUrl+'/api/user/delete',{
      data: {ids:ids},
      headers:{
        token: localStorage.admin_token
      }
    })
    .then((response)=>{
      // console.log(response);
      const newTab = students.filter(student => !response.data.userDeleted.includes(student._id))
      setStudents(newTab)
      setSelectedStudents([])
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
        <h4 className='fw-bold'>Etudiants</h4>
        
        <div className='container-list rounded shadow  mt-4'>
          <div className={`container-list-top px-3 ${(selectedStudents.length !== 0)?'selected':''}`}>
          
            {
              (selectedStudents.length !== 0)?
              <div className='d-flex justify-content-between align-items-center w-100'>
                <h6 className='fw-bold m-0 text-primary'>{`${selectedStudents.length} selectionné${(selectedStudents.length === 1)?'':'s'}`}</h6>
                <button className='btn' onClick={()=>tripleClick(selectedStudents)} ><i class="fa-solid fa-trash-can text-danger pe-none"></i></button>
              </div>
              :
              <div className='d-flex justify-content-between align-items-center w-100'>
                <h6 className='fw-bold m-0'>Liste des étudiants</h6>
                <Link to={'/admin/users/add'} className='btn btn-outline-dark btn-sm' ><i class="fa-regular fa-square-plus"></i> Nouvel étudiant</Link>
              </div>
              
            }
          </div>
          <table class={`table ${students?.length !== 0?'table-hover':''} table-borderless `}>
            <thead className='m-3'>
              <tr >
                <th scope="col"><input class="form-check-input" type="checkbox" value="" onChange={handleChangeAll} aria-label="Checkbox for following text input"/></th>
                <th scope="col">Etudiant</th>
                <th scope="col">Nom d'utilisateur</th>
                <th scope="col">Email</th>
                <th scope="col">Spécialité</th>
                <th scope="col">Classe</th>
                <th scope="col"></th>
              </tr>
            </thead>
            {
              (showPlaceholder)?
              <PlaceholderTable/>
              :
              <tbody>
                {

                  students.length === 0?
                    <tr>
                      <td colspan="7">
                        <h6 className='text-center text-muted'>Aucun étudiant ajouté <br/> 
                          <Link to={'/admin/users/add'} className='btn btn-light btn-sm text-muted' ><i class="fa-regular fa-square-plus"></i> cliquez ici pour ajouter</Link>
                        </h6>
                      </td>
                    </tr>

                  :
                  students?.map(student =>(
                    <tr key={student._id}>
                      <th scope="row"><input class="form-check-input" type="checkbox" value="" id={student._id} onChange={handleChange} aria-label="Checkbox for following text input"/></th>
                      {/* <td className='td-profil-pic'><img alt='pp' src={pp}/></td> */}
                      <td className='td-profil-pic'><img alt='pp' src={(student.photo)?apiUrl+'/'+student.photo:'https://i.pinimg.com/originals/38/3d/e0/383de0cdfd99a0dc1edb98e2481b8468.jpg'}/>&nbsp;&nbsp;&nbsp;&nbsp;{`${student.nom} ${student.prenoms}`}</td>
                      <td>{`${student.username}`}</td>
                      <td>{`${student.email}`}</td>
                      <td>{`${student.specialite}`}</td>
                      <td>{`${student.classe}`}</td>
                      <td className='position-relative'>
                        <button className={`btn ${(showOptions)?'pe-none':''}`} onClick={toggleOptions}><i class="fa-solid fa-ellipsis-vertical pe-none"></i></button>
                        {
                          showOptions &&
                          <div className='td-option-section rounded shadow d-flex flex-column d-none'>
                            {/* <button className='btn fw-bold'><i class="fa-solid fa-clock-rotate-left"></i>&nbsp; Réini. le mot de passe</button> */}
                            <button className='btn fw-bold'><i class="fa-solid fa-eye"></i>&nbsp; Voir</button>
                            <button className='btn text-danger fw-bold' onClick={()=>{tripleClick([student._id])}}><i class="fa-solid fa-trash-can pe-none"></i>&nbsp; Supprimer</button>
                          </div>
                        }
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            }
          </table>
        </div>
    </div>
  )
}

export default Users