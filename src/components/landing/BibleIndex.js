import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import BookCombo from "../common/BookCombo";
import Version from "../common/Version";
import BigTooltip from "../common/BigTooltip";
import { BLACK, GREY, WHITE } from "../../store/colorCode";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    marginBottom: -40,
    [theme.breakpoints.down("xs")]: {
      marginBottom: -10,
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  bibleIndex: {
    margin: "auto",
    position: "relative",
    bottom: 70,
    height: "auto",
    padding: "15px 30px",
    backgroundColor: WHITE,
    [theme.breakpoints.down("xs")]: {
      bottom: 25,
      width: "100%",
    },
  },
  iconSize: {
    fontSize: "3.75rem",
    color: BLACK,
  },
  button: {
    margin: theme.spacing(1.5),
    backgroundColor: "#fff",
    boxShadow: "1px 1px 1px 1px " + GREY,
    height: "42px",
    "& hover": {
      textDecoration: "none",
    },
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      width: "60%",
      marginTop: 0,
      marginBottom: 2,
    },
  },
  iconBox: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  heading: {
    color: BLACK,
    textAlign: "center",
    fontSize: 20,
    paddingTop: 10,
  },
  readContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      whiteSpace: "nowrap",
      alignItems: "center",
      justifyContent: "center",
    },
  },
}));

const BibleIndex = (props) => {
  const classes = useStyles();
  const classesI = `material-icons ${classes.iconSize}`;

  const { panel1, setValue, versionBooks, versionSource, mobileView } = props;
  const { version, book, bookCode, sourceId, chapter, language } = panel1;
  return (
    <div className={classes.container}>
      {mobileView ? (
        ""
      ) : (
        <Paper className={[classes.bibleIndex, classes.iconBox]} elevation={3}>
          <Link
            to={{
              pathname: "/read",
            }}
          >
            <i className={classesI}>local_library</i>
            <Typography variant="h5" gutterBottom className={classes.heading}>
              Read Bible
            </Typography>
          </Link>
        </Paper>
      )}
      <Paper className={classes.bibleIndex} elevation={3}>
        <Typography variant="h5" gutterBottom className={classes.heading}>
          Study the Bible in your Language
        </Typography>
        <div className={classes.readContainer}>
          <Version
            setValue={props.setValue}
            version={version}
            landingPage={true}
            bookCode={bookCode}
            language={language}
          />
          {bookCode !== "" && bookCode !== undefined ? (
            <BookCombo
              book={book}
              bookCode={bookCode}
              bookList={versionBooks[versionSource[sourceId]]}
              chapter={chapter}
              setValue={setValue}
              minimal={false}
              landingPage={true}
            />
          ) : (
            ""
          )}
          <Link
            to={{
              pathname: "/read",
            }}
          >
            <BigTooltip title="Click here to read the Bible">
              <Button variant="contained" className={classes.button}>
                READ
              </Button>
            </BigTooltip>
          </Link>
        </div>
      </Paper>
      {mobileView ? (
        ""
      ) : (
        <Paper className={[classes.bibleIndex, classes.iconBox]} elevation={3}>
          <Link
            to={{
              pathname: "/study",
              search: `version=${version}`,
            }}
          >
            <i className={classesI}>menu_book</i>
            <Typography variant="h5" gutterBottom className={classes.heading}>
              Study Bible
            </Typography>
          </Link>
        </Paper>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    panel1: state.local.panel1,
    versionBooks: state.local.versionBooks,
    versionSource: state.local.versionSource,
    mobileView: state.local.mobileView,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE1, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BibleIndex);
