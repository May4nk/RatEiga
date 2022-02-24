import { Signup, Login } from '../api/users.js';

export const signIn = (logUsr, history) => async (dispatch) => {
    try{
        const { data } = await Login(logUsr);

         dispatch({ type: 'AUTH', payload: data });

         history('/');
    } catch (err) {
        console.log(err.message);
    }
}


export const signUp = (newUsr, history) => async (dispatch) => {
    try{
        const { data } = await Signup(newUsr);

         dispatch({ type: 'AUTH', payload: data });

         history('/');
    } catch (err) {
        console.log(err);
    }
}
