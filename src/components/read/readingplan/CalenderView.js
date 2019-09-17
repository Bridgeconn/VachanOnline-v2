import React from 'react'
import Button from '@material-ui/core/Button';
import Today from '@material-ui/icons/Today';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import Calendar from 'react-calendar';
const useStyles = makeStyles({
    box: {
        padding: "5px"
    }

});

export default function SharePlan() {
    const classes = useStyles();
    const [date, setDate] = React.useState(new Date())
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }
    function onChange(date) {
        setDate(date)
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    console.log(date)
    return (
        <div>
            <Button size="small" onClick={handleClick} aria-describedby={id}><Tooltip title="share" placement="top"><Today style={{ color: "green" }} /></Tooltip></Button>
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
                <div className={classes.box}>
                    <Calendar
                        onChange={onChange}
                        value={date}
                    />
                </div>
            </Popover>

        </div>
    )
}
