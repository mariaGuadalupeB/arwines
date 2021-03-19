import React from 'react'
import { Link } from 'react-router-dom'

const GalleryImg = ({wine}) => {
    return (
        <Link to={`/products/${wine.id}`} >
            <img src={wine.image_path} alt='vino'/>
        </Link>
    )
}

export default GalleryImg
