import * as React from "react";
import * as views from "../../store/views";
import { Drawer, ListItem, makeStyles } from "@material-ui/core";
import MenuItem from "./MenuItem";

const useStyles = makeStyles({
  list: {
    width: 220,
    paddingTop: 10,
  },
});

export default function SideDrawer(props) {
  const { login, toggleDrawer, open } = props;
  const classes = useStyles();
  const Item = ({ icon, title, item }) => (
    <ListItem>
      <MenuItem icon={icon} title={title} item={item} base="drawer" />
    </ListItem>
  );
  const LoginItem = ({ icon, title, item }) => (
    <ListItem
      onClick={!login ? (e) => e.stopPropagation() : null}
      onKeyDown={!login ? (e) => e.stopPropagation() : null}
    >
      <MenuItem icon={icon} title={title} item={item} base="drawer" />
    </ListItem>
  );
  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={toggleDrawer(false)}
      classes={{ paper: classes.list }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div className="bottomBar">
        <Item
          icon="comment"
          title="Commentaries"
          item={views.DRAWERCOMMENTARY}
        />
        <Item
          icon="sign_language"
          title="ISLV Bible"
          item={views.DRAWERSIGNBIBLE}
        />
        <Item icon="image" title="Infographics" item={views.INFOGRAPHICS} />
        <Item icon="volume_up" title="Audio Bible" item={views.AUDIO} />
        <Item icon="videocam" title="Videos" item={views.VIDEO} />
        <Item
          icon="format_shapes"
          title="Dictionaries"
          item={views.DICTIONARY}
        />
        <LoginItem icon="bookmark" title="Bookmarks" item={views.BOOKMARK} />
        <LoginItem
          icon="border_color"
          title="Highlights"
          item={views.HIGHLIGHT}
        />
        <LoginItem icon="note" title="Notes" item={views.NOTE} />
      </div>
    </Drawer>
  );
}
