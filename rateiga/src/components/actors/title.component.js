//components/title.js
import './actors.css';

//hooks
import { useDispatch } from 'react-redux';

//about modale
import About from '../about.js';

import { deleteActors } from '../../actions/actors.js';

const ActPoster = ({ actor, setUpdateId, setAboutShow, aboutShow, aboutId, setAboutId })=> {
    const dispatch = useDispatch();
    
    //showing and hidling about modale
    const hideAbout = () => {
        setAboutId(0);
        setAboutShow(false);
    }
    
    const abouter = (id) =>{
        setAboutId(id);
        setAboutShow(true)
    }

    return(
      <>
        <About handleClose={ hideAbout } show = { aboutShow } aboutId={ aboutId } setAboutId={ setAboutId }/>
        <div className='actor-card'>
            <img  alt="" src={ actor.pic } className='actors_pic' onClick={ () => abouter(`A${actor._id}`) } />
            <div className='icns'>
                <i className='material-icons red-text center' onClick={ () => setUpdateId(`A${actor._id}`) } title='edit'>brush</i>
                <i className='material-icons red-text center' onClick={ () => dispatch(deleteActors(actor._id)) } title='delete'>delete_forever</i>
            </div>
        </div>
        <div className='actor-name center'>
                <span className='name-text'>{ actor.aname.length >13? actor.aname.slice(0,12)+'...': actor.aname } </span>
        </div>
      </>
    );
}

export default ActPoster;
