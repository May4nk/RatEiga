const authReducer = (user= { authData: null }, action) => {
    switch(action.type){
        case actionType.AUTH:
            window.localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
            return({ ...user, authData: action.payload });
        case actionType.LOGOUT:
            window.localStorage.clear();
            
            return({ ...user, authData: null });
        default: 
            return user;
    }
};

export default authReducer;
