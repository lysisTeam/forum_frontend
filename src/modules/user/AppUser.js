import {React, useRef, useState} from 'react';

function AppUser() {
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioURL, setAudioURL] = useState(null);
  let mediaRecorder = useRef(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorder.current = new MediaRecorder(stream);
        console.log(mediaRecorder);
        mediaRecorder.current.ondataavailable = handleDataAvailable;
        mediaRecorder.current.start();
        setRecording(true);
      })
      .catch(error => console.error('Error accessing microphone:', error));
  };

  const stopRecording = () => {
    console.log(mediaRecorder);
    if (mediaRecorder) {
      mediaRecorder.current.stop();
      setRecording(false);
    }
  };

  const handleDataAvailable = (event) => {
    console.log(event);
    if (event.data.size > 0) {
      setAudioChunks([event.data]);
    }
  };

  const playRecording = () => {
    console.log(audioChunks);
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const url = URL.createObjectURL(audioBlob);
    setAudioURL(url);
    const audio = new Audio(url);
    audio.play();
  };
  return (
    <div>
    <button onClick={recording ? stopRecording : startRecording}>
      {recording ? 'Stop Recording' : 'Start Recording'}
    </button>
    <button onClick={playRecording} disabled={!true}>
      Play Recording
    </button>
    {true && <audio src={audioURL} controls />}
  </div>
  )
}

export default AppUser