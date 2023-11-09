import { useEffect } from 'react';
import './App.css';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

function App() {
  const location = useLocation()
  const currentRoute = location.pathname

  useEffect(()=>{
    console.log(currentRoute);
  })

  return (
    <>
    </>
  );
}

export default App;
