import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    box: {
        height: '34em',
        backgroundColor: '#38182F',
        width: '100%'
    },
    text: {
        padding: '6em',
        color: '#F7F7FF',
        fontStyle: 'italic'
    },
    footer: {
        margin: 'auto auto',
        color: '#D6D6FF'
    },
    divider: {
        margin: '0.5em 0',
        backgroundColor: '#F7F7FF'
    }
}));

export default useStyles;