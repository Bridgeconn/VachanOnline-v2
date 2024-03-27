import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import ReactPlayer from "react-player";
import NoteIcon from "@mui/icons-material/NoteOutlined";
import Tooltip from "@mui/material/Tooltip";
import { NOTE } from "../../store/views";
import { API, CancelToken } from "../../store/api";
import GetChapterNotes from "../note/GetChapterNotes";
import * as color from "../../store/colorCode";
import { Button, Divider, Snackbar, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import parse from "html-react-parser";
import { useFirebase } from "react-redux-firebase";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Alert, Box } from "@mui/material";
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
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";

const CustomReactPlayer = styled(ReactPlayer)(({ theme, audiobottom }) => ({
  position: "sticky",
  left: "35px",
  bottom: audiobottom,
  width: "calc(100% - 70px)",
  height: "50px",
}));

const ArrowBack = styled(ArrowBackIosIcon)(
  ({ theme, padding, audiobottom }) => ({
    position: "absolute",
    top: "45%",
    cursor: "pointer",
    boxShadow: "rgb(0 0 0 / 50%) 0px 3px 10px 0px",
    borderRadius: "50%",
    backgroundColor: "rgb(255, 255, 255)",
    border: "1px white",
    padding: "7px",
    [theme.breakpoints.up("md")]: {
      left: padding > 5 ? padding / 2 : 2.5,
    },
    [theme.breakpoints.down("md")]: {
      left: "10px",
      top: "unset",
      bottom: audiobottom === "0.5rem" ? "1.5rem" : "4.5rem",
    },
  })
);

const ArrowForward = styled(ArrowForwardIosIcon)(
  ({ theme, padding, audiobottom }) => ({
    position: "absolute",
    top: "45%",
    cursor: "pointer",
    boxShadow: "rgb(0 0 0 / 50%) 0px 3px 10px 0px",
    borderRadius: "50%",
    backgroundColor: "rgb(255, 255, 255)",
    border: "1px white",
    padding: "7px",
    [theme.breakpoints.up("md")]: {
      right: padding > 5 ? padding / 2 : 2.5,
    },
    [theme.breakpoints.down("md")]: {
      right: "10px",
      top: "unset",
      bottom: audiobottom === "0.5rem" ? "1.5rem" : "4.5rem",
    },
  })
);
const LoadingHeading = styled("h3")({
  paddingLeft: 20,
});

