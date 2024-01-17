import React, { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import makeStyles from '@mui/styles/makeStyles';
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import ListItem from "@mui/material/ListItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { getVersions, capitalize, getLanguageData } from "../common/utility";
import { PARALLELBIBLE } from "../../store/views";
import BigTooltip from "./BigTooltip";
import { GREY, LIGHTGREY, WHITE } from "../../store/colorCode";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: "1rem",
    textTransform: "capitalize",
    backgroundColor: "#fff",
    border: "1px solid #fff",
    boxShadow: "1px 1px 1px 1px " + GREY,
    [theme.breakpoints.down('md')]: {
      minWidth: 60,
      padding: "6px 10px",
    },
    [theme.breakpoints.up("sm")]: {
      left: theme.spacing(0),
      margin: "4px 15px 4px 0",
    },
  },
  list: {
    padding: 0,
  },
  menuRoot: {
    backgroundColor: WHITE,
    boxShadow: "none",
    border: "1px solid #00000020",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
  expansionDetails: {
    backgroundColor: WHITE,
    boxShadow: "inset 1px 2px 2px 0px " + GREY,
    padding: "4px 0px 1px 1px",
    width: "100%",
  },
  summaryPanel: {
    textTransform: "capitalize",
    borderBottom: "1px solid #b7b7b726",
    minHeight: 40,
    maxHeight: 40,
    "&$expanded": {
      minHeight: 40,
      maxHeight: 40,
      boxShadow: theme.shadows[4],
      backgroundColor: LIGHTGREY,
    },
  },
  icon: {
    left: 5,
    position: "relative",
    [theme.breakpoints.down('md')]: {
      left: 0,
      display: "none",
    },
  },
  versionName: {
    [theme.breakpoints.down('md')]: {
      whiteSpace: "nowrap",
      minWidth: 30,
      maxWidth: 118,
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  paper: {
    maxHeight: "calc(100vh - 170px)",
    width: 300,
  },
  language: {
    fontSize: "1rem",
    width: "100%",
  },
  version: {
    fontSize: "1rem",
    cursor: "pointer",
    backgroundColor: WHITE,
    borderBottom: "1px solid " + LIGHTGREY,
  },
  versionSelected: {
    boxShadow: "inset 0 0 30px " + LIGHTGREY,
    border: "1px solid " + GREY + "70",
  },
  label: {
    [theme.breakpoints.down('md')]: {
      justifyContent: "unset",
    },
  },
  expansionDetailsRoot: {
    padding: 0,
  },
  lang: {
    color: GREY,
    fontSize: "0.9rem",
    float: "right",
  },
}));
const Version = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [displayVersion, setDisplayVersion] = React.useState("Loading...");
  const {
    setVersions,
    setValue,
    setVersionBooks,
    versions,
    versionBooks,
    versionSource,
    version,
    bookCode,
    landingPage,
    parallelView,
    parallelScroll,
    setMainValue,
    mobileView,
    paneNo,
    chapter,
    verseData,
    language,
    languageInfo,
  } = props;
  const [expanded, setExpanded] = React.useState(language);
  const [searchParams, setSearchParams] = useSearchParams();
  const urlVersion = searchParams.get("version");
  const reference = searchParams.get("reference");
  const location = useLocation();
  const path = location?.pathname;

  const { t } = useTranslation();

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  React.useEffect(() => {
    getLanguageData(setMainValue);
  }, [setMainValue]);
  React.useEffect(() => {
    let _version = localStorage.getItem("version");
    let _bookCode = localStorage.getItem("bookCode");
    let _chapter = localStorage.getItem("chapter");
    let _verseData = localStorage.getItem("verseData");
    _verseData = !_verseData || _verseData === "undefined" ? "" : _verseData;
    if (path.startsWith("/read")) {
      _version = urlVersion || _version;
      if (reference !== null) {
        const [bookCode, refChapter, verseData] = reference?.split(".");
        _bookCode = bookCode || _bookCode;
        _chapter = refChapter || _chapter;
        _verseData = verseData || _verseData;
      }
    } else {
      _verseData = "";
    }
    //if versions not loaded fetch versions and books for the versions
    if (versions.length === 0) {
      getVersions(
        setVersions,
        setValue,
        setVersionBooks,
        setMainValue,
        _version,
        _bookCode,
        _chapter,
        _verseData
      );
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (path.startsWith("/read") && urlVersion === null && reference === null) {
      const _reference = bookCode + "." + chapter + "." + verseData;
      setSearchParams({ version: version, reference: _reference });
    }
  }, [
    urlVersion,
    reference,
    path,
    bookCode,
    chapter,
    verseData,
    setSearchParams,
    version,
  ]);
  function handleClose() {
    setAnchorEl(null);
    setExpanded(language);
  }
  function sortVersionLanguages(a, b) {
    var langA = a.language.toUpperCase(); // ignore upper and lowercase
    var langB = b.language.toUpperCase();
    if (langA < langB) {
      return -1;
    }
    if (langA > langB) {
      return 1;
    }
    return 0;
  }
  //function to set the bible version when clicked
  const setVersion = (event) => {
    handleClose();
    setAnchorEl(null);
    let selectedVersion = event.currentTarget;
    let sourceId = selectedVersion.getAttribute("data-sourceid");
    let bookList = versionBooks[versionSource[sourceId]];
    const _version = selectedVersion.getAttribute("value");
    if (
      bookList &&
      bookCode &&
      bookList.findIndex((e) => e.book_code === bookCode) === -1
    ) {
      //If current book not available set first available book
      //Using bookname api call for now, will fail in case a language has full and NT bible
      //In that case will need to update bible API with books present and see actual book present in bible or not
      setValue("chapter", 1);
      setValue("bookCode", bookList[0].book_code);
      setValue("versesSelected", []);
      setValue("verseData", "");
      //if parallel bible view and parallel sCroll, disable parallel scroll, show message
      if (parallelView === PARALLELBIBLE && parallelScroll) {
        setMainValue("parallelScroll", false);
        const ver = capitalize(_version);
        const message = t("reduxBookNotAvailable", { ver });
        setValue("message", message);
      }
    }
    setValue("version", _version);
    setValue("sourceId", sourceId);
    if (path.startsWith("/read")) {
      const reference = searchParams.get("reference")
        ? searchParams.get("reference")
        : bookCode + "." + chapter;
      setSearchParams({ version: _version, reference: reference });
    }
  };
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  function getFullDisplayLanguage(language) {
    language = language?.toLowerCase();
    const found = languageInfo?.find((lang) => lang.language === language);
    const lang = (
      <>
        <span>{found?.languageName || language}</span>
        <span className={classes.lang}>{language}</span>
      </>
    );
    return lang;
  }

  function getLanguageByCode(versions, code) {
    for (const language of versions) {
      const languages = language["languageVersions"];
      if (languages[0]?.language?.code === code) {
        return languages[0]?.language?.name;
      }
    }
    return code;
  }
  function currentVersion(item) {
    return item.language.code + "-" + item.version.code.toLowerCase() ===
      version.toLowerCase()
      ? classes.versionSelected
      : "";
  }
  React.useEffect(() => {
    if (version !== "Loading..." && paneNo !== 2) {
      const [lang, ver] = version.split("-");
      localStorage.setItem("version", lang.toLowerCase() + "-" + ver);
    }
  }, [version, paneNo]);
  React.useEffect(() => {
    if (language) {
      setExpanded(language);
    }
  }, [language]);
  React.useEffect(() => {
    let [langCode, versionCode] = version.split("-");
    function getDisplayLanguage(language) {
      const found = languageInfo.find((lang) => lang.langCode === langCode);
      setValue("language", language);
      return found?.languageName || language;
    }
    const language = getLanguageByCode(versions, langCode?.toLowerCase());
    if (mobileView) {
      getDisplayLanguage(language);
      setDisplayVersion(versionCode);
    } else {
      setDisplayVersion(getDisplayLanguage(language) + "-" + versionCode);
    }
  }, [landingPage, languageInfo, mobileView, setValue, version, versions]);

  return (
    <>
      <BigTooltip title={t("commonLngDropdownToolTip")}>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          variant="contained"
          style={landingPage && mobileView ? { marginRight: 15 } : {}}
          classes={
            landingPage
              ? { root: classes.button }
              : { root: classes.button, label: classes.label }
          }
        >
          <div className={classes.versionName}>{displayVersion}</div>
          <i className={`material-icons ${classes.icon}`}>
            keyboard_arrow_down
          </i>
        </Button>
      </BigTooltip>
      {versions.length === 0 ? (
        ""
      ) : (
        <>
          <Menu
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            classes={{
              list: classes.list,
              paper: classes.paper,
            }}
          >
            {versions.sort(sortVersionLanguages).map((version, i) => (
              <Accordion
                square
                expanded={expanded === version.language}
                onChange={handleChange(version.language)}
                classes={{
                  root: classes.menuRoot,
                  expanded: classes.expanded,
                }}
                key={i}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  classes={{
                    root: classes.summaryPanel,
                    expanded: classes.expanded,
                  }}
                >
                  <Typography className={classes.language}>
                    {getFullDisplayLanguage(version.language)}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  classes={{
                    root: classes.expansionDetailsRoot,
                  }}
                >
                  <List className={classes.expansionDetails}>
                    {version.languageVersions.map((item, i) => {
                      var versionActive = currentVersion(item);
                      return (
                        <ListItem
                          key={i}
                          value={
                            item.language.code +
                            "-" +
                            item.version.code.toUpperCase()
                          }
                          data-sourceid={item.sourceId}
                          className={`${classes.version} ${versionActive}`}
                          onClick={setVersion}
                        >
                          {item.version.code.toUpperCase()} :{" "}
                          {item.version.name}
                        </ListItem>
                      );
                    })}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </Menu>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    versions: state.local.versions,
    versionBooks: state.local.versionBooks,
    versionSource: state.local.versionSource,
    parallelView: state.local.parallelView,
    parallelScroll: state.local.parallelScroll,
    mobileView: state.local.mobileView,
    languageInfo: state.local.languageInfo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setVersions: (value) =>
      dispatch({ type: actions.SETVERSIONS, value: value }),
    setVersionBooks: (name, value) =>
      dispatch({ type: actions.ADDVERSIONBOOKS, name: name, value: value }),
    setMainValue: (name, value) =>
      dispatch({ type: actions.SETVALUE, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Version);
