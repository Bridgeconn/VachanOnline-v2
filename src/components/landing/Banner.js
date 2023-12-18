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

const useStyles = makeStyles((theme) => ({
  heading: {
    position: "absolute",
    top: 80,
    color: WHITE,
    fontWeight: 800,
    fontFamily: "Sans",
    fontSize: "1.2rem",
    textShadow: "1px 1px 2px " + BLACK,
    [theme.breakpoints.down("sm")]: {
      top: 75,
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
    width: "70%",
    fontSize: "1.6rem",
    fontFamily: "Roboto Slab",
    textAlign: "center",
    transition: "opacity 0.35s ease-in-out",
    background: "none",
    top: 105,
    [theme.breakpoints.only("md")]: {
      width: "80%",
      fontSize: "1.4rem",
    },
    [theme.breakpoints.down("sm")]: {
      top: 100,
      width: "90%",
      fontSize: "1.2rem",
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
}));
const Banner = ({ setValue1, locale, versions, versionBooks }) => {
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
  const langCode = languageCode[locale];
  const [allVerseData, setAllVerseData] = useState();
  const [verseRef, setVerseRef] = useState({
    b: "psa",
    c: "119",
    v: "105",
  });
  const [sourceId, setSourceId] = useState("");
  const [verseObj, setVerseObj] = useState({});
  const [book, setBook] = useState("");
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
  }, [langCode, verseObj.bibleBookCode, versionBooks]);
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
      <h3 className={classes.heading}>{t("landingVerseHeading")}</h3>
      <BigTooltip title={t("landingVerseHeadingToolTip")}>
        <div className={classes.verse}>
          <Link
            to={{ pathname: "/read" }}
            className={classes.link}
            onClick={() => setURL()}
          >
            {verseObj ? verseObj.verseContent?.text : ""}
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue1: (name, value) =>
      dispatch({ type: actions.SETVALUE1, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Banner);
