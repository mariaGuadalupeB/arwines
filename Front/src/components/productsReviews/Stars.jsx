import React from 'react';
import StarRateIcon from '@material-ui/icons/StarRate';
import { v4 as uuidv4 } from 'uuid';

const Stars = ({number}) => {
    const starsToRender = Array.from({length: number}, () => <StarRateIcon key={uuidv4()} style={{color: '#e6ac00'}}/>);

    return (
        <div>
            {starsToRender.map(stars => stars)}
        </div>
    )
}

export default Stars
