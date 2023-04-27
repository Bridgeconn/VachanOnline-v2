import React from "react";
import { AppBar, makeStyles, Toolbar } from "@material-ui/core";
import MenuItem from "./MenuItem";
import * as views from "../../store/views";
import * as actions from "../../store/actions";
import SideDrawer from "./SideDrawer";
import { connect } from "react-redux";
const useStyles = makeStyles(() => ({
  appBar: {
    top: "auto",
    bottom: 0,
    boxShadow: "0 -1px 4px #7e7676",
  },
  toolBar: {
    padding: 0,
    display: "flex",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 10,
    margin: "2px 5px",
    padding: "0 2px",
    whiteSpace: "nowrap",
  },
}));

const BottomBar = (props) => {
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
          <MenuItem icon="more_vert" title="Menu" base="bottom" />
        </span>
      </Toolbar>
      <SideDrawer toggleDrawer={toggleDrawer} open={open} login={props.login} />
    </AppBar>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE, name: name, value: value }),
  };
};
export default connect(null, mapDispatchToProps)(BottomBar);
