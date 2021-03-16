import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    drawer: {
        width: '10em',
        backgroundColor: '#38182F',
        color: '#F7F7FF',
        paddingTop: '4em',
        position: 'sticky',
        height: '55em'
    },
    container: {
        display: 'flex',
        justifyContent: 'center'
    },
    list: {
        marginTop: '0.5em'
    },
    divider: {
        backgroundColor: '#8c8c8c'
    }
}));

export default useStyles;