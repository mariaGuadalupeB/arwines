import React from 'react'
import axios from "axios";
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { userLogout } from "../store/user"
import {resetCart_items} from "../store/cart"

import Button from '@material-ui/core/Button';
import styles from '../styles/navbar.module.css'


const Navbar = () => {
    const history = useHistory()
    const dispatch = useDispatch(); 

    const user = useSelector((state) => state.user)
    const cart_items = useSelector((state) => state.cart_items)
    const [query, setQuery] = React.useState('');
    
    const isLoggedIn = Object.keys(user).length 
    
    const handleQuery = string => { 
        const querySearch = string
        setQuery('');
        string.trim().length && history.push(`/search/${querySearch}`) 
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
            dispatch(resetCart_items())

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
                        <img src="https://www.ubp.edu.ar/wp-content/uploads/2014/09/logo-de-geovinar-pin-01.png" alt="arwines" />
                    </Link>
                    
                    <div style={{display: 'flex'}}>

                        <input 
                            type="text" 
                            placeholder="Busca productos marcas y mas..." 
                            value={query} 
                            onChange={e => setQuery(e.target.value)}
                        />
                        
                        <Button 
                            variant="outlined" 
                            color='primary' 
                            style={{height: '2.7em', margin: '0.9em 0 0 0.4em', backgroundColor: '#38182F', color: 'white'}} 
                            onClick={() => handleQuery(query)}
                        >
                            Search
                        </Button>

                    </div>

                </div>

                <div className={styles.barraI}>
                    <div className={styles.botonLogIn}>
                        <div onClick={logOutHandler}>
                            <Button variant="outlined" color='primary'  style={{backgroundColor: '#38182F', color: 'white', textDecoration: 'underline'}}>  { isLoggedIn ? "Log Out" : "Sign In" } </Button>
                        </div>
                    </div>
                    
                    <div className={styles.botonLogOut}>
                        {
                            !isLoggedIn ? 
                            (
                                <Link to="/register">
                                    <Button variant="contained" style={{backgroundColor: '#38182F', color: 'white', textDecoration: 'underline'}}>Register</Button>
                                </Link>
                            ) 
                            : 
                            (
                            <div className={styles.carrito}>
                                {user.admin ? 
                                <Link to="/admin">
                                     <Button variant="contained" style={{backgroundColor: '#38182F', color: 'white', textDecoration: 'underline'}}>ADMIN</Button>
                                </Link>
                                 :
                                <Link to='/cart'><span className="material-icons">shopping_cart</span></Link> 
                                }
                            </div>
                            )
                                    
                        }
                    </div>
                    
                </div>
            </div>
        </div>

    )
}
export default Navbar;