import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { BLUE } from "../../store/colorCode";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 300,
  },
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
    color: "#fff",
  },
  selected: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingTop: 11,
    paddingBottom: 5,
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.1)",
    },
  },
  button: {
    paddingTop: 11,
    paddingBottom: 5,
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.1)",
    },
  },
}));

export default function MenuItem(props) {
  const classes = useStyles();
  const { onClick, icon, title, item, parallelView } = props;
  const [popover, setPopover] = React.useState(null);

  function handlePopoverOpen(event) {
    setPopover(event.currentTarget);
  }

  function handlePopoverClose() {
    setPopover(null);
  }

  const open = Boolean(popover);
  const buttonClass = parallelView === item ? classes.selected : classes.button;
  return (
    <ListItem button className={buttonClass}>
      <ListItemIcon
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <div onClick={() => onClick(item)}>
          <i
            className="material-icons"
            style={{ fontSize: "38px", color: "#fff" }}
          >
            {icon}
          </i>
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
        </div>
      </ListItemIcon>
    </ListItem>
  );
}
