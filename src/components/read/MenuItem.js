import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import makeStyles from '@mui/styles/makeStyles';
import { connect } from "react-redux";
import { BLACK, GREY, WHITE } from "../../store/colorCode";
import * as views from "../../store/views";
import { SETVALUE } from "../../store/actions";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
    marginTop: -6,
    marginLeft: -10,
  },
  paper: {
    padding: "10px 15px",
    backgroundColor: WHITE,
  },
  menu: {
    fontSize: "18px",
    color: BLACK,
  },
  selected: {
    backgroundColor: WHITE,
    paddingTop: 11,
    paddingBottom: 5,
    paddingLeft: 13,
    boxShadow: "inset 1px 0px 3px 1px " + GREY,
    [theme.breakpoints.down('md')]: {
      padding: (props) =>
        props.base === "drawer" ? "8px 10px 8px 20px" : "4px 7px 0px",
      "&:hover": {
        backgroundColor: GREY,
      },
    },
  },
  button: {
    paddingTop: 11,
    paddingBottom: 5,
    paddingLeft: 13,
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.1)",
    },
    [theme.breakpoints.down('md')]: {
      padding: (props) =>
        props.base === "drawer" ? "8px 10px 8px 20px" : "4px 7px 0px",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  },
  listItem: {
    minWidth: 44,
    color: BLACK,
  },
  listItemSelected: {
    minWidth: 44,
    color: BLACK,
  },
  menuText: {
    color: "#000",
    fontSize: "0.65rem",
    padding: "0 5px",
  },
  icon: {
    fontSize: "36px",
    [theme.breakpoints.down('md')]: {
      fontSize: "28px",
    },
  },
  drawerMenu: {
    [theme.breakpoints.down('md')]: {
      display: "flex",
      alignItems: "center",
    },
  },
  bottomMenu: {
    [theme.breakpoints.down('md')]: {
      textAlign: "center",
    },
  },
  drawerText: {
    [theme.breakpoints.down('md')]: {
      color: "#000",
      margin: "5px 15px",
      textTransform: "capitalize",
    },
  },
}));

const MenuItem = (props) => {
  const { icon, title, item, mobileView, parallelView, uid, setValue, base } =
    props;
  const styleProps = {
    base: base,
  };
  const classes = useStyles(styleProps);
  const [popover, setPopover] = React.useState(null);

  function handlePopoverOpen(event) {
    setPopover(event.currentTarget);
  }

  function handlePopoverClose() {
    setPopover(null);
  }
  //Function to handle menu click
  const onClick = (view, uid) => {
    //if user not logged in then open sign in popup for personalized features
    if (
      [views.NOTE, views.BOOKMARK, views.HIGHLIGHT].includes(view) &&
      uid === null
    ) {
      setValue("openLogin", true);
      return;
    }
    //if closing commentary then reset selected commentary
    if (parallelView === view && view === views.COMMENTARY) {
      setValue("commentary", {});
    }
    setValue("parallelView", parallelView === view ? "" : view);
  };
  const open = Boolean(popover);
  const buttonClass = parallelView === item ? classes.selected : classes.button;
  return (
    <ListItem
      button
      className={buttonClass}
      selected={parallelView === item && mobileView}
    >
      <ListItemIcon
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        variant="outlined"
        className={
          parallelView === item ? classes.listItemSelected : classes.listItem
        }
      >
        <div
          onClick={() => onClick(item, uid)}
          className={`${base === "drawer" ? classes.drawerMenu : ""} ${
            base === "bottom" ? classes.bottomMenu : ""
          }`}
        >
          <i className={`material-icons ${classes.icon}`} title={title}>
            {icon}
          </i>
          {base === "bottom" || base === "drawer" ? (
            <Typography
              className={
                base === "drawer" ? classes.drawerText : classes.menuText
              }
            >
              {title}
            </Typography>
          ) : null}
          {mobileView ? null : (
            <Popover
              id="mouse-over-popover"
              className={classes.popover}
              classes={{
                paper: classes.paper,
              }}
              open={open}
              anchorEl={popover}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Typography className={classes.menu}>{title}</Typography>
            </Popover>
          )}
        </div>
      </ListItemIcon>
    </ListItem>
  );
};
const mapStateToProps = (state) => {
  return {
    parallelView: state.local.parallelView,
    uid: state.local.userDetails.uid,
    mobileView: state.local.mobileView,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: SETVALUE, name: name, value: value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
