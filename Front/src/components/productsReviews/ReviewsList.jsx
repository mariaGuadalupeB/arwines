import React from 'react'
import { makeStyles, Divider } from '@material-ui/core';
import Review from './Review';

const useStyles = makeStyles(theme => ({
    container: {
        width: '70%',
        height: 'auto',
        border: '1px solid black',
        borderRadius: '0.3em',
        margin: '2em auto',
        backgroundColor: '#f2e6ff'
    }
}));

const ReviewsList = ({reviews}) => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            {reviews && reviews.map(review => (
                <div key={review.id}>
                    <Review review={review}/>
                    <Divider/>
                </div>
            ))}
        </div>
    )
}

export default ReviewsList
