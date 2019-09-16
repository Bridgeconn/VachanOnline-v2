import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import DailyPlan from './DailyPlan';
import Button from '@material-ui/core/Button';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TodayIcon from '@material-ui/icons/Today';
import CreateIcon from '@material-ui/icons/Create';
import StarIcon from '@material-ui/icons/Star';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
// import FacebookIcon from '@material-ui/icons/Facebook';
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

        backgroundColor: "#2e629a",
        color: "#fff",
        textTransform: "none",
        display: 'flex',
        justifyContent: 'right'
    }

});

export default function Notes() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

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
                    <Button size="small" onClick={handleClick} aria-describedby={id}><Tooltip title="share" placement="top"><ScreenShareIcon style={{ color: "green" }} /></Tooltip></Button>
                    <Button size="small"><Tooltip title="Invite Friends" placement="top"><PersonAddIcon style={{ color: "green" }} /></Tooltip></Button>
                    <Button size="small"><Tooltip title="Calender View" placement="top"><TodayIcon style={{ color: "green" }} /></Tooltip></Button>
                    <Button size="small"><Tooltip title="Add Notes" placement="top"><CreateIcon style={{ color: "green" }} /></Tooltip></Button>
                    <Button size="small"><Tooltip title="Rate Your Plan" placement="top"><StarIcon style={{ color: "green" }} /></Tooltip></Button>
                </CardActions>
            </Card>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div>
                    {/* <FacebookIcon /> */}
                </div>
            </Popover>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" component="h6">
                        Union With Christ- 7 Days
                             </Typography>
                </CardContent>
                <CardActions className={classes.cardaction}>
                    <DailyPlan />
                </CardActions>
            </Card>
        </>
    );
}
