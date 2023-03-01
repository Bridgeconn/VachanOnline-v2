import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Select from "react-select";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import ReactPlayer from "react-player";
import Close from "../common/Close";
import Box from "@material-ui/core/Box";
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
    [theme.breakpoints.only("xs")]: {
      alignItems: "center",
    },
  },
  language: {
    fontSize: "1.1rem",
    textTransform: "capitalize",
  },
  cardRoot: {
    border: "1px solid #dddddd",
    boxShadow: "none",
    marginRight: 4,
  },
  cardHeader: {
    textTransform: "capitalize",
    borderBottom: "1px solid #b7b7b785",
    backgroundColor: "#efefef",
    minHeight: 50,
    padding: "0 15px",
  },
  cardContent: {
    padding: 0,
  },
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
}));
const Audio = (props) => {
  const classes = useStyles();
  const {
    audioBible,
    bookCode,
    chapter,
    books,
    languageCode,
    mobileView,
    setValue,
    versionBooks,
  } = props;

  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");
  const [hasAudio, setHasAudio] = useState(false);
  const [audios, setAudios] = useState(null);
  const [playing, setPlaying] = useState("");
  const [book, setBook] = useState("");
  const [audioLangCode, setAudioLangCode] = useState("hin");
  useEffect(() => {
    if (languages.length) {
      let lang = audioBible?.find((l) => l?.language?.code === languageCode);
      //If audio bible not available for bible set first language
      if (lang === undefined) {
        setLanguage(languages[0]);
      } else {
        const name = capitalize(lang?.language?.name);
        setLanguage({ value: name, label: name });
      }
    }
  }, [languageCode, languages, audioBible, setLanguage]);
  useEffect(() => {
    //Get list of languages
    if (audioBible) {
      const languageList = audioBible
        ?.map((item) => {
          const lang = capitalize(item?.language?.name);
          return { value: lang, label: lang };
        })
        .sort((a, b) => a.value.localeCompare(b.value));
      setLanguages(languageList);
    }
  }, [audioBible]);
  useEffect(() => {
    if (language) {
      const lang = language?.value?.toLowerCase();
      const obj = audioBible?.find((obj) => obj?.language?.name === lang);
      setAudioLangCode(obj?.language?.code ? obj?.language?.code : "hin");
      setAudios(obj?.audioBibles);
      setBook(getShortBook(books, obj?.language?.code, bookCode));
      setHasAudio(obj.audioBibles?.findIndex((x) => x.books[bookCode]) !== -1);
    }
  }, [language, audioBible, bookCode, books]);
  useEffect(() => {
    setPlaying("");
  }, [bookCode, chapter, languageCode]);
  return (
    <div className={classes.root}>
      <Box className={classes.heading}>
        <Box flexGrow={1}>
          {mobileView && bookCode ? (
            <BookCombo
              bookCode={bookCode}
              bookList={versionBooks[audioLangCode]}
              chapter={chapter}
              setValue={setValue}
              minimal={true}
            />
          ) : (
            <Typography variant="h6">Audio Bibles</Typography>
          )}
        </Box>
        <Box flexGrow={1}>
          {languages && languages?.length !== 0 && (
            <Select
              className={classes.select}
              value={language}
              onChange={(data) => setLanguage(data)}
              options={languages}
            />
          )}
        </Box>
        <Box>
          <Close className={classes.closeButton} />
        </Box>
      </Box>
      <div className={classes.container}>
        {(audioBible?.length === 0 || audioBible?.success === false) && (
          <h5 className={classes.message}>No audio bibles available</h5>
        )}
        {hasAudio ? (
          <Card className={classes.cardRoot}>
            <CardHeader
              title={book + " " + chapter}
              className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
              <List>
                {audios?.map((audio) => {
                  const { url, format, books, name, sourceId } = audio;
                  const audioUrl =
                    url + bookCode + "/" + chapter + "." + format;
                  return books.hasOwnProperty(bookCode) ? (
                    <ListItem
                      key={name}
                      value={name}
                      className={classes.audioBible}
                    >
                      {name}
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
            </CardContent>
          </Card>
        ) : (
          <h5 className={classes.message}>
            Audio bible not available in {language.value} for this book
          </h5>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    mobileView: state.local.mobileView,
    versionBooks: state.local.versionBooks,
    versionSource: state.local.versionSource,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE1, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Audio);
