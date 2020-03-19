import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import API from "../../store/api";
import { connect } from "react-redux";
import { getBookbyCode } from "../common/utillity";
import ReactPlayer from "react-player";

const useStyles = makeStyles(theme => ({
  biblePanel: {
    lineHeight: 1.7,
    position: "absolute",
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    "& p": {
      textAlign: "justify",
      color: "#464545",
      marginBottom: 5
    },
    "& span": {
      textAlign: "justify",
      color: "#464545"
    }
  },
  bibleReadingPane: {
    position: "absolute",
    right: 0,
    left: 44,
    paddingRight: 42,
    textAlign: "justify",
    paddingTop: 20,
    height: "100%",
    overflow: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.45em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.4)",
      outline: "1px solid slategrey"
    }
  },
  audio: {
    height: "calc(100% - 55px)"
  },
  prevChapter: {
    position: "absolute",
    top: "45%",
    left: 3,
    cursor: "pointer"
  },
  nextChapter: {
    position: "absolute",
    top: "45%",
    right: 6,
    cursor: "pointer"
  },
  loading: {
    padding: 20
  },
  player: {
    position: "absolute",
    bottom: "16px",
    left: "2%"
  }
}));
const Bible = props => {
  const fontFamily =
    props.fontFamily === "Sans" ? "Roboto,Noto Sans" : "Roboto Slab,Martel";
  const [verses, setVerses] = React.useState([]);
  const [loadingText, setLoadingText] = React.useState("Loading");
  const [isLoading, setIsLoading] = React.useState(true);
  const [previous, setPrevious] = React.useState({});
  const [next, setNext] = React.useState({});
  const [audioUrl, setAudioUrl] = React.useState("");
  let {
    sourceId,
    bookCode,
    chapter,
    audio,
    audioBible,
    setValue,
    scroll,
    paneNo,
    parallelScroll,
    setSync,
    fontSize
  } = props;
  React.useEffect(() => {
    if (sourceId && bookCode && chapter) {
      //code to get chapter content if version(sourceId), book or chapter changed
      setIsLoading(true);
      setLoadingText("Loading");
      API.get(
        "bibles/" + sourceId + "/books/" + bookCode + "/chapter/" + chapter
      )
        .then(function(response) {
          setPrevious(response.data.previous);
          setNext(response.data.next);
          if (response.data.chapterContent === undefined) {
            setLoadingText("Book not uploaded");
          } else {
            setVerses(response.data.chapterContent.verses);
          }
          setIsLoading(false);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }, [sourceId, bookCode, chapter]);
  React.useEffect(() => {
    if (audio) {
      setAudioUrl(
        audioBible.url + bookCode + "/" + chapter + "." + audioBible.format
      );
    }
  }, [audio, audioBible, bookCode, chapter]);
  //Function to load previous chapter
  const prevClick = () => {
    if (!isLoading && Object.keys(previous).length > 0) {
      setValue("chapter", previous.chapterId);
      setValue("bookCode", previous.bibleBookCode);
      let book = getBookbyCode(previous.bibleBookCode);
      setValue("book", book.book);
    }
  };
  //Function to load next chapter
  const nextClick = () => {
    if (!isLoading && Object.keys(next).length > 0) {
      setValue("chapter", next.chapterId);
      setValue("bookCode", next.bibleBookCode);
      let book = getBookbyCode(next.bibleBookCode);
      setValue("book", book.book);
    }
  };
  const scrollText = () => {
    if (scroll) {
      scroll(paneNo, parallelScroll, setSync);
    }
  };
  const classes = useStyles();
  return (
    <div
      className={classes.biblePanel}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize
      }}
    >
      {!isLoading && loadingText !== "Book not uploaded" ? (
        <div>
          <div
            onScroll={() => {
              scrollText();
            }}
            ref={props.ref1}
            className={
              audio
                ? `${classes.bibleReadingPane} ${classes.audio}`
                : classes.bibleReadingPane
            }
          >
            {verses.map(item => (
              <span key={item.number}>
                <span>
                  {item.number}. {item.text}
                </span>
              </span>
            ))}
          </div>
          {audio ? (
            <ReactPlayer
              url={audioUrl}
              controls
              width="96%"
              height="50px"
              className={classes.player}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        <h3 className={classes.loading}>{loadingText}</h3>
      )}
      <div
        color="default"
        aria-label="Add"
        className={classes.prevChapter}
        onClick={prevClick}
      >
        <i
          className="material-icons material"
          style={{ fontSize: "38px", color: "#555555", opacity: 0.7 }}
        >
          navigate_before
        </i>
      </div>
      <div
        color="default"
        aria-label="Add"
        className={classes.nextChapter}
        onClick={nextClick}
      >
        <i
          className="material-icons material"
          style={{ fontSize: "38px", color: "#555555", opacity: 0.7 }}
        >
          keyboard_arrow_right
        </i>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    versionBooks: state.versionBooks,
    parallelScroll: state.parallelScroll
  };
};
export default connect(mapStateToProps)(Bible);
