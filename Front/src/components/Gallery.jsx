import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const responsive = {
    0: { items: 1 },
    568: { items: 3 },
    1024: { items: 5 },
};


const Gallery = ({wines}) => {
    return (
        <div>
            <AliceCarousel mouseTracking items={wines} responsive={responsive}/>
        </div>
    )
}

export default Gallery
