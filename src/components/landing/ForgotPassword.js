import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
const useStyles = makeStyles(theme => ({
    typography: {
        padding: theme.spacing(2),
    },
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 260
    },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(0, 0, 1),
        backgroundColor: "#0d5773",
        color: "#fff",
        textTransform: "none"

    },
    submit1: {
        margin: theme.spacing(0, 0, 1),
        backgroundColor: "red",
        color: "#fff",
        textTransform: "none"
    },
    popver: {
        width: 550
    }
}));

export default function SimplePopover() {
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
            <Button aria-describedby={id} variant="contained" style={{ backgroundColor: "#1c3152", color: "#fff" }}
                onClick={handleClick}>
                Login
      </Button>
            <Popover
                id={id}

                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>

                        <Typography component="h1" variant="h5">
                            Forgot your Password?
        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                send
                         </Button>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Reset Password
          </Button>

                        </form>
                    </div>

                </Container>
            </Popover>
        </div>
    );
}
