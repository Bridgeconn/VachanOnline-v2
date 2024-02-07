import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import firebase from "firebase/compat/app";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";
import { GREY } from "../../store/colorCode";
import BigTooltip from "../common/BigTooltip";
import { useTheme } from "@mui/material/styles";

const LoginMenu = (props) => {
  const theme = useTheme();
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
        size="large"
      >
        <BigTooltip title={t("loginSignOutBtn")}>
          <Avatar alt={userDetails.email} src={userDetails.photoURL} />
        </BigTooltip>
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
        sx={{
          "& .MuiPaper-root":{
            width: "100%",
            maxWidth: "300px",
            backgroundColor: theme.palette.background.paper,
            boxShadow: "1px 1px 4px 1px " + GREY,
          }
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
