import React from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  languageBar: {
    position: "absolute",
    zIndex: 99,
    top: 64,
    width: "100%",
    flexGrow: 1
  },
  toolbarSecondary: {
    color: "#fff",
    backgroundColor: "#0f3b5e",
    minHeight: 40
  },
  toolbarLink: {
    flexShrink: 0,
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    borderRight: "1px solid",
    "&:last-child": {
      borderRight: 0
    }
  }
}));
const LanguageBar = props => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Paper>
          <Grid container justify="center" className={classes.languageBar}>
            <Toolbar variant="dense" className={classes.toolbarSecondary}>
              {Object.keys(props.languages).map(key => (
                <Link key={key} px={20} className={classes.toolbarLink}>
                  {" "}
                  {props.languages[key]}{" "}
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
