import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import * as actions from "../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";
import BigTooltip from "../common/BigTooltip";
import { useTranslation } from "react-i18next";

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
  const { setLanguage, setValue, versions, mobileView, multiLangName } = props;
  const classes = useStyles();
  const languages = [
    { language: "assamese", name: "অসমীয়া" },
    { language: "bengali", name: "বাঙালি" },
    { language: "english", name: "English" },
    { language: "gujarati", name: "ગુજરાતી" },
    { language: "hindi", name: "हिंदी" },
    { language: "kannada", name: "ಕನ್ನಡ" },
    { language: "malayalam", name: "മലയാളം" },
    { language: "marathi", name: "मराठी" },
    { language: "odia", name: "ଓଡିଆ" },
    { language: "punjabi", name: "ਪੰਜਾਬੀ" },
    { language: "tamil", name: "தமிழ்" },
    { language: "telugu", name: "తెలుగు" },
    { language: "urdu", name: "उर्दू" },
  ];
  React.useEffect(() => {
    const multiLangVersion = versions.find(
      (version) => version?.language === multiLangName
    );
    if (!mobileView) {
      setValue(
        "verseSourceId",
        multiLangVersion?.languageVersions[0]?.sourceId
      );
    }
  }, [mobileView, multiLangName, setValue, versions]);
  const { t } = useTranslation();
  const selectedLang = (lan, lanObj) => {
    const version = versions.find((version) => version?.language === lan);
    const ver = version?.languageVersions[0];
    setValue("version", ver?.language?.code + "-" + ver?.version?.code);
    setValue("sourceId", ver?.sourceId);
    setValue("verseSourceId", version?.languageVersions[0]?.sourceId);
    setValue("language", lan);
    setLanguage(lanObj?.name);
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
                <Box
                  key={key}
                  px={20}
                  className={classes.toolbarLink}
                  onMouseOver={() => selectedLang(language?.language, language)}
                  onClick={() => selectedLang(language?.language, language)}
                >
                  <BigTooltip
                    title={t("landingLangBarToolTip") + " " + language.name}
                  >
                    <Link
                      className={classes.link}
                      to={{
                        pathname: "/read",
                      }}
                    >
                      {language.name}
                    </Link>
                  </BigTooltip>
                </Box>
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
    mobileView: state.local.mobileView,
    multiLangName: state.local.multiLangName,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE1, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LanguageBar);
