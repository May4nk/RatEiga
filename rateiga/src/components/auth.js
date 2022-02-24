//components/auth
import './auth.css';

//hooks
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import { signIn, signUp } from '../actions/user.js';

const Auth = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [ signup, setSignup ] = useState(false);
    const [ signData, setSignData] = useState({ email:'', password:'', confirmpwd:'' });
    
    //google login 
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try{
            dispatch({ type: 'AUTH', data:{ result, token }  })

            history('/')
        }catch(err){
            console.log(err);
        }
    }

    const googleError = (err) => {
        console.log(err);
        alert('Google Sign In was unsuccessful.');
    }

    //handling submit
    const handleSubmit= (e) => {
        e.preventDefault();

        if(signup){
            dispatch(signUp(signData, history));
        } else {
            dispatch(signIn(signData, history));
        }
    }

    //handling change
    const handleChange = (e) => setSignData({ ...signData, [e.target.name]: e.target.value });

    return (
    <div className='box'>
    <div className="row">
       <form onSubmit={ handleSubmit }>
          <div className="input-field center col s12">
              <input id="password" type="text" placeholder='Email' name='email' onChange={ handleChange }/>
          </div>
          <div className="input-field center col s12">
              <input id="password" type="password" placeholder='Password' name='password' onChange={ handleChange }/>
          </div> 
          { signup && (
              <div className="input-field center col s12">
                  <input id="password" type="password" placeholder='Confirm Password' name='confirmpwd' onChange={ handleChange }/>
              </div> 
         )}
         <div className='center'>
            <button id='signup' className="btn waves-effect waves-light grey black-text">
                { signup? 'Sign Up' : 'Sign In' }
            </button>
            <GoogleLogin 
              clientId="358144898864-f5ee640ctkse14kt0l6op386fc4l68cv.apps.googleusercontent.com"
              render={ (renderProps) => (
                <button id='signup' className="btn waves-effect waves-light grey grey-text text-darken-3" onClick={ renderProps.onClick } disabled={ renderProps.disabled }>
                    Google SIGN IN
                </button>
              )}
              onSuccess={ googleSuccess }
              onFailure={ googleError }
              cookiePolicy="single_host_origin"
            />
         </div>
       </form>
       <div className='center switch' onClick={ () => setSignup((prevst) => !prevst) }>
              Make your own Account to Rate & Create here
       </div>
    </div>
    </div>
    );
}

export default Auth;
