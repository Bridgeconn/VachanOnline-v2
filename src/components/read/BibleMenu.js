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

export default function BibleMenu() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <MenuItem icon="search" title="Search Bible" item={views.SEARCH} />
        <MenuItem
          icon="import_contacts"
          title="Parallel Bible"
          item={views.PARALLELBIBLE}
        />
        <MenuItem icon="comment" title="Commentaries" item={views.COMMENTARY} />
        {process.env.REACT_APP_SIGNBIBLE_URL !== undefined ? <MenuItem
          icon="sign_language"
          title="ISLV Bible"
          item={views.SIGNBIBLE}
        />:""}
        <MenuItem icon="image" title="Infographics" item={views.INFOGRAPHICS} />
        <MenuItem icon="volume_up" title="Audio Bible" item={views.AUDIO} />
        <MenuItem icon="videocam" title="Videos" item={views.VIDEO} />
        <MenuItem
          icon="event"
          title="Reading Plans"
          item={views.READINGPLANS}
        />
        <MenuItem
          icon="format_shapes"
          title="Dictionaries"
          item={views.DICTIONARY}
        />
        <MenuItem icon="bookmark" title="Bookmarks" item={views.BOOKMARK} />
        <MenuItem
          icon="border_color"
          title="Highlights"
          item={views.HIGHLIGHT}
        />
        <MenuItem icon="note" title="Notes" item={views.NOTE} />
      </List>
    </div>
  );
}
