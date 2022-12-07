import React from "react";
import { AppBar, Box, makeStyles, Toolbar } from "@material-ui/core";
import MenuItem from "./MenuItem";
import * as views from "../../store/views";
import SideDrawer from "../Drawer/Drawer";
const useStyles = makeStyles(() => ({
  appBar: {
    top: "auto",
    bottom: 0,
  },
}));

const BottomBar = (props) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <AppBar position="fixed" color="inherit" className={classes.appBar}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <div className="bottomBar">
          <MenuItem
            icon="import_contacts"
            title="Parallel Bible"
            item={views.PARALLELBIBLE}
          />
        </div>
        <div className="bottomBar">
          <MenuItem
            icon="comment"
            title="Commentaries"
            item={views.COMMENTARY}
          />
        </div>
        <div className="bottomBar">
          <MenuItem icon="search" title="Search Bible" item={views.SEARCH} />
        </div>
        <div className="bottomBar">
          <MenuItem
            icon="event"
            title="Reading Plans"
            item={views.READINGPLANS}
          />
        </div>
        <div className="bottomBar" onClick={toggleDrawer("right", true)}>
          <MenuItem icon="more_vert" title="Drawer" />
        </div>
      </Toolbar>
      <SideDrawer
        toggleDrawer={toggleDrawer}
        state={state}
        login={props.login}
        userDetails={props.userDetails}
        s
      />
    </AppBar>
  );
};
export default BottomBar;
