import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
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
        width: 320
    },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(1, 0, 1),
        backgroundColor: "#0d5773",
        color: "#fff",

    },
    submit1: {
        margin: theme.spacing(0, 0, 1),
        backgroundColor: "red",
        color: "#fff",
        textTransform: "none"
    },
    popver: {
        width: 550
    },
    fileInput: {
        border: "1px solid #ddd",
        display: "inline-block",
        padding: "10px 10px",
        margin: 0,
        width: 200,
        cursor: "pointer",

    },
    submitButton: {
        padding: 7,
        marginLeft: 7,
        background: "white",
        border: "4px solid lightgray",
        borderRadius: 10,
        fontSize: "10pt",
        cursor: "pointer",
        display: "inline-block",
        textTransform: "none"

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
                            Sign up
        </Typography>
                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>

                                    <form >
                                        <input className={classes.fileInput}
                                            type="file"
                                        />
                                        <Button className={classes.submitButton}
                                            type="submit">Upload image
                                        </Button>
                                    </form>

                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                </Grid>

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
          </Button>
                            <Button type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit1}>Sign in with Google</Button>
                            <Button type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{ textTransform: "none", marginBottom: 5 }}
                            >Sign in with Facebook</Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        Already have an account? Sign in
              </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>

                </Container>
            </Popover>
        </div>
    );
}
