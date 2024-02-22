import React from 'react'

function ConfirmationModal({handleClickDelete}) {
  return (
    <div class="modal fade" id="confirmation" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body p-0">
                    <h4 className='text-center my-3'>Supprimer le méssage</h4>
                    <p className='text-center'>Voulez-vous vraiment supprimer ce méssage ?</p>
                    <div className='conf-btns'>
                        <button className='close-confirmation' data-bs-dismiss="modal">Annuler</button>
                        <button className='fw-bold text-danger' onClick={handleClickDelete}>Supprimer</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal