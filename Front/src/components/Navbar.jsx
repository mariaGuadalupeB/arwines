import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import themes from '../themes/themesConfig'
import styles from '../styles/navbar.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {queryWines} from '../store/wines';
import {userLogout} from "../store/user"
import axios from "axios";
import { productsArr } from "../store/productsArr"


const Navbar = () => {
    const user = useSelector((state) => state.user)
    const cart_items = useSelector((state) => state.cart_items)
    const history = useHistory()

    const [query, setQuery] = React.useState('');
    const dispatch = useDispatch(); 
    const isLoggedIn = Object.keys(user).length 
    const handleQuery = string => {
        dispatch(queryWines(string))
          .then(() => {
            console.log('GOT QUERY WINES')
            setQuery('');
          });
    };    

    const logOutHandler = () => {
        if(isLoggedIn) {
            const token = user.token
            axios.put("http://localhost:5000/api/cart", cart_items, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(({data}) => data)
            
            localStorage.clear()
            dispatch(userLogout())

            history.push("/")
        }else{
            history.push("/login")
        }  
    }

    return (
        <div className='barra'>
            <div className={styles.barraD}>
                <div className={styles.orden}>
                    <Link to="/">
                    <img src="https://www.ubp.edu.ar/wp-content/uploads/2014/09/logo-de-geovinar-pin-01.png" alt="" />
                    </Link>
                    <div style={{display: 'flex'}}>
                        <input type="text" placeholder="Busca productos marcas y mas..." value={query} onChange={e => setQuery(e.target.value)}/>
                        <Button variant="outlined" color='primary' style={{height: '2.7em', margin: '0.9em 0 0 0.4em'}} onClick={() => handleQuery(query)}>Search</Button>
                    </div>
                </div>
                <div className={styles.barraI}>
                    <div className={styles.botonLogIn}>
                        <div onClick={logOutHandler}>
                            <Button variant="outlined" color='primary' >  { isLoggedIn ? "Log Out" : "Sign In" } </Button>
                        </div>
                    </div>
                    
                    <div className={styles.botonLogOut}>
                        {
                            !isLoggedIn ? 
                            (
                                <Link to="/register">
                                    <Button variant="contained" color='primary'> Register</Button>
                                </Link>
                            ) 
                            : 
                            (
                            <div className={styles.carrito}>
                            <Link to='/cart'><span className="material-icons">shopping_cart</span></Link>
                            </div>
                            )
                                    
                        }
                    </div>
                    
                </div>
            </div>
        </div>

    )
}
export default Navbar