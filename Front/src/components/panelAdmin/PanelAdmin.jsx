import { Drawer, List, ListItem, Typography, Box, Divider } from '@material-ui/core';
import React from 'react'
import UserTable from '../tables/UserTable';
import CategoriesTable from '../tables/CategoriesTable';
import ProductsTable from '../tables/ProductsTable';
import useStyles from "./PanelAdminStyles";

const PanelAdmin = () => {
    const styles = useStyles();
    const [tableHandler, setTableHandler] = React.useState({openProducts: false, openCategories: false, openUser: true})

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
                    <ListItem button>
                        <Typography variant="h6" color="initial">ORDERS</Typography>
                    </ListItem>
                </List>
            </Drawer>
            { tableHandler.openUser ? <UserTable/> : '' }
            { tableHandler.openProducts ? <ProductsTable/> : '' }
            { tableHandler.openCategories ? <CategoriesTable/> : '' }
        </div>
    )
}

export default PanelAdmin
