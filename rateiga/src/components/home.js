//components/home.js

//hooks 
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

//get all posters
import { getMovies } from '../actions/movies';
import { fetchActors } from '../actions/actors';
import Poster from './movies/poster.component';

const Home = ({ setUpdateId, setAboutId, aboutId, setAboutShow, aboutShow }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovies());
        dispatch(fetchActors());
    },[dispatch]);
      
    //GET all movies
    const posters = useSelector((state) => state.moviesReducer);
    
    //for showing posters in row    
    let indx = [...Array(Math.ceil(posters.length/4)).keys()];
    return( 
        <>
            { indx.map((i, idx) => 
                <div className='row' key={ idx }>
                    { posters.slice( (i+i)*2, (i+i)*2+4 ).map((poster, index) => 
                        <div className='col s3' key={ poster._id }>
                            <Poster post={ poster } setUpdateId={ setUpdateId } setAboutId={ setAboutId } aboutId={ aboutId } setAboutShow={ setAboutShow } aboutShow={ aboutShow}/>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Home;
