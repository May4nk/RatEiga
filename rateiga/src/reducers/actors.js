//reducer/actors
const actorsReducer = ( actors=[], action ) => {
    switch( action.type ){
        case 'GET':
            return action.payload;
        case 'POST':
            return [ ...actors, action.payload ];
        case 'PATCH':
            return actors.map((actor) => ( actor._id === action.payload._id ? action.payload: actor ));
        case 'DELETE':
            return actors.filter((actor) => ( actor._id !== action.payload ));
        default:
            return actors;
    }
}

export default actorsReducer;
