//component/poster.js
import './movies.css';

import { deleteMovies } from '../../actions/movies.js';

//hooks
import { useState } from 'react';
import { useDispatch } from 'react-redux';

//components
import Rating from './rating.component';
import About from '../about';

const Poster = ({ post, setUpdateId, setAboutId, aboutId, setAboutShow, aboutShow })=> {
    const dispatch = useDispatch();
    
    //rating modale
    const [ Rshow, setRshow ] = useState(false);
    const [ rateId, setRateId ] = useState(0);

    const user = JSON.parse(window.localStorage.getItem('profile'));
    
    // hiding rating/about modale
    const rater = (id) => {
        setRateId(id);
        setRshow(true);
    }

    const hideRating = () => {
        setRshow(false);
        setRateId(0);
    } 

    const hideAbout = () => {
        setAboutId(0);
        setAboutShow(false);
    }
    
    const abouter = (id) =>{
        setAboutId(id);
        setAboutShow(true)
    }
    
    let y = 0;
    let rateing = post.rating.map((kl) => (y =+ kl.rate));
    let len = post.rating.length === 0? 1: post.rating.length;

    return(
      <>
        <Rating RhandleClose={ hideRating } Rshow ={ Rshow } rateId={rateId} />
        <About handleClose={ hideAbout } show = { aboutShow } aboutId={ aboutId } setAboutId={ setAboutId }/>
        <div className='movie-card'>
            <img src={ post.poster } alt="" className='posters' onClick={ () => abouter(`M${post._id }`) }/>
            { user?.result ? (
            <div className='icnup'>
                <div className='icnedit' onClick={ () => setUpdateId(`M${post._id}`) }>
                    <i className='material-icons red-text center'>edit</i>
                </div>
                <div className='icndelete' onClick={ ()=> dispatch(deleteMovies(post._id )) } >
                    <i className='material-icons red-text center'>delete_forever</i>
                </div>
            </div> ) : null }
        </div>
        <div className='rating' title={ Math.ceil(y/len) }>
              { [ ...Array(Math.ceil(y/len)).keys()].map(i => (
                  <i className='material-icons blue-text' key = {i}>star</i>
              ) ) }
              { [ ...Array(5 - Math.ceil(y/len)).keys()].map(i =>               (
                  <i className='material-icons blue-text' key = {i}>star_border</i>
              ) ) }
              <i className={ user?.result ? 'right imr material-icons' : 'right imr material-icons grey-text' } title='rate it' onClick={ user?.result ? () => rater(post._id) : null } >star_border</i> 
        </div>
        <div className='highlght'>
                <span className='highlght-text'>{ post.name.length >23 ? post.name.slice(0,24) +'...': post.name } </span>
        </div>
      </>
    );
}

export default Poster;
