import React from 'react'

function Alerte() {
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" className="toast bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
            {/* <div className="toast-header">
            <strong className="me-auto">Alerte</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div> */}
            <div className="toast-body text-white">
            {textError}
            </div>
        </div>
    </div>
  )
}

export default Alerte