import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import ReactPlayer from "react-player";
import NoteIcon from "@material-ui/icons/NoteOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import { NOTE } from "../../store/views";
import { API, CancelToken } from "../../store/api";
import GetChapterNotes from "../note/GetChapterNotes";
import * as color from "../../store/colorCode";
import { Typography } from "@material-ui/core";

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
    [`@media print`]: {
      fontSize: "1.2rem",
    },
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
  yellow: {
    backgroundColor: color.YELLOW,
  },
  green: {
    backgroundColor: color.GREEN,
  },
  cyan: {
    backgroundColor: color.CYAN,
  },
  pink: {
    backgroundColor: color.PINK,
  },
  orange: {
    backgroundColor: color.ORANGE,
  },
  [`@media print`]: {
    yellow: {
      backgroundColor: (props) =>
        props.printHighlights ? color.YELLOW : "unset",
    },
    green: {
      backgroundColor: (props) =>
        props.printHighlights ? color.GREEN : "unset",
    },
    cyan: {
      backgroundColor: (props) =>
        props.printHighlights ? color.CYAN : "unset",
    },
    pink: {
      backgroundColor: (props) =>
        props.printHighlights ? color.PINK : "unset",
    },
    orange: {
      backgroundColor: (props) =>
        props.printHighlights ? color.ORANGE : "unset",
    },
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
  noteIcon: {
    [`@media print`]: {
      display: (props) => (props.printNotes ? "inline-block" : "none"),
    },
  },
  bookRef: {
    display: "none",
    [`@media print`]: {
      textTransform: "capitalize",
      display: "block",
      textAlign: "center",
    },
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
  const [highlightVerses, setHighlightVerses] = React.useState([]);
  const [highlighMap, setHighlighMap] = React.useState();
  const cancelToken = React.useRef();

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
    playing,
    setMainValue,
    printRef,
    printNotes,
    printHighlights,
    versionBooks,
    versionSource,
  } = props;
  const styleProps = {
    padding: padding,
    singlePane: singlePane,
    printNotes: printNotes,
    printHighlights: printHighlights,
  };
  const classes = useStyles(styleProps);
  const [bookDisplay, setBookDisplay] = React.useState("");
  const bookList = versionBooks[versionSource[sourceId]];
  //new usfm json structure
  const getHeading = (contents) => {
    if (contents) {
      let data = contents.find((item) => Array.isArray(item));
      if (data) {
        for (let section of data) {
          if (
            Object.keys(section)[0].startsWith("s") &&
            typeof section[Object.keys(section)[0]][0] === "string"
          ) {
            return section[Object.keys(section)[0]][0];
          }
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  React.useEffect(() => {
    if (version !== "Loading...") {
      let language = version.split("-")[0];
      const sans = {
        asm: "Mukti",
        ben: "Mukti",
        guj: "Shruti",
        hin: "Noto Sans Devanagari",
        kan: "Tunga",
        mal: "sans-serif",
        mar: "Noto Sans Devanagari",
        pan: "Raavi",
        ory: "Kalinga",
        tam: "Latha",
        tel: "Gautami",
        urd: "Noto Sans Devanagari",
        eng: "Roboto,Noto Sans",
        nag: "Roboto,Noto Sans",
        har: "Noto Sans Devanagari",
        bil: "Noto Sans Devanagari",
      };
      const serif = {
        asm: "Nikosh",
        ben: "Nikosh",
        guj: "Rekha",
        hin: "Noto Serif Devanagari",
        kan: "Kedage",
        mal: "Noto Serif Malayalam",
        mar: "Noto Serif Devanagari",
        pan: "Gurbani Lipi",
        ory: "Baloo Bhaina2",
        tam: "Noto Serif Tamil",
        tel: "Noto Serif Telugu",
        urd: "Noto Serif Devanagari",
        eng: "Roboto Slab,Martel",
        nag: "Roboto Slab,Martel",
        har: "Noto Serif Devanagari",
        bil: "Noto Serif Devanagari",
      };
      setFont(fontFamily === "Sans" ? sans[language] : serif[language]);
    }
  }, [version, fontFamily]);
  const colorClasses = {
    a: classes.yellow,
    b: classes.green,
    c: classes.cyan,
    d: classes.pink,
    e: classes.orange,
  };
  React.useEffect(() => {
    if (highlights) {
      setHighlightVerses(
        highlights.map((a) => parseInt(a.toString().split(":")[0]))
      );
      //make verse to color map
      let map = {};
      highlights.forEach((highlight) => {
        let verse = highlight.toString().split(":");
        map[verse[0]] = verse[1] || "a";
      });
      setHighlighMap(map);
    }
  }, [highlights]);

  React.useEffect(() => {
    if (sourceId && bookCode && chapter) {
      //code to get chapter content if version(sourceId), book or chapter changed
      setIsLoading(true);
      setLoadingText("Loading");
      //Check if there are any previous pending requests
      if (typeof cancelToken.current != typeof undefined) {
        cancelToken.current.cancel("Operation canceled due to new request.");
      }
      //Save the cancel token for the current request
      cancelToken.current = CancelToken.source();
      API.get(`bibles/${sourceId}/books/${bookCode}/chapter/${chapter}`, {
        cancelToken: cancelToken.current.token,
      })
        .then(function (response) {
          setPrevious(response.data.previous);
          setNext(response.data.next);
          if (response.data.chapterContent === undefined) {
            setLoadingText("Book will be uploaded soon");
          } else {
            setLoadingText("");
            const isVerse = (content) => {
              return (
                typeof content === "object" &&
                content !== null &&
                "verseNumber" in content
              );
            };
            let contents = response.data.chapterContent.contents;
            setVerses(contents ? contents.filter(isVerse) : []);
            setChapterHeading(getHeading(contents));
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
    if (!isLoading && Object && Object.keys(next).length > 0) {
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
  React.useEffect(() => {
    setMainValue("playing", "");
  }, [sourceId, bookCode, chapter, setMainValue]);

  React.useEffect(() => {
    if (bookList) {
      let book = bookList.find((element) => element.book_code === bookCode);
      if (!book) {
        book = bookList[0];
      }
      setBookDisplay(book.short);
    }
  }, [bookList, bookCode, setValue]);
  const getPageMargins = () => {
    return `@page { margin: 20mm !important; }`;
  };

  return (
    <div
      className={classes.biblePanel}
      style={{
        fontFamily: font,
        fontSize: fontSize,
      }}
    >
      {!isLoading && loadingText !== "Book will be uploaded soon" ? (
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
            <div className={classes.text} ref={printRef}>
              <style>{getPageMargins()}</style>
              <Typography className={classes.bookRef} variant="h4">
                {version + " " + bookDisplay + " " + chapter}{" "}
              </Typography>
              {chapterHeading !== "" ? (
                <span className={classes.sectionHeading}>{chapterHeading}</span>
              ) : (
                ""
              )}
              {verses.map((item) => {
                const verse = parseInt(item.verseNumber);
                const verseClass =
                  selectedVerses.indexOf(verse) > -1
                    ? `${classes.verseText} ${classes.selectedVerse}`
                    : highlightVerses.indexOf(verse) > -1
                    ? `${classes.verseText} ${colorClasses[highlighMap[verse]]}`
                    : `${classes.verseText}`;
                const verseNumberClass =
                  verse === 1
                    ? `${classes.verseNumber} ${classes.firstVerse}`
                    : `${classes.verseNumber}`;
                const verseNo = verse === 1 ? chapter : item.verseNumber;
                const sectionHeading = getHeading(item.contents);
                return (
                  <span key={item.verseNumber}>
                    <span className={lineViewClass}>
                      <span
                        onClick={handleVerseClick}
                        data-verse={item.verseNumber}
                      >
                        <span className={verseNumberClass}>{verseNo}</span>
                        <span className={verseClass}> {item.verseText}</span>
                      </span>
                      {/*If verse has note then show note icon to open notes pane */}
                      {notes && notes.includes(verse) ? (
                        <NoteIcon
                          className={classes.noteIcon}
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
              playing={playing === paneNo}
              onPlay={() => {
                setMainValue("playing", paneNo);
              }}
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

      {Object.values(previous).length !== 0 ? (
        <Tooltip title="Previous Chapter">
          <div
            color="default"
            aria-label="Add"
            className={classes.prevChapter}
            onClick={prevClick}
          >
            <i
              className="material-icons material"
              style={{
                fontSize: "38px",
                color: "#555555",
                opacity: 0.7,
              }}
            >
              navigate_before
            </i>
          </div>
        </Tooltip>
      ) : (
        ""
      )}
      {Object.values(next).length !== 0 ? (
        <Tooltip title="Next Chapter">
          <div
            color="default"
            aria-label="Add"
            className={classes.nextChapter}
            onClick={nextClick}
          >
            <i
              className="material-icons material"
              style={{
                fontSize: "38px",
                color: "#555555",
                opacity: 0.7,
              }}
            >
              keyboard_arrow_right
            </i>
          </div>
        </Tooltip>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    parallelScroll: state.local.parallelScroll,
    userDetails: state.local.userDetails,
    playing: state.local.playing,
    versionBooks: state.local.versionBooks,
    versionSource: state.local.versionSource,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    syncPanel: (from, to) => {
      dispatch({ type: actions.SYNCPANEL, from: from, to: to });
    },
    setParallelView: (value) =>
      dispatch({
        type: actions.SETVALUE,
        name: "parallelView",
        value: value,
      }),
    setMainValue: (name, value) =>
      dispatch({ type: actions.SETVALUE, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Bible);
