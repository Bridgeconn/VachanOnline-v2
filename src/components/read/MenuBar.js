import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
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
  function goFull() {
    props.setFullscreen(true);
  }
  const [settingsAnchor, setSettingsAnchor] = React.useState(null);
  const [metadataList, setMetadataList] = React.useState(null);
  let { setValue } = props;
  //function to open and close settings menu
  function openSettings(event) {
    setSettingsAnchor(event.currentTarget);
  }
  function closeSettings() {
    setSettingsAnchor(null);
  }
  //get metadata from versions object if version changed
  React.useEffect(() => {
    if (props.versions !== undefined) {
      const language = props.version.split("-");
      const versions = props.versions.find(e => e.language === language[0]);
      if (versions !== undefined) {
        const version = versions.languageVersions.find(
          e => (e.version.code = language[1])
        );
        setValue("languageCode", version.language.code);
        setMetadataList(version.metadata);
      }
    }
  }, [setValue, props.version, props.versions]);
  return (
    <Grid container className={classes.read}>
      <Grid item xs={10}>
        <Version setValue={setValue} version={props.version} />
        <BookCombo
          book={props.book}
          bookList={props.versionBooks[props.sourceId]}
          chapter={props.chapter}
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
          fontSize={props.fontSize}
          fontFamily={props.fontFamily}
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
