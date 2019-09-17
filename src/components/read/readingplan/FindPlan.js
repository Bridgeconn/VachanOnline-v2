import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function FindPlan() {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardContent>

                <Typography variant="h5" component="h2">
                    71 Days in Isaiah
        </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Carefully work your way through Isaiah in 71 days to experience the full impact of the prophet's words.
        </Typography>
                <Typography variant="body2" component="p">
                    <b> Plan Length: 71 days</b>
                </Typography>
                <Typography variant="body2" component="p">
                    <b>Estimated Completion Date: Tuesday, November 26, 2019</b>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" align="right" color="primary">Select</Button>

            </CardActions>
        </Card>
    )
}
