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
        <MenuItem icon="comment" title="Commentaries" style={{ marginBottom: "20px " }} />
        <MenuItem icon="format_shapes" title="Dictionary" style={{ marginTop: 20 }} />
        <MenuItem icon="functions" title="Interlinear" style={{ marginBottom: 10 }} />
        <MenuItem icon="videocam" title=" Videos" style={{ marginBottom: 10 }} />
        <MenuItem icon="image" title="Images" style={{ marginBottom: 10 }} />
        <MenuItem icon="volume_up" title="Audio" style={{ marginBottom: 10 }} />
        <MenuItem icon="rate_review" title="Articles" />
        <MenuItem icon="today" title="Daily Devotion" />

      </List>
    </div>
  );
}
