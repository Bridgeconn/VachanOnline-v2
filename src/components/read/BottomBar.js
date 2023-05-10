import React from "react";
import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import MenuItem from "./MenuItem";
import * as views from "../../store/views";
import MenuIcon from "@material-ui/icons/Menu";
import SideDrawer from "./SideDrawer";

const useStyles = makeStyles(() => ({
  appBar: {
    top: "auto",
    bottom: 0,
    boxShadow: "0 -1px 4px #7e7676",
  },
  toolBar: {
    padding: 0,
    display: "flex",
    justifyContent: "space-evenly",
  },
  text: {
    fontSize: 10,
    margin: "2px 5px",
    padding: "0 2px",
    whiteSpace: "nowrap",
  },
  menu: {
    width: 40,
    paddingTop: 6,
    color: "#000000",
    "& p": {
      color: "#000",
      fontSize: "0.65rem",
      paddingTop: 5,
    },
  },
}));

export default function BottomBar({ login }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    const key = event.key;
    if (event.type === "keydown" && (key === "Tab" || key === "Shift")) {
      return;
    }
    setOpen(open);
  };

  return (
    <AppBar position="fixed" color="inherit" className={classes.appBar}>
      <Toolbar className={`bottomBar ${classes.toolBar}`}>
        <span>
          <MenuItem
            icon="import_contacts"
            title="Parallel Bible"
            item={views.PARALLELBIBLE}
            base="bottom"
          />
        </span>
        <span>
          <MenuItem
            icon="comment"
            title="Commentaries"
            item={views.COMMENTARY}
            base="bottom"
          />
        </span>
        <span>
          <MenuItem
            icon="event"
            title="Reading Plans"
            item={views.READINGPLANS}
            base="bottom"
          />
        </span>
        <span>
          <MenuItem
            icon="search"
            title="Search"
            item={views.SEARCH}
            base="bottom"
          />
        </span>
        <span onClick={toggleDrawer(true)}>
          <div className={classes.menu}>
            <MenuIcon />
            <Typography>Menu</Typography>
          </div>
        </span>
      </Toolbar>
      <SideDrawer toggleDrawer={toggleDrawer} open={open} login={login} />
    </AppBar>
  );
}
