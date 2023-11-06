import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom";
import { BLACK } from "../../store/colorCode";
import BigTooltip from "../common/BigTooltip";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "block",
    margin: 10,
    [theme.breakpoints.only("lg")]: {
      display: "unset",
    },
    [theme.breakpoints.only("md")]: {
      margin: 8,
    },
    [theme.breakpoints.down("sm")]: {
      margin: 0,
    },
    "&:hover": {
      textDecoration: "none",
    },
  },
  iconBox: {
    margin: "0 auto",
    textAlign: "center",
    padding: "15px 30px",
    display: "flex",
    [theme.breakpoints.only("lg")]: {
      margin: "0 5px",
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.down("sm")]: {
      width: "95%",
      margin: "auto",
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      margin: "0 auto",
    },
  },
  icon: {
    fontSize: "5.5rem",
    color: BLACK,
    marginRight: 10,
    [theme.breakpoints.down("md")]: {
      fontSize: "4.5rem",
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "3.5rem",
    },
  },
  caption: {
    fontSize: 20,
    height: (props) => (props.isLarge ? 85 : 115),
    display: "flex",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  heading: {
    marginBottom: 8,
    [theme.breakpoints.only("xs")]: {
      fontSize: "1.8rem",
    },
  },
  iconWrapper: {
    [theme.breakpoints.only("lg")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  textWrapper: {
    alignItems: "center",
  },
}));

export default function ImageCard({ icon, type, onClick }) {
  const isLarge = useMediaQuery("(min-width:1550px)");
  const classes = useStyles({ isLarge });
  const { t } = useTranslation();
  const heading = {
    Read: t("landingReadTitle"),
    Study: t("landingStudyTitle"),
    Watch: t("landingWatchTitle"),
    Listen: t("landingListenTitle"),
  };
  const caption = {
    Read: t("landingReadCaption"),
    Study: t("landingStudyCaption"),
    Watch: t("landingWatchCaption"),
    Listen: t("landingListenCaption"),
  };
  return (
    <Grid item sm={3} xs={6}>
      <Link
        to={{ pathname: type === "Read" ? "/read" : "/study" }}
        className={classes.link}
      >
        <BigTooltip title={caption[type]}>
          <Paper className={classes.iconBox} elevation={3} onClick={onClick}>
            <div className={classes.iconWrapper}>
              <i className={`material-icons ${classes.icon}`}>{icon}</i>
            </div>
            <div className={classes.textWrapper}>
              <Typography variant="h4" className={classes.heading}>
                {heading[type]}
              </Typography>
              <div className={classes.caption}>{caption[type]}</div>
            </div>
          </Paper>
        </BigTooltip>
      </Link>
    </Grid>
  );
}
