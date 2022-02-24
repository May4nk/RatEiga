//component/about.js
import './movies/movies.css';

//hook
import { useSelector } from 'react-redux';

const About = ({ handleClose, show, aboutId, setAboutId }) => {
    const showClass = show ? 'display-block' : 'display-none';
    
    //GET specific actor/movie
    const about = useSelector( state => (
        aboutId[0] === 'M' ? state.moviesReducer.find( name => name._id === aboutId.slice(1,) ) :
        aboutId[0] === 'A' ? state.actorsReducer.find( aname => aname._id === aboutId.slice(1,) ) :
        null )
    );
    
    //relation between actor and movie
    const ar = useSelector( state => (
        aboutId[0] === 'A' ? state.moviesReducer.filter( mv => about? mv.actors.find( mvf => mvf === aboutId.slice(1,)) : mv ) :
        aboutId[0] === 'M' ? state.actorsReducer.filter( ac => about? about.actors.includes(ac._id): ac ) :
        null )
    );
    
    return (
        <div className={ showClass }>  
            <div className='overlay' />
            <div className='about-modal'>
                <div className='aboutcancel' onClick={ handleClose }> 
                    <i className='material-icons white-text right'>cancel</i>
                </div>
                <div className='col s12 row'>   
                    <div className='col s6'>
                        <div className='about-pic'>
                            <img src={ aboutId[0] === 'M' ? about.poster : aboutId[0] === 'A' ? about.pic : null } alt='Poster...' className='pic' />
                        </div>
                    </div>
                    <div className='col s6'>
                        <div className='about-name'>
                            <div className='abtname-text blue-text'>
                                { aboutId[0] === 'M' ? about.name : aboutId[0] === 'A' ? about.aname : null }
                            </div>
                        </div>
                        <div className='about-about'>
                            <div className='about-text'>
                                { aboutId[0] === 'M' ? about.about : aboutId[0] === 'A' ? about.bio : null }
                            </div>

                        </div>
                        <div className='about-actors'>
                            <div className='actors-title blue-text'>
                                { aboutId[0] === 'M' ? 'Cast & Crew' : aboutId[0] === 'A' ? 'Movies' : null }
                            </div>
                            <div className='about-crew'>
                            { aboutId[0] === 'M' ?
                              ar.map((g, idx) => (
                                  <div className='col s4' key={ idx }>
                                      <img className='actors-pix' src={ g.pic } alt='Actor pic'/>
                                      <div className='actors-text'>
                                          { g.aname.length > 18 ? g.aname.slice(0,19)+'...': g.aname } 
                                      </div>
                                  </div>
                              )) :
                              aboutId[0] === 'A' ? 
                              ar.map((g, idx) => (
                                  <div className='col s4' key={ idx }>
                                      <img className='movies-pix' src={ g.poster} alt='Movie poster'/>
                                      <div className='movies-text'>
                                          { g.name.length > 18 ? g.name.slice(0,19)+'...': g.name } 
                                      </div>
                                  </div>
                              )) : null 
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
