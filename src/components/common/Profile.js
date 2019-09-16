import React from 'react';
import { makeStyles } from '@material-ui/core/styles';




import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles(theme => ({

    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    menuitem: {
        width: 200,
        textAlign: "center",


    },
    menuitems: {
        width: 200,
        textAlign: "center",
        borderBottom: "1px solid #ddd"

    },
    menu: {
        marginTop: 30
    }
}));


export default function Profile() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);



    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle style={{ fontSize: 34 }} />
            </IconButton>
            <Menu className={classes.menu}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={open}
                onClose={handleClose}
            >
                <div className={classes.menuitem}>
                    <IconButton >
                        <AccountCircle style={{ fontSize: 34, display: "inline-block", color: "#2e629a" }} />

                    </IconButton>
                    <p style={{ fontSize: 14, display: "inline-block" }} >Ludhiya</p>
                    <MenuItem className={classes.menuitems} onClick={handleClose}>Edit Profile</MenuItem>
                    <MenuItem className={classes.menuitems} onClick={handleClose}>My Content</MenuItem>
                    <MenuItem className={classes.menuitems} onClick={handleClose}>Reading Plan</MenuItem>
                    <MenuItem className={classes.menuitems} onClick={handleClose}>Sign out</MenuItem>
                </div>

            </Menu>
        </div>
    )
}
