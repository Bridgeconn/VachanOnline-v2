import React from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import * as actions from "../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import RrdLink from "react-router-dom/Link";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  languageBar: {
    position: "absolute",
    zIndex: 99,
    top: 64,
    width: "100%",
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  toolbarSecondary: {
    color: "#fff",
    backgroundColor: "#02020279",
    minHeight: 40,
  },
  toolbarLink: {
    flexShrink: 0,
    fontSize: "1.2rem",
    cursor: "pointer",
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRight: "1px solid",
    "&:last-child": {
      borderRight: 0,
    },
    [theme.breakpoints.only("md")]: {
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
    },
  },
  link: {
    color: "unset",
    "&:hover": {
      color: "unset",
    },
  },
}));
const LanguageBar = (props) => {
  const { setLanguage, setValue, versions } = props;
  const classes = useStyles();
  const languages = [
    { language: "assamese", languageName: "অসমীয়া" },
    { language: "bengali", languageName: "বাঙালি" },
    { language: "english", languageName: "English" },
    { language: "gujarati", languageName: "ગુજરાતી" },
    { language: "hindi", languageName: "हिंदी" },
    { language: "kannada", languageName: "ಕನ್ನಡ" },
    { language: "malayalam", languageName: "മലയാളം" },
    { language: "marathi", languageName: "मराठी" },
    { language: "odia", languageName: "ଓଡିଆ" },
    { language: "punjabi", languageName: "ਪੰਜਾਬੀ" },
    { language: "tamil", languageName: "தமிழ்" },
    { language: "telugu", languageName: "తెలుగు" },
    { language: "urdu", languageName: "اردو" },
  ];
  const selectedLang = (lan) => {
    let version = versions.find((version) => version?.language === lan);
    setValue(
      "version",
      version?.languageVersions[0]?.language?.code +
        "-" +
        version?.languageVersions[0]?.version?.code
    );
    setValue("sourceId", version?.languageVersions[0]?.sourceId);
    setValue("language", lan);
  };
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Paper>
          <Grid
            container
            justifyContent="center"
            className={classes.languageBar}
          >
            <Toolbar variant="dense" className={classes.toolbarSecondary}>
              {languages.map((language, key) => (
                <Link
                  key={key}
                  px={20}
                  className={classes.toolbarLink}
                  onMouseOver={() => setLanguage(language.languageName)}
                  onClick={() => selectedLang(language.language)}
                >
                  <Tooltip title="Click to read the Bible in this language">
                    <RrdLink
                      className={classes.link}
                      to={{ pathname: "/read" }}
                    >
                      {language.languageName}
                    </RrdLink>
                  </Tooltip>
                </Link>
              ))}
            </Toolbar>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    versions: state.local.versions,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE1, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LanguageBar);
