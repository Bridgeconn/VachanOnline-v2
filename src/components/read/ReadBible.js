import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Fullscreen from "react-full-screen";
import TopBar from "./TopBar";
import MenuBar from "./MenuBar";
import Bible from "./Bible";

const useStyles = makeStyles(theme => ({
  bible: {
    display: "flex",
    width: "100%",
    padding: "0px 0px"
  },
  fullscreen: {
    backgroundColor: "#fff"
  }
}));

const ReadBible = () => {
  const classes = useStyles();
  const [fullscreen, setFullscreen] = React.useState(false);

  return (
    <>
      <TopBar />
      <MenuBar setFullscreen={setFullscreen} />
      <Grid container className={classes.bible}>
        <Grid item xs={12}>
          <Fullscreen
            enabled={fullscreen}
            onChange={fullscreen => setFullscreen(fullscreen)}
            className={classes.fullscreen}
          >
            <Bible />
          </Fullscreen>
        </Grid>
      </Grid>
    </>
  );
};

export default ReadBible;
