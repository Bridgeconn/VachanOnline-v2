import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ReactPlayer from "react-player";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  audioBible: {
    display: "block",
    padding: 16,
    fontSize: "1.1rem",
    borderBottom: "1px solid #b7b7b785",
    "&:last-child": {
      borderBottom: "none",
      paddingBottom: 0,
    },
  },
  cardRoot: {
    border: "1px solid #dddddd",
    boxShadow: "none",
    marginRight: 4,
  },
  cardHeader: {
    textTransform: "capitalize",
    borderBottom: "1px solid #b7b7b785",
    minHeight: 50,
    padding: "0 15px",
  },
  cardContent: {
    padding: 0,
  },
  player: {
    marginTop: 5,
    "& audio": {
      outlineWidth: 0,
    },
  },
}));
const Player = (props) => {
  const classes = useStyles();
  const { audios, bookCode, chapter, languageCode } = props;
  const [playing, setPlaying] = React.useState("");

  React.useEffect(() => {
    setPlaying("");
  }, [bookCode, chapter, languageCode]);
  return (
    <List>
      {audios?.map((audio, i) => {
        const { url, format, books, name, sourceId } = audio;
        const audioUrl = url + bookCode + "/" + chapter + "." + format;
        return books.hasOwnProperty(bookCode) ? (
          <Card className={classes.cardRoot} key={i}>
            <CardHeader title={name} className={classes.cardHeader} />
            <CardContent className={classes.cardContent}>
              <ListItem key={name} value={name} className={classes.audioBible}>
                <ReactPlayer
                  playing={playing === sourceId}
                  url={audioUrl}
                  onPlay={() => setPlaying(sourceId)}
                  controls
                  width="100%"
                  height="50px"
                  className={classes.player}
                  config={{
                    file: {
                      attributes: {
                        controlsList: "nodownload",
                      },
                    },
                  }}
                />
              </ListItem>
            </CardContent>
          </Card>
        ) : (
          ""
        );
      })}
    </List>
  );
};
export default Player;
