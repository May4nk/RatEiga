//component/movies/selectActors.component
import './movies.css';

//hooks
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { fetchActors } from '../../actions/actors';

const Selectactors = ({ see, setSee, hey, setPosterData, posterData, updateId }) => {
    const seen = see ? 'display-block' : 'display-none';
    const dispatch = useDispatch();

    useEffect(()=>{
        if(see) dispatch(fetchActors());
    },[dispatch, see])

    //GET all actors
    const act = useSelector( (state) => state.actorsReducer );
    
    //choosing actors for movie
    const [ checkedState, setIsChecked ] = useState(false);
    
    //handling choosing of actors
    const handleOnChange = (cidx) => {
        const updateCheck = checkedState.map((item) => item.mid._id === cidx ? { ...item, bool:!item.bool} : item )
        setIsChecked(updateCheck);
    }
    
    //handling update movie
    const found = useSelector( state => updateId[0] === 'M'? state.moviesReducer.find( semv => semv._id === updateId.slice(1,) ) : null );
    
    useEffect(()=>{
        if( found !== null ){
            setIsChecked(
              act.map( ac => ({
                  mid: ac,
                  bool: found.actors.includes(ac._id) ? true : false
              }))
            )
        } else if( act && found === null ){
            setIsChecked(
                act.map( ac => ({
                    mid : ac,
                    bool : false
                })) 
            )
          }
    }, [ found ])

    const handleClose = () =>{
        setIsChecked(
            act.map( ac => ({
                mid : ac,
                bool : false
            })) 
        );
        setSee(false);
    }
    
    const handleDone = () => {
        setPosterData({ ...posterData , actors:checkedState.filter(all => (all.bool)).map(done => done.mid._id)})
        setSee(false);
    }

    let indx = [...Array(Math.ceil(act.length/4)).keys()];
    return(
        <div className={seen}>
            <div className='overlay1' />
            <div className='sactors'>
                <div className='aboutcancel white-text'>
                    <i className='material-icons right' onClick={ handleClose }>cancel</i>
                </div>
                <div className='sactors-title'>
                    Select Actors
                </div>
                <div className='sactors-space'>
                { indx.map((i, idx) => 
                  <div className='row' key={ idx }>
                      { checkedState.slice( (i+i)*2, (i+i)*2+4 ).map((A, index) => 
                      <div className='col s3 space' key={ A.mid._id }>
                          <label>
                              <input className='checkbox' type='checkbox' checked={A.bool } onChange={ () => handleOnChange(A.mid._id) } value={ A.mid._id } name={ A.mid.aname } />
                              <span>
                                <div className='sactor-pics'>
                                      <img src={ A.mid.pic } alt='A' className='sactorphoto' />
                                </div>
                                <div className='sactors-names'>
                                  { A.mid.aname }
                                </div>
                              </span>
                          </label>
                      </div>
                      )}
                  </div>
                )}
                <div>
                    <button className="btn waves-effect waves-light right" onClick={ handleDone }>Done
                    </button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Selectactors;
