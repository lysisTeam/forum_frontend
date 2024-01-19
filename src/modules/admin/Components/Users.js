import React from 'react'
import pp from '../../../images/avatar_25.jpg'

function Users() {
  return (
    <div>
        <div className='d-flex justify-content-between'>
          <h4 className='fw-bold'>Etudiants</h4>
          <button className='btn btn-dark'><i class="fa-regular fa-square-plus"></i> Ajouter</button>
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
              <tr>
                <th scope="row"><input class="form-check-input" type="checkbox" value="" aria-label="Checkbox for following text input"/></th>
                {/* <td className='td-profil-pic'><img alt='pp' src={pp}/></td> */}
                <td className='td-profil-pic'><img alt='pp' src={pp}/> Mounirou abdul kodir</td>
                <td>kodir2023</td>
                <td>mounirouabdul40@gmail.com</td>
                <td>DAD</td>
                <td>DAD - A</td>
                <td><button className='btn'><i class="fa-solid fa-ellipsis"></i></button></td>
              </tr>
              <tr>
                <th scope="row"><input class="form-check-input" type="checkbox" value="" aria-label="Checkbox for following text input"/></th>
                {/* <td className='td-profil-pic'><img alt='pp' src={pp}/></td> */}
                <td className='td-profil-pic'><img alt='pp' src={pp}/> Mounirou abdul kodir</td>
                <td>kodir2023</td>
                <td>mounirouabdul40@gmail.com</td>
                <td>DAD</td>
                <td>DAD - A</td>
                <td><button className='btn'><i class="fa-solid fa-ellipsis"></i></button></td>
              </tr>
              <tr>
                <th scope="row"><input class="form-check-input" type="checkbox" value="" aria-label="Checkbox for following text input"/></th>
                {/* <td className='td-profil-pic'><img alt='pp' src={pp}/></td> */}
                <td className='td-profil-pic'><img alt='pp' src={pp}/> Mounirou abdul kodir</td>
                <td>kodir2023</td>
                <td>mounirouabdul40@gmail.com</td>
                <td>DAD</td>
                <td>DAD - A</td>
                <td><button className='btn'><i class="fa-solid fa-ellipsis"></i></button></td>
              </tr>
              
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Users