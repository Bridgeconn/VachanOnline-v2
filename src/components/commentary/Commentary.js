import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import CommentaryCombo from "./CommentaryCombo";
import Metadata from "../common/Metadata";
import { getCommentaryBookIntro, getCommentaryForChapter } from "../common/utility";
import parse from "html-react-parser";
import Close from "../common/Close";
import BookCombo from "../common/BookCombo";
import Viewer from "react-viewer";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useCallback } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 82,
    [theme.breakpoints.only("xs")]: {
      marginTop: (props) => (props.screenView === "single" ? 60 : 0),
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 60,
    },
  },
  title: {
    paddingLeft: 35,
    paddingBottom: 8,
    marginBottom: 20,
    borderBottom: "1px solid #f1ecec",
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 5,
      paddingBottom: 0,
      marginBottom: 0,
      alignItems: "center",
      boxShadow: theme.shadows[1],
    },
  },
  titleComment: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  introTitle:{
    fontSize: "1rem",
    fontWeight: 400,
    fontFamily: "Roboto,Noto Sans",
    color: "#464545",
  },
  commIntro:{
    fontFamily: "Roboto,Noto Sans",
    //width:"100%",
    height:"100%",
    fontSize: "1rem",
    paddingLeft:5,
    paddingTop:0,
    marginLeft:2,
    marginTop:0,
    overflow: "auto",
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
    [theme.breakpoints.only("sm")]: {
      top: 123,
    },
    [theme.breakpoints.only("xs")]: {
      top: (props) => (props.screenView === "single" ? 122 : 62),
    },
  },
  text: {
    position: "flex",
    right: 0,
    left: 35,
    paddingLeft:20,
    paddingRight: 20,
    paddingTop: 5,
    height: "500px", 
    top: 200,
    bottom: 0,
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
    [theme.breakpoints.only("sm")]: {
      top: 123,
    },
    [theme.breakpoints.only("xs")]: {
      top: (props) => (props.screenView === "single" ? 122 : 62),
    },
  },
  message: {
    paddingLeft: 20,
  },
  bookLabel: {
    paddingLeft: 20,
    verticalAlign: "middle",
    fontSize: 20,
    display: "inline-block",
    [theme.breakpoints.down("md")]: {
      fontSize: 16,
      paddingLeft: 5,
    },
  },
  bookNameBox: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      alignItems: "center",
    },
    [theme.breakpoints.down("md")]: {
      whiteSpace: "nowrap",
    },
  },
  icons: {
    display: "flex",
    marginTop: 4,
    marginLeft: -5,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  metadata: {
    marginLeft: "auto",
    display: "inline-block",
    marginTop: -14,
  },
  closeButton: {
    marginRight: 10,
    marginTop: -6,
    [theme.breakpoints.down("sm")]: {
      marginTop: "0.2rem",
    },
  },
}));

