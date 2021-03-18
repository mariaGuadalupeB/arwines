import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    drawer: {
        width: '10em',
        backgroundColor: '#F7F7FF',
        color: 'black',
        position: 'relative',
        height: '75rem'
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