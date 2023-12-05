import React, { useEffect, useState } from "react";
import axios from "axios";
import banner from "../common/images/banner.jpg";
import { API } from "../../store/api";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions";
import { useTranslation } from "react-i18next";
import BigTooltip from "../common/BigTooltip";
import { languageCode } from "../../store/languageData";

const useStyles = makeStyles((theme) => ({
  heading: {
    position: "absolute",
    top: 70,
    width: "100%",
    borderRadius: 10,
    color: "#ffffff",
    padding: 10,
    fontSize: "2rem",
    textAlign: "center",
    transition: "opacity 0.35s ease-in-out",
    background: "none",
    opacity: 1,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem",
      top: 65,
    },
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    paddingTop: "22%",
    height: "300px",
    backgroundImage: `url(${banner})`,
    backgroundRepeat: "round",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    "@media (max-width: 1600px)": {
      paddingTop: "25%",
    },
    [theme.breakpoints.only("md")]: {
      paddingTop: "25%",
    },
  },
  verse: {
    position: "absolute",
    bottom: 80,
    width: "70%",
    fontSize: "1.6rem",
    textAlign: "center",
    transition: "opacity 0.35s ease-in-out",
    background: "none",
    "@media (max-width: 1600px)": {
      width: "80%",
      bottom: 50,
    },
    [theme.breakpoints.only("md")]: {
      top: 120,
      width: "80%",
      fontSize: "1.4rem",
    },
    [theme.breakpoints.down("sm")]: {
      top: 120,
      width: "90%",
      fontSize: "1.2rem",
    },
    [theme.breakpoints.down("sm")]: {
      top: 110,
      width: "90%",
      fontSize: "1.2rem",
    },
  },
  link: {
    color: "#ffffff",
    padding: 10,
    "&:hover": {
      color: "#ffffff",
      textDecoration: "none",
    },
  },
  reference: {
    fontStyle: "italic",
  },
}));
const Banner = ({ setValue1, locale, versions, versionBooks }) => {
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
