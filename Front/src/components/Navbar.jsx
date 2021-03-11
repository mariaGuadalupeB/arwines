import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import themes from '../themes/themesConfig'
import styles from '../styles/navbar.module.css'
import {useDispatch} from 'react-redux';
import {queryWines} from '../store/wines';

const Navbar = () => {
    const [query, setQuery] = React.useState('');
    const dispatch = useDispatch(); 

    const handleQuery = string => {
        dispatch(queryWines(string))
          .then(() => {
            console.log('GOT QUERY WINES')
            setQuery('');
          });
    };    

    return (
        <div className='barra'>
            <div className={styles.barraD}>
                <div className={styles.orden}>
                    <img src="https://www.ubp.edu.ar/wp-content/uploads/2014/09/logo-de-geovinar-pin-01.png" alt="" />
                    <div style={{display: 'flex'}}>
                        <input type="text" placeholder="Busca productos marcas y mas..." value={query} onChange={e => setQuery(e.target.value)}/>
                        <Button variant="outlined" color='primary' style={{height: '2.7em', margin: '0.9em 0 0 0.4em'}} onClick={() => handleQuery(query)}>Search</Button>
                    </div>
                </div>
                <div className={styles.barraI}>
                    <div className={styles.botonLogIn}>
                        <Button variant="outlined" color='primary'> Log in</Button>
                    </div>
                    <div className={styles.botonLogOut}>
                        <Button variant="outlined" color='primary'> Register</Button>
                    </div>
                    <div className={styles.carrito}>
                        <Link to='/'><span className="material-icons">shopping_cart</span></Link>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Navbar