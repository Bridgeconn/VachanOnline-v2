import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { LIGHTGREY } from "../../store/colorCode";

const useStyles = makeStyles((theme) => ({
  media: {
    height: "16vw",
    width: "32vw",
    [theme.breakpoints.down("sm")]: {
      height: "33vw",
      width: "50vw",
    },
  },
  root: {
    boxShadow: theme.shadows[2],
    border: "1px solid " + LIGHTGREY,
  },
  text: {
    fontFamily: "Samarkan",
    fontSize: 65,
    textAlign: "center",
  },
  action: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  link: {
    "&:hover": {
      textDecoration: "none",
    },
  },
}));

export default function ImageCard({ src, text, onClick }) {
  const classes = useStyles();
  const caption = {
    read: "Read, annotate, compare and search Bibles and study material",
    watch: "See the scriptures come alive in pictures and video",
    listen: "Hear the recorded word in your own language",
  };

  return (
    <Grid item md={4} sm={12} xs={12}>
      <Link to={{ pathname: "/read" }} className={classes.link}>
        <div onClick={onClick}>
          <Card className={classes.root}>
            <CardActionArea className={classes.action}>
              <CardMedia className={classes.media} image={src} title={text} />
              <CardContent>
                <div className={classes.text}>{text}</div>
                <div>{caption[text]}</div>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </Link>
    </Grid>
  );
}
