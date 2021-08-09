import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import CommentaryCombo from "./CommentaryCombo";
import Metadata from "../common/Metadata";
import { getCommentaryForChaper } from "../common/utillity";
import parse from "html-react-parser";
import Close from "../common/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 82,
  },
  title: {
    paddingLeft: 35,
    paddingBottom: 8,
    marginBottom: 20,
    borderBottom: "1px solid #f1ecec",
    display: "flex",
    width: "100%",
  },
  text: {
    position: "absolute",
    right: 0,
    left: 35,
    paddingRight: 20,
    paddingTop: 20,
    top: 135,
    bottom: 0,
    textAlign: "justify",
    color: "#464545",
    fontFamily: "Roboto,Noto Sans",
    overflow: "scroll",
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.00938em",
    marginBottom: -15,
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(0,0,0,.4) #eeeeee95",
    "& span": {
      fontWeight: 600,
      display: "block",
    },
    "& p": {
      marginBottom: 10,
    },
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
    "& img": {
      float: "right",
      marginLeft: 30,
      maxWidth: "70%",
      margin: "30px 0px",
    },
  },
  loading: {
    paddingLeft: 20,
  },
  bookLabel: {
    paddingLeft: 20,
    verticalAlign: "middle",
    fontSize: 20,
    display: "inline-block",
  },
  icons: {
    display: "flex",
    marginTop: 4,
    marginLeft: -5,
  },
  metadata: {
    marginLeft: "auto",
    display: "inline-block",
    marginTop: -14,
  },
  closeButton: {
    marginRight: 10,
    marginTop: -6,
  },
}));

const Commentary = (props) => {
  const classes = useStyles();
  const [commentaryText, setCommentaryText] = React.useState("");
  const [commentaryObject, setCommentaryObject] = React.useState([]);
  const [verseLabel, setVerseLabel] = React.useState("Verse");
  const [book, setBook] = React.useState("");
  const [baseUrl, setBaseUrl] = React.useState("");
  const [bookNames, setBookNames] = React.useState([]);
  let { panel1, commentaries, setCommentary, commentary, versionBooks } = props;
  let { version, bookCode, chapter } = panel1;

  const textRef = React.useRef();
  React.useEffect(() => {
    //if no commentary selected set current language commentary
    if (Object.entries(commentary).length === 0 && commentaries[0]) {
      let language = version.split("-")[0];
      let comm = commentaries.find((c) => {
        return c.languageCode === language;
      });
      if (comm === undefined) {
        comm = commentaries[0].commentaries[0];
      } else {
        comm = comm.commentaries[0];
      }
      setCommentary(comm);
    }
  }, [version, commentary, commentaries, setCommentary]);
  React.useEffect(() => {
    if (bookNames) {
      let bookObject = bookNames.find(
        (element) => element.book_code === bookCode
      );
      if (bookObject) {
        setBook(bookObject.short);
      }
    }
  }, [bookCode, bookNames]);
  React.useEffect(() => {
    //Set bookNames based on commentary language
    if (Object.entries(commentary).length !== 0 && commentaries) {
      let langObject = commentaries.find((lang) => {
        let bool = lang.commentaries.some((c) => {
          return c.sourceId === commentary.sourceId;
        });
        return bool;
      });
      setBookNames(versionBooks[langObject.languageCode]);
      //Set verse label
      let label = "Verse";
      const verseLabels = {
        english: "Verse",
        hindi: "पद",
        marathi: "वचन",
        gujarati: "કલામ",
      };
      label = verseLabels[langObject.language] || label;
      setVerseLabel(label);
    }
    if (
      commentary.metadata !== undefined &&
      commentary.metadata.baseUrl !== undefined
    ) {
      setBaseUrl(commentary.metadata.baseUrl);
    } else {
      setBaseUrl("");
    }
  }, [commentaries, commentary, versionBooks, setBaseUrl]);

  React.useEffect(() => {
    //If book,chapter or commentary change get commentary text
    if (commentary && commentary.sourceId && bookCode && chapter) {
      getCommentaryForChaper(
        commentary.sourceId,
        bookCode,
        chapter,
        setCommentaryObject
      );
    }
    //Scroll to top on text change
    if (textRef.current !== undefined && textRef.current !== null)
      textRef.current.scrollTo(0, 0);
  }, [commentary, bookCode, chapter]);
  //Remove leading break line
  const removeBr = (str) => {
    str = str.trim();
    return str.startsWith("<br>") ? str.slice(4) : str;
  };
  React.useEffect(() => {
    const changeBaseUrl = (str) => {
      if (typeof str === "string" && baseUrl !== "") {
        return str.replaceAll("base_url", baseUrl);
      } else {
        return str;
      }
    };

    //If commentary object then set commentary text to show on UI
    if (commentaryObject) {
      let commText = "";
      if (commentaryObject.bookIntro) {
        commText += "<p>" + changeBaseUrl(commentaryObject.bookIntro) + "</p>";
      }
      if (commentaryObject.commentaries) {
        let item;
        for (item of commentaryObject.commentaries) {
          if (item.verse !== "0") {
            commText += "<span>" + verseLabel + " " + item.verse + "</span>";
          }
          commText += "<p>" + changeBaseUrl(removeBr(item.text)) + "</p>";
        }
      }
      setCommentaryText(commText);
    }
  }, [baseUrl, commentaryObject, verseLabel]);
  return (
    <div className={classes.root}>
      <Box className={classes.title}>
        <Box flexGrow={1}>
          <Typography variant="h6">Commentaries</Typography>
        </Box>
        <Box flexGrow={1}>
          <CommentaryCombo
            commentaries={props.commentaries}
            commentary={props.commentary}
            setCommentary={props.setCommentary}
          />
          <Typography className={classes.bookLabel}>
            {book} {chapter}
          </Typography>
        </Box>

        <Box className={classes.icons}>
          <div className={classes.metadata}>
            <Metadata
              metadataList={commentary.metadata}
              title="Version Name (in Eng)"
              abbreviation="Abbreviation"
            ></Metadata>
          </div>
          <Close className={classes.closeButton} />
        </Box>
      </Box>
      {commentaryText.length === 0 ? (
        <h3 className={classes.loading}>Loading</h3>
      ) : (
        <div className={classes.text} ref={textRef}>
          {parse(commentaryText)}
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    commentaries: state.local.commentaries,
    commentary: state.local.commentary,
    panel1: state.local.panel1,
    versionBooks: state.local.versionBooks,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCommentary: (value) =>
      dispatch({ type: actions.SETVALUE, name: "commentary", value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Commentary);
