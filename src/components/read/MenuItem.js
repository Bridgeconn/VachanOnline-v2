import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 300
  },
  popover: {
    pointerEvents: "none",
    marginTop: -2,
    marginLeft: -10
  },
  paper: {
    padding: "10px 15px",
    backgroundColor: "#2e639a"
  },
  menu: {
    fontSize: "18px",
    color: "#fff"
  }
}));

export default function MenuItem(props) {
  const classes = useStyles();
  const [popover, setPopover] = React.useState(null);

  function handlePopoverOpen(event) {
    setPopover(event.currentTarget);
  }

  function handlePopoverClose() {
    setPopover(null);
  }

  const open = Boolean(popover);
  return (
    <ListItem button>
      <ListItemIcon
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <div onClick={props.toggleParallelBible}>
          <i
            className="material-icons"
            style={{ fontSize: "38px", color: "#fff" }}
          >
            {props.icon}
          </i>
          <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
              paper: classes.paper
            }}
            open={open}
            anchorEl={popover}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography className={classes.menu}>{props.title}</Typography>
          </Popover>
        </div>
      </ListItemIcon>
    </ListItem>
  );
}
