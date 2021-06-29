import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { getAudioBibleObject } from "../common/utillity";
import Setting from "../read/Setting";
import BookCombo from "../common/BookCombo";
import Version from "../common/Version";
import Metadata from "../common/Metadata";
import Bookmark from "../bookmark/Bookmark";
import Highlight from "../highlight/Highlight";
import NoteIcon from "@material-ui/icons/NoteOutlined";
import BorderColor from "@material-ui/icons/BorderColor";
import Note from "../note/Note";
import Tooltip from "@material-ui/core/Tooltip";
import { BLUETRANSPARENT } from "../../store/colorCode";
import Close from "../common/Close";

const useStyles = makeStyles((theme) => ({
  read: {
    padding: "0 10px 0 44px",
    width: "100%",
    borderBottom: "1px solid #f1ecec",
    position: "absolute",
    height: 61,
    top: 72,
    [theme.breakpoints.only("xs")]: {
      padding: "0 15px 0 15px",
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
    color: BLUETRANSPARENT,
    cursor: "pointer",
  },
  settings: {
    padding: 0,
    width: "30px",
    marginTop: 20,
    marginLeft: "-10px",
    marginRight: "-5px",
    color: BLUETRANSPARENT,
    cursor: "pointer",
  },
  items: {
    float: "right",
  },
  closeButton: {
    marginRight: 5,
    marginTop: 17,
  },
}));
const MenuBar = (props) => {
  const classes = useStyles();
  let {
    setValue,
    paneNo,
    setFullscreen,
    versions,
    version,
    sourceId,
    chapter,
    versionBooks,
    versionSource,
    fontSize,
    fontFamily,
    lineView,
    bookCode,
    audio,
    userDetails,
    selectedVerses,
    setSelectedVerses,
    refUrl,
    highlights,
  } = props;
  function goFull() {
    setFullscreen(true);
  }
  const [settingsAnchor, setSettingsAnchor] = React.useState(null);
  const [metadataList, setMetadataList] = React.useState(null);
  const [audioBible, setAudioBible] = React.useState({});
  const [audioIcon, setAudioIcon] = React.useState("");
  const [bookmarkIcon, setBookmarkIcon] = React.useState("");
  const [highlightIcon, setHighlightIcon] = React.useState("");
  const [noteIcon, setNoteIcon] = React.useState("");
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
          <Tooltip title="Select Verses">
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
          <Tooltip title="Select Verses">
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
  ]);
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
        (e) => e.languageVersions[0].language.code === language[0]
      );
      if (languageVersions !== undefined) {
        const versionObject = languageVersions.languageVersions.find(
          (e) => e.version.code === language[1]
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
      setValue("audioBible", audioBible);
    };
    if (audioBible && audioBible.url && bookCode in audioBible.books) {
      setAudioIcon(
        <Tooltip title="Audio Bible">
          <div className={classes.info} onClick={openAudioBible}>
            <i className="material-icons md-23">volume_up</i>
          </div>
        </Tooltip>
      );
    } else {
      setValue("audio", false);
      setAudioIcon("");
    }
  }, [audio, audioBible, bookCode, classes.info, setValue]);
  return (
    <Grid container className={classes.read}>
      <Grid item xs={6}>
        <Version setValue={setValue} version={version} bookCode={bookCode} />
        {bookCode ? (
          <BookCombo
            paneNo={paneNo}
            bookCode={bookCode}
            bookList={versionBooks[versionSource[sourceId]]}
            chapter={chapter}
            setValue={setValue}
            minimal={true}
          />
        ) : (
          ""
        )}
      </Grid>
      <Grid
        item
        xs={6}
        className={classes.items}
        container
        alignItems="flex-start"
        justify="flex-end"
        direction="row"
      >
        {noteIcon}
        {highlightIcon}
        {bookmarkIcon}
        <Metadata
          metadataList={metadataList}
          title="Version Name (in Eng)"
          abbreviation="Abbreviation"
        ></Metadata>
        {audioIcon}
        <Tooltip title="Fullscreen">
          <div className={classes.info} onClick={goFull}>
            <i className="material-icons md-23">zoom_out_map</i>
          </div>
        </Tooltip>
        <Tooltip title="Settings">
          <div
            className={classes.settings}
            aria-label="More"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={openSettings}
          >
            <i className="material-icons md-23">more_vert</i>
          </div>
        </Tooltip>
        <Setting
          fontSize={fontSize}
          fontFamily={fontFamily}
          lineView={lineView}
          setValue={setValue}
          settingsAnchor={settingsAnchor}
          handleClose={closeSettings}
        />
        {paneNo === 2 ? <Close className={classes.closeButton} /> : ""}
        {/* <div className={classes.info}>
          <i
            className="material-icons"
            style={{ fontSize: "24px", marginTop: "-2px" }}
          >
            close
          </i>
        </div> */}
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    versions: state.local.versions,
    versionBooks: state.local.versionBooks,
    userDetails: state.local.userDetails,
    versionSource: state.local.versionSource,
  };
};
export default connect(mapStateToProps)(MenuBar);
