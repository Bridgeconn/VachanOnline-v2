import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ModalVideo from "react-modal-video";
import Close from "../common/Close";
import Box from "@mui/material/Box";
import Select from "react-select";
import { capitalize, getBookbyCode, getShortBook } from "../common/utility";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import BookCombo from "../common/BookCombo";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { bibleBooks } from "../../store/bibleData";
import { BLACK } from "../../store/colorCode";
import Help from "../common/Help";
import { styled } from "@mui/system";
import MetaTags from "../common/MetaTags";

const StyledSelect = styled(Select)(({ theme }) => ({
  width: 200,
  [theme.breakpoints.down("md")]: {
    width: 130,
  },
}));

const Video = (props) => {
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
  const theme = useTheme();

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
  const bookRef = getShortBook(books, language.value, bookCode);
  return (
    <>
      <MetaTags
        title={`${
          bookRef ? bookRef : getBookbyCode(bookCode)?.book
        } ${chapter} - Videos`}
        description={`bible videos`}
      />
      <Box
        sx={{
          width: "100%",
          position: "absolute",
          top: { lg: 82, md: 71, xs: 60 },
          bottom: 0,
        }}
      >
        <Box
          sx={{
            borderBottom: "1px solid #f1ecec",
            display: "flex",
            width: "100%",
            paddingBottom: 0.96,
            paddingLeft: 4.375,
            marginBottom: 2.5,
            minHeight: 51,
            [theme.breakpoints.down("md")]: {
              height: 60,
              paddingBottom: 0,
              alignItems: "center",
            },
          }}
        >
          {mobileView ? null : (
            <Box flexGrow={1}>
              <Typography variant="h6">{t("videosText")}</Typography>{" "}
            </Box>
          )}
          <Box
            flexGrow={1}
            sx={{
              [theme.breakpoints.down("md")]: {
                display: "flex",
                alignItems: "center",
              },
            }}
          >
            {languages && languages?.length !== 0 && (
              <StyledSelect
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Help
              iconStyle={{
                padding: "1px 1.5px 0",
                color: BLACK,
                marginTop: 0.275,
                fontSize: 23,
              }}
              url={"videos"}
            />
            <Close sx={{ marginRight: 1.875, marginTop: 0.875 }} />
          </Box>
        </Box>
        <Box
          sx={{
            top: 52,
            bottom: 0,
            overflow: "scroll",
            position: "absolute",
            width: "100%",
            padding: "12px 0.7px 0 13px",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0,0,0,.4) #eeeeee95",
            "&::-webkit-scrollbar": {
              width: "0.45em",
            },
            "&::-webkit-scrollbar-track": {
              WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.4)",
              outline: "1px solid slategrey",
            },
            [theme.breakpoints.down("md")]: {
              top: 60,
            },
          }}
        >
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
                    sx={{
                      width: "48%",
                      padding: 0,
                      margin: "0 2% 2% 0",
                      display: "inline-block",
                      verticalAlign: "top",
                      [theme.breakpoints.down("md")]: {
                        width: "97%",
                        marginBottom: 3.125,
                      },
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Video"
                        height="244"
                        image={imageUrl}
                        title="Video"
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          title={video.title}
                          sx={{
                            paddingTop: 0.5,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
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
          {message && <h5 sx={{ paddingLeft: 3.5 }}>{message}</h5>}
        </Box>
      </Box>
    </>
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
