import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import ListItem from "@material-ui/core/ListItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import { getVersions, capitalize } from "../common/utility";
import { PARALLELBIBLE } from "../../store/views";
import BigTooltip from "./BigTooltip";
import { GREY, LIGHTGREY, WHITE } from "../../store/colorCode";
import { languageJson } from "../../store/languageData";

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: "1rem",
    textTransform: "capitalize",
    backgroundColor: "#fff",
    border: "1px solid #fff",
    boxShadow: "1px 1px 1px 1px " + GREY,
    [theme.breakpoints.down("sm")]: {
      minWidth: 50,
      padding: "6px 10px",
    },
    [theme.breakpoints.up("md")]: {
      left: theme.spacing(0),
      marginRight: 10,
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
    [theme.breakpoints.down("sm")]: {
      left: 0,
      display: "none",
    },
  },
  versionName: {
    [theme.breakpoints.down("sm")]: {
      whiteSpace: "nowrap",
      minWidth: 30,
      maxWidth: 60,
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
    [theme.breakpoints.down("sm")]: {
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
    language,
  } = props;
  const [expanded, setExpanded] = React.useState(language);
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  React.useEffect(() => {
    //if versions not loaded fetch versions and books for the versions
    if (versions.length === 0) {
      getVersions(setVersions, setValue, setVersionBooks, setMainValue);
    }
  });

  function handleClose() {
    setAnchorEl(null);
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
    let selectedVersion = event.currentTarget;
    let sourceId = selectedVersion.getAttribute("data-sourceid");
    let bookList = versionBooks[versionSource[sourceId]];
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
      //if parallel bible view and parallel sCroll, disable parallel scroll, show message
      if (parallelView === PARALLELBIBLE && parallelScroll) {
        setMainValue("parallelScroll", false);
        const ver = capitalize(selectedVersion.getAttribute("value"));
        const message = `Current book not available in ${ver}, Parallel Scroll disabled`;
        setValue("message", message);
      }
    }
    setValue("version", selectedVersion.getAttribute("value"));
    setValue("sourceId", sourceId);
  };
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  function getFullDisplayLanguage(language) {
    language = language?.toLowerCase();
    const found = languageJson.find((lang) => lang.language === language);
    const lang = (
      <>
        <span>{found?.languageName}</span>
        <span className={classes.lang}>{language}</span>
      </>
    );
    return found?.languageName.toLowerCase() === language ? language : lang;
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
  function currentVersion(item){
    return item.language.code + "-" + item.version.code === version ? classes.versionSelected : "";
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
      const found = languageJson.find((lang) => lang.langCode === langCode);
      setValue("language", found?.language);
      return found?.languageName || language;
    }
    if (mobileView) {
      setDisplayVersion(versionCode);
    } else {
      const language = getLanguageByCode(versions, langCode?.toLowerCase());
      setDisplayVersion(getDisplayLanguage(language) + "-" + versionCode);
    }
  }, [landingPage, mobileView, setValue, version, versions]);
 
  return (
    <>
      <BigTooltip title="Select a Bible in your language and version">
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
                       var versionActive = currentVersion(item)
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
                        {item.version.code.toUpperCase()} : {item.version.name}
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
