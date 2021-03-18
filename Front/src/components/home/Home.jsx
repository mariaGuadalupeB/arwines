import React from 'react';
import {useDispatch} from 'react-redux';
import {AppBar, Button, Toolbar, Divider} from '@material-ui/core';
import useStyles from './HomeStyles';
import GalleryContainer from '../../containers/GalleryContainer';
import Footer from '../footer/Footer';
import {setWines} from '../../store/wines';
import {Link as ScrollLink} from 'react-scroll';

const Home = () => {
    const styles = useStyles();
    const dispatch = useDispatch();

    // pensar una logica que no haga un pedido al back cada vez que ingreso al home
    React.useEffect(() => {
        dispatch(setWines())
        .then(() => console.log('GOT WINES'))    
    }, [])


    return (
        <div className={styles.container}>
            <AppBar position="relative" className={styles.appbar}>
              <Toolbar className={styles.toolbar}>
                <Button className={styles.button}>
                    CATEGORIES
                </Button>
                <div className={styles.verticalDivider}></div>
                <Button className={styles.button}>
                    OUR CHOICES
                </Button>
                <div className={styles.verticalDivider}></div>
                <Button className={styles.button}>
                    <ScrollLink to='footer' spy={true} smooth={true}>
                        ABOUT US
                    </ScrollLink>
                </Button>
              </Toolbar>
            </AppBar>
            <img src='/unboxed10-1920x1355.jpg' className={styles.img}/>
            <Divider className={styles.divider}/>
            <GalleryContainer />
            <Footer />
        </div>
    )
};

export default Home;