import React from 'react';
import {makeStyles, Typography} from '@material-ui/core';
import Stars from './Stars';

const useStyles = makeStyles(theme => ({
    container: {
        width: '90%',
        height: 'auto',
        margin: '3em auto'
    }
}));

const Review = ({review}) => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <Stars number={review.rating}/>
            <Typography variant="body1" color="initial">{`${review.user.firstName} ${review.user.lastName}`}</Typography>
            <Typography variant="body1" color="initial">{review.createdAt.slice(0, 10)}</Typography>
            <Typography variant="h6" color="initial">{review.comment}</Typography>
        </div>
    )
}

export default Review
