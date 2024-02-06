import React, { useEffect, useState } from "react";
import axios from "axios";
import banner from "../common/images/banner.jpg";
import { API } from "../../store/api";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions";
import { useTranslation } from "react-i18next";
import Tooltip from "@mui/material/Tooltip";
import { withStyles } from "@mui/styles";
import { languageCode } from "../../store/languageData";
import { BLACK, GREY, WHITE } from "../../store/colorCode";
import { styled } from "@mui/system";
import { Box } from "@mui/material";

const useStyles = makeStyles((theme) => ({
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

const Heading = styled("h3")(({ theme }) => ({
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
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.1rem",
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
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "300px",
        backgroundImage: `url(${banner})`,
        backgroundRepeat: "round",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Heading>{t("landingVerseHeading")}</Heading>
      <BigTooltip title={t("landingVerseHeadingToolTip")}>
        <Box
          sx={{
            position: "absolute",
            bottom: 80,
            width: { lg: "70%", sm: "80%", xs: "90%" },
            fontSize: { lg: "1.6rem", sm: "1.4rem", xs: "1rem" },
            fontFamily: "Roboto Slab",
            textAlign: "center",
            transition: "opacity 0.35s ease-in-out",
            background: "none",
            top: { lg: 105, xs: 100 },
          }}
        >
          <Link
            to={{ pathname: "/read" }}
            className={classes.link}
            onClick={() => setURL()}
          >
            {verseObj ? verseObj.verseContent?.text : ""}
            <Box
              sx={{
                fontStyle: "italic",
                fontSize: { lg: "1rem", xs: "0.9rem" },
                color: WHITE,
              }}
            >
              {book
                ? `${book} ${verseObj.chapterNumber}:${verseObj.verseNumber}`
                : ""}
            </Box>
          </Link>
        </Box>
      </BigTooltip>
    </Box>
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
