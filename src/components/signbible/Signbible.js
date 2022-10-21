import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Close from "../common/Close";
import Box from "@material-ui/core/Box";
import ReactPlayer from "react-player";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "absolute",
    top: 82,
    bottom: 0,
  },
  container: {
    top: 52,
    bottom: 0,
    overflow: "scroll",
    position: "absolute",
    width: "100%",
    padding: "12px 4px 0 15px",
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(0,0,0,.4) #eeeeee95",
    "&::-webkit-scrollbar": {
      width: "0.45em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.4)",
      outline: "1px solid slategrey",
    },
  },
  heading: {
    borderBottom: "1px solid #f1ecec",
    display: "flex",
    width: "100%",
    paddingBottom: 12,
    paddingLeft: 35,
    marginBottom: 20,
    minHeight: 51,
  },
  video: {
    padding: 0,
    margin: "0 2% 2% 0",
    display: "inline-block",
    verticalAlign: "top",
  },
  title: {
    paddingTop: 4,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  closeButton: {
    marginRight: 15,
    marginTop: 7,
  },
  message: {
    paddingLeft: 20,
  },
}));
const SignBible = (props) => {
  const classes = useStyles();
  let { bookCode, book, chapter, signBible } = props;
  const [message, setMessage] = useState("");
  const [videos, setVideos] = useState();
  const [playing, setPlaying] = useState("");

  useEffect(() => {
    if (signBible && bookCode) {
      let books = signBible["books"];
      if (
        books &&
        books.hasOwnProperty(bookCode) &&
        books[bookCode].hasOwnProperty(chapter)
      ) {
        setVideos(books[bookCode][chapter]);
        setMessage("");
      } else {
        setVideos();
        setMessage(`No sign bible available for ${book} ${chapter}`);
      }
      setPlaying();
    }
  }, [signBible, bookCode, chapter, book]);

  return (
    <div className={classes.root}>
      <Box className={classes.heading}>
        <Box flexGrow={1}>
          <Typography variant="h6">Sign Bible (ISLV)</Typography>
        </Box>
        <Box flexGrow={1}>
          <Typography variant="h6">
            {book} {chapter}
          </Typography>
        </Box>
        <Box>
          <Close className={classes.closeButton} />
        </Box>
      </Box>
      <div className={classes.container}>
        <>
          {videos &&
            videos?.map((video, i) => {
              return (
                <Card className={classes.video} key={i}>
                  <ReactPlayer
                    playing={playing === video["url"]}
                    onPlay={() => setPlaying(video["url"])}
                    url={video["url"]}
                    controls={true}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      title={video["title"]}
                      className={classes.title}
                    >
                      {video["title"]}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          {message && <h5 className={classes.message}>{message}</h5>}
        </>
      </div>
    </div>
  );
};
export default SignBible;
