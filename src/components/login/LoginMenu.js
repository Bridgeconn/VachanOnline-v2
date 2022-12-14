import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import firebase from "firebase/app";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
}));

const LoginMenu = (props) => {
  const classes = useStyles();
  const { userDetails, setValue, mobileView } = props;
  const [menuOpen, setMenuOpen] = React.useState(null);

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
        {userDetails.photoURL ? (
          <Avatar alt={userDetails.email} src={userDetails.photoURL} />
        ) : (
          <AccountCircle fontSize="large" />
        )}
      </IconButton>
      {mobileView ? (
        <div className="menuLog">
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button>
              <ListItemText primary={userDetails.email} />
              <ListItem button>
                <ListItemText primary="Sign Out" onClick={signOut} />
              </ListItem>
            </ListItem>
            <Divider />
          </List>
          <List component="nav" aria-label="secondary mailbox folders"></List>
        </div>
      ) : (
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
              <ListItemText primary="Sign Out" onClick={signOut} />
            </ListItem>
          </List>
        </Menu>
      )}
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
