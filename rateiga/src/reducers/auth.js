const authReducer = ( state={ authData: null }, action ) => {
    switch( action.type ){
        case 'AUTH':
            window.localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));

            return { ...state, authData: action.payload };
        case 'LOGOUT':
            window.localStorage.clear();

            return { ...state, authData: null };
        default:
            return state;
    }
}

export default authReducer;
