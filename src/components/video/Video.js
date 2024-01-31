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
import { capitalize, getBookbyCode, getShortBook } from "../common/utility";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import BookCombo from "../common/BookCombo";
import { useTranslation } from "react-i18next";
import { bibleBooks } from "../../store/bibleData";
import { BLACK } from "../../store/colorCode";
import Help from "../common/Help";

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
  box: {
    display: "flex",
    alignItems: "center",
  },
  helpIcon: {
    padding: "8px 12px 0",
    color: BLACK,
    marginTop: 5,
    fontSize: 21,
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
    chapterVideo,
    bookCode,
    books,
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
  const [videoBooks, setVideoBooks] = useState([]);

  const { t } = useTranslation();

  const getVideoData = (url) => {
    const vimeo = "https://vimeo.com/";
    const youtu = "https://youtu.be/";
    const vimeoUrl = "https://vumbnail.com/";
    const youtubeUrl = "https://img.youtube.com/vi/";
    const source = url.includes("vimeo") ? "vimeo" : "youtube";
    const id = source === "vimeo" ? url.split(vimeo)[1] : url.split(youtu)[1];
    const imageUrl =
      source === "vimeo" ? vimeoUrl + id + ".jpg" : youtubeUrl + id + "/0.jpg";
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
      setMessage(t("studyNoVideosAvailable1"));
    }
  }, [t, video]);
  React.useEffect(() => {
    //Mobile view set book combo bookList
    if (mobileView && language && language?.value) {
      let lang = video?.find((l) => l?.language?.code === language.value);
      const bookCodes = Object.keys(lang?.books);
      let bookArr = [];
      bibleBooks.forEach((bookObj) => {
        if (bookCodes.includes(bookObj?.abbreviation)) {
          let obj = {
            abbr: bookObj.abbreviation,
            book_code: bookObj.abbreviation,
            book_id: bookObj.bookId,
            long: bookObj.book,
            short: bookObj.book,
          };
          bookArr.push(obj);
        }
      });
      setVideoBooks(bookArr);
    }
  }, [language, video, mobileView]);
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
    const filterVideos = (videos) => {
      const languageData = chapterVideo[language?.value];
      const bookData = languageData ? languageData[bookCode] : [];
      const bookDataArr = bookData ? Object.values(bookData)?.flat() : [];
      const vids = videos.filter((vid) => {
        if (bookDataArr.includes(vid.url)) {
          // return true if in chapter but not in book
          return bookData[chapter]?.includes(vid.url) ? true : false;
        } else {
          //No chapter filter
          return true;
        }
      });
      return vids;
    };
    if (language) {
      const lang = video.find((obj) => obj?.language?.code === language?.value);
      let chapterAvail = true;
      if (chapterVideo[language?.value] !== undefined) {
        const avlChapters = chapterVideo[language?.value]?.[bookCode]
          ? Object.keys(chapterVideo[language?.value]?.[bookCode])
          : [];
        chapterAvail = avlChapters.includes(chapter.toString());
      }
      if (lang?.books?.hasOwnProperty(bookCode) && chapterAvail) {
        const _videos = lang.books[bookCode];
        setVideos(filterVideos(_videos));
        setMessage("");
      } else {
        setVideos([]);
        const book = getShortBook(books, language.value, bookCode);
        const ref = {
          language: language?.label,
          book: book ? book : getBookbyCode(bookCode)?.book,
          chapter: chapter,
        };
        setMessage(t("studyNoVideosAvailable", { ref }));
      }
    }
  }, [video, bookCode, language, books, chapterVideo, chapter, t]);
  return (
    <div className={classes.root}>
      <Box className={classes.heading}>
        {mobileView ? null : (
          <Box flexGrow={1}>
            <Typography variant="h6">{t("videosText")}</Typography>{" "}
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
              bookList={videoBooks}
              chapter={chapter}
              setValue={setValue}
              minimal={true}
              screen={"video"}
            />
          ) : null}
        </Box>
        <Box className={classes.box}>
          <Help iconStyle={classes.helpIcon} url={"videos"} />
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
    mobileView: state.local.mobileView,
    chapterVideo: state.local.chapterVideo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE1, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Video);
