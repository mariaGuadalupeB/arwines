import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    button: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1rem',
        flexGrow: 1
    },
    appbar: {
        backgroundColor: '#38182F',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    verticalDivider: {
        backgroundColor: '#F7F7FF',
        width: '0.1em',
        height: '3em',
        margin: '0 1em 0 1em'
    },
    img: {
        height: '30em',
        width: '90em',
        justifySelf: 'center',
        margin: '1em 0 0.5em 0',
        borderRadius: '1em'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    divider: {
        width: '100em'
    }
}));

export default useStyles;