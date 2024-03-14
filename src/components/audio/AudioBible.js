import React from "react";
import TopBar from "../read/TopBar";
import AudioCombo from "./AudioCombo";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Player from "../common/Player";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import * as actions from "../../store/actions";
import { AppBar, useMediaQuery, Box } from "@mui/material";
import { connect } from "react-redux";
import { getAllBooks, getAudioBibles } from "../common/utility";
import { nextButtonClick, previousClick } from "../common/utility";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";

const ArrowForward = styled(ArrowForwardIosIcon)(({ theme }) => ({
  position: "absolute",
  cursor: "pointer",
  boxShadow: "rgb(0 0 0 / 50%) 0px 3px 10px 0px",
  borderRadius: "50%",
  backgroundColor: "rgb(255, 255, 255)",
  border: "1px white",
  padding: "7px",
  [theme.breakpoints.up("md")]: {
    right: "40px",
  },
  [theme.breakpoints.down("md")]: {
    right: "10px",
    top: "unset",
    bottom: "1.5rem",
  },
}));
const ArrowBackward = styled(ArrowBackIosIcon)(({ theme }) => ({
  position: "absolute",
  cursor: "pointer",
  boxShadow: "rgb(0 0 0 / 50%) 0px 3px 10px 0px",
  borderRadius: "50%",
  backgroundColor: "rgb(255, 255, 255)",
  border: "1px white",
  padding: "7px",
  [theme.breakpoints.up("md")]: {
    left: "40px",
  },
  [theme.breakpoints.down("md")]: {
    left: "10px",
    top: "unset",
    bottom: "1.5rem",
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
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [audios, setAudios] = React.useState(null);
  const [audioBooks, setAudioBooks] = React.useState([]);
  const { chapter, bookCode, language } = panel1;
  const { t } = useTranslation();
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
      <ArrowBackward
        fontSize="large"
        onClick={() =>
          previousClick(audioBooks, bookCode, chapter, setValue1, audioBookList)
        }
      />
    );
  };
  const getNext = () => {
    return (
      <ArrowForward
        fontSize="large"
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
      <Box
        sx={{
          width: "100%",
          marginTop: "82px",
          display: "flex",
          height: "100%",
          marginBottom: "10px",
          [theme.breakpoints.down("md")]: {
            marginTop: "60px",
            marginBottom: "5px",
            flexDirection: "column-reverse",
          },
          [theme.breakpoints.only("xs")]: {
            marginTop: "65px",
            marginBottom: 0,
          },
        }}
      >
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
        <Typography
          variant="h4"
          sx={{
            margin: "0 auto",
            [theme.breakpoints.down("md")]: {
              margin: "auto",
              paddingTop: "10px",
            },
          }}
        >
          {t("audioBibleText")}
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          padding: "0 10%",
          [theme.breakpoints.only("sm")]: {
            padding: "0 50px",
          },
          [theme.breakpoints.down("sm")]: {
            padding: "5px",
          },
        }}
      >
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
      </Box>
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
