import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import Paper from "@material-ui/core/Paper";
import Setting from "../read/Setting";
import BookCombo from "../common/BookCombo";
import Version from "../common/Version";
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
    justify: "flex-end",
    float: "right"
  },
  paper: {
    width: "80%"
  },
  metadataTitle: {
    fontSize: 26,
    padding: "5px 0 0 12px"
  },
  metadataTitleBar: {
    backgroundColor: "#2e639a",
    color: "#fff"
  },
  metadataHeading: {
    fontSize: 17,
    lineHeight: "28px",
    display: "block",
    textAlign: "end",
    fontWeight: 600
  },
  metadataText: {
    lineHeight: "28px",
    fontSize: 16,
    paddingLeft: 14
  },
  metadataRow: {
    "&:last-child": {
      marginBottom: 2
    },
    "&:nth-child(even)": {
      backgroundColor: "#cfd9e6"
    }
  },
  closeButton: {
    color: "inherit"
  }
}));
const MenuBar = props => {
  const classes = useStyles();
  function goFull() {
    props.setFullscreen(true);
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  //metadata information popup
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  const [settingsAnchor, setSettingsAnchor] = React.useState(null);
  const [metadataList, setMetadataList] = React.useState(null);
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
        setMetadataList(version.metadata);
      }
    }
  }, [props.version, props.versions]);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const checkLink = text => {
    return text.includes("http") ? (
      <Link href={text} target="_blank">
        {text}
      </Link>
    ) : (
      text
    );
  };
  return (
    <Grid container className={classes.read}>
      <Grid item xs={10}>
        <Version setValue={props.setValue} version={props.version} />
        <BookCombo
          book={props.book}
          bookList={props.versionBooks[props.sourceId]}
          chapter={props.chapter}
          setValue={props.setValue}
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
        <div
          aria-describedby={id}
          onClick={handleClick}
          className={classes.info}
        >
          <i className="material-icons md-23">info_outline</i>
        </div>
        {metadataList ? (
          <Popover
            id={id}
            className={classes.paper}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <Paper>
              <Grid
                justify="space-between" // Add it here :)
                container
                className={classes.metadataTitleBar}
              >
                <Grid item>
                  <Typography
                    type="title"
                    color="inherit"
                    className={classes.metadataTitle}
                  >
                    {metadataList["Version Name (in Eng)"] +
                      " (" +
                      metadataList["Abbreviation"] +
                      ")"}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    className={classes.closeButton}
                    size="medium"
                    onClick={() => {
                      setAnchorEl(null);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container>
                {Object.keys(metadataList)
                  .sort()
                  .map((item, i) => {
                    return item.trim() !== "" &&
                      metadataList[item].trim() !== "" ? (
                      <Grid
                        container
                        item
                        xs={12}
                        key={i}
                        alignItems="flex-start"
                        justify="flex-end"
                        className={classes.metadataRow}
                      >
                        <Grid item sm={4} className={classes.metadataHeading}>
                          {item}:
                        </Grid>
                        <Grid item sm={8} className={classes.metadataText}>
                          {checkLink(metadataList[item])}
                        </Grid>
                      </Grid>
                    ) : (
                      ""
                    );
                  })}
              </Grid>
            </Paper>
          </Popover>
        ) : (
          ""
        )}
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
          setValue={props.setValue}
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
