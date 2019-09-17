import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import DailyPlan from './DailyPlan';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Tooltip from '@material-ui/core/Tooltip';
import SharePlan from './SharePlan';
import CalenderView from './CalenderView';
import AddNotes from './AddNotes';
import RatePlan from './RatePlan';

const useStyles = makeStyles({
    card: {
        minWidth: 180,
        marginBottom: 13
    },
    cardaction: {
        border: "1px solid #ddd",
        padding: 0,
        margin: 0
    },
    btn: {

        color: "#ddd",
        textTransform: "none",
        display: 'flex',
        justifyContent: 'right'
    }

});

export default function Notes() {
    const classes = useStyles();



    return (
        <>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" component="h6">
                        71 Days in Isaiah
        </Typography>
                </CardContent>
                <CardContent className={classes.cardaction}>
                    <DailyPlan />
                </CardContent>
                <CardActions>
                    <SharePlan />
                    <Button size="small"><Tooltip title="Invite Friends" placement="top"><PersonAddIcon style={{ color: "green" }} /></Tooltip></Button>
                    <CalenderView />
                    <AddNotes />
                    <RatePlan />

                </CardActions>
            </Card>

        </>
    );
}
