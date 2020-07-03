import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import ListItem from "@material-ui/core/ListItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { getVersions } from "../common/utillity";

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
    padding: "0 0 0 20px",
    width: "100%",
  },
  summaryPanel: {
    textTransform: "capitalize",
    borderBottom: "1px solid #b7b7b726",
    "&$expanded": {
      minHeight: 50,
    },
  },
  content: {
    margin: "10px 0",
    "&$expanded": {
      margin: "12px 0",
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
}));
const Version = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [expanded, setExpanded] = React.useState("hindi");
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  React.useEffect(() => {
    //if versions not loaded fetch versions and books for the versions
    if (props.versions.length === 0) {
      getVersions(
        props.setVersions,
        props.setValue,
        props.setVersionBooks,
        props.setVersionSource
      );
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
    props.setValue("version", selectedVersion.getAttribute("value"));
    props.setValue("sourceId", selectedVersion.getAttribute("data-sourceid"));
  };
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        style={
          props.landingPage && mobile ? { marginLeft: "20%", width: "60%" } : {}
        }
        classes={
          props.landingPage
            ? { root: classes.button }
            : { root: classes.button, label: classes.label }
        }
      >
        {mobile && !props.landingPage
          ? props.version.split("-")[1]
          : props.version}
        <i className={`material-icons ${classes.icon}`}>keyboard_arrow_down</i>
      </Button>
      {props.versions.length === 0 ? (
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
            {props.versions.sort(sortVersionLanguages).map((version, i) => (
              <ExpansionPanel
                square
                expanded={expanded === version.language}
                onChange={handleChange(version.language)}
                classes={{
                  root: classes.menuRoot,
                  expanded: classes.expanded,
                }}
                key={i}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  classes={{
                    root: classes.summaryPanel,
                    expanded: classes.expanded,
                    content: classes.content,
                  }}
                >
                  <Typography className={classes.language}>
                    {version.language}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ padding: 0 }}>
                  <List className={classes.expansionDetails}>
                    {version.languageVersions.map((item, i) => (
                      <ListItem
                        key={i}
                        value={
                          item.language.name +
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
                </ExpansionPanelDetails>
              </ExpansionPanel>
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setVersions: (value) =>
      dispatch({ type: actions.SETVERSIONS, value: value }),
    setVersionBooks: (name, value) =>
      dispatch({ type: actions.ADDVERSIONBOOKS, name: name, value: value }),
    setVersionSource: (value) =>
      dispatch({ type: actions.SETVALUE, name: "versionSource", value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Version);
