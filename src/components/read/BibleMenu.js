import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import MenuItem from "./MenuItem";
import * as views from "../../store/views";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 300,
  },
}));

export default function BibleMenu({ parallelView, menuClick, uid }) {
  const classes = useStyles();
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
        {uid !== null ? (
          <>
            <MenuItem
              onClick={menuClick}
              icon="bookmark"
              title="Bookmarks"
              item={views.BOOKMARK}
              parallelView={parallelView}
            />
            <MenuItem
              onClick={menuClick}
              icon="border_color"
              title="Highlights"
              item={views.HIGHLIGHT}
              parallelView={parallelView}
            />
            <MenuItem
              onClick={menuClick}
              icon="note"
              title="Notes"
              item={views.NOTE}
              parallelView={parallelView}
            />
          </>
        ) : (
          ""
        )}
        {/* <MenuItem icon="functions" title="Interlinear" />
        <MenuItem icon="more_horiz" title="More" /> */}
      </List>
    </div>
  );
}
