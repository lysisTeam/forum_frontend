import React, { useEffect, useRef, useState } from 'react'

function Timer({isRecording}) {
    let timerInterval = useRef(null);

    const [timer, setTimer] = useState("00:00")

    useEffect(()=>{

        function afficherTimer(second) {
            if (isRecording) {

                var seconds = second;
                // Afficher le timer chaque seconde
                timerInterval.current = setInterval(function() {
                    seconds++;
                    var minutes = Math.floor(seconds / 60);
                    var remainingSeconds = seconds % 60;
            
                    // Ajouter un zéro devant les nombres < 10
                    var minutesStr = minutes < 10 ? "0" + minutes : minutes;
                    var secondsStr = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
            
                    // Afficher le timer
                    setTimer(minutesStr + ":" + secondsStr);
                }, 1000); // Répéter toutes les 1000 ms (1 seconde)
                
            }else{
                clearTimer()
            }
            
        }

        const clearTimer = ()=>{
            clearInterval(timerInterval.current)
            setTimer("00:00")
        }

        
        afficherTimer(0)
       

    },[isRecording])

    

    


  return (
    <span className='' style={{fontSize: "0.8rem"}}>{timer}</span>
  )
}

export default Timer