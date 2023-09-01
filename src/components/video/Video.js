import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ModalVideo from "react-modal-video";
import Close from "../common/Close";
import Box from "@material-ui/core/Box";
import Select from "react-select";
import { capitalize, getShortBook } from "../common/utility";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import BookCombo from "../common/BookCombo";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "absolute",
    top: 82,
    bottom: 0,
    [theme.breakpoints.down("sm")]: {
      top: 60,
    },
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
    [theme.breakpoints.down("sm")]: {
      top: 60,
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
    [theme.breakpoints.down("sm")]: {
      height: 60,
      paddingBottom: 0,
      alignItems: "center",
    },
  },
  video: {
    width: "48%",
    padding: 0,
    margin: "0 2% 2% 0",
    display: "inline-block",
    verticalAlign: "top",
    [theme.breakpoints.down("sm")]: {
      width: "97%",
      marginBottom: 25,
    },
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
  select: {
    width: 200,
    [theme.breakpoints.down("sm")]: {
      width: 130,
    },
  },
  message: {
    paddingLeft: 20,
  },
  selectBox: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      alignItems: "center",
    },
  },
}));
const Video = (props) => {
  const classes = useStyles();
  let {
    video,
    bookCode,
    books,
    versionBooks,
    setValue,
    languageCode,
    mobileView,
    panel1,
  } = props;
  const { chapter } = panel1;

  const [message, setMessage] = React.useState("");
  const [videoId, setVideoId] = React.useState("");
  const [videos, setVideos] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [vidLink, setVidLink] = React.useState("");
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");

  const getVideoData = (url) => {
    const vimeo = "https://vimeo.com/";
    const youtu = "https://youtu.be/";
    const vimeoUrl = process.env.REACT_APP_VIDEO_URL + "vimeo/";
    const youtubeUrl = "https://img.youtube.com/vi/";
    const source = url.includes("vimeo") ? "vimeo" : "youtube";
    const id = source === "vimeo" ? url.split(vimeo)[1] : url.split(youtu)[1];
    const thumbUrl = source === "vimeo" ? vimeoUrl : youtubeUrl;
    const imageUrl = thumbUrl.includes("vimeo")
      ? "https://vumbnail.com/" + id + ".jpg"
      : thumbUrl + id + "/0.jpg";
    return { source, id, imageUrl };
  };
  const handleVideoClick = (source, id) => {
    setVidLink(source);
    setVideoId(id);
    setIsOpen(true);
  };

  useEffect(() => {
    //Get list of languages
    if (video) {
      const languageList = video
        .map((item) => {
          const lang = capitalize(item?.language?.name);
          return { value: item?.language?.code, label: lang };
        })
        .sort((a, b) => a.value.localeCompare(b.value));
      setLanguages(languageList);
    } else {
      setMessage("No Videos available");
    }
  }, [video]);
  React.useEffect(() => {
    if (languages.length) {
      let lang = video?.find((l) => l?.language?.code === languageCode);
      //If videos not available for main panel language set first language
      if (lang === undefined) {
        setLanguage(languages[0]);
      } else {
        const name = capitalize(lang?.language?.name);
        setLanguage({ value: lang?.language?.code, label: name });
      }
    }
  }, [languageCode, languages, video]);
  //If language or book changed update videos and message to show
  React.useEffect(() => {
    if (language) {
      const lang = video.find((obj) => obj?.language?.code === language?.value);
      if (lang?.books?.hasOwnProperty(bookCode)) {
        setVideos(lang.books[bookCode]);
        setMessage("");
      } else {
        setVideos([]);
        const book = getShortBook(books, language.value, bookCode);
        setMessage(`No videos available in ${language?.label} for ${book}`);
      }
    }
  }, [video, bookCode, language, books]);
  return (
    <div className={classes.root}>
      <Box className={classes.heading}>
        {mobileView ? null : (
          <Box flexGrow={1}>
            <Typography variant="h6">Videos</Typography>{" "}
          </Box>
        )}
        <Box flexGrow={1} className={classes.selectBox}>
          {languages && languages?.length !== 0 && (
            <Select
              className={classes.select}
              value={language}
              onChange={(data) => setLanguage(data)}
              options={languages}
            />
          )}
          {mobileView && bookCode ? (
            <BookCombo
              bookCode={bookCode}
              bookList={versionBooks[language.value]}
              chapter={chapter}
              setValue={setValue}
              minimal={true}
              screen={"video"}
            />
          ) : null}
        </Box>
        <Box>
          <Close className={classes.closeButton} />
        </Box>
      </Box>
      <div className={classes.container}>
        {videos?.length > 0 && (
          <div>
            <ModalVideo
              channel={vidLink}
              isOpen={isOpen}
              videoId={videoId}
              onClose={() => setIsOpen(false)}
            />
            {videos.map((video, i) => {
              const { source, id, imageUrl } = getVideoData(video.url);
              return (
                <Card
                  key={i}
                  onClick={() => {
                    handleVideoClick(source, id);
                  }}
                  className={classes.video}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Video"
                      height="244"
                      className={classes.media}
                      image={imageUrl}
                      title="Video"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        title={video.title}
                        className={classes.title}
                      >
                        {video.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </div>
        )}
        {message && <h5 className={classes.message}>{message}</h5>}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    bookCode: state.local.panel1.bookCode,
    versionBooks: state.local.versionBooks,
    mobileView: state.local.mobileView,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE1, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Video);
