import React from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

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
  },
  toolbarSecondary: {
    color: "#fff",
    backgroundColor: "#3f3f3f50",
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
  },
}));
const LanguageBar = ({ setLanguage }) => {
  const classes = useStyles();
  const languages = [
    "অসমীয়া",
    "বাঙালি",
    "English",
    "ગુજરાતી",
    "हिंदी",
    "ಕನ್ನಡ",
    "മലയാളം",
    "मराठी",
    "ଓଡିଆ",
    "ਪੰਜਾਬੀ",
    "தமிழ்",
    "తెలుగు",
    "اردو",
  ];
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Paper>
          <Grid container justify="center" className={classes.languageBar}>
            <Toolbar variant="dense" className={classes.toolbarSecondary}>
              {Object.keys(languages).map((key) => (
                <Link
                  key={key}
                  px={20}
                  className={classes.toolbarLink}
                  onMouseOver={() => setLanguage(languages[key])}
                >
                  {" "}
                  {languages[key]}{" "}
                </Link>
              ))}
            </Toolbar>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default LanguageBar;
