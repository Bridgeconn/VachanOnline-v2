import React from "react";
import TopBar from "../read/TopBar";
import AudioCombo from "./AudioCombo";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Player from "../common/Player";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import * as actions from "../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, useMediaQuery, useTheme } from "@material-ui/core";
import { connect } from "react-redux";
import { getAllBooks, getAudioBibles } from "../common/utility";
import { nextButtonClick, previousClick } from "../common/utility";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 82,
    display: "flex",
    height: "100%",
    marginBottom: 10,
    [theme.breakpoints.down("sm")]: {
      marginTop: 60,
      marginBottom: 5,
      flexDirection: "column-reverse",
    },
    [theme.breakpoints.only("xs")]: {
      marginTop: 65,
      marginBottom: 0,
    },
  },
  prevChapter: {
    position: "absolute",
    cursor: "pointer",
    boxShadow: "rgb(0 0 0 / 50%) 0px 3px 10px 0px",
    borderRadius: "50%",
    backgroundColor: "rgb(255, 255, 255)",
    border: "1px white",
    padding: 7,
    [theme.breakpoints.up("md")]: {
      left: 40,
    },
    [theme.breakpoints.down("sm")]: {
      left: 10,
      top: "unset",
      bottom: "1.5rem",
    },
  },
  nextChapter: {
    position: "absolute",
    cursor: "pointer",
    boxShadow: "rgb(0 0 0 / 50%) 0px 3px 10px 0px",
    borderRadius: "50%",
    backgroundColor: "rgb(255, 255, 255)",
    border: "1px white",
    padding: 7,
    [theme.breakpoints.up("md")]: {
      right: 40,
    },
    [theme.breakpoints.down("sm")]: {
      right: 10,
      top: "unset",
      bottom: "1.5rem",
    },
  },
  gap: {
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      margin: "auto",
    },
  },
  playerGap: {
    padding: "0 10%",
    [theme.breakpoints.only("sm")]: {
      padding: "0 50px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: 5,
    },
  },
}));
const AudioBible = (props) => {
  const {
    panel1,
    setValue,
    setValue1,
    audioBible,
    versionBooks,
    setVersionBooks,
  } = props;
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [audios, setAudios] = React.useState(null);
  const [audioBooks, setAudioBooks] = React.useState([]);
  const { chapter, bookCode, language } = panel1;
  let audioBookList = audios ? audios[0]?.books : "";
  let chapters = new Array(audioBookList[bookCode]);
  React.useEffect(() => {
    //if versionBooks bibles not loaded fetch list of audio bibles
    if (Object.values(versionBooks).length === 0) {
      getAllBooks(setVersionBooks, setValue1, setValue, bookCode, chapter);
    }
  }, [bookCode, chapter, setValue, setValue1, setVersionBooks, versionBooks]);
  let languageCode =
    panel1 && panel1?.version?.split("-")[0]
      ? panel1?.version?.split("-")[0]
      : "hin";
  React.useEffect(() => {
    //if audio bibles not loaded fetch list of audio bibles
    if (audioBible.length === 0) {
      getAudioBibles(setValue);
    }
  }, [audioBible?.length, setValue, languageCode]);
  const getPrevious = () => {
    return (
      <ArrowBackIosIcon
        fontSize="large"
        className={classes.prevChapter}
        onClick={() =>
          previousClick(audioBooks, bookCode, chapter, setValue1, audioBookList)
        }
      />
    );
  };
  const getNext = () => {
    return (
      <ArrowForwardIosIcon
        fontSize="large"
        className={classes.nextChapter}
        onClick={() =>
          nextButtonClick(
            audioBooks,
            bookCode,
            chapter,
            setValue1,
            audioBookList
          )
        }
      />
    );
  };
  return (
    <>
      <AppBar position="fixed">
        <TopBar />
      </AppBar>
      <div className={classes.root}>
        <AudioCombo
          setAudios={setAudios}
          audioBooks={audioBooks}
          setAudioBooks={setAudioBooks}
          bookCode={bookCode}
          chapter={chapter}
          languageCode={languageCode}
          language={language}
          mobileView={isMobile}
        />
        {isMobile ? <Divider /> : ""}
        <Typography variant="h4" className={classes.gap}>
          Audio Bibles
        </Typography>
      </div>
      <Divider />
      <div className={classes.playerGap}>
        <Player
          audios={audios}
          bookCode={bookCode}
          chapter={chapter}
          languageCode={languageCode}
          audioBooks={audioBooks}
          isMobile={isMobile}
        />
        {audioBooks &&
        audioBooks[0]?.book_code === bookCode &&
        parseInt(chapter) === 1
          ? ""
          : getPrevious()}
        {audioBooks &&
        audioBooks[audioBooks.length - 1]?.book_code === bookCode &&
        chapters.length === parseInt(chapter)
          ? ""
          : getNext()}
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    panel1: state.local.panel1,
    audioBible: state.local.audioBible,
    versionBooks: state.local.versionBooks,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE, name: name, value: value }),
    setValue1: (name, value) =>
      dispatch({ type: actions.SETVALUE1, name: name, value: value }),
    setVersionBooks: (name, value) =>
      dispatch({ type: actions.ADDVERSIONBOOKS, name: name, value: value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioBible);
