import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import makeStyles from '@mui/styles/makeStyles';
import BookCombo from "../common/BookCombo";
import Version from "../common/Version";
import BigTooltip from "../common/BigTooltip";
import { BLACK, GREY, WHITE } from "../../store/colorCode";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    marginBottom: -40,
    [theme.breakpoints.down('sm')]: {
      marginBottom: -10,
    },
  },
  bibleIndex: {
    margin: "auto",
    position: "relative",
    bottom: 70,
    height: "auto",
    padding: "15px 30px",
    backgroundColor: WHITE,
    [theme.breakpoints.down('sm')]: {
      bottom: 25,
      width: "100%",
    },
  },
  button: {
    margin: theme.spacing(1.5),
    backgroundColor: "#fff",
    boxShadow: "1px 1px 1px 1px " + GREY,
    height: "42px",
    "& hover": {
      textDecoration: "none",
    },
    [theme.breakpoints.down('md')]: {
      margin: 0,
      width: "60%",
      marginTop: 0,
      marginBottom: 2,
    },
    [theme.breakpoints.only("sm")]: {
      margin: theme.spacing(1.5),
    },
  },
  heading: {
    color: BLACK,
    textAlign: "center",
    fontSize: 20,
    paddingTop: 10,
  },
  readContainer: {
    [theme.breakpoints.down('md')]: {
      display: "flex",
      whiteSpace: "nowrap",
      alignItems: "center",
      justifyContent: "center",
    },
  },
}));

const BibleIndex = (props) => {
  const classes = useStyles();
  const { panel1, setValue, versionBooks, versionSource } = props;
  const { version, book, bookCode, sourceId, chapter, verseData, language } =
    panel1;

  const { t } = useTranslation();
  return (
    <div className={classes.container}>
      <Paper className={classes.bibleIndex} elevation={3}>
        <Typography variant="h5" gutterBottom className={classes.heading}>
          {t("landingSelectBibleHeading")}
        </Typography>
        <div className={classes.readContainer}>
          <Version
            setValue={props.setValue}
            version={version}
            landingPage={true}
            bookCode={bookCode}
            chapter={chapter}
            verseData={verseData}
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
              pathname: "/study",
            }}
          >
            <BigTooltip title={t("landingStartBtnToolTip")}>
              <Button variant="contained" className={classes.button}>
                {t("landingStartBtn")}
              </Button>
            </BigTooltip>
          </Link>
        </div>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    panel1: state.local.panel1,
    versionBooks: state.local.versionBooks,
    versionSource: state.local.versionSource,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE1, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BibleIndex);
