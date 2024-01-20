import React, { useEffect, useState } from 'react'
import pp from '../../../images/avatar_25.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Users() {
  const [students, setStudents] = useState([])
  const apiUrl = process.env.REACT_APP_API_URL

  useEffect(()=>{
    const getStudents = async()=>{
      await axios.get(apiUrl+'/api/user/all',{
        headers: {
          token: localStorage.admin_token
        }
      })
      .then((response)=>{
        setStudents(response.data.users)
        console.log(response.data);
      })
      .catch((err)=>{
        console.log(err);
      })
    }

    getStudents()
  },[apiUrl, setStudents])

  return (
    <div>
        <div className='d-flex justify-content-between'>
          <h4 className='fw-bold'>Etudiants</h4>
          <Link to={'/admin/users/add'} className='btn btn-dark' ><i class="fa-regular fa-square-plus"></i> Nouvel étudiant</Link>
        </div>
        <div className='container-list rounded-3 shadow p-3 mt-4'>
          <h6 className='fw-bold m-0'>Liste des étudiants</h6>
          <hr className='my-3'/>
          <table class="table table-hover table-borderless">
            <thead className=''>
              <tr >
                <th scope="col"><input class="form-check-input" type="checkbox" value="" aria-label="Checkbox for following text input"/></th>
                <th scope="col">Etudiant</th>
                <th scope="col">Nom d'utilisateur</th>
                <th scope="col">Email</th>
                <th scope="col">Spécialité</th>
                <th scope="col">Classe</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {
                students?.map(student =>(
                  <tr>
                    <th scope="row"><input class="form-check-input" type="checkbox" value="" aria-label="Checkbox for following text input"/></th>
                    {/* <td className='td-profil-pic'><img alt='pp' src={pp}/></td> */}
                    <td className='td-profil-pic'><img alt='pp' src={apiUrl+'/'+student.photo}/>{` ${student.nom} ${student.prenoms}`}</td>
                    <td>{`${student.username}`}</td>
                    <td>{`${student.email}`}</td>
                    <td>{`${student.specialite}`}</td>
                    <td>{`${student.classe}`}</td>
                    <td><button className='btn'><i class="fa-solid fa-ellipsis"></i></button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Users