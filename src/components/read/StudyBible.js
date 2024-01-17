import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import ParallelScroll from "@mui/icons-material/ImportExport";
import Tooltip from "@mui/material/Tooltip";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import * as views from "../../store/views";
import TopBar from "./TopBar";
import BiblePane from "./BiblePane";
import Commentary from "../commentary/Commentary";
import Dictionary from "../dictionary/Dictionary";
import Infographics from "../infographics/Infographics";
import ReadingPlan from "../readingplan/ReadingPlan";
import Audio from "../audio/Audio";
import Video from "../video/Video";
import Bookmarks from "../bookmark/Bookmarks";
import Highlights from "../highlight/Highlights";
import Notes from "../note/Notes";
import Search from "../search/Search";
import BibleMenu from "./BibleMenu";
import { GREY, LIGHTGREY } from "../../store/colorCode";
import SignBible from "../signbible/SignBible";
import {
  getCommentaries,
  getDictionaries,
  getAudioBibles,
  getVideos,
  getReadingPlans,
  getBookbyCode,
  getSignBible,
  getChapterVideo,
} from "../common/utility";
import { useMediaQuery } from "@mui/material";
import BottomBar from "./BottomBar";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles((theme) => ({
  main: {
    [theme.breakpoints.down('md')]: {
      position: "absolute",
      height: "calc(100% - 3.6rem)",
      width: "100%",
    },
  },
  biblePane1: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRight: "1px solid #f7f7f7",
    overflow: "hidden",
  },
  splitPane1: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: "#fff",
    borderRight: "1px solid #f7f7f7",
    overflow: "hidden",
    [theme.breakpoints.only("xs")]: {
      borderBottom: "1px solid #f1ecec",
      width: "100%",
      height: "calc(50% + 1.8rem)",
    },
  },
  splitPane2: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: "#fff",
    borderRight: "1px solid #f7f7f7",
    overflow: "hidden",
    right: 0,
    [theme.breakpoints.only("xs")]: {
      borderTop: "1px solid " + LIGHTGREY,
      top: "calc(50% + 1.8rem)",
      width: "100%",
      height: "calc(50% - 1.8rem)",
    },
  },
  biblePane: {
    position: "absolute",
    height: "100%",
    [theme.breakpoints.down('md')]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "calc(100% - 65px)",
    },
  },
  rightMenu: {
    width: 65,
    boxShadow: "2px 2px 2px 2px" + GREY,
    position: "absolute",
    height: "100vh",
    paddingTop: "60px",
    maxHeight: "100%",
    right: 0,
    bottom: 0,
    overflow: "hidden",
    textAlign: "center",
  },
  pScroll: {
    position: "absolute",
    top: 86,
    left: "calc(50% - 18px)",
    zIndex: 1,
  },
}));
const StudyBible = (props) => {
  const theme = useTheme();
  //ref to get bible panes 1 & 2
  const bibleText1 = useRef();
  const bibleText2 = useRef();
  const [pane, setPane] = useState("");
  //used to sync bibles in paralle bibles on scroll
  const [bookObject, setBookObject] = useState({});
  //flag to prevent looping of on scroll event
  const ignoreScrollEvents = useRef(false);
  let {
    setValue,
    setValue1,
    setValue2,
    copyPanel1,
    panel1,
    panel2,
    commentaries,
    dictionaries,
    setDictionary,
    audioBible,
    video,
    readingPlans,
    signBible,
    parallelScroll,
    login,
    userDetails,
    versions,
    versionBooks,
    versionSource,
    syncPanel,
    parallelView,
    mobileView,
  } = props;
  //if mobile then true, used to change layout
  const classes = useStyles();
  const { uid } = userDetails;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { t } = useTranslation();
  //function for moving parallel bibles scroll together
  const scroll = React.useCallback((paneNo, parallelScroll) => {
    //check flag to prevent looping of on scroll event
    if (ignoreScrollEvents.current) {
      ignoreScrollEvents.current = false;
      return;
    }
    if (!parallelScroll) {
      return;
    }
    let text1 = bibleText1.current;
    let text2 = bibleText2.current;
    if (text1 && text2) {
      //if parallel scroll on scroll proportinal to scroll window
      if (paneNo === 1) {
        ignoreScrollEvents.current = true;
        text2.scrollTop =
          (text1.scrollTop / (text1.scrollHeight - text1.offsetHeight)) *
          (text2.scrollHeight - text2.offsetHeight);
      } else if (paneNo === 2) {
        ignoreScrollEvents.current = true;
        text1.scrollTop =
          (text2.scrollTop / (text2.scrollHeight - text2.offsetHeight)) *
          (text1.scrollHeight - text1.offsetHeight);
      }
    }
  }, []);
  const biblePane = useMemo(() => {
    return !mobileView ? (
      <div className={classes.splitPane1}>
        <BiblePane setValue={setValue1} paneData={panel1} />
      </div>
    ) : (
      ""
    );
  }, [classes.splitPane1, mobileView, panel1, setValue1]);
  const toggleParallelScroll = React.useCallback(() => {
    setValue("parallelScroll", !parallelScroll);
    if (!parallelScroll) {
      syncPanel("panel1", "panel2", t);
    }
  }, [parallelScroll, setValue, syncPanel, t]);
  const parallelScrollIcon = useMemo(() => {
    return mobileView ? null : (
      <div onClick={toggleParallelScroll}>
        {parallelScroll ? (
          <Tooltip title={t("studyParallelScroll")}>
            <ParallelScroll fontSize="large" className={classes.pScroll} />
          </Tooltip>
        ) : (
          <Tooltip title={t("studyParallelScrollDisabled")}>
            <ParallelScroll
              fontSize="large"
              color="disabled"
              className={classes.pScroll}
            />
          </Tooltip>
        )}
      </div>
    );
  }, [classes.pScroll, mobileView, parallelScroll, t, toggleParallelScroll]);

  useEffect(() => {
    if (isMobile) {
      setValue("mobileView", true);
    } else {
      setValue("mobileView", false);
    }
  }, [isMobile, setValue]);
  //Fetch data from APIs
  useEffect(() => {
    //if commentaries not loaded fetch list of commentaries
    if (commentaries.length === 0) {
      getCommentaries(setValue);
    }
  }, [commentaries.length, setValue]);

  useEffect(() => {
    //if dictionaries not loaded fetch list of dictionaries
    if (dictionaries.length === 0) {
      getDictionaries(setDictionary);
    }
  }, [dictionaries.length, setDictionary]);
  useEffect(() => {
    //if audio bibles not loaded fetch list of audio bibles
    if (audioBible.length === 0) {
      getAudioBibles(setValue);
    }
  }, [audioBible.length, setValue]);
  useEffect(() => {
    //if videos not loaded fetch list of videos
    if (video.length === 0) {
      getVideos(setValue);
    }
  }, [video.length, setValue]);
  useEffect(() => {
    getChapterVideo(setValue);
  }, [setValue]);
  useEffect(() => {
    //if reading plans not loaded fetch reading plans
    if (readingPlans.length === 0) {
      getReadingPlans(setValue);
    }
  }, [readingPlans.length, setValue]);
  useEffect(() => {
    //if sign bible not loaded fetch sign bible
    if (
      signBible.length === 0 &&
      process.env.REACT_APP_SIGNBIBLE_URL !== undefined
    ) {
      getSignBible(setValue);
    }
  }, [signBible.length, setValue]);
  useEffect(() => {
    if (parallelView === views.PARALLELBIBLE) {
      copyPanel1();
    }
  }, [parallelView, copyPanel1]);
  useEffect(() => {
    const userPanels = [views.BOOKMARK, views.HIGHLIGHT, views.NOTE];
    //if user is on these pages and logs out, close parallel view
    if (uid === null && userPanels.includes(parallelView)) {
      setValue("parallelView", "");
    }
  }, [parallelView, setValue, uid]);

  //Set book object on change  of pane 1 for display in notes
  useEffect(() => {
    let bookList = versionBooks[versionSource[panel1.sourceId]];
    if (bookList && panel1.bookCode) {
      let selectedBook = bookList.find(
        (element) => element.book_code === panel1.bookCode
      );
      setBookObject(selectedBook);
    }
  }, [panel1.bookCode, panel1.sourceId, versionBooks, versionSource]);
  //Get Regional book name
  const getRegionalBookName = React.useCallback(
    (bookCode, sourceId) => {
      const bookList = versionBooks[versionSource[sourceId]];
      let bookObj = bookList
        ? bookList.find((element) => element.book_code === bookCode)
        : null;
      return bookObj ? bookObj.short : getBookbyCode(bookCode).book;
    },
    [versionBooks, versionSource]
  );
  useEffect(() => {
    switch (parallelView) {
      case views.SEARCH:
        setPane(
          <>
            <div className={classes.splitPane1}>
              <BiblePane setValue={setValue1} paneData={panel1} />
            </div>
            <div className={classes.splitPane2}>
              <Search />
            </div>
          </>
        );
        break;
      case views.PARALLELBIBLE:
        setPane(
          <>
            <div className={classes.splitPane1}>
              <BiblePane
                setValue={setValue1}
                paneData={panel1}
                ref1={bibleText1}
                scroll={scroll}
                paneNo={1}
                toggleParallelScroll={toggleParallelScroll}
              />
            </div>
            <>
              {parallelScrollIcon}
              <div className={classes.splitPane2}>
                <BiblePane
                  setValue={setValue2}
                  paneData={panel2}
                  ref1={bibleText2}
                  scroll={scroll}
                  paneNo={2}
                  toggleParallelScroll={toggleParallelScroll}
                />
              </div>
            </>
          </>
        );
        break;
      case views.COMMENTARY:
        setPane(
          <>
            <div className={classes.splitPane1}>
              <BiblePane setValue={setValue1} paneData={panel1} />
            </div>
            <div className={classes.splitPane2}>
              <Commentary
                screenView={"split"}
                bookShortName={bookObject.short}
              />
            </div>
          </>
        );
        break;
      case views.DRAWERCOMMENTARY:
        setPane(
          <div className={classes.biblePane1}>
            <Commentary screenView={"single"} />
          </div>
        );
        break;
      case views.DICTIONARY:
        setPane(
          <>
            {biblePane}
            <div
              className={mobileView ? classes.biblePane : classes.splitPane2}
            >
              <Dictionary setDictionary={setDictionary} />
            </div>
          </>
        );
        break;
      case views.INFOGRAPHICS:
        setPane(
          <>
            {biblePane}
            <div
              className={mobileView ? classes.biblePane : classes.splitPane2}
            >
              <Infographics panel1={panel1} />
            </div>
          </>
        );
        break;
      case views.AUDIO:
        setPane(
          <>
            {biblePane}
            <div
              className={mobileView ? classes.biblePane : classes.splitPane2}
            >
              <Audio
                audioBible={audioBible}
                bookCode={panel1.bookCode}
                books={versionBooks}
                chapter={panel1.chapter}
                languageCode={panel1.languageCode}
                panel1={panel1}
              />
            </div>
          </>
        );
        break;
      case views.VIDEO:
        setPane(
          <>
            {biblePane}
            <div
              className={mobileView ? classes.biblePane : classes.splitPane2}
            >
              <Video
                books={versionBooks}
                video={video}
                bookCode={panel1.bookCode}
                languageCode={panel1.languageCode}
                panel1={panel1}
              />
            </div>
          </>
        );
        break;
      case views.BOOKMARK:
        setPane(
          <>
            {biblePane}
            <div
              className={mobileView ? classes.biblePane : classes.splitPane2}
            >
              <Bookmarks
                uid={uid}
                versions={versions}
                setValue={setValue1}
                getRegionalBookName={getRegionalBookName}
              />
            </div>
          </>
        );
        break;
      case views.HIGHLIGHT:
        setPane(
          <>
            {biblePane}
            <div
              className={mobileView ? classes.biblePane : classes.splitPane2}
            >
              <Highlights
                uid={uid}
                versions={versions}
                setValue={setValue1}
                getRegionalBookName={getRegionalBookName}
              />
            </div>
          </>
        );
        break;
      case views.NOTE:
        setPane(
          <>
            {biblePane}
            <div
              className={mobileView ? classes.biblePane : classes.splitPane2}
            >
              <Notes
                uid={uid}
                versions={versions}
                setValue={setValue1}
                panel1={panel1}
                versesSelected={panel1?.versesSelected}
                book={bookObject.short}
                getRegionalBookName={getRegionalBookName}
              />
            </div>
          </>
        );
        break;
      case views.READINGPLANS:
        setPane(
          <>
            <div className={classes.splitPane1}>
              <BiblePane setValue={setValue1} paneData={panel1} />
            </div>
            <div className={classes.splitPane2}>
              <ReadingPlan
                readingPlans={readingPlans}
                bookList={versionBooks[versionSource[panel1.sourceId]]}
                setValue1={setValue1}
                versesSelected={panel1.versesSelected}
                mobileView={mobileView}
              />
            </div>
          </>
        );
        break;
      case views.SIGNBIBLE:
        setPane(
          <>
            <div className={classes.splitPane1}>
              <BiblePane setValue={setValue1} paneData={panel1} />
            </div>
            <div className={classes.splitPane2}>
              <SignBible
                signBible={signBible}
                panel1={panel1}
                book={bookObject.short}
                setValue={setValue1}
                versions={versions}
              />
            </div>
          </>
        );
        break;
      case views.DRAWERSIGNBIBLE:
        setPane(
          <div className={classes.biblePane1}>
            <SignBible
              signBible={signBible}
              book={bookObject.short}
              setValue={setValue1}
              versions={versions}
              panel1={panel1}
            />
          </div>
        );
        break;
      default:
        setPane(
          <div className={classes.biblePane1}>
            <BiblePane
              setValue={setValue1}
              paneData={panel1}
              singlePane={true}
            />
          </div>
        );
    }
  }, [
    audioBible,
    toggleParallelScroll,
    scroll,
    panel1,
    panel2,
    parallelView,
    setDictionary,
    setValue,
    setValue1,
    setValue2,
    video,
    readingPlans,
    signBible,
    uid,
    versions,
    bookObject,
    parallelScrollIcon,
    biblePane,
    getRegionalBookName,
    versionBooks,
    versionSource,
    classes.splitPane1,
    classes.splitPane2,
    mobileView,
    classes.biblePane1,
    classes.biblePane,
  ]);
  return (
    <>
      <TopBar />
      <div className={classes.main}>
        <div className={classes.biblePane}>{pane}</div>
        {isMobile ? null : (
          <div className={classes.rightMenu}>
            <BibleMenu />
          </div>
        )}
      </div>
      {mobileView ? <BottomBar login={login} /> : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    versions: state.local.versions,
    versionBooks: state.local.versionBooks,
    versionSource: state.local.versionSource,
    panel1: state.local.panel1,
    panel2: state.local.panel2,
    parallelScroll: state.local.parallelScroll,
    commentaries: state.local.commentaries,
    dictionaries: state.local.dictionary.dictionaries,
    audioBible: state.local.audioBible,
    video: state.local.video,
    readingPlans: state.local.readingPlans,
    signBible: state.local.signBible,
    login: state.local.login,
    mobileView: state.local.mobileView,
    userDetails: state.local.userDetails,
    parallelView: state.local.parallelView,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setValue1: (name, value) => {
      dispatch({ type: actions.SETVALUE1, name: name, value: value });
    },
    setValue2: (name, value) =>
      dispatch({ type: actions.SETVALUE2, name: name, value: value }),
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE, name: name, value: value }),
    setDictionary: (name, value) =>
      dispatch({ type: actions.SETDICTIONARY, name: name, value: value }),
    copyPanel1: () => dispatch({ type: actions.COPYPANEL1 }),
    syncPanel: (from, to, t) => {
      dispatch({ type: actions.SYNCPANEL, from: from, to: to, t: t });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StudyBible);
