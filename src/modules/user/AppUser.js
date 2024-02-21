import React, { useState } from 'react'

function AppUser() {
  const [test, setTest] = useState("")
  return (
    <div>
      <textarea id="exampleFormControlTextarea1" onChange={(e)=>setTest(e.target.value)} value={test}></textarea>
      
    </div>
  )
}

export default AppUser