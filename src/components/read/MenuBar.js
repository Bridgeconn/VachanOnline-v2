import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Grid from "@material-ui/core/Grid";
import Popover from "@material-ui/core/Popover";
import Setting from "../read/Setting";
import BookCombo from "../common/BookCombo";
import Version from "../common/Version";
const useStyles = makeStyles(theme => ({
  read: {
    padding: "0 8%",
    width: "100%",
    borderBottom: "1px solid #f1ecec"
  },
  select: {
    marginTop: "-8px",
    backgroundColor: "red"
  },
  info: {
    padding: 0,
    width: "40px",
    marginTop: 20,
    marginRight: "8px",
    color: "#1976D2",
    cursor: "pointer"
  },
  settings: {
    padding: 0,
    width: "40px",
    marginTop: 20,
    marginLeft: "-10px",
    marginRight: "-21px",
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
  content: {
    padding: 20,
    lineHeight: 2,
    fontSize: 16,
    backgroundColor: "#5181a9",
    color: "#fff"
  }
}));
const MenuBar = props => {
  const classes = useStyles();
  function goFull() {
    props.setFullscreen(true);
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleClick(event) {
    //uncomment below line to make the info buton work again
    //setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  const [settingsAnchor, setSettingsAnchor] = React.useState(null);
  function openSettings(event) {
    setSettingsAnchor(event.currentTarget);
  }
  function closeSettings() {
    setSettingsAnchor(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Grid container className={classes.read}>
      <Grid item xs={9}>
        <Version
          versions={props.versions}
          version={props.version}
          setValue={props.setValue}
          style={{ backgroundColor: "#000" }}
        />
        <BookCombo
          book={props.book}
          bookList={props.bookList}
          bookCode={props.bookCode}
          chapterList={props.chapterList}
          chapter={props.chapter}
          sourceId={props.sourceId}
          setValue={props.setValue}
        />
      </Grid>
      <Grid
        item
        xs={3}
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
          <i className="material-icons md-26">info_outline</i>
        </div>
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
          <div className={classes.content}>
            <h2>SvgIcon components</h2>
            It's interesting to have the building blocks needed to implement
            custom icons, but what about presets? We provide a separate npm
            package, @material-ui/icons, that includes the 1,000+ official
            Material icons converted to SvgIcon components. It's interesting to
            have the building blocks needed to implement custom icons, but what
            about presets? We provide a separate npm package,
            @material-ui/icons, that includes the 1,000+ official Material icons
            converted to SvgIcon components. It's interesting to have the
            building blocks needed to implement custom icons, but what about
            presets? We provide a separate npm package, @material-ui/icons, that
            includes the 1,000+ official Material icons converted to SvgIcon
            components.
          </div>
        </Popover>
        <div className={classes.info} onClick={goFull}>
          <i className="material-icons md-26">zoom_out_map</i>
        </div>
        <div
          className={classes.settings}
          aria-label="More"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={openSettings}
        >
          <i className="material-icons md-26">more_vert</i>
        </div>
        <Setting
          fontSize={props.fontSize}
          fontFamily={props.fontFamily}
          setValue={props.setValue}
          settingsAnchor={settingsAnchor}
          handleClose={closeSettings}
        />
      </Grid>
    </Grid>
  );
};
const mapStateToProps = state => {
  return {
    version: state.version,
    sourceId: state.sourceId,
    book: state.book,
    bookList: state.bookList,
    bookCode: state.bookCode,
    chapterList: state.chapterList,
    chapter: state.chapter,
    fontSize: state.fontSize,
    fontFamily: state.fontFamily,
    versions: state.versions
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE, name: name, value: value })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar);
