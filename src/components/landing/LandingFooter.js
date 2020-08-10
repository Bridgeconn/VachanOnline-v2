import React from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import AboutUs from "./AboutUs";
import FeedbackIcon from "@material-ui/icons/Feedback";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { BLUE } from "../../store/colorCode";

const useStyles = makeStyles((theme) => ({
  landingFooter: {
    bottom: 0,
    position: "fixed",
    background: BLUE,
    color: "#fff",
    padding: "5px 15px",
    marginTop: 40,
    textAlign: "center",
    "&div": {
      display: "inline-block",
      paddingTop: theme.spacing(3),
    },
  },
  text: {
    padding: theme.spacing(1),
    textAlign: "right",
    display: "inline-block",
    float: "right",
    [theme.breakpoints.only("xs")]: {
      float: "unset",
    },
  },
  link: {
    color: "inherit",
    textDecoration: "none",
    borderRight: "1px solid #fff",
    display: "inline-block",
    padding: "0px 10px",
    fontSize: 16,
    marginTop: 8,
    "&:hover": {
      color: "inherit",
    },
    "&:last-child": {
      borderRight: 0,
    },
  },
  companyLink: {
    color: "inherit",
    "&:hover": {
      color: "inherit",
      textDecoration: "none",
    },
  },
  button: {
    marginTop: 3,
    textTransform: "unset",
    padding: "2px 10px",
    fontSize: 16,
  },
  feedback: {
    marginTop: 3,
    textTransform: "unset",
    padding: "2px 10px",
    fontSize: 16,
    "&:hover": {
      color: "inherit",
    },
  },
  rightLinks: {
    textAlign: "left",
    [theme.breakpoints.only("xs")]: {
      textAlign: "center",
    },
  },
}));
const LandingFooter = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid container className={classes.landingFooter}>
        <Grid item xs={6} sm={5} className={classes.rightLinks}>
          {/* 
          <Link
            href="#"
            className={classes.link}
            key="About us"
            onClick={openModal}
          >
            {"About us "}
          </Link>*/}
          <Button
            variant="outlined"
            size="small"
            color="inherit"
            className={classes.button}
            onClick={openModal}
          >
            About Us
          </Button>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Button
            variant="outlined"
            size="small"
            color="inherit"
            className={classes.feedback}
            startIcon={<FeedbackIcon />}
            href="https://docs.google.com/forms/d/e/1FAIpQLSd75swOEtsvWrzcQrynmCsu-ZZYktWbeeJXVxH7zNz-JIlEdA/viewform?usp=sf_link"
            target="_blank"
            rel="noopener"
          >
            Feedback
          </Button>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Link
            href="https://www.bridgeconn.com/"
            target="_blank"
            className={classes.companyLink}
          >
            <Typography className={classes.text}>
              © 2020 Bridge Connectivity Solutions
            </Typography>
          </Link>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={true}
        maxWidth="md"
      >
        <AboutUs handleClose={handleClose} />
      </Dialog>
    </>
  );
};

export default LandingFooter;
