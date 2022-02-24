//components/movies/rating.component
import './movies.css';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { rateMovies } from '../../actions/movies.js';

const Rating = ({ RhandleClose, Rshow, rateId }) => { 
    const dispatch = useDispatch();
    const showClass = Rshow ? 'display-block' : 'display-none';
    const [ rate, setRate ] = useState(0);
    
    const usr = JSON.parse(window.localStorage.getItem('profile'));

    const handleClick = (e) => {
        let rt = e.target.innerHTML
        setRate(rt);
        const rating = { rate: rt, idx: usr?.result._id };
        dispatch(rateMovies(rateId, rating));
        setTimeout(RhandleClose,1000);
    }

    return(
        <>
        <div className={ showClass }>
            <div className='overlay' />
            <div className='rating-box'>
                <div className='star_border'>
                    <i className='material-icons grey-text large'> star_border</i>
                </div>
                <div className='word blue-text black'>
                    { rate }
                </div>
                <div className='ratingstars'>
                    {[ ...Array(5).keys() ].map((item, index) => (
                        <label key={ index }>
                            <span className='st' onClick={ handleClick }> { item+1 } </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}

export default Rating;


