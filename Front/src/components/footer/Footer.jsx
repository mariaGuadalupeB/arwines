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
                Con más de 40 años de trayectoria, ARWines se afianza con 10 sucursales de primer nivel, espacios de cata, personal especializado y la representación de las mejores bodegas nacionales e internacionales.
                Nuestra misión es brindar una experiencia de compra superior, siempre con precios muy competitivos. Nos diferencia la experiencia y el conocimiento sobre los productos que ofrecemos y la vocación de servicio de todo nuestro personal.   
            </Typography>
            <Typography variant="body2" className={styles.footer}>
                ARWines © Plataforma 5 - 2021
            </Typography>
        </Box>
    )
}

export default Footer
