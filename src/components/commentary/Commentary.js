import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import CommentaryCombo from "./CommentaryCombo";
import Metadata from "../common/Metadata";
import { getCommentaryForChapter } from "../common/utility";
import parse from "html-react-parser";
import Close from "../common/Close";
import BookCombo from "../common/BookCombo";
import Viewer from "react-viewer";
import { LIGHTGREY } from "../../store/colorCode";
import { Paper } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 82,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    [theme.breakpoints.only("xs")]: {
      marginTop: (props) => (props.screenView === "single" ? 60 : 0),
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 60,
    },
  },
  title: {
    paddingLeft: 35,
    paddingBottom: 7,
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
  introTitle: {
    fontSize: "1.2rem",
    width: "100%",
  },
  introHeading: {
    display: "flex",
    border: "1px solid " + LIGHTGREY,
    padding: "10px 20px",
    boxShadow: theme.shadows[2],
  },
  introText: {
    margin: "0 6px",
    padding: "20px 20px 30px 30px",
  },
  text: {
    height: "calc(100vh - 203px)",
    marginTop: 2,
    marginBottom: 68,
    flexGrow: 1,
    color: "#464545",
    fontFamily: "Roboto,Noto Sans",
    overflow: "scroll",
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.01em",
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
      marginBottom: 45,
    },
    [theme.breakpoints.only("xs")]: {
      marginBottom: (props) => (props.screenView === "single" ? 45 : -15),
    },
  },
  verseText: {
    padding: "20px 20px 30px 30px",
  },
  message: {
    padding: "20px 15px 2px 15px",
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
  arrow: {
    borderRadius: 20,
    fontSize: "1.6rem",
    boxShadow: theme.shadows[2],
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
  const [showIntro, setShowIntro] = React.useState(false);

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
    bookShortName,
  } = props;
  const styleProps = {
    screenView: screenView,
  };

  const { t } = useTranslation();
  const classes = useStyles(styleProps);
  const { version, bookCode, chapter } = panel1;
  const [visible, setVisible] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const ref = {
    book: book,
    chapter: chapter,
  };
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
    const bookCodes = bookNames?.map((book) => book.book_code);
    if (bookNames && bookCodes.includes(bookCode)) {
      let bookObject = bookNames.find(
        (element) => element.book_code === bookCode
      );
      if (bookObject) {
        setBook(bookObject.short);
      }
    } else {
      setBook(bookShortName);
    }
  }, [bookCode, bookNames, bookShortName]);
  React.useEffect(() => {
    //Set bookNames based on commentary language
    if (Object.entries(commentary).length !== 0 && commentaries) {
      let langObject = commentaries.find((lang) => {
        return lang.commentaries.some((c) => {
          return c.sourceId === commentary.sourceId;
        });
      });
      setBookNames(versionBooks[langObject.languageCode]);
      //Set verse label
      const verseLabels = {
        english: "Verse",
        hindi: "पद",
        marathi: "वचन",
        gujarati: "કલામ",
      };
      setVerseLabel(verseLabels[langObject.language] || "Verse");
    }
    setBaseUrl(commentary?.metadata?.baseUrl || "");
  }, [commentaries, commentary, versionBooks, setBaseUrl]);
  //Remove leading break line
  const removeBr = useCallback((str) => {
    str = str.trim();
    return str.startsWith("<br>") ? str.slice(4) : str;
  }, []);

  const getImages = (str) => {
    const strArr = str.split("<img");
    const images = [];
    strArr.forEach((item, i) => {
      if (i !== 0) {
        const img = item.split("/>")[0];
        if (img.indexOf("src") !== 0) {
          const imgParts = img.split(/\s+/).find((e) => e.includes("src"));
          const src = imgParts?.replace("src=", "");

          images.push(src);
        }
      }
    });
    return images;
  };

  const setImages = useCallback(
    (str, imageArr) => {
      const imageObj = { text: str, images: imageArr };
      if (typeof str === "string" && baseUrl !== "") {
        str = str.replaceAll("base_url", baseUrl);
        const images = getImages(str);
        const newImages =
          images?.map((ele, i) => {
            const src = "src=" + ele;
            str = str.replace(src, ` data-index=${i + imageArr.length} ` + src);
            return { src: ele.replaceAll("'", "") };
          }) || [];
        imageObj.text = str;
        imageObj.images = imageArr ? imageArr.concat(newImages) : newImages;
      }
      return imageObj;
    },
    [baseUrl]
  );
  const getIntro = useCallback(
    (sourceId, bookCode) => {
      const setText = (commText) => {
        if (typeof commText.bookIntro === "string") {
          const intro = removeBr(commText.bookIntro);
          const introObj = setImages(intro, []);
          setCommentaryIntro({
            sourceId: sourceId,
            bookCode: bookCode,
            bookIntro: introObj.text,
            images: introObj.images,
          });
        }
      };
      if (sourceId) {
        getCommentaryForChapter(sourceId, bookCode, 1, setText);
      }
    },
    [setCommentaryIntro, setImages, removeBr]
  );
  const resetCommentaryIntro = useCallback(() => {
    setCommentaryIntro({
      sourceId: "",
      bookCode: "",
      bookIntro: "",
      images: [],
    });
  }, [setCommentaryIntro]);

  React.useEffect(() => {
    if (
      commentary.sourceId !== commentaryIntro.sourceId ||
      bookCode !== commentaryIntro.bookCode
    ) {
      if (commentaryIntro.bookIntro !== "") {
        resetCommentaryIntro();
      }
      getIntro(commentary.sourceId, bookCode);
    }
  }, [commentary, bookCode, commentaryIntro, getIntro, resetCommentaryIntro]);

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
  }, [commentary, bookCode, chapter]);

  const openImage = (event) => {
    const img = event.target;
    if (img?.getAttribute("data-index")) {
      setVisible(true);
      setActiveIndex(parseInt(img.getAttribute("data-index")));
    }
  };

  React.useEffect(() => {
    //If commentary object then set commentary text to show on UI
    const comm = commentaryObject;
    const VerseLabel = commentary.metadata?.VerseLabel;
    if (comm) {
      let commText = "";
      if (comm?.commentaries?.length > 0) {
        for (let item of comm.commentaries) {
          if (item.verse !== "0" && VerseLabel !== "False") {
            commText += "<span>" + verseLabel + " " + item.verse + "</span>";
          }
          commText += "<p>" + removeBr(item.text) + "</p>";
        }
      }
      console.log(commentaryIntro, "intro");
      if (commText !== "") {
        const imagesObj = setImages(commText, commentaryIntro.images);
        setCommentaryText(imagesObj.text);
        setCommentaryImages(imagesObj.images);
        setMessage("");
      } else {
        setCommentaryText("");
        if (commentaryIntro.bookIntro === "") {
          setMessage("unavailable");
        } else {
          setMessage("");
        }
      }
    }
  }, [
    commentary,
    commentaryObject,
    verseLabel,
    setImages,
    removeBr,
    commentaryIntro,
  ]);
  const toggleIntro = () => {
    setShowIntro((prev) => !prev);
  };
  return (
    <div className={classes.root}>
      <Box className={classes.title}>
        <Box flexGrow={1} className={classes.titleComment}>
          <Typography variant="h6">{t("studyCommentariesTitle")}</Typography>
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
            : t("studyNoCommentaryAvailable", { ref })}
        </h5>
      )}
      {commentaryIntro.bookIntro && (
        <div onClick={toggleIntro} className={classes.introHeading}>
          <Typography className={classes.introTitle}>
            {t("studyCommIntroTo")} {book}
          </Typography>
          {showIntro ? (
            <ExpandLessIcon className={classes.arrow} />
          ) : (
            <ExpandMoreIcon className={classes.arrow} />
          )}
        </div>
      )}
      <div onClick={openImage} className={classes.text}>
        {!message && (
          <Collapse in={showIntro} timeout={600}>
            <Paper elevation={4} className={classes.introText}>
              {parse(commentaryIntro.bookIntro)}
            </Paper>
          </Collapse>
        )}
        {!message && commentaryText && (
          <div ref={textRef} className={classes.verseText}>
            {parse(commentaryText)}
          </div>
        )}
      </div>
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
