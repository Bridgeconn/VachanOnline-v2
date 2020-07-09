import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import MenuItem from "./MenuItem";
import * as views from "../../store/views";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "calc(100vh - 50px)",
    overflow: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(0,0,0,.4) rgba(0,0,0,.1)",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.4)",
      outline: "1px solid slategrey",
    },
  },
}));

export default function BibleMenu({ parallelView, menuClick, uid, setValue }) {
  const classes = useStyles();
  const onClick = (view, uid) => {
    //if user not logged in then open sign in popup for personalized features
    if (
      [views.NOTE, views.BOOKMARK, views.HIGHLIGHT].includes(view) &&
      uid === null
    ) {
      setValue("openLogin", true);
      return;
    }
    menuClick(view);
  };
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <MenuItem
          onClick={menuClick}
          icon="search"
          title="Search Bible"
          item={views.SEARCH}
          parallelView={parallelView}
        />
        <MenuItem
          onClick={menuClick}
          icon="import_contacts"
          title="Parallel Bible"
          item={views.PARALLELBIBLE}
          parallelView={parallelView}
        />
        <MenuItem
          onClick={menuClick}
          icon="comment"
          title="Commentaries"
          item={views.COMMENTARY}
          parallelView={parallelView}
        />
        <MenuItem
          onClick={menuClick}
          icon="format_shapes"
          title="Dictionaries"
          item={views.DICTIONARY}
          parallelView={parallelView}
        />
        <MenuItem
          onClick={menuClick}
          icon="image"
          title="Infographics"
          item={views.INFOGRAPHICS}
          parallelView={parallelView}
        />
        <MenuItem
          onClick={menuClick}
          icon="volume_up"
          title="Audio Bible"
          item={views.AUDIO}
          parallelView={parallelView}
        />
        <MenuItem
          onClick={menuClick}
          icon="videocam"
          title="Videos"
          item={views.VIDEO}
          parallelView={parallelView}
        />
        <MenuItem
          onClick={onClick}
          icon="bookmark"
          title="Bookmarks"
          item={views.BOOKMARK}
          parallelView={parallelView}
          uid={uid}
        />
        <MenuItem
          onClick={onClick}
          icon="border_color"
          title="Highlights"
          item={views.HIGHLIGHT}
          parallelView={parallelView}
          uid={uid}
        />
        <MenuItem
          onClick={onClick}
          icon="note"
          title="Notes"
          item={views.NOTE}
          parallelView={parallelView}
          uid={uid}
        />
        {/* <MenuItem icon="functions" title="Interlinear" />
        <MenuItem icon="more_horiz" title="More" /> */}
      </List>
    </div>
  );
}
