import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import ReactPlayer from "react-player";
import NoteIcon from "@material-ui/icons/NoteOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import { NOTE } from "../../store/views";
import API from "../../store/api";
import GetChapterNotes from "../note/GetChapterNotes";

const useStyles = makeStyles((theme) => ({
  biblePanel: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    "& p": {
      textAlign: "justify",
      color: "#464545",
      marginBottom: 5,
    },
  },
  bibleReadingPane: {
    position: "absolute",
    right: 0,
    left: 44,
    paddingRight: (props) =>
      props.singlePane || props.padding > 60 ? props.padding : 60,
    paddingLeft: (props) =>
      props.singlePane || props.padding > 20 ? props.padding : 20,
    textAlign: "justify",
    paddingTop: 20,
    height: "100%",
    overflow: "scroll",
    lineHeight: "2em",
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
  audio: {
    height: "calc(100% - 55px)",
  },
  prevChapter: {
    position: "absolute",
    top: "45%",
    left: (props) =>
      props.singlePane || props.padding > 40 ? props.padding / 2 : 20,
    cursor: "pointer",
  },
  nextChapter: {
    position: "absolute",
    top: "45%",
    right: (props) =>
      props.singlePane || props.padding > 40 ? props.padding / 2 : 20,
    cursor: "pointer",
  },
  loading: {
    padding: 20,
  },
  player: {
    position: "absolute",
    bottom: "16px",
    left: "2%",
  },
  text: {
    paddingBottom: 30,
  },
  verseText: {
    padding: "4px 0 2px 4px",
  },
  verseNumber: {
    fontWeight: 600,
    paddingLeft: 6,
    bottom: 3,
    position: "relative",
    color: "#262662",
  },
  sectionHeading: {
    fontSize: "1.3em",
    display: "block",
    paddingTop: 12,
    color: "#3E4095",
  },
  highlight: {
    backgroundColor: "#feff3b",
  },
  selectedVerse: {
    backgroundColor: "#d9e8ef",
  },
  lineView: {
    display: "table",
  },
  firstVerse: {
    fontSize: "1.8em",
    bottom: -2,
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const Bible = (props) => {
  const [verses, setVerses] = React.useState([]);
  const [chapterHeading, setChapterHeading] = React.useState("");
  const [loadingText, setLoadingText] = React.useState("Loading");
  const [isLoading, setIsLoading] = React.useState(true);
  const [previous, setPrevious] = React.useState({});
  const [next, setNext] = React.useState({});
  const [audioUrl, setAudioUrl] = React.useState("");
  const [padding, setPadding] = React.useState(
    window.innerWidth > 1200 ? (window.innerWidth - 1200) / 2 : 20
  );
  const [notes, setNotes] = React.useState([]);
  const [fetchData, setFetchData] = React.useState();
  const [font, setFont] = React.useState("");

  let {
    sourceId,
    bookCode,
    chapter,
    version,
    fontFamily,
    audio,
    audioBible,
    setValue,
    scroll,
    paneNo,
    parallelScroll,
    fontSize,
    lineView,
    singlePane,
    selectedVerses,
    setSelectedVerses,
    highlights,
    userDetails,
    syncPanel,
    setParallelView,
  } = props;
  const styleProps = { padding: padding, singlePane: singlePane };
  const classes = useStyles(styleProps);

  const getHeading = (metadata) => {
    if (metadata) {
      for (let value of metadata) {
        if (value.hasOwnProperty("section")) {
          return value.section.text;
        }
      }
    }
  };
  React.useEffect(() => {
    if (version !== "Loading...") {
      let language = version.split("-")[0];
      console.log(language);
      const sans = {
        assamese: "Mukti",
        bengali: "Mukti",
        gujarati: "Shruti",
        hindi: "Kruti Dev",
        kannada: "Tunga",
        malayalam: "Kartika",
        marathi: "Kruti Dev",
        punjabi: "Raavi",
        odia: "Kalinga",
        tamil: "Latha",
        telugu: "Gautami",
        urdu: "Kruti Dev",
        english: "Roboto,Noto Sans",
      };
      const serif = {
        assamese: "Nikosh",
        bengali: "Nikosh",
        gujarati: "Rekha",
        hindi: "Noto Serif Devanagari",
        kannada: "Kedage",
        malayalam: "Noto Serif Malayalam",
        marathi: "Noto Serif Devanagari",
        punjabi: "Gurbani Lipi",
        odia: "Baloo Bhaina2",
        tamil: "Noto Serif Tamil",
        telugu: "Noto Serif Telugu",
        urdu: "Noto Serif Devanagari",
        english: "Roboto Slab,Martel",
      };
      console.log(fontFamily === "Sans" ? sans[language] : serif[language]);
      setFont(fontFamily === "Sans" ? sans[language] : serif[language]);
    }
  }, [version, fontFamily]);
  React.useEffect(() => {
    if (sourceId && bookCode && chapter) {
      //code to get chapter content if version(sourceId), book or chapter changed
      setIsLoading(true);
      setLoadingText("Loading");
      API.get(
        "bibles/" + sourceId + "/books/" + bookCode + "/chapter/" + chapter
      )
        .then(function (response) {
          setPrevious(response.data.previous);
          setNext(response.data.next);
          if (response.data.chapterContent === undefined) {
            setLoadingText("Book not uploaded");
          } else {
            setVerses(response.data.chapterContent.verses);
            setChapterHeading(
              getHeading(response.data.chapterContent.metadata)
            );
          }
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [sourceId, bookCode, chapter]);

  //if audio bible show icon
  React.useEffect(() => {
    if (audio) {
      setAudioUrl(
        audioBible.url + bookCode + "/" + chapter + "." + audioBible.format
      );
    }
  }, [audio, audioBible, bookCode, chapter]);
  //Function to load previous chapter
  const prevClick = () => {
    if (!isLoading && Object.keys(previous).length > 0) {
      setValue("chapter", previous.chapterId);
      setValue("bookCode", previous.bibleBookCode);
      setValue("versesSelected", []);
      if (parallelScroll && paneNo) {
        syncPanel("panel" + paneNo, "panel" + ((parseInt(paneNo) % 2) + 1));
      }
    }
  };
  //Function to load next chapter
  const nextClick = () => {
    if (!isLoading && Object.keys(next).length > 0) {
      setValue("chapter", next.chapterId);
      setValue("bookCode", next.bibleBookCode);
      setValue("versesSelected", []);
      if (parallelScroll && paneNo) {
        syncPanel("panel" + paneNo, "panel" + ((parseInt(paneNo) % 2) + 1));
      }
    }
  };
  const scrollText = () => {
    if (scroll) {
      scroll(paneNo, parallelScroll);
    }
  };
  const handleVerseClick = (event) => {
    event.preventDefault();
    if (Object.keys(userDetails).length !== 0 && userDetails.uid !== null) {
      let verseId = event.currentTarget.getAttribute("data-verse");
      let verses =
        selectedVerses.indexOf(parseInt(verseId)) > -1
          ? selectedVerses.filter((a) => parseInt(a) !== parseInt(verseId))
          : selectedVerses.concat([parseInt(verseId)]);
      setSelectedVerses(verses);
      setValue("versesSelected", verses);
    }
  };
  React.useEffect(() => {
    function handleResize() {
      let width = window.innerWidth;
      if (singlePane && width > 1200) {
        setPadding((width - 1200) / 2);
      } else {
        setPadding(20);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [singlePane]);
  React.useEffect(() => {
    //If user Logged in fetch data using GetChapterNotes
    if (
      userDetails.uid !== null &&
      sourceId !== "" &&
      bookCode !== "" &&
      chapter !== ""
    ) {
      setFetchData(
        <GetChapterNotes
          uid={userDetails.uid}
          sourceId={sourceId}
          bookCode={bookCode}
          chapter={chapter}
          setNotes={setNotes}
        />
      );
    } else {
      setNotes([]);
    }
  }, [bookCode, chapter, sourceId, userDetails]);
  const lineViewClass = lineView ? classes.lineView : "";
  return (
    <div
      className={classes.biblePanel}
      style={{
        fontFamily: font,
        fontSize: fontSize,
      }}
    >
      {!isLoading && loadingText !== "Book not uploaded" ? (
        <div>
          {fetchData}
          <div
            onScroll={() => {
              scrollText();
            }}
            ref={props.ref1}
            className={
              audio
                ? `${classes.bibleReadingPane} ${classes.audio}`
                : classes.bibleReadingPane
            }
          >
            <div className={classes.text}>
              {chapterHeading !== "" ? (
                <span className={classes.sectionHeading}>{chapterHeading}</span>
              ) : (
                ""
              )}
              {verses.map((item) => {
                const verseClass =
                  selectedVerses.indexOf(parseInt(item.number)) > -1
                    ? `${classes.verseText} ${classes.selectedVerse}`
                    : highlights.indexOf(parseInt(item.number)) > -1
                    ? `${classes.verseText} ${classes.highlight}`
                    : `${classes.verseText}`;
                const verseNumberClass =
                  parseInt(item.number) === 1
                    ? `${classes.verseNumber} ${classes.firstVerse}`
                    : `${classes.verseNumber}`;
                const verseNo =
                  parseInt(item.number) === 1 ? chapter : item.number;
                const sectionHeading = getHeading(item.metadata);
                return (
                  <span key={item.number}>
                    <span className={lineViewClass}>
                      <span onClick={handleVerseClick} data-verse={item.number}>
                        <span className={verseNumberClass}>{verseNo}</span>
                        <span className={verseClass}> {item.text}</span>
                      </span>
                      {/*If verse has note then show note icon to open notes pane */}
                      {notes && notes.includes(parseInt(verseNo)) ? (
                        <NoteIcon
                          fontSize="small"
                          color="disabled"
                          onClick={() => setParallelView(NOTE)}
                        />
                      ) : (
                        ""
                      )}
                    </span>
                    {sectionHeading && sectionHeading !== "" ? (
                      <span className={classes.sectionHeading}>
                        {sectionHeading}
                      </span>
                    ) : (
                      ""
                    )}
                  </span>
                );
              })}
            </div>
          </div>
          {audio ? (
            <ReactPlayer
              url={audioUrl}
              controls
              width="96%"
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
          ) : (
            ""
          )}
        </div>
      ) : (
        <h3 className={classes.loading}>{loadingText}</h3>
      )}
      <Tooltip title="Previous Chapter">
        <div
          color="default"
          aria-label="Add"
          className={classes.prevChapter}
          onClick={prevClick}
        >
          <i
            className="material-icons material"
            style={{ fontSize: "38px", color: "#555555", opacity: 0.7 }}
          >
            navigate_before
          </i>
        </div>
      </Tooltip>
      <Tooltip title="Next Chapter">
        <div
          color="default"
          aria-label="Add"
          className={classes.nextChapter}
          onClick={nextClick}
        >
          <i
            className="material-icons material"
            style={{ fontSize: "38px", color: "#555555", opacity: 0.7 }}
          >
            keyboard_arrow_right
          </i>
        </div>
      </Tooltip>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    parallelScroll: state.local.parallelScroll,
    userDetails: state.local.userDetails,
    setParallelView: state.local.setParallelView,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    syncPanel: (from, to) => {
      dispatch({ type: actions.SYNCPANEL, from: from, to: to });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Bible);
