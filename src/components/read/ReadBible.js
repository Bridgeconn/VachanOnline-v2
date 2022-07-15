import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ParallelScroll from "@material-ui/icons/ImportExport";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import * as views from "../../store/views";
import TopBar from "./TopBar";
import BiblePane from "./BiblePane";
import Commentary from "../commentary/Commentary";
import Dictionary from "../dictionary/Dictionary";
import Infographics from "../infographics/Infographics";
import Plans from "../readingplans/Readingplans";
import Audio from "../audio/Audio";
import Video from "../video/Video";
import Bookmarks from "../bookmark/Bookmarks";
import Highlights from "../highlight/Highlights";
import Notes from "../note/Notes";
import Search from "../search/Search";
import BibleMenu from "./BibleMenu";
import { BLUE, BLUETRANSPARENT } from "../../store/colorCode";
import {
  getCommentaries,
  getDictionaries,
  getAudioBibles,
  getVideos,
  getReadingPlans,
  getBookbyCode,
} from "../common/utility";

const useStyles = makeStyles((theme) => ({
  biblePane1: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRight: "1px solid #f7f7f7",
    overflow: "hidden",
  },
  biblePane2: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: "#fff",
    borderRight: "1px solid #f7f7f7",
    overflow: "hidden",
    "&:nth-child(2)": {
      right: 0,
      backgroundColor: "#fff",
    },
  },
  biblePane: {
    position: "absolute",
    height: "100%",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "calc(100% - 65px)",
    },
  },
  rightMenu: {
    width: 65,
    backgroundColor: BLUE,
    position: "absolute",
    height: "100vh",
    paddingTop: "60px",
    maxHeight: "100%",
    right: 0,
    bottom: 0,
    overflow: "hidden",
    textAlign: "center",
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
  parallelScroll: {
    position: "absolute",
    top: 86,
    left: "calc(50% - 18px)",
    zIndex: 1,
  },
}));
const ReadBible = (props) => {
  const classes = useStyles();
  //ref to get bible panes 1 & 2
  const bibleText1 = React.useRef();
  const bibleText2 = React.useRef();
  //used to sync bibles in paralle bibles on scroll
  const [bookObject, setBookObject] = React.useState({});
  //flag to prevent looping of on scroll event
  const ignoreScrollEvents = React.useRef(false);
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
    parallelScroll,
    login,
    userDetails,
    versions,
    versionBooks,
    versionSource,
    syncPanel,
    parallelView,
  } = props;
  const { uid } = userDetails;
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
  //Fetch data from APIs
  React.useEffect(() => {
    //if commentaries not loaded fetch list of commentaries
    if (commentaries.length === 0) {
      getCommentaries(setValue);
    }
  }, [commentaries.length, setValue]);
  React.useEffect(() => {
    //if dictionaries not loaded fetch list of dictionaries
    if (dictionaries.length === 0) {
      getDictionaries(setDictionary);
    }
  }, [dictionaries.length, setDictionary]);
  React.useEffect(() => {
    //if audio bibles not loaded fetch list of audio bibles
    if (audioBible.length === 0) {
      getAudioBibles(setValue);
    }
  }, [audioBible.length, setValue]);
  React.useEffect(() => {
    //if videos not loaded fetch list of videos
    if (video.length === 0) {
      getVideos(setValue);
    }
  }, [video.length, setValue]);
  React.useEffect(() => {
    //if reading plans not loaded fetch reading plans
    if (readingPlans.length === 0) {
      getReadingPlans(setValue);
    }
  }, [readingPlans.length, setValue]);
  React.useEffect(() => {
    if (parallelView === views.PARALLELBIBLE) {
      copyPanel1();
    }
  }, [parallelView, copyPanel1]);
  React.useEffect(() => {
    if (uid === null) {
      setValue("parallelView", "");
    }
  }, [setValue, uid]);
  const [pane, setPane] = React.useState("");
  //Set book object on change  of pane 1 for display in notes
  React.useEffect(() => {
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
      let bookObject = bookList
        ? bookList.find((element) => element.book_code === bookCode)
        : null;
      return bookObject ? bookObject.short : getBookbyCode(bookCode).book;
    },
    [versionBooks, versionSource]
  );
  React.useEffect(() => {
    const toggleParallelScroll = () => {
      setValue("parallelScroll", !parallelScroll);
      if (!parallelScroll) {
        syncPanel("panel1", "panel2");
      }
    };

    switch (parallelView) {
      case views.SEARCH:
        setPane(
          <>
            <div className={classes.biblePane2}>
              <BiblePane setValue={setValue1} paneData={panel1} />
            </div>
            <div className={classes.biblePane2}>
              <Search />
            </div>
          </>
        );
        break;
      case views.PARALLELBIBLE:
        setPane(
          <>
            <div className={classes.biblePane2}>
              <BiblePane
                setValue={setValue1}
                paneData={panel1}
                ref1={bibleText1}
                scroll={scroll}
                paneNo={1}
              />
            </div>
            <div>
              <div className={classes.info} onClick={toggleParallelScroll}>
                {parallelScroll ? (
                  <Tooltip title="Parallel Scroll">
                    <ParallelScroll
                      fontSize="large"
                      style={{ color: BLUETRANSPARENT }}
                      className={classes.parallelScroll}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Parallel Scroll Disabled">
                    <ParallelScroll
                      fontSize="large"
                      color="disabled"
                      className={classes.parallelScroll}
                    />
                  </Tooltip>
                )}
              </div>
              <div className={classes.biblePane2}>
                <BiblePane
                  setValue={setValue2}
                  paneData={panel2}
                  ref1={bibleText2}
                  scroll={scroll}
                  paneNo={2}
                />
              </div>
            </div>
          </>
        );
        break;
      case views.COMMENTARY:
        setPane(
          <>
            <div className={classes.biblePane2}>
              <BiblePane setValue={setValue1} paneData={panel1} />
            </div>
            <div className={classes.biblePane2}>
              <Commentary />
            </div>
          </>
        );
        break;
      case views.DICTIONARY:
        setPane(
          <>
            <div className={classes.biblePane2}>
              <BiblePane setValue={setValue1} paneData={panel1} />
            </div>
            <div className={classes.biblePane2}>
              <Dictionary setDictionary={setDictionary} />
            </div>
          </>
        );
        break;
      case views.INFOGRAPHICS:
        setPane(
          <>
            <div className={classes.biblePane2}>
              <BiblePane setValue={setValue1} paneData={panel1} />
            </div>
            <div className={classes.biblePane2}>
              <Infographics />
            </div>
          </>
        );
        break;
      case views.AUDIO:
        setPane(
          <>
            <div className={classes.biblePane2}>
              <BiblePane setValue={setValue1} paneData={panel1} />
            </div>
            <div className={classes.biblePane2}>
              <Audio
                audioBible={audioBible}
                bookCode={panel1.bookCode}
                books={versionBooks}
                chapter={panel1.chapter}
                languageCode={panel1.languageCode}
              />
            </div>
          </>
        );
        break;
      case views.VIDEO:
        setPane(
          <>
            <div className={classes.biblePane2}>
              <BiblePane setValue={setValue1} paneData={panel1} />
            </div>
            <div className={classes.biblePane2}>
              <Video
                books={versionBooks}
                video={video}
                bookCode={panel1.bookCode}
                languageCode={panel1.languageCode}
              />
            </div>
          </>
        );
        break;
      case views.BOOKMARK:
        setPane(
          <>
            <div className={classes.biblePane2}>
              <BiblePane setValue={setValue1} paneData={panel1} />
            </div>
            <div className={classes.biblePane2}>
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
            <div className={classes.biblePane2}>
              <BiblePane setValue={setValue1} paneData={panel1} />
            </div>
            <div className={classes.biblePane2}>
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
            <div className={classes.biblePane2}>
              <BiblePane setValue={setValue1} paneData={panel1} />
            </div>
            <div className={classes.biblePane2}>
              <Notes
                uid={uid}
                versions={versions}
                setValue={setValue1}
                sourceId={panel1.sourceId}
                bookCode={panel1.bookCode}
                chapter={panel1.chapter}
                versesSelected={panel1.versesSelected}
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
            <div className={classes.biblePane2}>
              <BiblePane setValue={setValue1} paneData={panel1} />
            </div>
            <div className={classes.biblePane2}>
              <Plans
                readingPlans={readingPlans}
                bookList={versionBooks[versionSource[panel1.sourceId]]}
                setValue1={setValue1}
                versesSelected={panel1.versesSelected}
              />
            </div>
          </>
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
    classes.biblePane1,
    classes.biblePane2,
    classes.parallelScroll,
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
    uid,
    versions,
    bookObject,
    parallelScroll,
    classes.info,
    syncPanel,
    getRegionalBookName,
    versionBooks,
    versionSource,
  ]);
  return (
    <>
      <TopBar login={login} userDetails={userDetails} />
      <div>
        <div className={classes.biblePane}>{pane}</div>
        <div className={classes.rightMenu}>
          <BibleMenu />
        </div>
      </div>
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
    login: state.local.login,
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
    syncPanel: (from, to) => {
      dispatch({ type: actions.SYNCPANEL, from: from, to: to });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReadBible);