const Bible = (props) => {
  const theme = useTheme();
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
  const headingSx = {
    fontSize: "1.3em",
    display: "block",
    paddingTop: "12px",
    fontWeight: 700,
    textIndent: 0,
  };
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
      const heading = parseHeading(item, headingSx);
      if (heading !== "") {
        return heading;
      }
    }
    if (item?.verseNumber === "" || isNaN(item?.verseNumber)) {
      if (item?.verseNumber?.includes("-")) {
        const [start, end] = item?.verseNumber?.split("-");
        if (isNaN(start) || isNaN(end)) {
          return "";
        }
      } else {
        return "";
      }
    }
    const showHeading = getShowHeading(verseData, item.verseNumber);
    if (showHeading === "show") {
      return getHeading(item, headingSx);
    }
    if (!filterVerse(verseData, item.verseNumber)) {
      return "";
    }
    const verse = parseInt(item.verseNumber);

    const verseNumber = {
      fontWeight: 600,
      paddingLeft: "3px",
      bottom: verse === 1 ? "-2px" : "4px",
      position: "relative",
      fontSize: verse === 1 ? "1.8em" : ".8em",
      color: verse === 1 ? color.BLACK : color.MEDIUMGREY,
      display: "inline",
    };

    const verseNo = verse === 1 ? chapter : item.verseNumber;

    const bgColorSx = {
      backgroundColor:
        selectedVerses?.indexOf(verse) > -1
          ? "#d9e8ef"
          : !mobileView &&
            hoverVerse === verse &&
            isHoverVerse &&
            parallelScroll
          ? color.LIGHTGREY
          : highlightVerses.indexOf(verse) > -1
          ? colors[highlighMap[verse]]
          : "transparent",
      [`@media print`]: {
        backgroundColor: printHighlights
          ? colors[highlighMap[verse]]
          : "transparent",
      },
    };
    const poetrySx = {
      "&.poetry1": {
        textIndent: "1rem",
      },
      "&.poetry2": {
        textIndent: "2.5rem",
      },
      "&.poetry3": {
        textIndent: "3rem",
      },
      "&.poetry4": {
        textIndent: "3.5rem",
      },
      display: "block",
      width: "max-content",
      ...bgColorSx,
    };
    return (
      <Box component="span" key={item.verseNumber}>
        <Box sx={{ display: lineView ? "table" : "inline" }}>
          <span
            onMouseOver={
              mobileView ? null : () => setMainValue("hoverVerse", verse)
            }
            onClick={handleVerseClick}
            data-verse={item.verseNumber}
          >
            <Box
              sx={{
                paddingTop: "4px",
                display: "inline",
                ...bgColorSx,
              }}
            >
              <Box sx={verseNumber}>
                {verseNo}
                &nbsp;
              </Box>
              {getVerse(item, poetrySx)}
            </Box>
          </span>
          {/*If verse has note then show note icon to open notes pane */}
          {notes && notes.includes(verse) ? (
            <NoteIcon
              sx={{
                [`@media print`]: {
                  display: printNotes ? "inline-block" : "none",
                },
              }}
              fontSize="small"
              color="disabled"
              onClick={() => openNoteDialog(verse)}
            />
          ) : (
            ""
          )}
          {verseData.includes(",") && <br />}
        </Box>
        {showHeading !== "skip" && getHeading(item, headingSx)}
      </Box>
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
          <Box key={element + i}>
            {verseData?.indexOf(",") !== -1 && (
              // if multi sections show separate headings
              <Typography
                variant="button"
                sx={{
                  textTransform: "capitalize",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                {`${bookDisplay} ${chapter}:${element}`}
              </Typography>
            )}
            {paras.map((para) => {
              let text = para?.items.map((item) =>
                showText(item, chapter, element)
              );
              return para.tag === "p" ? (
                <Box sx={{ textIndent: lineView ? "unset" : "1.5rem" }}>
                  {text}
                </Box>
              ) : (
                <span style={{ textTransform: "capitalize" }}>{text}</span>
              );
            })}
            {notLast ? (
              <Divider sx={{ marginTop: "12px", marginBottom: "12px" }} />
            ) : (
              ""
            )}
          </Box>
        );
      });
    } else {
      return paras.map((para, i) => {
        let text = para?.items.map((item) =>
          showText(item, chapter, verseData)
        );
        return para.tag === "p" ? (
          <Box sx={{ textIndent: lineView ? "unset" : "1.5rem" }} key={i}>
            {text}
          </Box>
        ) : (
          <span key={i}>{text}</span>
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
  const colors = {
    a: color.YELLOW,
    b: color.GREEN,
    c: color.CYAN,
    d: color.PINK,
    e: color.ORANGE,
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
  const addStyle = (text) => {
    return (
      <Box sx={{ color: "grey", textDecoration: "underline" }}>{text}</Box>
    );
  };
  const getPrevious = () => {
    if (parallelScroll && paneNo === 2 && mobileView) {
      return "";
    }
    return previous && Object.values(previous).length !== 0 ? (
      <Tooltip title={previousBook + " " + previous.chapterId}>
        <ArrowBack
          fontSize="large"
          padding={padding}
          audiobottom={audioBottom}
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
        <ArrowForward
          fontSize="large"
          padding={padding}
          audiobottom={audioBottom}
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
    <Box
      sx={{
        position: "absolute",
        backgroundColor: "#fff",
        width: "100%",
        height: "100%",
        borderRight: "1px solid " + color.LIGHTGREY,
        "& p": {
          textAlign: "justify",
          color: "#464545",
          marginBottom: "5px",
        },
        fontFamily: font,
        fontSize: fontSize,
      }}
    >
      {!isLoading && loadingText !== t("readBookUploadedSoon") ? (
        <Box
          onScroll={() => {
            scrollText();
          }}
          ref={props.ref1}
          sx={{
            position: "absolute",
            paddingTop: "20px",
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
              WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.4)",
              outline: "1px solid slategrey",
            },
            [theme.breakpoints.up("md")]: {
              paddingRight: () => (padding > 5 ? padding / 8 : 5),
              paddingLeft: () => (padding > 5 ? padding / 8 : 5),
            },
            [theme.breakpoints.down("md")]: {
              paddingRight: "15px",
              paddingLeft: "15px",
              lineHeight: "1.8em",
            },
          }}
        >
          {fetchData}
          <Box
            sx={{
              padding: "12px 25px 30px",
              marginBottom: "20px",
              maxWidth: "1191px",
              [`@media print`]: {
                fontSize: "1.2rem",
              },
              [theme.breakpoints.up("md")]: {
                boxShadow: "0 2px 6px 0 hsl(0deg 0% 47% / 60%)",
              },
              [theme.breakpoints.down("md")]: {
                marginBottom: "50px",
                padding: "0 0 50px 5px",
              },
            }}
            onMouseLeave={() => setMainValue("hoverVerse", "")}
            ref={printRef}
          >
            <style>{getPageMargins()}</style>
            <Typography
              sx={{
                display: "none",
                [`@media print`]: {
                  textTransform: "capitalize",
                  display: "block",
                  textAlign: "center",
                },
              }}
              variant="h4"
            >
              {version + " " + bookDisplay + " " + chapter}
            </Typography>
            {displayBibleText(verses, chapter, verseData)}
            {verseData !== "" ? (
              <Button
                id="button"
                variant="outlined"
                onClick={handleChapter}
                sx={{
                  display: "inline-flex",
                  fontSize: "1rem",
                  textTransform: "capitalize",
                  border: "1px solid #fff",
                  boxShadow: "1px 1px 1px 1px " + color.GREY,
                  margin: "4px",
                  marginTop: "20px",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  color: color.BLACK,
                  borderColor: color.BLACK,
                }}
              >
                {t("readChapterBtnSearchPassage", { ref })}
              </Button>
            ) : (
              ""
            )}
            <Box
              sx={{
                display: "none",
                [`@media print`]: {
                  display: printNotes ? "block" : "none",
                  marginTop: "200px",
                },
              }}
            >
              <Typography sx={{ paddingBottom: "20px" }} variant="h4">
                {t("commonNotes")} :
              </Typography>
              <Divider />
              <Box sx={{ paddingTop: "20px" }}>
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
              </Box>
            </Box>
          </Box>
          {audio ? (
            <CustomReactPlayer
              url={audioUrl}
              playing={playing === paneNo}
              onPlay={() => {
                setMainValue("playing", paneNo);
              }}
              controls
              width="calc(100% - 70px)"
              height="50px"
              audiobottom={audioBottom}
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
        </Box>
      ) : (
        <LoadingHeading>{loadingText}</LoadingHeading>
      )}
      {getPrevious()}
      {getNext()}
      <Dialog
        onClose={handleClose}
        aria-labelledby="mobile-edit-note-dialog"
        open={open}
        sx={{
          "& .MuiPaper-root": {
            [theme.breakpoints.down("md")]: {
              margin: "25px",
            },
          },
        }}
      >
        <DialogTitle id="mobile-edit-note-dialog" onClose={handleClose}>
          {t("commonNotes")}
        </DialogTitle>
        <DialogContent dividers sx={{ padding: 0 }}>
          <Editor
            editorState={editorState}
            editorStyle={{ padding: "10px", height: "30vh" }}
            onEditorStateChange={handleNoteTextChange}
            placeholder={t("commonNotePlaceholder")}
            toolbar={getEditorToolbar(true)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            sx={{
              color: color.BLACK,
              borderColor: color.BLACK,
              "&:hover": {
                backgroundColor: color.BLACK + "0a",
                border: "1px solid rgba(0, 0, 0, 0.23)",
              },
            }}
            onClick={handleClose}
          >
            {t("commonCancel")}
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: color.BLACK,
              borderColor: color.BLACK,
              "&:hover": {
                backgroundColor: color.BLACK + "0a",
                border: "1px solid rgba(0, 0, 0, 0.23)",
              },
            }}
            onClick={saveNote}
          >
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
    </Box>
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
