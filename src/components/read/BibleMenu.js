import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import MenuItem from "./MenuItem";
import * as views from "../../store/views";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "calc(100vh - 50px)",
    overflowY: "auto",
    overflowX: "hidden",
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
        <Divider />
        <MenuItem
          icon="import_contacts"
          title="Parallel Bible"
          item={views.PARALLELBIBLE}
        />
        <Divider />
        <MenuItem icon="comment" title="Commentaries" item={views.COMMENTARY} />
        <Divider />
        {process.env.REACT_APP_SIGNBIBLE_URL !== undefined ? (
          <MenuItem
            icon="sign_language"
            title="ISLV Bible"
            item={views.SIGNBIBLE}
          />
        ) : (
          ""
        )}
        <Divider />
        <MenuItem
          class="material-icons"
          icon="image_outline"
          title="Infographics"
          item={views.INFOGRAPHICS}
          variant="outlined"
        />
        <Divider />
        <MenuItem icon="volume_up" title="Audio Bible" item={views.AUDIO} />
        <Divider />
        <MenuItem icon="videocam" title="Videos" item={views.VIDEO} />
        <Divider />
        <MenuItem
          icon="event"
          title="Reading Plans"
          item={views.READINGPLANS}
        />
        <Divider />
        <MenuItem
          icon="format_shapes"
          title="Dictionaries"
          item={views.DICTIONARY}
        />
        <Divider />
        <MenuItem icon="bookmark" title="Bookmarks" item={views.BOOKMARK} />
        <Divider />
        <MenuItem
          icon="border_color"
          title="Highlights"
          item={views.HIGHLIGHT}
        />
        <Divider />
        <MenuItem icon="note" title="Notes" item={views.NOTE} />
        <Divider />
      </List>
    </div>
  );
}
