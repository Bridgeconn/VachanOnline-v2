import React from 'react'
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles({

    btn: {

        color: "#ddd",
        textTransform: "none",
        margin: "4px 15px"
    }

});

export default function SharePlan() {
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
        <div>
            <Button size="small" onClick={handleClick}><Tooltip title="Add Notes" placement="top"><CreateIcon style={{ color: "green" }} /></Tooltip></Button>
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
                <div style={{ padding: "2px" }}>
                    <TextareaAutosize rows={10} placeholder="Add Notes" />


                </div>
                <Button size="small" color="primary" variant="contained" className={classes.btn}>Save</Button>
                <Button size="small" color="primary" variant="contained" className={classes.btn}>Clear</Button>
            </Popover>

        </div>
    )
}
