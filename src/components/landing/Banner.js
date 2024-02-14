import React, { useEffect, useState } from "react";
import axios from "axios";
import banner from "../common/images/banner.jpg";
import { API } from "../../store/api";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions";
import { useTranslation } from "react-i18next";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import { languageCode } from "../../store/languageData";
import { BLACK, GREY, WHITE } from "../../store/colorCode";
import ShareIcon from "@material-ui/icons/Share";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { Button, Menu, Snackbar, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { capitalize } from "../common/utility";

const useStyles = makeStyles((theme) => ({
  heading: {
    position: "absolute",
    top: 72,
    color: WHITE,
    fontWeight: 800,
    fontFamily: "Sans",
    fontSize: "1.2rem",
    textShadow: "1px 1px 2px " + BLACK,
    background: BLACK + "50",
    borderRadius: 10,
    padding: "4px 15px",
    [theme.breakpoints.down("sm")]: {
      top: 70,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.1rem",
    },
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: "300px",
    backgroundImage: `url(${banner})`,
    backgroundRepeat: "round",
    display: "flex",
    justifyContent: "center",
  },
  verse: {
    position: "absolute",
    bottom: 80,
    width: "85%",
    fontSize: "1.25rem",
    fontFamily: "Roboto Slab",
    textAlign: "center",
    transition: "opacity 0.35s ease-in-out",
    background: "none",
    top: 105,
    [theme.breakpoints.only("md")]: {
      width: "80%",
      fontSize: "1.2rem",
    },
    [theme.breakpoints.down("sm")]: {
      top: 100,
      width: "90%",
      fontSize: "1.1rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
  reference: {
    fontStyle: "italic",
    fontSize: "1rem",
    color: WHITE,
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9rem",
    },
  },
  link: {
    color: WHITE,
    marginTop: 5,
    padding: 10,
    background: BLACK + "50",
    display: "inline-block",
    borderRadius: 10,
    "&:hover": {
      color: WHITE,
      textDecoration: "none",
      background: BLACK + "60",
      boxShadow: "0 0 2px " + BLACK,
    },
  },
  verseText: {
    display: "-webkit-box",
    WebkitLineClamp: 3,
    textOverflow: "ellipsis",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
  },
  copyButton: {
    textTransform: "capitalize",
    margin: "10px auto",
  },
  shareLink: {
    width: "94%",
    margin: 7,
    color: WHITE,
  },
  shareIcon: {
    color: WHITE,
    cursor: "pointer",
    textShadow: "1px 1px 2px " + BLACK,
    marginTop: -1,
    marginLeft: 8,
  },
}));
const Banner = ({ setValue1, locale, versions, versionBooks, panel1 }) => {
  const BigTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: WHITE,
      color: BLACK,
      boxShadow: theme.shadows[4],
      border: "1px solid" + GREY,
      fontSize: 16,
      marginTop: 0,
    },
  }))(Tooltip);
  const langCode = languageCode[locale].code;
  const [allVerseData, setAllVerseData] = useState();
  const [verseRef, setVerseRef] = useState({
    b: "psa",
    c: "119",
    v: "105",
  });
  const [sourceId, setSourceId] = useState("");
  const [verseObj, setVerseObj] = useState({});
  const [book, setBook] = useState("");
  const [shareAnchor, setShareAnchor] = React.useState(null);
  const [copyFeedback, setCopyFeedback] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState("");
  const open = Boolean(shareAnchor);
  const lang = panel1.version.split("-")[0];
  const avl = versionBooks[lang]?.filter((e) => {
    return e.book_code === verseRef.b;
  });

  const versionCode = versions.find(
    (e) => e?.languageVersions[0]?.language?.code === langCode
  )?.languageVersions[0]?.version?.code;
  const version = capitalize(langCode + "-" + versionCode);
  const verseOfTheDayRef = book
    ? `${book} ${verseObj.chapterNumber}:${verseObj.verseNumber} ` + version
    : "";
  const verseOfTheDayText = verseObj ? verseObj.verseContent?.text : "";
  const path =
    avl?.length !== 0
      ? window.location.href +
        "read?version=" +
        panel1.version +
        "&reference=" +
        verseRef?.b +
        "." +
        verseRef?.c +
        "." +
        verseRef?.v
      : window.location.href +
        "read?version=eng-ESV&reference=" +
        verseRef?.b +
        "." +
        verseRef?.c +
        "." +
        verseRef?.v;

  const textContent =
    verseOfTheDayRef + "\n" + verseOfTheDayText + "\n\n" + path;
  function openShareDialog(event) {
    setShareAnchor(event.currentTarget);
  }
  function closeShareDialog() {
    setShareAnchor(null);
  }
  const closeAlert = () => {
    setAlert(false);
  };
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(textContent);
      setAlert(true);
      setCopyFeedback(t("clipBoardCopied"));
      setAlertType("success");
      closeShareDialog();
    } catch (err) {
      console.error("Unable to copy to clipboard.", err);
      setAlert(true);
      setCopyFeedback(t("clipBoardCopiedFailed"));
      setAlertType("error");
      closeShareDialog();
    }
  };
  useEffect(() => {
    if (process.env.REACT_APP_DAILY_VERSE) {
      const APIBASE = axios.create({
        baseURL: process.env.REACT_APP_DAILY_VERSE,
      });
      APIBASE.get("verseData.json").then(function (response) {
        setAllVerseData(response?.data);
      });
    }
  }, []);
  useEffect(() => {
    let newDate = new Date();
    const currentYear = newDate?.getFullYear();
    const currentMonth = newDate?.getMonth() + 1;
    const currentDay = newDate?.getDate();
    if (allVerseData) {
      setVerseRef(allVerseData[currentYear][currentMonth][currentDay]);
    }
  }, [allVerseData]);

  useEffect(() => {
    const sourceId = versions.find(
      (e) => e?.languageVersions[0]?.language?.code === langCode
    )?.languageVersions[0]?.sourceId;
    setSourceId(sourceId);
  }, [langCode, versions]);
  useEffect(() => {
    const books = versionBooks[langCode];
    if (verseObj?.bibleBookCode) {
      const book = books?.find((i) => i.book_code === verseObj.bibleBookCode);
      setBook(book?.short);
    }
  }, [book, langCode, verseObj.bibleBookCode, versionBooks]);
  useEffect(() => {
    if (sourceId && verseRef) {
      const book = verseRef ? verseRef?.b : "psa";
      const chapter = verseRef ? verseRef?.c : "119";
      const verse = verseRef ? verseRef?.v : "105";
      API.get(`bibles/${sourceId}/verses/${book}.${chapter}.${verse}`).then(
        (response) => {
          setVerseObj(response.data);
        }
      );
    }
  }, [sourceId, verseRef]);
  const classes = useStyles();
  const setURL = () => {
    setValue1("bookCode", verseRef?.b);
    setValue1("chapter", verseRef?.c);
    setValue1("verseData", verseRef?.v);
  };
  const { t } = useTranslation();
  return (
    <div className={classes.imageContainer}>
      <h3 className={classes.heading}>
        {t("landingVerseHeading")}
        <Tooltip title={t("shareVerseOfTheDayTooltip")}>
          <ShareIcon
            fontSize="small"
            onClick={openShareDialog}
            className={classes.shareIcon}
          />
        </Tooltip>
        <Menu
          id="long-menu"
          anchorEl={shareAnchor}
          keepMounted
          open={open}
          onClose={closeShareDialog}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          PaperProps={{
            style: {
              maxHeight: 450,
              marginTop: 20,
              width: 420,
              backgroundColor: WHITE,
              alignItems: "left",
              paddingLeft: 15,
            },
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              id="share-url"
              variant="outlined"
              size="small"
              value={textContent}
              className={classes.shareLink}
              multiline
              InputProps={{
                readOnly: true,
              }}
              onFocus={(e) => e.target.select()}
            />
            <Button
              className={classes.copyButton}
              variant="outlined"
              onClick={handleCopyClick}
              startIcon={<FileCopyOutlinedIcon />}
            >
              {t("copyToClipBoardBtn")}
            </Button>
          </div>
        </Menu>
        <Snackbar
          open={alert}
          autoHideDuration={800}
          onClose={closeAlert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={closeAlert}
            severity={alertType}
          >
            {copyFeedback}
          </Alert>
        </Snackbar>
      </h3>
      <BigTooltip title={t("landingVerseHeadingToolTip")}>
        <div className={classes.verse}>
          <Link
            to={{ pathname: "/read" }}
            className={classes.link}
            onClick={() => setURL()}
          >
            <span className={classes.verseText}>
              {verseObj ? verseObj.verseContent?.text : ""}
            </span>
            <div className={classes.reference}>
              {book
                ? `${book} ${verseObj.chapterNumber}:${verseObj.verseNumber}`
                : ""}
            </div>
          </Link>
        </div>
      </BigTooltip>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    versions: state.local.versions,
    locale: state.local.locale,
    versionBooks: state.local.versionBooks,
    panel1: state.local.panel1,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue1: (name, value) =>
      dispatch({ type: actions.SETVALUE1, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Banner);
