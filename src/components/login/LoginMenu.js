import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import firebase from "firebase/compat/app";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import { useTranslation } from "react-i18next";
import { GREY } from "../../store/colorCode";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "1px 1px 4px 1px " + GREY,
  },
  emailText: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75rem",
    },
  },
}));

const LoginMenu = (props) => {
  const classes = useStyles();
  const { userDetails, setValue } = props;
  const [menuOpen, setMenuOpen] = React.useState(null);
  const { t } = useTranslation();

  const handleProfileMenuOpen = (event) => {
    setMenuOpen(event.currentTarget);
  };

  const handleClose = () => {
    setMenuOpen(null);
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
  return (
    <>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls="profileMenu"
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <Tooltip title={t("loginSignOutBtn")}>
          <Avatar alt={userDetails.email} src={userDetails.photoURL} />
        </Tooltip>
      </IconButton>
      <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        anchorEl={menuOpen}
        keepMounted
        open={Boolean(menuOpen)}
        onClose={handleClose}
        classes={{
          paper: classes.paper,
        }}
      >
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button>
            <ListItemText primary={userDetails.email} />
          </ListItem>
        </List>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem button>
            <ListItemText primary={t("loginSignOutBtn")} onClick={signOut} />
          </ListItem>
        </List>
      </Menu>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    mobileView: state.local.mobileView,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginMenu);
