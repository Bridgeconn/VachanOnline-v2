import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ReactPlayer from "react-player";
import { LIGHTGREY } from "../../store/colorCode";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    padding: "10px 20px",
  },
  descContainer: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  video: {
    padding: 0,
    display: "inline-block",
    verticalAlign: "top",
    width: "100%",
    marginBlockStart: 10,
    maxHeight: "200vh",
    boxSizing: "content-box",
    boxShadow: "0 2px 6px 0 hsl(0deg 0% 47% / 60%)",
  },
  player: {
    maxHeight: "calc(100vh - 150px)",
    [theme.breakpoints.down("sm")]: {
      maxHeight: 240,
    },
  },
  description: {
    padding: "10px 10px 10px 20px",
    fontSize: "1.1rem",
    whiteSpace: "pre-wrap",
  },
  heading: {
    display: "flex",
    border: "1px solid " + LIGHTGREY,
    padding: "10px 20px",
    boxShadow: theme.shadows[2],
  },
  descTitle: {
    fontSize: "1.2rem",
    width: "100%",
  },
}));
const BigTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#ffd580",
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[4],
    border: "1px solid orange",
    fontSize: 16,
  },
}))(Tooltip);

const VideoCard = ({ video, playing, setPlaying }) => {
  const classes = useStyles();
  const [showDesc, setShowDesc] = useState(false);

  const handleChange = () => {
    setShowDesc((prev) => !prev);
  };
  return (
    <Card className={classes.video} key={video["title"]}>
      <CardContent className={classes.descContainer}>
        <Typography className={classes.titleContainer} variant="h6">
          {video["title"]}
        </Typography>
        <ReactPlayer
          playing={playing === video["url"]}
          onPlay={() => setPlaying(video["url"])}
          url={video["url"]}
          controls={true}
          width="100%"
          className={classes.player}
        />
        <BigTooltip title={showDesc ? "Hide description" : "Show description"}>
          <div onClick={handleChange} className={classes.heading}>
            <Typography className={classes.descTitle}>Description</Typography>
            {showDesc ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
        </BigTooltip>
        <Collapse in={showDesc}>
          <Typography className={classes.description}>
            {video["description"]}
          </Typography>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
