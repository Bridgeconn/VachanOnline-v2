import React from "react";
import firebase from "firebase/app";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Popover from "@material-ui/core/Popover";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
  button: {
    margin: theme.spacing(1.5),
    backgroundColor: "#fff",
    border: "1px solid #fff",
    "& hover": {
      textDecoration: "none",
    },
    [theme.breakpoints.only("xs")]: {
      marginLeft: "20%",
      width: "60%",
      marginTop: 0,
    },
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [anchorSignIn, setAnchorSignIn] = React.useState(null);
  const [signInOpen, setSignInOpen] = React.useState(false);
  const [signUpOpen, setSignUpOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [buttonLabel, setButtonLabel] = React.useState("Sign In");
  const { login, setValue } = props;

  const openSignIn = (event) => {
    if (anchorSignIn === null) {
      setAnchorSignIn(event.currentTarget);
    }
    setSignInOpen(true);
    setSignUpOpen(false);
  };

  const closeSignIn = () => {
    setSignInOpen(false);
  };

  const id1 = signInOpen ? "sign-in" : undefined;

  const openSignUp = (event) => {
    setSignInOpen(false);
    setSignUpOpen(true);
  };

  const closeSignUp = () => {
    setSignUpOpen(false);
  };

  const id2 = signUpOpen ? "sign-up" : undefined;

  const signUp = (e) => {
    e.preventDefault();
    setSignUpOpen(false);
    setButtonLabel("Sign Out");
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("signup user");
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const signIn = (e) => {
    e.preventDefault();
    setSignInOpen(false);
    setButtonLabel("Sign Out");
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("signin user");
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const signOut = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(function () {
        setValue("login", false);
        setValue("userDetails", {
          uid: null,
          email: null,
        });
        console.log("Sign Out Successful");
      })
      .catch(function (error) {
        console.log("Error Signing Out");
      });
  };
  const signInGoogle = (e) => {
    e.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        console.log("Signin Google User");
      })
      .catch(function (error) {
        console.log("Google Signin Error");
      });
  };
  const signInFacebook = (e) => {
    e.preventDefault();
    console.log("Facebook login");
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
      display: "popup",
    });
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        console.log("Signin Facebook User");
      })
      .catch(function (error) {
        console.log("Facebook Signin Error");
      });
  };
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        if (login === true) {
          console.log("user alread logged in ");
          return;
        }
        setValue("login", true);
        setValue("userDetails", {
          uid: user.uid,
          email: user.email,
        });
      } else {
        console.log("No signed in user");
      }
    });
  }, [login, setValue]);
  if (login) {
    return (
      <Button aria-describedby={id1} variant="contained" onClick={signOut}>
        Sign Out
      </Button>
    );
  }
  return (
    <>
      <Button aria-describedby={id1} variant="contained" onClick={openSignIn}>
        {buttonLabel}
      </Button>
      <Popover
        id={id1}
        open={signInOpen}
        anchorEl={anchorSignIn}
        onClose={closeSignIn}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form
              onSubmit={(e) => signIn(e)}
              className={classes.form}
              noValidate
            >
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={signInGoogle}
                className={classes.submit}
              >
                Sign in with Google
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={signInFacebook}
                className={classes.submit}
              >
                Sign in with Facebook
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={openSignUp}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </Popover>
      <Popover
        id={id2}
        open={signUpOpen}
        anchorEl={anchorSignIn}
        onClose={closeSignUp}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form
              onSubmit={(e) => signUp(e)}
              className={classes.form}
              noValidate
            >
              <Grid container spacing={2}>
                {/* <Grid item xs={12} sm={6}>
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
                </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body2" onClick={openSignIn}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </Popover>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    login: state.local.login,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
