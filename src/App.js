import * as React from 'react';
import './App.css';
import { useLocation } from 'react-router-dom';
import AppUser from './modules/user/AppUser';
import AppAdmin from './modules/admin/AppAdmin';

function App() {
  const location = useLocation()
  const currentRoute = location.pathname

  return (
    <>
      {
        (currentRoute.split('/')[1] === 'admin')?
        <AppAdmin/>
        :
        <AppUser/>
      }
    </>
  );
}

export default App;
