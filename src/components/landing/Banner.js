import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import banner from "../common/images/banner.jpg";
import { API } from "../../store/api";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions";
import { useTranslation } from "react-i18next";
import BigTooltip from "../common/BigTooltip";

const useStyles = makeStyles((theme) => ({
  legend: {
    position: "absolute",
    bottom: "19%",
    width: "60%",
    left: "20%",
    right: "25%",
    fontStyle: "italic",
    borderRadius: 10,
    color: "#ffffff",
    padding: 10,
    fontSize: "1.75rem",
    textAlign: "center",
    transition: "opacity 0.35s ease-in-out",
    background: "none",
    opacity: 1,
    [theme.breakpoints.down("md")]: {
      width: "70%",
      bottom: "20%",
      fontSize: "15px",
      left: "15%",
    },
    [theme.breakpoints.only("xs")]: {
      width: "70%",
      bottom: "5%",
      fontSize: "15px",
      left: "15%",
    },
  },
  heading: {
    position: "absolute",
    top: "30%",
    textTransform: "capitalize",
    width: "100%",
    borderRadius: 10,
    color: "#ffffff",
    padding: 10,
    fontSize: "2rem",
    textAlign: "center",
    transition: "opacity 0.35s ease-in-out",
    background: "none",
    opacity: 1,
    [theme.breakpoints.down("md")]: {
      top: "35%",
      fontSize: "1.75rem",
    },
    [theme.breakpoints.only("xs")]: {
      top: "25%",
      fontSize: "18px",
    },
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    paddingTop: "25%",
    height: "300px",
    backgroundImage: `url(${banner})`,
    backgroundRepeat: "round",
    backgroundSize: "cover",
    [theme.breakpoints.only("xs")]: {
      height: "240px",
    },
  },
}));
const Banner = ({ setValue1, panel1, mobileView, multiLangName, versions }) => {
  const [allVerseData, setAllVerseData] = useState([]);
  const [verseRef, setVerseRef] = useState({
    b: "psa",
    c: "119",
    v: "105",
  });
  const [verseObj, setVerseObj] = useState({});
  const APIBASE = useMemo(
    () => axios.create({ baseURL: process.env.REACT_APP_DAILY_VERSE }),
    []
  );
  let newDate = new Date();
  const currentYear = newDate?.getFullYear();
  const currentMonth = newDate?.getMonth() + 1;
  const currentDay = newDate?.getDate();
  useEffect(() => {
    const multiLangVersion = versions.find(
      (version) => version?.language === multiLangName
    );
    if (mobileView) {
      setValue1(
        "verseSourceId",
        multiLangVersion?.languageVersions[0]?.sourceId
      );
    }
  }, [mobileView, multiLangName, setValue1, versions]);
  useEffect(() => {
    API.get(
      `bibles/${panel1?.verseSourceId}/verses/${
        verseRef ? verseRef?.b : "psa"
      }.${verseRef ? verseRef?.c : "119"}.${verseRef ? verseRef?.v : "105"}`
    ).then(function (response) {
      setVerseObj(response.data);
    });
  }, [panel1?.verseSourceId, verseRef]);
  useEffect(() => {
    APIBASE.get("verseData.json").then(function (response) {
      setAllVerseData(response?.data);
    });
  }, [APIBASE]);
  useEffect(() => {
    allVerseData[currentYear] &&
      allVerseData[currentYear][currentMonth].map((ele) => {
        if (ele[currentDay]) {
          setValue1("verseRef", verseRef);
          setVerseRef(ele[currentDay]);
        }
        return ele[currentDay];
      });
  }, [
    allVerseData,
    currentDay,
    currentMonth,
    currentYear,
    setValue1,
    verseRef,
  ]);
  const classes = useStyles();
  const url = () => {
    setValue1("bookCode", verseRef?.b);
    setValue1("chapter", verseRef?.c);
    setValue1("verseData", verseRef?.v);
  };
  const { t } = useTranslation();
  return (
    <div className={classes.imageContainer}>
      <h2 className={classes.heading}>{t("landingVerseHeading")}</h2>
      <Link
        to={{ pathname: "/read" }}
        className={classes.link}
        onClick={() => url()}
      >
        <BigTooltip title={t("landingVerseHeadingToolTip")}>
          <p className={classes.legend}>
            <b>{verseObj?.reference}</b> {verseObj.verseContent?.text}
          </p>
        </BigTooltip>
      </Link>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    panel1: state.local.panel1,
    versions: state.local.versions,
    mobileView: state.local.mobileView,
    multiLangName: state.local.multiLangName,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue1: (name, value) =>
      dispatch({ type: actions.SETVALUE1, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Banner);
