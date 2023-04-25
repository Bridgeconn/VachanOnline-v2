import * as React from "react";
import * as views from "../../store/views";
import * as actions from "../../store/actions";
import clsx from "clsx";
import { Drawer, ListItem, makeStyles } from "@material-ui/core";
import MenuItem from "../read/MenuItem";
import { connect } from "react-redux";

const useStyles = makeStyles({
  list: {
    width: 250,
    marginTop: 30,
  },
  fullList: {
    width: "auto",
  },
  iconText: {
    padding: 8,
  },
  closeButton: {
    marginRight: 15,
    marginTop: 7,
  },
});

function SideDrawer(props) {
  const { login, toggleDrawer, state } = props;
  const classes = useStyles();

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ListItem className={classes.iconText}>
        <div className="bottomBar">
          <MenuItem
            icon="comment"
            title="Commentaries"
            item={views.DRAWERCOMMENTARY}
            base="drawer"
          />
        </div>
      </ListItem>
      <ListItem className={classes.iconText}>
        <div className={"bottomBar"}>
          <MenuItem
            icon="sign_language"
            title="ISLV Bible"
            item={views.DRAWERSIGNBIBLE}
            base="drawer"
          />
        </div>
      </ListItem>
      <ListItem className={classes.iconText}>
        <div className="bottomBar">
          <MenuItem
            icon="image"
            title="Infographics"
            item={views.INFOGRAPHICS}
            base="drawer"
          />
        </div>
      </ListItem>
      <ListItem className={classes.iconText}>
        <div className="bottomBar">
          <MenuItem
            icon="volume_up"
            title="Audio Bible"
            item={views.AUDIO}
            base="drawer"
          />
        </div>
      </ListItem>
      <ListItem className={classes.iconText}>
        <div className="bottomBar">
          <MenuItem
            icon="videocam"
            title="Videos"
            item={views.VIDEO}
            base="drawer"
          />
        </div>
      </ListItem>
      <ListItem className={classes.iconText}>
        <div className="bottomBar">
          <MenuItem
            icon="format_shapes"
            title="Dictionaries"
            item={views.DICTIONARY}
            base="drawer"
          />
        </div>
      </ListItem>
      <ListItem className={classes.iconText}>
        <div
          className="bottomBar"
          onClick={!login ? (e) => e.stopPropagation() : null}
          onKeyDown={!login ? (e) => e.stopPropagation() : null}
        >
          <MenuItem
            icon="bookmark"
            title="Bookmarks"
            item={views.BOOKMARK}
            base="drawer"
          />
        </div>
      </ListItem>
      <ListItem className={classes.iconText}>
        <div
          className="bottomBar"
          onClick={!login ? (e) => e.stopPropagation() : null}
          onKeyDown={!login ? (e) => e.stopPropagation() : null}
        >
          <MenuItem
            icon="border_color"
            title="Highlights"
            item={views.HIGHLIGHT}
            base="drawer"
          />
        </div>
      </ListItem>
      <ListItem className={classes.iconText}>
        <div
          className="bottomBar"
          onClick={!login ? (e) => e.stopPropagation() : null}
          onKeyDown={!login ? (e) => e.stopPropagation() : null}
        >
          <MenuItem icon="note" title="Notes" item={views.NOTE} base="drawer" />
        </div>
      </ListItem>
    </div>
  );
  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    isDrawer: state.local.isDrawer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);
