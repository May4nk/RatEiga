//components/actpro.js

//hooks 
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

//get all posters
import { fetchActors } from '../actions/actors';
import ActPoster from './actors/title.component';

const ActPro = ({ setUpdateId, aboutShow, setAboutShow, aboutId, setAboutId }) => {
      const dispatch = useDispatch();

      useEffect(()=>{
          dispatch(fetchActors());
      },[dispatch])
      
      //GET all actors
      const actors = useSelector((state) => state.actorsReducer);
      
      //for showing posters in row    
      let indx = [...Array(Math.ceil(actors.length/4)).keys()];
      return( 
          <>
              { indx.map((i, idx) => 
                  <div className='row' key={ idx }>
                      { actors.slice( (i+i)*2, (i+i)*2+4 ).map((actor, index) => 
                          <div className='col s3 col-s3' key={ actor._id }>
                              <ActPoster actor={ actor } setUpdateId={ setUpdateId } aboutShow={ aboutShow } setAboutShow={ setAboutShow } aboutId={ aboutId }  setAboutId={ setAboutId }/>
                          </div>
                      )}
                  </div>
              )}
          </>
      );
}

export default ActPro;
