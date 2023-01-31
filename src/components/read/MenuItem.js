import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { BLUE, LIGHTBLUE, WHITE } from "../../store/colorCode";
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
    backgroundColor: BLUE,
  },
  menu: {
    fontSize: "18px",
    color: WHITE,
    //#b3b3e6
  },
  selected: {
    backgroundColor: WHITE,
    paddingTop: 11,
    paddingBottom: 5,
    paddingLeft: 13,
    boxShadow: "inset 1px 0px 3px 1px" + LIGHTBLUE,
    "&:hover": {
      backgroundColor: LIGHTBLUE,
    },
    [theme.breakpoints.only("xs")]: {
      padding: "3px 7px 0px",
      "&:hover": {
        backgroundColor: "transparent",
      },
      backgroundColor: "transparent",
      boxShadow: "unset",
    },
  },
  button: {
    paddingTop: 11,
    paddingBottom: 5,
    paddingLeft: 13,
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.1)",
    },
    [theme.breakpoints.only("xs")]: {
      padding: "3px 7px 0px",
    },
  },
  listItem: {
    minWidth: 44,
    color: "#fff",
  },
  listItemSelected: {
    minWidth: 44,
    color: BLUE,
    [theme.breakpoints.only("xs")]: {
      color: WHITE,
    },
  },
  menuText: {
    color: "#000",
    fontSize: "0.65rem",
  },
  drawerMenu: {
    [theme.breakpoints.only("xs")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  bottomMenu: {
    [theme.breakpoints.only("xs")]: {
      textAlign: "center",
      "&:hover": {
        background: "#aaaeb259",
      },
    },
  },
  drawerText: {
    [theme.breakpoints.only("xs")]: {
      color: "#000",
      margin: "5px 15px",
    },
  },
}));

const MenuItem = (props) => {
  const classes = useStyles();
  const { icon, title, item, mobileView, parallelView, uid, setValue, base } =
    props;
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
    <ListItem button className={buttonClass}>
      <ListItemIcon
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className={
          parallelView === item ? classes.listItemSelected : classes.listItem
        }
      >
        <div
          onClick={() => onClick(item, uid)}
          className={
            base === "drawer"
              ? classes.drawerMenu
              : base === "bottom"
              ? classes.bottomMenu
              : null
          }
        >
          <i
            className="material-icons"
            style={mobileView ? { fontSize: "28px" } : { fontSize: "36px" }}
            title={title}
          >
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
          {mobileView ? null : ( // <Typography className={classes.menu}>{title}</Typography>
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
