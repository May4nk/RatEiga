//components//navbar.js
import '../App.css';

//icon
import icn from '../icon/icons.png';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import decode from 'jwt-decode';

import CreatePoster from './movies/create.component';

const Navbar = ({ setUpdateId, updateId, show, setshow }) =>{
   const dispatch = useDispatch();
   const history = useNavigate();
   const locate = useLocation();
   const [ user, setUser ] = useState(JSON.parse(window.localStorage.getItem('profile')));

    //modale showing and hiding    
    const showCreate = () => {
        setshow(true);
    }

    const hideCreate = () => {
        setUpdateId(0);
        setshow(false);
    }

    //logout    
    const lgout = () => {
        dispatch({ type: 'LOGOUT' });

        history('/');

        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodeToken = decode(token);

            if(decodeToken.exp * 1000 < new Date().getTime()) lgout();
        }

        setUser(JSON.parse(window.localStorage.getItem('profile')));
    }, [locate]);


    return (
        <div className='row'>
          <nav>
              <div className="nav-wrapper blue">
                  <img src={icn} className='icn' alt='witch on broom'/>
                  <div className='name'> 
                      <Link to='/' className="black-text">RatEiga</Link> 
                  </div>
                  <div className='motto'>
                      Rate Movies, You Witch!
                  </div>
                  <ul className="right comp">
                      <li><Link className='black-text actors' to="/actors&prod">Actors/Producers</Link></li>
                      { user?.result ? (
                        <>
                          <li>
                              <button className="btn black waves-effect waves-light" onClick={ showCreate} title='Create'>
                                 <div className='grey-text' > + </div>
                              </button>
                          </li>
                          <li>
                              <button className="btn grey waves-effect waves-light" onClick={ lgout }>
                                  <Link to="/" className='black-text'> 
                                      LOGOUT 
                                  </Link>
                              </button>
                          </li>
                        </>
                       ) : (
                          <li>
                              <button className="btn black waves-effect waves-light">
                                  <Link to="/auth" className='blue-text'> 
                                      LOGIN
                                  </Link> 
                              </button>
                          </li>
                      )}  
                  </ul>
              </div>
          </nav>
          <CreatePoster handleClose={ hideCreate } show={ show } updateId={ updateId } setUpdateId={ setUpdateId }/>
        </div>
    );
}

export default Navbar;
