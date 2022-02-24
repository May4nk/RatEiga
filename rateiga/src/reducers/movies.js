//reducer/movies
const moviesReducer = ( movies=[], action ) => {
    switch( action.type ){
        case 'FETCH_ALL':
                    return action.payload;
        case 'CREATE':
                    return [ ...movies, action.payload ];
        case 'UPDATE':
                    return movies.map((poster) => ( poster._id === action.payload._id ? action.payload: poster ));
        case 'REMOVE':
                    return movies.filter((poster) => ( poster._id !== action.payload ));
        case 'RATE':
                    return movies.map((poster) => ( poster._id === action.payload._id? action.payload: poster ));
        default:
                    return movies;
    }
}

export default moviesReducer;
