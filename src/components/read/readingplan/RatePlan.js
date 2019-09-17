import React from 'react'
import Button from '@material-ui/core/Button';
import StarIcon from '@material-ui/icons/Star';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({

    box: {

        padding: "2px"
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
    const [value, setValue] = React.useState(2);

    return (
        <div>
            <Button size="small" onClick={handleClick}><Tooltip title="Rate Your Plan" placement="top"><StarIcon style={{ color: "green" }} /></Tooltip></Button>
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
                <div className={classes.box} >
                    <Box component="fieldset" mb={1} borderColor="transparent">
                        <Typography component="legend" style={{ textAlign: "center" }}>Rate Plan</Typography>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </Box>
                </div>
            </Popover>

        </div>
    )
}
