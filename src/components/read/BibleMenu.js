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

export default function BibleMenu(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <MenuItem
          onClick={props.menuClick}
          icon="import_contacts"
          title="Parallel Bible"
          item={views.PARALLELBIBLE}
        />
        <MenuItem
          onClick={props.menuClick}
          icon="comment"
          title="Commentaries"
          item={views.COMMENTARY}
        />
        <MenuItem
          onClick={props.menuClick}
          icon="format_shapes"
          title="Dictionaries"
          item={views.DICTIONARY}
        />
        <MenuItem
          onClick={props.menuClick}
          icon="image"
          title="Infographics"
          item={views.INFOGRAPHICS}
        />
        <MenuItem
          onClick={props.menuClick}
          icon="volume_up"
          title="Audio Bible"
          item={views.AUDIO}
        />
        <MenuItem
          onClick={props.menuClick}
          icon="videocam"
          title="Videos"
          item={views.VIDEO}
        />
        <MenuItem
          onClick={props.menuClick}
          icon="bookmark"
          title="Bookmarks"
          item={views.BOOKMARK}
        />
        <MenuItem
          onClick={props.menuClick}
          icon="edit"
          title="Highlights"
          item={views.HIGHLIGHT}
        />
        {/* <MenuItem icon="functions" title="Interlinear" />
        <MenuItem icon="rate_review" title="Articles" />
        <MenuItem icon="sort_by_alpha" title="Dictionary" />
        <MenuItem icon="more_horiz" title="More" /> */}
      </List>
    </div>
  );
}
