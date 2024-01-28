import React from 'react'

function PlaceholderTable() {
  return (
    <tbody>
        <tr className='bg-dark'>
            <th colSpan={6}>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" style={{"width": "3rem", "height": "3rem"}} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </th>
        </tr>
    </tbody>
  )
}

export default PlaceholderTable