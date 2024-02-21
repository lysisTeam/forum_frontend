import React, { useEffect, useState } from 'react'

function ImageLetters({nom, prenoms, size, fs}) {
    const [word, setWord] = useState("")
    useEffect(()=>{
        if (!prenoms) {
            // console.log(nom.split(" "))
            const words = nom.split(" ")
            if (words.length > 1) {
                setWord(words[0][0] + words[1][0])
            }else{
                setWord(nom[0] + nom[1])
            }
        }else{
            setWord(nom[0] + prenoms[0])
        }

    },[nom, prenoms, word, size])
  return (
    <div className='image-lettres shadow' style={{width : size + 'px', height: size + 'px', fontSize: fs + 'px'}}>{(word ? word : "").toUpperCase()}</div>
  )
}

export default ImageLetters