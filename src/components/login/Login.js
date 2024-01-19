import React from "react";
import firebase from "firebase/compat/app";
import * as actions from "../../store/actions";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Popover from "@mui/material/Popover";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import PersonIcon from "@mui/icons-material/Person";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import BigTooltip from "../common/BigTooltip";

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
    [theme.breakpoints.down("md")]: {
      marginLeft: "20%",
      width: "60%",
      marginTop: 0,
    },
  },
  loginBtn: {
    cursor: "pointer",
    marginLeft: 3,
    fontSize: "2rem",
    padding: "0 8px",
    boxSizing: "content-box",
    "& hover": {
      textDecoration: "none",
    },
    [theme.breakpoints.down("md")]: {
      whiteSpace: "nowrap",
      fontSize: "1.8rem",
    },
  },
  links: {
    marginTop: 10,
  },
  message: {
    position: "relative",
    bottom: 20,
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const { login, openLogin, setValue, setMessage, setAlert, person } = props;
  const menuRef = React.useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [form, setForm] = React.useState(1);
  const [messageOpen, setMessageOpen] = React.useState(false);

  const open = Boolean(anchorEl);
  const { t } = useTranslation();

  const openForm = () => {
    setAnchorEl(menuRef.current);
    setForm(1);
  };

  const closeForm = () => {
    setAnchorEl(null);
  };

  const openSignUp = (event) => {
    setForm(2);
  };
  const openSignIn = (event) => {
    setForm(1);
  };
  const openForgot = (event) => {
    setForm(3);
  };

  //Function to Sign up
  const signUp = (e) => {
    e.preventDefault();
    if (email && password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          setAlert("success");
          setMessage(t("loginSuccessMsg", { email }));
        })
        .catch((error) => {
          setAlert("error");
          setMessage(error.message);
        });
    }
  };

  //Function to sign In
  const signIn = (e) => {
    e.preventDefault();
    if (email && password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log("Sign In Successful!");
        })
        .catch((error) => {
          console.log("error");
          if (error.code === "auth/user-not-found") {
            setMessage(t("loginMessage"));
          } else if (error.code === "auth/wrong-password") {
            setMessage(t("invalidPswd"));
          } else {
            setMessage(error.message);
          }
        });
    }
  };

  //Function to sign out
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
          photoURL: null,
        });
        console.log("Sign Out Successful!");
      })
      .catch(function (error) {
        console.log("Error Signing Out");
      });
  };

  //Function to reset password
  const resetPassword = (e) => {
    e.preventDefault();
    if (email) {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function () {
          setAlert("success");
          setMessage(t("resetPswd", { email }));
          setForm(1);
        })
        .catch(function (error) {
          setAlert("error");
          if (error.code === "auth/user-not-found") {
            setMessage(t("loginMessage"));
          } else {
            setMessage(error.message);
          }
        });
    }
  };
  //Function to sign into Google
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
        setAlert("error");
        setMessage(error.message);
      });
  };

  //Function to sign into Facebook
  // const signInFacebook = (e) => {
  //   e.preventDefault();
  //   var provider = new firebase.auth.FacebookAuthProvider();
  //   provider.setCustomParameters({
  //     display: "popup",
  //   });
  //   firebase
  //     .auth()
  //     .signInWithPopup(provider)
  //     .then(function (result) {
  //       console.log("Signin Facebook User");
  //     })
  //     .catch(function (error) {
  //       setAlert("error");
  //       setMessage(error.message);
  //     });
  // };

  //Check if user logged in
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
          photoURL: user.photoURL,
        });
      }
    });
  }, [login, setValue]);
  React.useEffect(() => {
    if (openLogin) {
      openForm();
      //show alert message in login popup for 5 seconds and hide
      setMessageOpen(true);
      window.setTimeout(() => setMessageOpen(false), 5000);
      setValue("openLogin", false);
    }
  }, [openLogin, setValue]);
  return (
    <>
      {login ? (
        <Button aria-describedby="sign-in" variant="outlined" onClick={signOut}>
          {t("loginSignOutBtn")}
        </Button>
      ) : (
        <>
          <BigTooltip title={t("signInTitle")}>
            <PersonIcon
              className={person ? person : classes.loginBtn}
              ref={menuRef}
              onClick={openForm}
            />
          </BigTooltip>
          <Popover
            id="sign-in"
            open={open}
            anchorEl={anchorEl}
            onClose={closeForm}
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
              {form === 1 ? (
                <div className={classes.paper}>
                  <Collapse in={messageOpen} className={classes.message}>
                    <Alert
                      variant="filled"
                      onClose={() => setMessageOpen(false)}
                      severity="error"
                    >
                      {t("loginSignInWarning")}
                    </Alert>
                  </Collapse>
                  <Typography component="h1" variant="h5">
                    {t("signInTitle")}
                  </Typography>
                  <form
                    onSubmit={(e) => signIn(e)}
                    className={classes.form}
                    noValidate
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label={t("loginEmailPlaceHolder")}
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label={t("loginPasswordPlaceHolder")}
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="outlined"
                      className={classes.submit}
                    >
                      {t("signInTitle")}
                    </Button>
                    <Button
                      type="submit"
                      fullWidth
                      variant="outlined"
                      onClick={signInGoogle}
                      className={classes.submit}
                    >
                      {t("loginSignInGoogleBtn")}
                    </Button>
                    {/* <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    onClick={signInFacebook}
                    className={classes.submit}
                  >
                    Sign in with Facebook
                  </Button> */}
                    <Grid container className={classes.links}>
                      <Grid item xs>
                        <Link
                          href="#"
                          variant="body2"
                          onClick={openForgot}
                          underline="hover"
                        >
                          {t("loginForgotPswd")}
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link
                          href="#"
                          variant="body2"
                          onClick={openSignUp}
                          underline="hover"
                        >
                          {t("loginSignUpMsg")}
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              ) : form === 2 ? (
                <div className={classes.paper}>
                  <Typography component="h1" variant="h5">
                    {t("loginSignUpTitle")}
                  </Typography>
                  <form
                    onSubmit={(e) => signUp(e)}
                    className={classes.form}
                    noValidate
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label={t("loginEmailPlaceHolder")}
                          name="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label={t("loginPasswordPlaceHolder")}
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
                      variant="outlined"
                      className={classes.submit}
                    >
                      {t("loginSignUpBtn")}
                    </Button>
                    <Grid
                      container
                      justifyContent="flex-end"
                      className={classes.links}
                    >
                      <Grid item xs>
                        <Link
                          href="#"
                          variant="body2"
                          onClick={openForgot}
                          underline="hover"
                        >
                          {t("loginForgotPswd")}
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link
                          href="#"
                          variant="body2"
                          onClick={openSignIn}
                          underline="hover"
                        >
                          {t("loginSignInMsg")}
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              ) : (
                <div className={classes.paper}>
                  <Typography component="h1" variant="h5" gutterBottom={true}>
                    {t("loginForgotPswd")}
                  </Typography>
                  <Typography component="p" variant="subtitle2" align="center">
                    {t("loginPswdReset")}
                  </Typography>
                  <form
                    onSubmit={(e) => resetPassword(e)}
                    className={classes.form}
                    noValidate
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label={t("loginEmailPlaceHolder")}
                          name="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="outlined"
                      className={classes.submit}
                    >
                      {t("loginSubmit")}
                    </Button>
                    <Grid
                      container
                      justifyContent="flex-end"
                      className={classes.links}
                    >
                      <Grid item>
                        <Link
                          href="#"
                          variant="body2"
                          onClick={openSignIn}
                          underline="hover"
                        >
                          {t("loginBackSignIn")}
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              )}
            </Container>
          </Popover>
        </>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    login: state.local.login,
    openLogin: state.local.openLogin,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
