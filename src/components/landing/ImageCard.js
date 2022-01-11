import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  media: {
    height: "16vw",
    width: "32vw",
    [theme.breakpoints.down("sm")]: {
      height: "33vw",
      width: "50vw",
    },
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
}));

export default function ImageCard({ src, text }) {
  const classes = useStyles();
  const caption = {
    read: "Read, annotate, compare and search Bibles and study material",
    watch: "See the scriptures come alive in pictures and video",
    listen: "Hear the recorded word in your own language",
  };

  return (
    <Grid item md={4} sm={12} xs={12}>
      <Card className={classes.root}>
        <CardActionArea className={classes.action}>
          <CardMedia className={classes.media} image={src} title={text} />
          <CardContent>
            <div className={classes.text}>{text}</div>
            <div>{caption[text]}</div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