const Commentary = (props) => {
  const [commentaryText, setCommentaryText] = React.useState("");
  const [commentaryObject, setCommentaryObject] = React.useState();
  const [verseLabel, setVerseLabel] = React.useState("Verse");
  const [book, setBook] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [baseUrl, setBaseUrl] = React.useState("");
  const [bookNames, setBookNames] = React.useState([]);
  const [commentaryImages, setCommentaryImages] = React.useState([]);
  const [chapterIntro, setChapterIntro] = React.useState("");

  let {
    panel1,
    commentaries,
    setCommentary,
    commentaryIntro,
    setCommentaryIntro,
    setCommentaryLang,
    commentary,
    versionBooks,
    mobileView,
    setValue,
    screenView,
  } = props;
  const styleProps = {
    screenView: screenView,
  };
  const classes = useStyles(styleProps);
  const { version, bookCode, chapter } = panel1;
  const [visible, setVisible] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

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
      setCommentaryLang(comm.metadata["Language Name"].toLowerCase());
    }
  }, [version, commentary, commentaries, setCommentary, setCommentaryLang]);
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
      commentary.metadata?.baseUrl !== undefined
    ) {
      setBaseUrl(commentary.metadata.baseUrl);
    } else {
      setBaseUrl("");
    }
  }, [commentaries, commentary, versionBooks, setBaseUrl]);
  const removeBr = useCallback((str) => {
    str = str.trim();
    return str.startsWith("<br>") ? str.slice(4) : str;
  },[]);
  const setImages = useCallback((str) => {
    if (typeof str === "string" && baseUrl !== "") {
      str = str.replaceAll("base_url", baseUrl);
      const rex = /(?<=src=)"?'?.*?\.(png|jpg)"?'?/g;
      const images = str.match(rex);
      const imagesArray = images?.map((ele, i) => {
        const src = "src=" + ele;
        str = str.replace(src, ` data-index=${i} ` + src);
        return { src: ele.replaceAll("'", "") };
      });
      setCommentaryImages(imagesArray);
    }
    return str;
  },[baseUrl]);
  React.useEffect(() =>{
      if (commentary.sourceId===commentaryIntro.sourceId && bookCode ===commentaryIntro.bookCode) {
          setChapterIntro(commentaryIntro.bookIntro)
      } else{
        getCommentaryBookIntro(
          commentary.sourceId,
          bookCode,
          setCommentaryIntro,
          setImages,
          removeBr,
        );
      }
  },[commentary, bookCode,commentaryIntro,setCommentaryIntro,setImages,removeBr])
  
  React.useEffect(() => {
    //If book,chapter or commentary change get commentary text
    if (commentary && commentary.sourceId && bookCode && chapter) {
      setMessage("loading");
      getCommentaryForChapter(
        commentary.sourceId,
        bookCode,
        chapter,
        setCommentaryObject
      );
      }
    //Scroll to top on text change
    if (textRef.current !== undefined && textRef.current !== null)
      textRef.current.scrollTo(0, 0);
  }, [commentary, bookCode, chapter, chapterIntro, setCommentaryIntro]);

  const openImage = (event) => {
    const img = event.target;
    if (img?.getAttribute("data-index")) {
      setVisible(true);
      setActiveIndex(parseInt(img.getAttribute("data-index")));
    }
  };
 
  React.useEffect(() => {
    //Remove leading break line
   
    //If commentary object then set commentary text to show on UI

    const comm = commentaryObject;
    const VerseLabel = commentary.metadata?.VerseLabel;
    if (comm) {
      let commText = "";
      // if (comm.bookIntro) {
      //   commText += "<p>" + comm.bookIntro + "</p>";
      // }
      if (comm?.commentaries?.length > 0) {
        for (let item of comm.commentaries) {
          if (item.verse !== "0" && VerseLabel !== "False") {
            commText += "<span>" + verseLabel + " " + item.verse + "</span>";
          }
          commText += "<p>" + removeBr(item.text) + "</p>";
        }
      }
      if (commText !== "") {
        setCommentaryText(setImages(commText));
        setMessage("");
      } else {
        setCommentaryText("");
        setMessage("unavailable");
      }
    }
  }, [baseUrl, commentary, commentaryObject, verseLabel, chapterIntro, bookCode, setCommentaryIntro, setImages,removeBr]);

  return (
    <div className={classes.root}>
      <Box className={classes.title}>
        <Box flexGrow={1} className={classes.titleComment}>
          <Typography variant="h6">Commentaries</Typography>
        </Box>
        <Box flexGrow={1} className={classes.bookNameBox}>
          <CommentaryCombo
            commentaries={props.commentaries}
            commentary={props.commentary}
            setCommentary={props.setCommentary}
          />
          {mobileView && screenView === "single" ? (
            <BookCombo
              bookCode={bookCode}
              bookList={bookNames}
              chapter={chapter}
              setValue={setValue}
              minimal={true}
            />
          ) : (
            <Typography className={classes.bookLabel}>
              {book} {chapter}
            </Typography>
          )}
        </Box>

        <Box className={classes.icons}>
          <div className={classes.metadata}>
            <Metadata
              metadataList={commentary.metadata}
              title="Version Name (in Eng)"
              abbreviation="Abbreviation"
              mobileView={mobileView}
            ></Metadata>
          </div>
          <Close className={classes.closeButton} />
        </Box>
      </Box>
      {commentaryImages ? (
        <Viewer
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          images={commentaryImages}
          activeIndex={activeIndex}
          scalable={false}
        />
      ) : (
        ""
      )}
      {message && (
        <h5 className={classes.message}>
          {message === "loading"
            ? "Loading"
            : `No commentary available for ${book} ${chapter}`}
        </h5>
      )}
      {commentaryIntro.bookIntro && (
      <Accordion className={classes.commIntro}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.introTitle}><b>Introduction to {book}</b></Typography>
        </AccordionSummary>
        <AccordionDetails  className={classes.commIntro}>
          {parse(commentaryIntro.bookIntro)}
        </AccordionDetails>
      </Accordion>
      )}
      {!message && commentaryText && (
        <div className={classes.text} ref={textRef} onClick={openImage}>
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
    mobileView: state.local.mobileView,
    commentaryIntro: state.local.commentaryIntro,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCommentary: (value) =>
      dispatch({ type: actions.SETVALUE, name: "commentary", value: value }),
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE1, name: name, value: value }),
    setCommentaryLang: (val) =>
      dispatch({ type: actions.SETVALUE, name: "commentaryLang", value: val }),
    setCommentaryIntro: (val) =>
      dispatch({ type: actions.SETVALUE, name: "commentaryIntro", value: val }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Commentary);
