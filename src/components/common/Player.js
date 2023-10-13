import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ReactPlayer from "react-player";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";

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
  player: {
    marginTop: 5,
    "& audio": {
      outlineWidth: 0,
    },
  },
  gap: {
    margin: "auto",
    padding: "10px 0",
  },
  container: {
    display: "flex",
  },
}));
const Player = (props) => {
  const classes = useStyles();
  const { audios, bookCode, chapter, languageCode, audioBooks, isMobile } =
    props;
  const [playing, setPlaying] = React.useState("");
  const location = useLocation();
  const path = location?.pathname;

  React.useEffect(() => {
    setPlaying("");
  }, [bookCode, chapter, languageCode]);
  const bookObj =
    audioBooks && audioBooks?.find((el) => el.book_code === bookCode);
  return (
    <List>
      {audios?.map((audio) => {
        const { url, format, books, name, sourceId } = audio;
        const audioUrl = url + bookCode + "/" + chapter + "." + format;
        let nameMob = name.split("Audio")[0];
        return books.hasOwnProperty(bookCode) ? (
          <ListItem key={name} value={name} className={classes.audioBible}>
            {path.startsWith("/audiobible") ? "" : name}
            {path.startsWith("/audiobible") ? (
              <div className={classes.container}>
                <Typography variant="h5" className={classes.gap}>
                  {isMobile ? nameMob : name}
                </Typography>
                <Typography variant="h5" className={classes.gap}>
                  {bookObj?.short} {chapter}
                </Typography>
              </div>
            ) : (
              ""
            )}
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
        ) : (
          ""
        );
      })}
    </List>
  );
};
export default Player;
