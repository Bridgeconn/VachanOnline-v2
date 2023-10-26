import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import { getAudioBibleObject } from "../common/utility";
import Setting from "../read/Setting";
import BookCombo from "../common/BookCombo";
import Version from "../common/Version";
import Metadata from "../common/Metadata";
import Bookmark from "../bookmark/Bookmark";
import Highlight from "../highlight/Highlight";
import NoteIcon from "@material-ui/icons/NoteOutlined";
import BorderColor from "@material-ui/icons/BorderColor";
import Note from "../note/Note";
import PrintIcon from "@material-ui/icons/Print";
import { AUDIO } from "../../store/views";
import Tooltip from "@material-ui/core/Tooltip";
import { BLACK } from "../../store/colorCode";
import Close from "../common/Close";
import Print from "../common/PrintBox";
import ParallelScroll from "@material-ui/icons/ImportExport";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  read: {
    display: "flex",
    width: "100%",
    padding: "0 10px 0 44px",
    borderBottom: "1px solid #f1ecec",
    position: "absolute",
    height: 60,
    top: 72,
    [theme.breakpoints.only("sm")]: {
      padding: "0 4px",
      top: 61,
    },
    [theme.breakpoints.only("xs")]: {
      padding: "0 5.5px",
      top: (props) => (props.paneNo === 2 ? 0 : 60),
    },
    [theme.breakpoints.down("sm")]: {
      boxShadow: theme.shadows[1],
    },
  },
  selectBox: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  select: {
    marginTop: "-8px",
    backgroundColor: "red",
  },
  info: {
    padding: 0,
    width: "30px",
    marginTop: 20,
    marginRight: 4,
    color: "default",
    cursor: "pointer",
  },
  infoParall: {
    padding: 0,
    width: 22,
    marginTop: 15,
    marginRight: 4,
    color: "default",
    cursor: "pointer",
  },
  settings: {
    padding: 0,
    width: "30px",
    marginTop: 20,
    marginLeft: "-5px",
    marginRight: "-5px",
    color: "default",
    cursor: "pointer",
  },
  items: {
    display: "flex",
    [theme.breakpoints.only("sm")]: {
      marginLeft: -16,
    },
  },
  verseDisplay: {
    fontSize: "1rem",
    textTransform: "capitalize",
    backgroundColor: "#fff",
    width: 100,
    paddingLeft: 20,
    fontWeight: 600,
  },
}));
const MenuBar = (props) => {
  let {
    setValue,
    paneNo,
    setFullscreen,
    versions,
    version,
    language,
    sourceId,
    chapter,
    verseData,
    versionBooks,
    versionSource,
    fontSize,
    fontFamily,
    lineView,
    isHoverVerse,
    bookCode,
    audio,
    userDetails,
    selectedVerses,
    setSelectedVerses,
    refUrl,
    highlights,
    parallelView,
    printRef,
    printNotes,
    setPrintNotes,
    printHighlights,
    setPrintHighlights,
    mobileView,
    parallelScroll,
    toggleParallelScroll,
    errorMessage,
  } = props;
  const styleProps = { paneNo: paneNo };
  const classes = useStyles(styleProps);
  const { t } = useTranslation();
  function goFull() {
    setFullscreen(true);
  }
  const [settingsAnchor, setSettingsAnchor] = React.useState(null);
  const [metadataList, setMetadataList] = React.useState("");
  const [audioBible, setAudioBible] = React.useState({});
  const [audioIcon, setAudioIcon] = React.useState("");
  const [bookmarkIcon, setBookmarkIcon] = React.useState("");
  const [highlightIcon, setHighlightIcon] = React.useState("");
  const [noteIcon, setNoteIcon] = React.useState("");
  const [bookDisplay, setBookDisplay] = React.useState("");
  const bookList = versionBooks[versionSource[sourceId]];
  const [dialogOpen, setDialogOpen] = React.useState(false);
  React.useEffect(() => {
    if (bookList) {
      let book = bookList.find((element) => element.book_code === bookCode);
      if (book) {
        setBookDisplay(book.short);
      }
    }
  }, [bookList, bookCode, setBookDisplay]);

  //Set bookmark icon
  React.useEffect(() => {
    if (userDetails.uid !== null) {
      setBookmarkIcon(
        <Bookmark
          uid={userDetails.uid}
          sourceId={sourceId}
          bookCode={bookCode}
          chapter={chapter}
        />
      );
      return;
    }
    setBookmarkIcon("");
  }, [userDetails, sourceId, bookCode, chapter]);

  //Set highlight icon
  React.useEffect(() => {
    if (userDetails.uid !== null) {
      if (selectedVerses && selectedVerses.length > 0) {
        setHighlightIcon(
          <Highlight
            selectedVerses={selectedVerses}
            setSelectedVerses={setSelectedVerses}
            refUrl={refUrl}
            highlights={highlights}
          />
        );
        return;
      } else {
        setHighlightIcon(
          <Tooltip title={t("menuBarSelectVersesToolTip")}>
            <div className={classes.info}>
              <BorderColor fontSize="small" color="disabled" />
            </div>
          </Tooltip>
        );
      }
    } else {
      setHighlightIcon("");
    }
  }, [
    userDetails,
    selectedVerses,
    classes.info,
    setSelectedVerses,
    refUrl,
    highlights,
    t,
  ]);

  //Set note icon
  React.useEffect(() => {
    if (userDetails.uid !== null) {
      if (selectedVerses && selectedVerses.length > 0) {
        setNoteIcon(
          <Note
            uid={userDetails.uid}
            selectedVerses={selectedVerses}
            setSelectedVerses={setSelectedVerses}
            sourceId={sourceId}
            bookCode={bookCode}
            chapter={chapter}
          />
        );
        return;
      } else {
        setNoteIcon(
          <Tooltip title={t("menuBarSelectVersesToolTip")}>
            <div className={classes.info}>
              <NoteIcon fontSize="small" color="disabled" />
            </div>
          </Tooltip>
        );
      }
    } else {
      setNoteIcon("");
    }
  }, [
    userDetails,
    selectedVerses,
    setSelectedVerses,
    sourceId,
    bookCode,
    chapter,
    classes.info,
    t,
  ]);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  //function to open and close settings menu
  function openSettings(event) {
    setSettingsAnchor(event.currentTarget);
  }
  function closeSettings() {
    setSettingsAnchor(null);
  }
  //get metadata from versions object if version changed
  React.useEffect(() => {
    if (versions !== undefined) {
      const language = version.split("-");
      const languageVersions = versions.find(
        (e) => e.languageVersions[0].language.code === language[0].toLowerCase()
      );
      if (languageVersions !== undefined) {
        const versionObject = languageVersions.languageVersions.find(
          (e) => e.version.code.toUpperCase() === language[1].toUpperCase()
        );
        setValue("languageCode", versionObject.language.code);
        setMetadataList(versionObject.metadata);
      }
    }
  }, [setValue, version, versions]);
  React.useEffect(() => {
    setAudioBible(getAudioBibleObject(versions, sourceId));
  }, [versions, sourceId]);
  //if audioBible updated show audio bible icon if audio bible available
  React.useEffect(() => {
    const openAudioBible = () => {
      setValue("audio", !audio);
    };
    if (
      audioBible &&
      audioBible.url &&
      bookCode in audioBible.books &&
      parallelView !== AUDIO
    ) {
      setAudioIcon(
        <Tooltip title={t("menuBarAudioBibleToolTip")}>
          <div className={classes.info} onClick={openAudioBible}>
            <i className="material-icons md-23">volume_up</i>
          </div>
        </Tooltip>
      );
    } else {
      setValue("audio", false);
      setAudioIcon("");
    }
  }, [audio, audioBible, bookCode, classes.info, setValue, parallelView, t]);
  return (
    <div>
      <Box className={classes.read}>
        <Box flexGrow={1} className={classes.selectBox}>
          <Version
            setValue={setValue}
            version={version}
            bookCode={bookCode}
            chapter={chapter}
            verseData={verseData}
            paneNo={paneNo}
            language={language}
          />
          {bookCode && errorMessage === "" ? (
            <BookCombo
              paneNo={paneNo}
              bookCode={bookCode}
              bookList={versionBooks[versionSource[sourceId]]}
              chapter={chapter}
              verseData={verseData}
              setValue={setValue}
              minimal={true}
            />
          ) : (
            ""
          )}
        </Box>
        {errorMessage === "" ? (
          <Box className={classes.items}>
            {mobileView ? null : noteIcon}
            {mobileView ? null : highlightIcon}

            {bookmarkIcon}
            <Metadata
              metadataList={metadataList}
              title="Version Name (in Eng)"
              abbreviation="Abbreviation"
              mobileView={mobileView}
            ></Metadata>
            {audioIcon}
            {mobileView ? null : (
              <>
                <div className={classes.info} onClick={handleDialogOpen}>
                  <Tooltip title={t("menuBarPrintChapterToolTip")}>
                    <PrintIcon fontSize="small" />
                  </Tooltip>
                </div>
                <Tooltip title={t("menuBarFullScreenToolTip")}>
                  <div onClick={goFull} className={classes.info}>
                    <i className="material-icons md-23">zoom_out_map</i>
                  </div>
                </Tooltip>
              </>
            )}
            <div
              className={classes.settings}
              aria-label="More"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={openSettings}
            >
              <i className="material-icons md-23">settings</i>
            </div>
            <Setting
              fontSize={fontSize}
              fontFamily={fontFamily}
              lineView={lineView}
              isHoverVerse={isHoverVerse}
              setValue={setValue}
              settingsAnchor={settingsAnchor}
              handleClose={closeSettings}
              printRef={printRef}
              printNotes={printNotes}
              setPrintNotes={setPrintNotes}
              printHighlights={printHighlights}
              setPrintHighlights={setPrintHighlights}
              bookDisplay={bookDisplay}
              chapter={chapter}
              paneNo={paneNo}
            />
            {mobileView && paneNo === 1 ? (
              <div
                className={classes.infoParall}
                onClick={toggleParallelScroll}
              >
                {parallelScroll ? (
                  <Tooltip title={t("studyParallelScrollToolTip")}>
                    <ParallelScroll
                      fontSize="large"
                      style={{ color: BLACK }}
                      className={classes.parallelScroll}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title={t("studyParallelScrollDisabledToolTip")}>
                    <ParallelScroll
                      fontSize="large"
                      color="disabled"
                      className={classes.parallelScroll}
                    />
                  </Tooltip>
                )}
              </div>
            ) : (
              ""
            )}
            {paneNo === 2 ? <Close /> : ""}
          </Box>
        ) : (
          ""
        )}
      </Box>

      <Print
        dialogOpen={dialogOpen}
        handleDialogClose={handleDialogClose}
        bookDisplay={bookDisplay}
        printRef={printRef}
        setPrintNotes={setPrintNotes}
        setPrintHighlights={setPrintHighlights}
        printNotes={printNotes}
        printHighlights={printHighlights}
        chapter={chapter}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    versions: state.local.versions,
    versionBooks: state.local.versionBooks,
    userDetails: state.local.userDetails,
    versionSource: state.local.versionSource,
    parallelView: state.local.parallelView,
    mobileView: state.local.mobileView,
    parallelScroll: state.local.parallelScroll,
    errorMessage: state.local.errorMessage,
  };
};
export default connect(mapStateToProps)(MenuBar);
