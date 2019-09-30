import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import API from "../../store/api";
import { nextChapter, previousChapter } from "../common/utillity";
const useStyles = makeStyles(theme => ({
  biblePanel: {
    lineHeight: 2,
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
    paddingRight: "35px",
    textAlign: "justify",
    paddingTop: 20,
    height: "100%",
    overflow: "auto"
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
    right: 14,
    cursor: "pointer"
  },
  loading: {
    padding: 20
  }
}));
const Bible = props => {
  const fontFamily =
    props.fontFamily === "Sans" ? "Roboto,Noto Sans" : "Roboto Slab,Martel";
  const [verses, setVerses] = React.useState([]);
  const [loadingText, setLoadingText] = React.useState("Loading");
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    if (props.sourceId && props.bookCode && props.chapter) {
      //code to get chatper content if version, book or chapter changed
      setIsLoading(true);
      setLoadingText("Loading");
      API.get(
        "bibles/" +
          props.sourceId +
          "/books/" +
          props.bookCode +
          "/chapter/" +
          props.chapter
      )
        .then(function(response) {
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
  }, [props.sourceId, props.bookCode, props.chapter]);

  //Function to load previous chapter
  const prevClick = () => {
    if (!isLoading) {
      previousChapter(
        props.setValue,
        props.sourceId,
        props.chapterList,
        props.chapter,
        props.bookList,
        props.bookCode
      );
    }
  };
  //Function to load next chapter
  const nextClick = () => {
    if (!isLoading) {
      nextChapter(
        props.setValue,
        props.sourceId,
        props.chapterList,
        props.chapter,
        props.bookList,
        props.bookCode
      );
    }
  };
  const scrollText = () => {
    if (props.scroll) {
      props.scroll(props.paneNo);
    }
  };
  const classes = useStyles();
  return (
    <div
      className={classes.biblePanel}
      style={{
        fontFamily: fontFamily,
        fontSize: props.fontSize
      }}
    >
      {!isLoading && loadingText !== "Book not uploaded" ? (
        <div
          onScroll={() => {
            scrollText();
          }}
          ref={props.ref1}
          className={classes.bibleReadingPane}
        >
          {verses.map(item => (
            <span key={item.number}>
              <span>
                {item.number}. {item.text}
              </span>
            </span>
          ))}
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
          style={{ fontSize: "38px", color: "#777777" }}
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
          style={{ fontSize: "38px", color: "#777777" }}
        >
          keyboard_arrow_right
        </i>
      </div>
    </div>
  );
};
export default Bible;
