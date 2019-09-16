import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import bible from "../common/images/bible.jpeg";
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: 100,
        paddingLeft: 15,

    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    title: {

        paddingBottom: 0,
        marginBottom: 5,
        borderBottom: "1px solid #f1ecec",
        display: "flex",
    },
    article: {

        paddingBottom: 0,
        marginBottom: 5,
        borderBottom: "1px solid #f1ecec",
        display: "inline-block",
    },
    head: {
        paddingLeft: 2,
        paddingBottom: 0,
        marginBottom: 5,
        borderBottom: "1px solid #f1ecec",
        display: "flex",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    card: {
        minWidth: 380,
        width: 380,
        display: "inline-block",
        marginRight: 20,
        marginTop: 10,
        cursor: "pointer"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },

    pos: {
        marginLeft: 10,

        display: "inline-block"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),

    },
    img1: {
        width: 140,
        display: "inline-block"
    }

}));

export default function Articles() {
    const classes = useStyles();

    return (

        <div className={classes.root}>
            <Typography variant="h6" className={classes.title} >Articles</Typography>

            <Card className={classes.card} >
                <CardContent>
                    <Typography className={classes.head} color="textSecondary" gutterBottom>
                        Title
                                </Typography>
                    <div className={classes.article} component="h6">
                        <img src={bible} className={classes.img1} alt={"bible"} />
                    </div>
                    <Typography className={classes.pos} color="textSecondary" gutterBottom>
                        Content
                                </Typography>
                </CardContent>
            </Card>

        </div>



    );
}
