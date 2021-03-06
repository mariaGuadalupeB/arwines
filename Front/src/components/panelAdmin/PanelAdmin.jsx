import { Drawer, List, ListItem, Typography, Divider } from '@material-ui/core';
import React from 'react'
import UserTable from '../tables/UserTable';
import CategoriesTable from '../tables/CategoriesTable';
import ProductsTable from '../tables/ProductsTable';
import useStyles from "./PanelAdminStyles";
import OrdersTable from '../tables/OrdersTable';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';

const PanelAdmin = () => {
    const user = useSelector(state => state.user)
    const history = useHistory();
    const styles = useStyles();
    const [tableHandler, setTableHandler] = React.useState({openProducts: false, openCategories: false, openUser: true, openOrders: false})

    const handleClick = tableToOpen => {
        for(let key in tableHandler) {
            if(key === tableToOpen) {
                setTableHandler(tableHandler => ({...tableHandler, [key]: true}))
            } else {
                setTableHandler(tableHandler => ({...tableHandler, [key]: false}))
            }
        }
    }

    return (
        <div className={styles.container}>
            {!user || !user.admin ? history.push('/'): ''}
            <Drawer variant='permanent' classes={{paper: styles.drawer}}>
                <List className={styles.list}>
                    <ListItem button onClick={() => handleClick('openUser')}>
                        <Typography variant="h6" color="initial">USERS</Typography>
                    </ListItem>
                    <Divider className={styles.divider}/>
                    <ListItem button onClick={() => handleClick('openProducts')}>
                        <Typography variant="h6" color="initial">PRODUCTS</Typography>
                    </ListItem>
                    <Divider className={styles.divider}/>
                    <ListItem button onClick={() => handleClick('openCategories')}>
                        <Typography variant="h6" color="initial">CATEGORIES</Typography>
                    </ListItem>
                    <Divider className={styles.divider}/>
                    <ListItem button onClick={() => handleClick('openOrders')}>
                        <Typography variant="h6" color="initial">ORDERS</Typography>
                    </ListItem>
                </List>
            </Drawer>
            { tableHandler.openUser ? <UserTable/> : '' }
            { tableHandler.openProducts ? <ProductsTable/> : '' }
            { tableHandler.openCategories ? <CategoriesTable/> : '' }
            { tableHandler.openOrders ? <OrdersTable /> : '' }
        </div>
    )
}

export default PanelAdmin
