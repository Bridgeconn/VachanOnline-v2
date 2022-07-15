import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { getVersions, capitalize } from "../common/utility";
import { PARALLELBIBLE } from "../../store/views";
import Tooltip from "@material-ui/core/Tooltip";

const BigTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#66a3ff",
    color: "#00003d",
    boxShadow: theme.shadows[4],
    border: "1px solid #103f87",
    fontSize: 16,
  },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: "1rem",
    textTransform: "capitalize",
    backgroundColor: "#fff",
    border: "1px solid #fff",
    [theme.breakpoints.only("xs")]: {
      width: "30%",
    },
    [theme.breakpoints.up("sm")]: {
      left: theme.spacing(0),
      marginRight: 10,
    },
  },
  list: {
    padding: 0,
  },
  menuRoot: {
    backgroundColor: "#eaeaea",
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
    backgroundColor: "#ffffff",
    boxShadow: "none",
    padding: "0 0 0 8px",
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
    },
  },
  icon: {
    left: 5,
    position: "relative",
  },
  paper: {
    maxHeight: "calc(100vh - 150px)",
    width: 300,
  },
  language: {
    fontSize: "1rem",
  },
  version: {
    fontSize: "1rem",
    cursor: "pointer",
  },
  label: {
    [theme.breakpoints.only("xs")]: {
      justifyContent: "unset",
    },
  },
  expansionDetailsRoot: {
    padding: 0,
  },
}));
const Version = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [expanded, setExpanded] = React.useState("hindi");
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
  } = props;

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
      //Using bookname api call for now, will fail in case a langauge has full and NT bible
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

  React.useEffect(() => {
    let [langCode, versionCode] = version.split("-");
    if (mobile && !landingPage) {
      setDisplayVersion(versionCode);
    } else {
      for (let lang in versions) {
        let languageNames = versions[lang];
        let langVersions = languageNames["languageVersions"];
        for (let versionNames in langVersions) {
          if (
            langCode.toLowerCase() ===
            langVersions[versionNames]["language"]["code"]
          ) {
            setDisplayVersion(
              langVersions[versionNames]["language"]["name"] + "-" + versionCode
            );
          }
        }
      }
    }
  }, [landingPage, mobile, version, versions]);

  return (
    <>
      <BigTooltip title="Select a Bible in your language and version">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          variant="contained"
          style={
            landingPage && mobile ? { marginLeft: "20%", width: "60%" } : {}
          }
          classes={
            landingPage
              ? { root: classes.button }
              : { root: classes.button, label: classes.label }
          }
        >
          {displayVersion}
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
                    {version.language}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  classes={{
                    root: classes.expansionDetailsRoot,
                  }}
                >
                  <List className={classes.expansionDetails}>
                    {version.languageVersions.map((item, i) => (
                      <ListItem
                        key={i}
                        value={
                          item.language.code +
                          "-" +
                          item.version.code.toUpperCase()
                        }
                        data-sourceid={item.sourceId}
                        onClick={setVersion}
                        className={classes.version}
                      >
                        {item.version.code.toUpperCase()} : {item.version.name}
                      </ListItem>
                    ))}
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
