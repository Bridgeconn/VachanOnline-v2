import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { getAudioBibleObject } from "../common/utillity";
import Setting from "../read/Setting";
import BookCombo from "../common/BookCombo";
import Version from "../common/Version";
import Metadata from "../common/Metadata";

const useStyles = makeStyles(theme => ({
  read: {
    padding: "0 15px 0 44px",
    width: "100%",
    borderBottom: "1px solid #f1ecec",
    position: "absolute",
    height: 61,
    top: 74,
    [theme.breakpoints.only("xs")]: {
      padding: "0 15px 0 15px"
    }
  },
  select: {
    marginTop: "-8px",
    backgroundColor: "red"
  },
  info: {
    padding: 0,
    width: "30px",
    marginTop: 20,
    marginRight: "8px",
    color: "#1976D2",
    cursor: "pointer"
  },
  settings: {
    padding: 0,
    width: "30px",
    marginTop: 20,
    marginLeft: "-10px",
    marginRight: "-5px",
    color: "#1976D2",
    cursor: "pointer"
  },
  items: {
    float: "right"
  }
}));
const MenuBar = props => {
  const classes = useStyles();
  let {
    setValue,
    setFullscreen,
    versions,
    version,
    sourceId,
    book,
    chapter,
    versionBooks,
    fontSize,
    fontFamily,
    bookCode,
    audio
  } = props;
  function goFull() {
    setFullscreen(true);
  }
  const [settingsAnchor, setSettingsAnchor] = React.useState(null);
  const [metadataList, setMetadataList] = React.useState(null);
  const [audioBible, setAudioBible] = React.useState({});
  const [audioIcon, setAudioIcon] = React.useState("");
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
      const languageVersions = versions.find(e => e.language === language[0]);
      if (languageVersions !== undefined) {
        const version = languageVersions.languageVersions.find(
          e => (e.version.code = language[1])
        );
        setValue("languageCode", version.language.code);
        setMetadataList(version.metadata);
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
        <div className={classes.info} onClick={openAudioBible}>
          <i className="material-icons md-23">volume_up</i>
        </div>
      );
    } else {
      setValue("audio", false);
      setAudioIcon("");
    }
  }, [audio, audioBible, bookCode, classes.info, setValue]);
  return (
    <Grid container className={classes.read}>
      <Grid item xs={10}>
        <Version setValue={setValue} version={version} />
        <BookCombo
          book={book}
          bookList={versionBooks[sourceId]}
          chapter={chapter}
          setValue={setValue}
          minimal={true}
        />
      </Grid>
      <Grid
        item
        xs={2}
        className={classes.items}
        container
        alignItems="flex-start"
        justify="flex-end"
        direction="row"
      >
        <Metadata
          metadataList={metadataList}
          title="Version Name (in Eng)"
          abbreviation="Abbreviation"
        ></Metadata>
        {audioIcon}
        <div className={classes.info} onClick={goFull}>
          <i className="material-icons md-23">zoom_out_map</i>
        </div>
        <div
          className={classes.settings}
          aria-label="More"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={openSettings}
        >
          <i className="material-icons md-23">more_vert</i>
        </div>
        <Setting
          fontSize={fontSize}
          fontFamily={fontFamily}
          setValue={setValue}
          settingsAnchor={settingsAnchor}
          handleClose={closeSettings}
        />
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
const mapStateToProps = state => {
  return {
    versions: state.versions,
    versionBooks: state.versionBooks
  };
};
export default connect(mapStateToProps)(MenuBar);
