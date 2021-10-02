import { makeStyles } from "@material-ui/core";
import theme from '../ui/Theme'

const useStyles = makeStyles((theme) =>({
    navIcon: {
        color: `${theme.palette.secondary.main}`
    },
    navButtons: {
        marginLeft: "auto",
        display: "flex",
        justifyContent: "space-between"

    },
    navButton: {
        margin: "0 7px"
    },
    navButtonContained: {
        backgroundColor: theme.palette.secondary.main,
        margin: "0 7px",
        color: theme.palette.common.ternaryColor
    },
    cardContainer: {
        padding: '20px 0',
        margin: "0px",
        width: "100vw"
        
    },
    card: {
        height: "100%",
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia: {
        // paddingTop: '56.25%'    // 16:9
    },
    cardContent: {
        flowGrow: 1
    },
    navAvatar: {
        margin: "0",
        backgroundColor: theme.palette.common.ternaryColor,
        color: theme.palette.secondary.main
    },

}));

export default useStyles;