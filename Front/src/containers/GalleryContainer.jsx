import React from 'react'
import { useSelector } from 'react-redux';
import Gallery from '../components/Gallery';
import GalleryImg from '../components/GalleryImg';


const handleDragStart = (e) => e.preventDefault();

const GalleryContainer = () => {
    const { wines } = useSelector(state => state.wines)

    let carrouselItems = wines && wines.map(wine => <GalleryImg wine={wine} onDragStart={handleDragStart} />)

    return (
        <div style={{ width: '60em', marginTop: '1em'}}>
            <Gallery wines={carrouselItems} />
        </div>
    )
}

export default GalleryContainer
