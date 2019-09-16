import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
    player: {

        paddingBottom: 0,
        marginBottom: 5,
        width: 350
    },

    card: {
        minWidth: 380,
        width: 380,
        display: "inline-block",
        marginRight: 0,
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
        color: "red",
        display: "inline-block"
    },


}));

export default function Articles() {
    const classes = useStyles();

    return (

        <div className={classes.root}>
            <Typography variant="h6" className={classes.title} >Audio</Typography>

            <Card className={classes.card} >
                <CardContent>
                    <Typography className={classes.head} color="textSecondary" gutterBottom>
                        NET_01_Matthew_01(128 kbps)
                                </Typography>

                    <audio controls className={classes.player} preload="false">
                        <source src="http://www.nihilus.net/soundtracks/Static%20Memories.mp3" />
                    </audio>


                </CardContent>
            </Card>
            <Card className={classes.card} >
                <CardContent>
                    <Typography className={classes.head} color="textSecondary" gutterBottom>
                        KJV_01_Matthew_01(32 kbps)
                                </Typography>

                    <audio controls className={classes.player} preload="false">
                        <source src="http://www.nihilus.net/soundtracks/Static%20Memories.mp3" />
                    </audio>


                </CardContent>
            </Card>

        </div>



    );
}
