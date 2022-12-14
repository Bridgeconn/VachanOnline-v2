import * as React from "react";
import * as views from "../../store/views";

import clsx from "clsx";
import { Drawer, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import Login from "../login/Login";
import LoginMenu from "../login/LoginMenu";
import MenuItem from "../read/MenuItem";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  iconText: {
    padding: "5px 10px",
  },
});

function SideDrawer(props) {
  const [loginButton, setLoginButton] = React.useState();
  const { login, toggleDrawer, userDetails, state } = props;
  const classes = useStyles();
  React.useEffect(() => {
    setLoginButton(login ? <LoginMenu userDetails={userDetails} /> : <Login />);
  }, [login, userDetails]);
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, !login || views.BOOKMARK ? true : false)}
      onKeyDown={toggleDrawer(anchor, !login || views.BOOKMARK ? true : false)}
    >
      <div className={!login ? "bottomBar" : "logMenuBox"}>
        <ListItem>{loginButton}</ListItem>
      </div>
      <ListItem className={classes.iconText}>
        <div className="bottomBar">
          <MenuItem
            icon="comment"
            title="Commentaries"
            item={views.COMMENTARY}
          />
        </div>
        <ListItemText>Commentary</ListItemText>
      </ListItem>
      <ListItem className={classes.iconText}>
        <div className={"bottomBar"}>
          <MenuItem
            icon="sign_language"
            title="ISLV Bible"
            item={views.SIGNBIBLE}
          />
        </div>
        <ListItemText>Sign Language Bible</ListItemText>
      </ListItem>
      <ListItem className={classes.iconText}>
        <div className="bottomBar">
          <MenuItem
            icon="image"
            title="infographics"
            item={views.INFOGRAPHICS}
          />
        </div>
        <ListItemText>Infographics</ListItemText>
      </ListItem>
      <ListItem className={classes.iconText}>
        <div className="bottomBar">
          <MenuItem icon="videocam" title="Videos" item={views.VIDEO} />
        </div>
        <ListItemText>Videos</ListItemText>
      </ListItem>
      <ListItem className={classes.iconText}>
        <div className="bottomBar">
          <MenuItem
            icon="format_shapes"
            title="Dictionaries"
            item={views.DICTIONARY}
          />
        </div>
        <ListItemText>Dictionary</ListItemText>
      </ListItem>
      <ListItem className={classes.iconText}>
        <div className="bottomBar">
          <MenuItem icon="bookmark" title="Bookmarks" item={views.BOOKMARK} />
        </div>
        <ListItemText>Bookmarks</ListItemText>
      </ListItem>
      <ListItem className={classes.iconText}>
        <div className="bottomBar">
          <MenuItem
            icon="border_color"
            title="Highlights"
            item={views.HIGHLIGHT}
          />
        </div>
        <ListItemText onClick={() => views.HIGHLIGHT}>Highlights</ListItemText>
      </ListItem>
      <ListItem className={classes.iconText}>
        <div className="bottomBar">
          <MenuItem icon="note" title="Notes" item={views.NOTE} />
        </div>
        <ListItemText>Notes</ListItemText>
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

export default SideDrawer;
