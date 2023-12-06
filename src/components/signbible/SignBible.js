import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Close from "../common/Close";
import Box from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as views from "../../store/views";
import BookCombo from "../common/BookCombo";
import VideoCard from "../common/VideoCard";
import { useTranslation } from "react-i18next";
import { BLACK } from "../../store/colorCode";
import Help from "../common/Help";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "absolute",
    top: 72,
    bottom: 0,
    [theme.breakpoints.only("xs")]: {
      top: (props) => (props.parallelView === "DRAWERSIGNBIBLE" ? 60 : 0),
    },
    [theme.breakpoints.only("sm")]: {
      top: 61,
    },
  },
  container: {
    top: 60,
    bottom: -16,
    overflow: "scroll",
    position: "absolute",
    width: "100%",
    padding: "12px 10px 15px 10px",
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(0,0,0,.4) #eeeeee95",
    "&::-webkit-scrollbar": {
      width: "0.45em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.4)",
      outline: "1px solid slategrey",
    },
    [theme.breakpoints.down("sm")]: {
      top: 60,
    },
  },
  titleContainer: {
    padding: 12,
  },
  heading: {
    borderBottom: "1px solid #f1ecec",
    display: "flex",
    width: "100%",
    paddingBottom: 12,
    paddingLeft: 35,
    marginBottom: 20,
    height: 60,
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 0,
    },
  },
  video: {
    padding: 0,
    display: "inline-block",
    verticalAlign: "top",
    width: "100%",
    marginBlockStart: 10,
    maxHeight: "200vh",
    boxSizing: "content-box",
    boxShadow: "0 2px 6px 0 hsl(0deg 0% 47% / 60%)",
  },
  title: {
    paddingTop: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  description: {
    padding: "10px 10px 10px 20px",
    fontSize: 18,
  },
  closeButton: {
    marginRight: 15,
    marginTop: 7,
  },
  box: {
    display: "flex",
    alignItems: "center",
  },
  helpIcon: {
    padding: "8px 12px 0",
    color: BLACK,
    marginTop: 5,
    fontSize: 21,
  },
  message: {
    paddingLeft: 20,
  },
  player: {
    maxHeight: "calc(100vh - 150px)",
    [theme.breakpoints.down("sm")]: {
      maxHeight: 240,
    },
  },
}));
const SignBible = (props) => {
  let {
    book,
    signBible,
    setValue,
    versions,
    versionBooks,
    versionSource,
    panel1,
    mobileView,
    parallelView,
  } = props;
  const styleProps = {
    parallelView: parallelView,
  };
  const { t } = useTranslation();
  const classes = useStyles(styleProps);
  const [message, setMessage] = useState("");
  const [videos, setVideos] = useState();
  const [playing, setPlaying] = useState("");
  const { bookCode, chapter, sourceId } = panel1;
  const theme = useTheme();
  const mobileLandscape = useMediaQuery(theme.breakpoints.down("sm"));
  const heading = mobileLandscape ? t("ISLVTopBarBtnTab") : t("ISLVBibleText");
  function getBooks(bookName) {
    let books = Object.keys(signBible?.books);
    const filterByName = (item) => books?.includes(item?.book_code);
    return bookName.filter(filterByName);
  }

  useEffect(() => {
    if (versions.length > 0) {
      //Set default version to english for ISL
      let version = versions[0].languageVersions[0];
      try {
        version = versions
          .find((e) => e.language === "english")
          .languageVersions.find((e) => e.version.code === "ESV");
        if (version) {
          setValue(
            "version",
            version.language.code + "-" + version.version.code.toUpperCase()
          );
          setValue("sourceId", version.sourceId);
          setValue("versionCode", version.version.code.toLowerCase());
        }
      } catch (e) {
        //English ESV version not available
      }
    }
    if (!["gen", "mrk", "luk", "tit"].includes(bookCode)) {
      //Set to genesis 1 on page load as only Genesis, Mark, Luke and Titus are available now
      setValue("bookCode", "gen");
      setValue("chapter", 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue, versions]);
  useEffect(() => {
    if (signBible && bookCode) {
      let books = signBible["books"];
      if (
        books &&
        books.hasOwnProperty(bookCode) &&
        books[bookCode].hasOwnProperty(chapter)
      ) {
        setVideos(books[bookCode][chapter]);
        setMessage("");
      } else {
        setVideos();
        setMessage(t("signLangNotAvailableMsg"));
      }
      setPlaying();
    }
  }, [signBible, bookCode, chapter, book, t]);
  return (
    <div className={classes.root}>
      <Box className={classes.heading}>
        <Box flexGrow={1}>
          <Typography variant="h6">{heading}</Typography>
        </Box>
        <Box flexGrow={1}>
          {mobileView && parallelView === views.DRAWERSIGNBIBLE ? (
            <BookCombo
              bookCode={bookCode}
              chapter={chapter}
              setValue={setValue}
              bookList={getBooks(versionBooks[versionSource[sourceId]])}
              minimal={true}
            />
          ) : (
            <Typography variant="h6">
              {book} {chapter}
            </Typography>
          )}
        </Box>
        <Box className={classes.box}>
          <Help iconStyle={classes.helpIcon} url={"signLanguageBible"} />
          <Close className={classes.closeButton} />
        </Box>
      </Box>
      <div className={classes.container}>
        <>
          {videos &&
            videos?.map((video, i) => {
              return (
                <VideoCard
                  key={i}
                  video={video}
                  playing={playing}
                  setPlaying={setPlaying}
                />
              );
            })}
          {message && <h5 className={classes.message}>{message}</h5>}
        </>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    versionBooks: state.local.versionBooks,
    versionSource: state.local.versionSource,
    mobileView: state.local.mobileView,
    parallelView: state.local.parallelView,
    signBible: state.local.signBible,
  };
};
export default connect(mapStateToProps)(SignBible);
