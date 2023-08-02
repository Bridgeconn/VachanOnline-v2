import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom";
import { BLACK } from "../../store/colorCode";
import BigTooltip from "../common/BigTooltip";

const useStyles = makeStyles((theme) => ({
  link: {
    "&:hover": {
      textDecoration: "none",
    },
  },
  iconBox: {
    margin: "0 auto",
    width: 250,
    textAlign: "center",
    padding: "15px 30px",
    [theme.breakpoints.only("md")]: {
      width: 200,
    },
    [theme.breakpoints.down("sm")]: {
      width: "75%",
      margin: "15px auto",
    },
    [theme.breakpoints.down("xs")]: {
      width: "80%",
      margin: "0 auto",
    },
  },
  iconSize: {
    fontSize: "3.75rem",
    color: BLACK,
  },
}));

export default function ImageCard({ icon, text, onClick }) {
  const classes = useStyles();
  const caption = {
    "Read Bible": "Read the Bible in your language",
    "Study Bible":
      "Read, annotate, compare and search Bibles and study material",
    Watch: "See the scriptures come alive in pictures and video",
    Listen: "Hear the recorded word in your own language",
  };
  return (
    <Grid item md={3} sm={6} xs={12}>
      <Link
        to={{ pathname: text === "read" ? "/read" : "/study" }}
        className={classes.link}
      >
        <div onClick={onClick}>
          <BigTooltip title={caption[text]}>
            <Paper className={classes.iconBox} elevation={3}>
              <i className={`material-icons ${classes.iconSize}`}>{icon}</i>
              <Typography variant="h5">{text}</Typography>
            </Paper>
          </BigTooltip>
        </div>
      </Link>
    </Grid>
  );
}
