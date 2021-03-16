import { Box, Divider, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './FooterStyle';

const Footer = () => {
    const styles = useStyles();

    return (
        <Box className={styles.box} display='flex' flexDirection='column' id='footer'>
            <Typography variant="h6" className={styles.text}>
                <span>ARWines</span>
                <Divider className={styles.divider}/>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Typography>
            <Typography variant="body2" className={styles.footer}>
                ARWines © Plataforma 5 - 2021
            </Typography>
        </Box>
    )
}

export default Footer
