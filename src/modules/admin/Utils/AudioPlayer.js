import React, { useEffect, useRef, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

const TinyText = styled(Typography)({
    fontSize: '0.70rem',
    opacity: 0.58,
    fontWeight: 500,
    letterSpacing: 0.2,
});

function AudioPlayer({audio}) {

    const audioRef = useRef(null);
    
    const [play, setPlay] = useState(false)
    const [isHolding, setIsHolding] = useState(false)

    const [duration, setDuration] = useState(10);
    const [position, setPosition] = useState(0);

    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }

    const playOrPause = () =>{
        if (audioRef.current) {
            if (play) {
                audioRef.current.pause();
                setPlay(false);
            } else {
                audioRef.current.play();
                setPlay(true);
            }
        }
    }

    const handlePlaying = () => {
        console.log("L'audio est en cours de lecture !");
        // Vous pouvez effectuer d'autres actions ici lorsque l'audio commence à jouer
        console.log(audioRef.current.duration);
    };

    const handleTimeUpdate = () => {
        // Exécuter une action chaque seconde pendant la lecture
        console.log("Le temps de lecture actuel:", audioRef.current.currentTime.toFixed(0));
        setPosition(audioRef.current.currentTime.toFixed(0))
        // Vous pouvez mettre d'autres actions à exécuter ici
    };

    const handleAudioEnd = () => {
        console.log("La lecture de l'audio est terminée.");
        setPlay(false)
        setPosition(0)
        // Vous pouvez mettre d'autres actions à exécuter ici
    };

    function handleHoldStart(event) {
        audioRef.current.pause();
        setPlay(false);
    }
    
    function handleHoldEnd(event) {
        audioRef.current.play();
        setPlay(true);
    }


    useEffect(() => {
        // Ajouter un écouteur d'événement pour timeupdate lors du montage du composant
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        if (audioRef.current) {
            // console.log(audioRef.current.parentElement.querySelector('.MuiSlider-thumb'));
            const thumb = audioRef.current.parentElement.querySelector('.MuiSlider-thumb')

            thumb.addEventListener('touchstart', handleHoldStart);
            thumb.addEventListener('touchend', handleHoldEnd);
        }
    
        // Retirer l'écouteur d'événement lors du démontage du composant
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
      }, []); 

  return (
    <div className='audio-player px-1 m-2 mt-1 rounded gap-2' onClick={playOrPause}>
        <button className='bttn mb-1' style={{width:'35px'}}>
            {
                !play ?
                <i class="fa-solid fa-play text-light"></i>
                :
                <i class="fa-solid fa-pause text-light"></i>
            }
    
        </button>

        <div className='flex-grow-1'>
            <Slider
            aria-label="time-indicator"
            size="small"
            value={position}
            min={0}
            step={1}
            max={duration}
            className='slider'
            onChange={(_, value) => {setPosition(value); audioRef.current.currentTime = value}}
            sx={{
                color:'#fff',
                height: 4,
                '& .MuiSlider-thumb': {
                width: 7,
                height: 7,
                transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                '&::before': {
                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible': {
                    boxShadow: `0px 0px 0px 8px ${
                    'rgb(255 255 255 / 16%)'

                    }`,
                },
                '&.Mui-active': {
                    width: 12,
                    height: 12,
                },
                },
                '& .MuiSlider-rail': {
                opacity: 0.48,
                }
            }}
            />
            <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: -2,
            }}
            >
            <TinyText>{formatDuration(position)}</TinyText>
            <TinyText>-{formatDuration(duration - position)}</TinyText>
            </Box>
        </div>

        <audio ref={audioRef} className='d-none' src={audio} controls onPlaying={handlePlaying} onEnded={handleAudioEnd} />

    </div>
  )
}

export default AudioPlayer