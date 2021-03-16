import React from 'react'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

const GalleryImg = ({wine}) => {
    return (
        <Link to={`/products/${wine.id}`} >
            <img src={wine.image_path}/>
        </Link>
    )
}

export default GalleryImg
