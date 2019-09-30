import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import MenuItem from "./MenuItem";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 300
  }
}));

export default function BibleMenu(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <MenuItem
          toggleParallelBible={props.toggleParallelBible}
          icon="import_contacts"
          title="Parallel Bible"
        />
        {/* <MenuItem icon="comment" title="Commentaries" />
        <MenuItem icon="format_shapes" title="Word Study" />
        <MenuItem icon="functions" title="Interlinear" />
        <MenuItem icon="videocam" title=" Videos" />
        <MenuItem icon="image" title="Images" />
        <MenuItem icon="volume_up" title="Audio" />
        <MenuItem icon="rate_review" title="Articles" />
        <MenuItem icon="sort_by_alpha" title="Dictionary" />
        <MenuItem icon="more_horiz" title="More" /> */}
      </List>
    </div>
  );
}
