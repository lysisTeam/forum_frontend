import React, { useEffect, useState } from 'react'

function ImageLetters({nom, prenoms}) {
    const [word, setWord] = useState("")
    useEffect(()=>{
        if (!prenoms) {
            console.log(nom.split(" "))
            const words = nom.split(" ")
            if (words.length > 1) {
                setWord(words[0][0] + words[1][0])
            }else{
                setWord(nom[0] + nom[1])
            }
        }else{
            setWord(nom[0] + prenoms[0])
        }
    },[nom, prenoms, word])
  return (
    <div className='image-lettres shadow'>{word.toUpperCase()}</div>
  )
}

export default ImageLetters