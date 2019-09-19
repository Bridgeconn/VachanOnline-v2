import React from 'react'
import Button from '@material-ui/core/Button';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import { SocialIcon } from 'react-social-icons';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({

    btn: {

        padding: "15px"
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
            <Button size="small" onClick={handleClick} aria-describedby={id}><Tooltip title="share" placement="top"><ScreenShareIcon style={{ color: "green" }} /></Tooltip></Button>
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
                <div className={classes.btn}>
                    <SocialIcon url="https://www.example.com" label="Our portfolio" style={{ height: 32, width: 32, marginRight: "3px" }} />
                    <SocialIcon url="http://jaketrent.com" network="tumblr" style={{ height: 32, width: 32, marginRight: "3px" }} />
                    <SocialIcon network="twitter" bgColor="#ff5a01" style={{ height: 32, width: 32, marginRight: "3px" }} />
                    <SocialIcon network="pinterest" style={{ height: 32, width: 32 }} />
                </div>
            </Popover>

        </div>
    )
}
