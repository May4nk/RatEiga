// components/movies/Create.js
//hooks
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './movies.css';

//actions
import { createMovies, updateMovies } from '../../actions/movies';
import { createActors, updateActors } from '../../actions/actors';

//select actors modale
import Selectactors from './selectActors.component';

const CreatePosters = ({ handleClose, show, updateId, setUpdateId }) => {
    const showClass = show ? 'display-block' : 'display-none';
    const dispatch = useDispatch();
    
    //select modale state
    const [ see, setSee ] = useState(false);

    //choosing genre to create/update
    const [ dataChoose, setDataChoose ] = useState('Movies');

    //handling choosing
    const handleChoose = (data) =>{
        window.document.querySelector(`.${dataChoose}`).style.display = 'none';
        setDataChoose(data);
        window.document.querySelector(`.${data}`).style.display='block';
    }
    
    //movies data
    const [ posterData, setPosterData ] = useState({ name:'', about:'', released:'', poster:'', actors:[], producer:'' });
    
    //actors and producers data
    const [ actproData, setActProData ] = useState({ aname:'', bio:'', dob:'',  gender:'', pic:'', type:'' });

    //handling update id
    const updatedPost = useSelector((state) => 
       (updateId[0] === 'A' ? state.actorsReducer.find((aname) => aname._id === updateId.substring(1,)) : updateId[0] === 'M' ? state.moviesReducer.find((name) => name._id === updateId.substring(1,)) : null)
    );
    
    useEffect(()=> {
        if(updatedPost){
            if(updateId[0] === 'A') {
                handleChoose('Actors-Producers');
                setActProData(updatedPost);
            } else if( updateId[0] === 'M') {
                handleChoose('Movies');
                setPosterData(updatedPost);
            }
        }
    },[updatedPost,updateId])
    
    //handling submit in update/create  
    const handleSubmit = (e) => {
        e.preventDefault();
        if(updateId === 0 && dataChoose === 'Movies') {
            dispatch(createMovies(posterData));
            modaleClose();
        }else if(updateId === 0 && dataChoose === 'Actors-Producers') {
            dispatch(createActors(actproData));
            modaleClose();
        }else if(updateId[0] === 'M'){
            dispatch(updateMovies(updateId.substring(1,), posterData));
            setUpdateId(0);
            setPosterData({ name:'', about:'', released:'', poster:'', actors:[], producer:'' });
            handleClose();
        }else if(updateId[0] === 'A'){
            dispatch(updateActors(updateId.substring(1,), actproData));
            setUpdateId(0);
            setActProData({ aname:'', bio:'', dob:'',pic:'', gender:'', type:'' });
            handleClose();
        }
    }
      
    //handling file input
    const getBase64 = (e)=> {
        var file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            if(dataChoose === 'Movies'){
                setPosterData({ ...posterData, poster: reader.result });
            }else{ 
                setActProData({ ...actproData, pic: reader.result});
            }
        }
        reader.onerror = function (error) { 
            console.log('Error: ', error);
        }
    }
   
    //modale close and empty input
    const modaleClose = () => {
        setPosterData({ name:'', about:'', released:'', poster:'', actors:[], producer:'' });
        setActProData({ aname:'', bio:'', dob:'', pic:'', gender:'', type:'' });
        handleClose();
    }
    
    return(
        <>
        <Selectactors setSee={ setSee } see={see} setPosterData={ setPosterData } posterData={ posterData } updateId={ updateId }/>
        <div className={ showClass }>
            <div className='overlay' />
            <div className='modale-box'>
                <div className='modale-title grey'>
                    <span className='modaletitle-text'> { updateId !==0?  'Updating': 'Create' } { dataChoose } </span>
                    <div className='modalecancel'>
                        <i className='material-icons right' onClick={ modaleClose }>cancel</i>
                    </div>
                </div>
                <div className='tabular'>
                    <span className='cmovies' onClick={ () => handleChoose('Movies') }>Movies</span>
                    <span className='cactors' onClick={ () => handleChoose('Actors-Producers') }>Actors & Producers</span>
                </div>
                <hr className='black'/>
                <form onSubmit= { handleSubmit }>
                {/*  Movies */}
                    <div className='Movies'>
                        <div className="input-field center col s12">
                            <input placeholder="Movie Name" name='name' id="inpbox" type="text" value={ posterData.name } onChange={ (e)=> setPosterData({ ...posterData, name: e.target.value }) }  required/>
                        </div>
                        <div className="input-field center col s12">
                            <textarea id="txtbox" className="materialize-textarea" name='about' placeholder='About...' value={ posterData.about } onChange={(e)=> setPosterData({ ...posterData, about: e.target.value })}   ></textarea>
                        </div>
                        <div className='col s12'>
                            <div className="input-field col s6">
                                <input placeholder="Producer" id="datebox" type="text" name='producer' value={ posterData.producer } onChange={(e) => setPosterData({ ...posterData, producer: e.target.value })} />
                            </div>
                            <div className="input-field col s6">
                                <input placeholder="Released date" id="datebox" type="text" name='released' value={ posterData.released } onChange={(e)=> setPosterData({ ...posterData, released: e.target.value })} required/>
                            </div>
                        </div>
                        <div className='col s12'>
                            <div className='center col s6 cols6'>
                                <div className="file-field input-field">
                                    <div className='posterbtn' onClick={ ()=> setSee(true)} name='actors' onChange={ (e) => setPosterData({ ...posterData, actors: e.target.value }) }> 
                                        Select Actors
                                    </div>
                                </div>
                            </div>
                            <div className='center col s6 cols6'>
                                <div className="file-field input-field">
                                    <div className='posterbtn'> Select Poster</div>
                                    <input type="file" accept='image/*' className='filinp' onChange={getBase64} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Actors & Producers */}
                    <div className='Actors-Producers'>
                        <div className="input-field center col s12">
                            <input placeholder="Name" name='aname' id="inpbox" type="text" value={ actproData.aname } onChange={ (e)=> setActProData({ ...actproData, aname: e.target.value }) } />
                        </div>
                        <div className="input-field center col s12">
                            <textarea id="txtbox" className="materialize-textarea" name='bio' placeholder='Bio...' value={ actproData.bio } onChange={ (e)=> setActProData({ ...actproData, bio: e.target.value }) } ></textarea>
                        </div>
                        <div className='col s12'>
                            <div className="input-field col s6">
                                <input placeholder="Gender" id="datebox" type="text" name='gender' value={ actproData.gender } onChange={ (e)=> setActProData({ ...actproData, gender: e.target.value }) }   />
                            </div>
                            <div className="input-field col s6">
                                <input placeholder="Date of Birth" id="datebox" type="text" name='dob' value={ actproData.dob } onChange={ (e)=> setActProData({ ...actproData, dob: e.target.value }) } />
                            </div>
                        </div>
                        <div className='col s12 bm'>
                            <div className='center col s6 cols6'>
                                <div className="file-field input-field">
                                    <div className='picbtn'> Select Pic</div>
                                    <input type="file" accept='image/*' className='filinp' onChange={getBase64}   />
                                </div>
                            </div>
                            <div className='center col s6 cols6'>
                                <div className='input-field' >
                                    <select value={ actproData.type } onChange={ (e) => setActProData({...actproData, type: e.target.value }) } className='browser-default selbox'>
                                        <option value='actor'>Actor</option>
                                        <option value='producer'>Producer</option>    
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col s12 center mb'>
                        <button className="btn waves-effect grey black-text waves-light" type="submit" data={ dataChoose } name="submit"> {updateId !== 0 ? 'Update' : 'Create'}
                            <i className="material-icons black-text right">send</i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
     </>
    );
}

export default CreatePosters;
