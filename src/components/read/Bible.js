import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import ReactPlayer from "react-player";
import NoteIcon from "@material-ui/icons/NoteOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import { NOTE } from "../../store/views";
import { API, CancelToken } from "../../store/api";
import GetChapterNotes from "../note/GetChapterNotes";
import * as color from "../../store/colorCode";
import {
  Button,
  Divider,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useFirebase } from "react-redux-firebase";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

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
    [theme.breakpoints.up("sm")]: {
      paddingRight: (props) => (props.padding > 40 ? props.padding : 40),
      paddingLeft: (props) => (props.padding > 40 ? props.padding : 40),
    },
    [theme.breakpoints.only("xs")]: {
      paddingRight: 20,
      paddingLeft: 20,
    },
  },
  prevChapter: {
    position: "absolute",
    top: "45%",
    cursor: "pointer",
    boxShadow: "rgb(0 0 0 / 50%) 0px 3px 10px 0px",
    borderRadius: "50%",
    backgroundColor: "rgb(255, 255, 255)",
    border: "1px white",
    padding: 7,
    [theme.breakpoints.up("sm")]: {
      left: (props) => (props.padding > 40 ? props.padding / 2 : 20),
    },
    [theme.breakpoints.only("xs")]: {
      left: 10,
    },
  },
  nextChapter: {
    position: "absolute",
    top: "45%",
    cursor: "pointer",
    boxShadow: "rgb(0 0 0 / 50%) 0px 3px 10px 0px",
    borderRadius: "50%",
    backgroundColor: "rgb(255, 255, 255)",
    border: "1px white",
    padding: 7,
    [theme.breakpoints.up("sm")]: {
      right: (props) => (props.padding > 40 ? props.padding / 2 : 20),
    },
    [theme.breakpoints.only("xs")]: {
      right: 10,
    },
  },
  loading: {
    padding: 20,
  },
  player: {
    position: "sticky",
    bottom: "10px",
    left: "2%",
    [theme.breakpoints.only("xs")]: {
      bottom: (props) => props.audioBottom,
    },
  },
  text: {
    paddingBottom: 30,
    marginBottom: 20,
    textAlign: "justify",
    [`@media print`]: {
      fontSize: "1.2rem",
    },
    maxWidth: "1366px",
    [theme.breakpoints.up("sm")]: {
      boxShadow: "0 2px 6px 0 hsl(0deg 0% 47% / 60%)",
    },
    [theme.breakpoints.only("xs")]: {
      marginBottom: (props) =>
        props.singlePane || props?.paneNo === 2 ? 40 : 0,
    },
    padding: "0 25px",
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
    [`@media print`]: {
      backgroundColor: "unset",
    },
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
  footNotes: {
    display: "none",
    [`@media print`]: {
      display: (props) => (props.printNotes ? "block" : "none"),
      marginTop: 200,
    },
  },
  underline: {
    color: "grey",
    textDecoration: "underline",
  },
  noteTitle: {
    paddingBottom: 20,
  },
  noteList: {
    paddingTop: 20,
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
  const [noteText, setNoteText] = React.useState([]);
  const [noteTextBody, setNoteTextBody] = React.useState("");
  const [fetchData, setFetchData] = React.useState();
  const [font, setFont] = React.useState("");
  const [highlightVerses, setHighlightVerses] = React.useState([]);
  const [highlighMap, setHighlighMap] = React.useState();
  const cancelToken = React.useRef();
  const firebase = useFirebase();
  const [open, setOpen] = React.useState(false);

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
    mobileView,
    versesSelected,
  } = props;
  const audioBottom = selectedVerses?.length > 0 ? "3.5rem" : "0.5rem";
  const styleProps = {
    padding: padding,
    singlePane: singlePane,
    printNotes: printNotes,
    printHighlights: printHighlights,
    paneNo: paneNo,
    audioBottom: audioBottom,
  };
  const classes = useStyles(styleProps);
  const [bookDisplay, setBookDisplay] = React.useState("");
  const bookList = versionBooks[versionSource[sourceId]];
  const [previousBook, setPreviousBook] = React.useState("");
  const [nextBook, setNextBook] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const [noteReference, setNoteReference] = React.useState({});
  const [alertMessage, setAlertMessage] = React.useState(false);
  const [editObject, setEditObject] = React.useState({});
  const [edit, setEdit] = React.useState(false);
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
  const notesx = useSelector(
    ({ firebase: { data } }) =>
      data.users &&
      data.users[userDetails.uid] &&
      data.users[userDetails.uid].notes
  );
  const saveNote = () => {
    //if no verse selected, show alert
    if (!versesSelected?.length) {
      setAlert(true);
      setAlertMessage("Please select a verse");
      return;
    }
    if (noteTextBody === "") {
      setAlert(true);
      setAlertMessage("Please enter note text");
      return;
    }
    let noteObject = edit
      ? {
          createdTime: editObject.createdTime,
          modifiedTime: Date.now(),
          body: noteTextBody,
          verses: versesSelected.sort((a, b) => parseInt(a) - parseInt(b)),
        }
      : {
          createdTime: Date.now(),
          modifiedTime: Date.now(),
          body: noteTextBody,
          verses: versesSelected.sort((a, b) => parseInt(a) - parseInt(b)),
        };
    let notesArray =
      notesx &&
      notesx[sourceId] &&
      notesx[sourceId][bookCode] &&
      notesx[sourceId][bookCode][chapter]
        ? notesx[sourceId][bookCode][chapter]
        : [];
    edit
      ? (notesArray[noteReference.index] = noteObject)
      : notesArray.push(noteObject);
    return firebase
      .ref(
        "users/" +
          userDetails.uid +
          "/notes/" +
          sourceId +
          "/" +
          bookCode +
          "/" +
          chapter
      )
      .set(notesArray, function (error) {
        if (error) {
          console.log("Note add error");
        } else {
          setValue("versesSelected", []);
          // resetForm();
          setOpen(false);
          console.log("successful");
        }
      });
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
        tam: "sans-serif",
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
        tam: "Roboto Slab,Martel",
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
  const openNoteDialog = (verse) => {
    let index;
    Object.entries(noteText).map(([key, value]) => {
      if (value.verses.includes(verse)) {
        index = key;
        setNoteTextBody(value.body);
        setEditObject(value);
      }
      return [key, value];
    });
    setNoteReference({
      sourceId: sourceId,
      bookCode: bookCode,
      chapter: chapter,
      index: index,
    });
    setEdit(true);
    setValue("versesSelected", [verse]);
    setOpen(true);
  };
  const handleNoteTextChange = (e) => {
    setNoteTextBody(e.target.value);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedVerses([]);
  };
  const closeAlert = () => {
    setAlert(false);
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
          setNoteText={setNoteText}
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
      if (book) {
        setBookDisplay(book.short);
      }
    }
  }, [bookList, bookCode, setBookDisplay]);

  React.useEffect(() => {
    if (bookList) {
      let previousBible = bookList?.find(
        (element) => element?.book_code === previous?.bibleBookCode
      );
      let nextBible = bookList?.find(
        (element) => element?.book_code === next?.bibleBookCode
      );
      if (previousBible) {
        setPreviousBook(previousBible.short);
      }
      if (nextBible) {
        setNextBook(nextBible.short);
      }
    }
  }, [bookList, next, previous]);

  const getPageMargins = () => {
    return `@page { margin: 20mm !important; }`;
  };
  const addStyle = (text, style) => {
    return <span className={classes[style]}>{" " + text}</span>;
  };
  const getPrevious = () => {
    return previous && Object.values(previous).length !== 0 ? (
      <Tooltip title={previousBook + " " + previous.chapterId}>
        <ArrowBackIosIcon
          fontSize="large"
          className={classes.prevChapter}
          onClick={prevClick}
        />
      </Tooltip>
    ) : (
      ""
    );
  };
  const getNext = () => {
    return next && Object.values(next).length !== 0 ? (
      <Tooltip title={nextBook + " " + next.chapterId}>
        <ArrowForwardIosIcon
          fontSize="large"
          className={classes.nextChapter}
          onClick={nextClick}
        />
      </Tooltip>
    ) : (
      ""
    );
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
          {fetchData}
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
                selectedVerses?.indexOf(verse) > -1
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
                        onClick={() =>
                          mobileView
                            ? openNoteDialog(verse)
                            : setParallelView(NOTE)
                        }
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
            <div className={classes.footNotes}>
              <Typography className={classes.noteTitle} variant="h4">
                Notes :
              </Typography>
              <Divider />
              <div className={classes.noteList}>
                {noteText.map((item, i) => {
                  return (
                    <ul key={i}>
                      {addStyle(
                        bookDisplay + " " + chapter + ":" + item.verses,
                        "underline"
                      )}
                      {" " + item.body}
                    </ul>
                  );
                })}
              </div>
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
      {getPrevious()}
      {getNext()}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Note
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            id="outlined-multiline-static"
            label="Note Text"
            multiline
            minRows={10}
            fullWidth={true}
            inputProps={{ maxLength: 1000 }}
            variant="outlined"
            value={noteTextBody}
            onChange={handleNoteTextChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={saveNote}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={alert}
        autoHideDuration={5000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={closeAlert}
          severity="warning"
        >
          {alertMessage}
        </Alert>
      </Snackbar>
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
    mobileView: state.local.mobileView,
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
