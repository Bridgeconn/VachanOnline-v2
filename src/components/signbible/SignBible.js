import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Close from "../common/Close";
import Box from "@material-ui/core/Box";
import ReactPlayer from "react-player";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as views from "../../store/views";
import BookCombo from "../common/BookCombo";

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
    "&:last-child": {
      [theme.breakpoints.down("sm")]: {
        paddingBottom: 0,
      },
    },
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
    maxHeight: "80vh",
    boxSizing: "content-box",
  },
  title: {
    paddingTop: 4,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  closeButton: {
    marginRight: 15,
    marginTop: 7,
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
  const classes = useStyles(styleProps);
  const [message, setMessage] = useState("");
  const [videos, setVideos] = useState();
  const [playing, setPlaying] = useState("");
  const { bookCode, chapter, sourceId } = panel1;

  const theme = useTheme();
  const mobileLandscape = useMediaQuery(theme.breakpoints.down("sm"));
  const heading = mobileLandscape ? "ISLV" : "Sign Language Bible (ISLV)";

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
        setMessage(
          `Sign Language Bible available only for some books of the Bible. Use the book dropdown in the other panel to navigate.`
        );
      }
      setPlaying();
    }
  }, [signBible, bookCode, chapter, book]);
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
              bookList={versionBooks[versionSource[sourceId]]}
              minimal={true}
            />
          ) : (
            <Typography variant="h6">
              {book} {chapter}
            </Typography>
          )}
        </Box>
        <Box>
          <Close className={classes.closeButton} />
        </Box>
      </Box>
      <div className={classes.container}>
        <>
          {videos &&
            videos?.map((video, i) => {
              return (
                <Card className={classes.video} key={i}>
                  <ReactPlayer
                    playing={playing === video["url"]}
                    onPlay={() => setPlaying(video["url"])}
                    url={video["url"]}
                    controls={true}
                    width="100%"
                    className={classes.player}
                  />
                  <CardContent className={classes.titleContainer}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      title={video["title"]}
                      className={classes.title}
                    >
                      {video["title"]}
                    </Typography>
                  </CardContent>
                </Card>
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
  };
};
export default connect(mapStateToProps)(SignBible);
