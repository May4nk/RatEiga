//App.js
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//hooks
import { useEffect, useState } from 'react';

//components
import Home from './components/home.js';
import ActPro from './components/proact.js';
import Navbar from './components/navbar.js';
import Auth from './components/auth.js';

const App = () => {
    
    //modale create
    const [ show, setshow ] = useState(false); 
    
    //modale About
    const [ aboutShow, setAboutShow ] = useState(false);

    //update id movie/actor 
    const [ updateId, setUpdateId ] = useState(0);
    
    //About id movie/Actors 
    const [aboutId, setAboutId ] = useState(0);
 
    //modale showing on update    
    useEffect(()=>{
       if(updateId !== 0) setshow(true);
    },[updateId]);
 
    return (
        <BrowserRouter>
          <Navbar setUpdateId={ setUpdateId } updateId={ updateId } show={ show } setshow={ setshow }/>
          <div className='content'>
            <Routes>
              <Route path='/auth' element={ <Auth /> }/>
              <Route path='/' exact element={ <Home setUpdateId={ setUpdateId } setAboutId={ setAboutId } setAboutShow={ setAboutShow } aboutShow={ aboutShow } aboutId={ aboutId }/> }/>
              <Route path='/actors&prod' exact element={ <ActPro setUpdateId={ setUpdateId } setAboutId={ setAboutId } setAboutShow={ setAboutShow } aboutShow={ aboutShow } aboutId={ aboutId }/> }/>
            </Routes>
          </div>
        </BrowserRouter>  
    );
}

export default App;
