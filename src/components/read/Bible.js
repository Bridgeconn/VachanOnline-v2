import React, { useEffect, useRef } from "react";
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
import { Button, Divider, Snackbar, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import parse from "html-react-parser";
import { useFirebase } from "react-redux-firebase";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  getAudioBibleObject,
  getEditorToolbar,
  getHeading,
  getVerse,
  parseHeading,
} from "../common/utility";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  biblePanel: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    borderRight: "1px solid " + color.LIGHTGREY,
    "& p": {
      textAlign: "justify",
      color: "#464545",
      marginBottom: 5,
    },
  },
  paper: {
    [theme.breakpoints.down("sm")]: {
      margin: 25,
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
    width: "100%",
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
    [theme.breakpoints.up("md")]: {
      paddingRight: (props) => (props.padding > 40 ? props.padding : 40),
      paddingLeft: (props) => (props.padding > 40 ? props.padding : 40),
    },
    [theme.breakpoints.down("sm")]: {
      paddingRight: 15,
      paddingLeft: 15,
      lineHeight: "1.8em",
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
    [theme.breakpoints.up("md")]: {
      left: (props) => (props.padding > 40 ? props.padding / 2 : 20),
    },
    [theme.breakpoints.down("sm")]: {
      left: 10,
      top: "unset",
      bottom: (props) => (props.audioBottom === "0.5rem" ? "1.5rem" : "4.5rem"),
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
    [theme.breakpoints.up("md")]: {
      right: (props) => (props.padding > 40 ? props.padding / 2 : 20),
    },
    [theme.breakpoints.down("sm")]: {
      right: 10,
      top: "unset",
      bottom: (props) => (props.audioBottom === "0.5rem" ? "1.5rem" : "4.5rem"),
    },
  },
  loading: {
    padding: 20,
  },
  player: {
    position: "sticky",
    bottom: "10px",
    left: 35,
    [theme.breakpoints.down("sm")]: {
      bottom: (props) => props.audioBottom,
    },
  },
  text: {
    padding: "12px 25px 30px",
    marginBottom: 20,
    maxWidth: 1191,
    [`@media print`]: {
      fontSize: "1.2rem",
    },
    [theme.breakpoints.up("md")]: {
      boxShadow: "0 2px 6px 0 hsl(0deg 0% 47% / 60%)",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: 50,
      padding: "0 0 50px 5px",
    },
  },
  verseText: {
    paddingTop: 4,
  },
  verseNumber: {
    fontWeight: 600,
    paddingLeft: 3,
    bottom: 4,
    position: "relative",
    fontSize: ".8em",
    color: color.MEDIUMGREY,
  },
  heading: {
    fontSize: "1.3em",
    display: "block",
    paddingTop: 12,
    fontWeight: 700,
    textIndent: 0,
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
    color: color.BLACK,
  },
  noteIcon: {
    [`@media print`]: {
      display: (props) => (props.printNotes ? "inline-block" : "none"),
    },
  },
  printHeading: {
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
  noteDialog: {
    padding: 0,
  },
  editor: {
    padding: 10,
  },
  readChapterButton: {
    display: "inline-flex",
    fontSize: "1rem",
    textTransform: "capitalize",
    border: "1px solid #fff",
    boxShadow: "1px 1px 1px 1px " + color.GREY,
    margin: 4,
    marginTop: 20,
    padding: "6px 10px",
    borderRadius: 4,
  },
  searchHeading: {
    textTransform: "capitalize",
    fontWeight: 600,
    fontSize: 14,
  },
  divider: {
    marginTop: 12,
    marginBottom: 12,
  },
  hoverVerse: {
    background: color.LIGHTGREY,
  },
  paraStyling: {
    textIndent: "1.5rem",
  },
}));
const Bible = (props) => {
  const [verses, setVerses] = React.useState([]);
  const [loadingText, setLoadingText] = React.useState("Loading");
  const [isLoading, setIsLoading] = React.useState(true);
  const [previous, setPrevious] = React.useState({});
  const [next, setNext] = React.useState({});
  const [audioUrl, setAudioUrl] = React.useState("");
  const [padding, setPadding] = React.useState(
    window.innerWidth > 1200 ? (window.innerWidth - 1200) / 2 : 20
  );
  const [notes, setNotes] = React.useState([]);
  const [notesText, setNotesText] = React.useState([]);
  const [noteTextBody, setNoteTextBody] = React.useState("");
  const [fetchData, setFetchData] = React.useState();
  const [font, setFont] = React.useState("");
  const [highlightVerses, setHighlightVerses] = React.useState([]);
  const [highlighMap, setHighlighMap] = React.useState();
  const cancelToken = React.useRef();
  const firebase = useFirebase();
  const [open, setOpen] = React.useState(false);
  const tag = useRef("");
  const location = useLocation();
  const path = location?.pathname;
  let {
    sourceId,
    bookCode,
    chapter,
    verseData,
    version,
    versions,
    fontFamily,
    audio,
    setValue,
    setValue1,
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
    parallelView,
    playing,
    setMainValue,
    printRef,
    printNotes,
    printHighlights,
    versionBooks,
    versionSource,
    mobileView,
    versesSelected,
    hoverVerse,
    isHoverVerse,
  } = props;
  const { t } = useTranslation();
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
  const currentAudio = getAudioBibleObject(versions, sourceId);
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const showNoteMessage = () => {
    setAlert(true);
    setAlertMessage(t("readNotesAlertMsg"));
    return;
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
      setAlertMessage(t("readSelectVerse"));
      return;
    }
    if (noteTextBody === "") {
      setAlert(true);
      setAlertMessage(t("commonEnterNoteMsg"));
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

  function getShowHeading(verseData, verseNumber) {
    const verseNo = parseInt(verseNumber);
    if (verseData !== "") {
      if (verseData?.match(/\d+-\d+/g)) {
        const [start, end] = verseData.split("-");
        if (parseInt(start) === verseNo + 1) {
          return "show";
        }
        if (parseInt(end) === verseNo) {
          return "skip";
        }
      } else if (!isNaN(verseData)) {
        if (parseInt(verseData) === verseNo + 1) {
          return "show";
        }
        if (parseInt(verseData) === verseNo) {
          return "skip";
        }
      }
    }
    return "";
  }
  function showText(item, chapter, verseData) {
    if (verseData === "" || verseData.split("-")[0] === "1") {
      // show chapter heading only for verse 1
      const heading = parseHeading(item, classes.heading);
      if (heading !== "") {
        return heading;
      }
    }
    if (item?.verseNumber === "" || isNaN(item?.verseNumber)) {
      return "";
    }
    const showHeading = getShowHeading(verseData, item.verseNumber);
    if (showHeading === "show") {
      return getHeading(item, classes.heading);
    }
    if (!filterVerse(verseData, item.verseNumber)) {
      return "";
    }
    const verse = parseInt(item.verseNumber);
    const verseClass =
      selectedVerses?.indexOf(verse) > -1
        ? `${classes.verseText} ${classes.selectedVerse}`
        : !mobileView && hoverVerse === verse && isHoverVerse && parallelScroll
        ? `${classes.hoverVerse}`
        : highlightVerses.indexOf(verse) > -1
        ? `${classes.verseText} ${colorClasses[highlighMap[verse]]}`
        : `${classes.verseText}`;
    const verseNumberClass =
      verse === 1
        ? `${classes.verseNumber} ${classes.firstVerse}`
        : `${classes.verseNumber}`;
    const verseNo = verse === 1 ? chapter : item.verseNumber;
    return (
      <span key={item.verseNumber}>
        <span className={lineViewClass}>
          <span
            onMouseOver={
              mobileView ? null : () => setMainValue("hoverVerse", verse)
            }
            onClick={handleVerseClick}
            data-verse={item.verseNumber}
          >
            <span className={verseClass}>
              <span className={verseNumberClass}>
                {verseNo}
                &nbsp;
              </span>
              {getVerse(item, tag) + " "}
            </span>
          </span>
          {/*If verse has note then show note icon to open notes pane */}
          {notes && notes.includes(verse) ? (
            <NoteIcon
              className={classes.noteIcon}
              fontSize="small"
              color="disabled"
              onClick={() => openNoteDialog(verse)}
            />
          ) : (
            ""
          )}
          {verseData.includes(",") && <br />}
        </span>
        {showHeading !== "skip" && getHeading(item, classes.heading)}
      </span>
    );
  }
  function getStyle(item) {
    let type = "";
    if (typeof item === "object" && "contents" in item) {
      type = item?.contents?.reduce((acc, cur) => {
        if (typeof cur === "object") {
          const tag = Object.keys(cur)[0];
          if (tag === "p") {
            return "p";
          }
          if (tag === "q1" || tag === "q2") {
            return "q";
          }
        }
        return acc;
      }, "");
    }
    return type;
  }
  function splitParas(segments) {
    const paras = [];
    let i = 0;
    let lastTag = "p";
    for (const item of segments) {
      if (typeof paras[i] === "undefined") {
        paras[i] = { tag: lastTag, items: [] };
      }
      paras[i].items.push(item);
      lastTag = getStyle(item);
      if (lastTag !== "") {
        i++;
      }
    }
    return paras;
  }

  //multi verses, passage in a same chapter
  function displayBibleText(verses, chapter, verseData) {
    const paras = splitParas(verses);
    if (verseData !== "" && verseData?.match(/^[0-9,-]*$/g)) {
      return verseData?.split(",").map((element, i) => {
        const notLast = i !== verseData?.split(",").length - 1;
        return (
          <div key={element + i}>
            {verseData?.indexOf(",") !== -1 && (
              // if multi sections show separate headings
              <Typography variant="button" className={classes.searchHeading}>
                {`${bookDisplay} ${chapter}:${element}`}
              </Typography>
            )}
            {paras.map((para) => {
              let text = para?.items.map((item) =>
                showText(item, chapter, element)
              );
              return para.tag === "p" ? (
                <p className={lineView?"":classes.paraStyling}>{text}</p>
              ) : (
                <div>{text}</div>
              );
            })}
            {notLast ? <Divider className={classes.divider} /> : ""}
          </div>
        );
      });
    } else {
      return paras.map((para, i) => {
        let text = para?.items.map((item) =>
          showText(item, chapter, verseData)
        );
        return para.tag === "p" ? (
          <p className={lineView?"":classes.paraStyling}>{text}</p>
        ) : (
          <div>{text}</div>
        );
      });
    }
  }

  function filterVerse(verseData, verseNumber) {
    if (verseData) {
      if (isNaN(verseData)) {
        // verse range
        if (verseData?.match(/^[0-9-]*$/g)) {
          const [start, end] = verseData.split("-");
          if (verseNumber < parseInt(start) || parseInt(end) < verseNumber) {
            return false;
          }
        }
        // multi verse
        if (verseData?.match(/^[0-9,]*$/g)) {
          if (!verseData.split(",").includes(verseNumber)) {
            return false;
          }
        }
      } else if (verseNumber !== verseData) {
        return false;
      }
    }
    return true; //show verse
  }
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
      setLoadingText(t("loadingMessage"));
      //Check if there are any previous pending requests
      if (typeof cancelToken.current != typeof undefined) {
        cancelToken.current.cancel(t("readOperationCanceled"));
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
            setLoadingText(t("readBookUploadedSoon"));
          } else {
            setLoadingText("");
            let contents = response.data.chapterContent.contents;
            setVerses(contents);
          }
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [sourceId, bookCode, chapter, t]);
  //if audio bible show icon
  React.useEffect(() => {
    if (currentAudio) {
      setAudioUrl(
        currentAudio.url + bookCode + "/" + chapter + "." + currentAudio.format
      );
    }
  }, [currentAudio, bookCode, chapter]);
  //Function to load previous chapter
  const prevClick = () => {
    if (!isLoading && Object.keys(previous).length > 0) {
      setValue("chapter", previous.chapterId);
      setValue("bookCode", previous.bibleBookCode);
      setValue("verseData", "");
      setValue("versesSelected", []);
      if (parallelScroll && paneNo) {
        syncPanel("panel" + paneNo, "panel" + ((parseInt(paneNo) % 2) + 1), t);
      }
    }
  };
  //Function to load next chapter
  const nextClick = () => {
    if (!isLoading && Object && Object.keys(next).length > 0) {
      setValue("chapter", next.chapterId);
      setValue("bookCode", next.bibleBookCode);
      setValue("verseData", "");
      setValue("versesSelected", []);
      if (parallelScroll && paneNo) {
        syncPanel("panel" + paneNo, "panel" + ((parseInt(paneNo) % 2) + 1), t);
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
    if (parallelView === NOTE) {
      return showNoteMessage();
    }
    let index;
    Object.entries(notesText).map(([key, value]) => {
      if (value?.verses?.includes(verse)) {
        index = key;
        setNoteTextBody(value.body);
        setEditorState(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(htmlToDraft(value.body))
          )
        );
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
  const handleNoteTextChange = (editorState) => {
    setNoteTextBody(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    setEditorState(editorState);
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
          setNotesText={setNotesText}
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
    if (parallelScroll && paneNo === 2 && mobileView) {
      return "";
    }
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

  function handleChapter() {
    setValue1("verseData", "");
  }

  const getNext = () => {
    if (parallelScroll && paneNo === 2 && mobileView) {
      return "";
    }
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

  useEffect(() => {
    if (verses?.length > 0 && verseData !== "") {
      const verseArr = verses.map((a) => a?.verseNumber);
      if (isNaN(verseData)) {
        //check for verse range
        if (verseData?.match(/^[0-9-]*$/g)) {
          const [start, end] = verseData.split("-");
          if (!verseArr.includes(start)) {
            setMainValue("errorMessage", "referenceNotFound");
          }
          if (!verseArr.includes(end)) {
            setMainValue("errorMessage", "referenceNotFound");
          }
        }
        // check for multi search
        if (verseData?.match(/^[0-9,-]*$/g)) {
          if (
            !verseData.split(/[,-]+/).every((num) => verseArr.includes(num))
          ) {
            setMainValue("errorMessage", "referenceNotFound");
          }
        }
      } else {
        // check for single verse
        if (!verseArr.includes(verseData)) {
          setMainValue("errorMessage", "referenceNotFound");
        }
      }
    }
  }, [verses, verseData, setMainValue]);
  React.useEffect(() => {
    if (path.startsWith("/read") && verseData !== "") {
      setValue("versesSelected", []);
    }
  }, [path, setValue, verseData]);
  const ref = {
    book: bookDisplay,
    chapter: chapter,
  };
  return (
    <div
      className={classes.biblePanel}
      style={{
        fontFamily: font,
        fontSize: fontSize,
      }}
    >
      {!isLoading && loadingText !== t("readBookUploadedSoon") ? (
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
            <Typography className={classes.printHeading} variant="h4">
              {version + " " + bookDisplay + " " + chapter}{" "}
            </Typography>
            {displayBibleText(verses, chapter, verseData)}
            {verseData !== "" ? (
              <Button
                id="button"
                variant="outlined"
                onClick={handleChapter}
                className={classes.readChapterButton}
              >
                {t("readChapterBtnSearchPassage", { ref })}
              </Button>
            ) : (
              ""
            )}
            <div className={classes.footNotes}>
              <Typography className={classes.noteTitle} variant="h4">
                {t("commonNotes")} :
              </Typography>
              <Divider />
              <div className={classes.noteList}>
                {notesText?.map((item, i) => {
                  return (
                    <ul key={i}>
                      {addStyle(
                        bookDisplay + " " + chapter + ":" + item.verses,
                        "underline"
                      )}
                      {parse(item.body)}
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
              width="calc(100% - 70px)"
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
        aria-labelledby="mobile-edit-note-dialog"
        open={open}
        classes={{ paper: classes.paper }}
      >
        <DialogTitle id="mobile-edit-note-dialog" onClose={handleClose}>
          {t("commonNotes")}
        </DialogTitle>
        <DialogContent dividers className={classes.noteDialog}>
          <Editor
            editorState={editorState}
            onEditorStateChange={handleNoteTextChange}
            placeholder={t("commonNotePlaceholder")}
            editorStyle={{ height: "30vh" }}
            editorClassName={classes.editor}
            toolbar={getEditorToolbar(true)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            {t("commonCancel")}
          </Button>
          <Button variant="outlined" onClick={saveNote}>
            {t("commonSave")}
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
    versions: state.local.versions,
    parallelView: state.local.parallelView,
    hoverVerse: state.local.hoverVerse,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    syncPanel: (from, to, t) => {
      dispatch({ type: actions.SYNCPANEL, from: from, to: to, t: t });
    },
    setMainValue: (name, value) =>
      dispatch({ type: actions.SETVALUE, name: name, value: value }),
    setValue1: (name, value) =>
      dispatch({ type: actions.SETVALUE1, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Bible);
