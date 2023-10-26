import React from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import AboutUs from "./AboutUs";
import FeedbackIcon from "@material-ui/icons/Feedback";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { connect } from "react-redux";
import { BLACK, GREY, WHITE } from "../../store/colorCode";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  landingFooter: {
    bottom: 0,
    position: "fixed",
    background: WHITE,
    boxShadow:
      "0px -2px 4px -1px rgba(0,0,0,0.2), 0px -4px 5px 0px rgba(0,0,0,0.14), 0px -1px 10px 0px rgba(0,0,0,0.12)",
    borderTop: "1px solid" + GREY,
    color: "#fff",
    padding: "5px 15px",
    marginTop: 40,
    textAlign: "center",
    zIndex: 1000,
    "&div": {
      display: "inline-block",
      paddingTop: theme.spacing(3),
    },
    [theme.breakpoints.down("sm")]: {
      flexWrap: "nowrap",
    },
  },
  text: {
    padding: theme.spacing(1),
    textAlign: "right",
    display: "inline-block",
    float: "right",
    [theme.breakpoints.down("sm")]: {
      float: "unset",
      fontSize: 12,
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
    color: BLACK,
    "&:hover": {
      color: BLACK,
      textDecoration: "none",
    },
  },
  button: {
    marginTop: 3,
    textTransform: "unset",
    padding: "2px 10px",
    fontSize: 16,
    "&:hover": {
      color: GREY,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  feedback: {
    marginTop: 3,
    textTransform: "unset",
    padding: "2px 10px",
    fontSize: 16,
    "&:hover": {
      color: GREY,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  rightLinks: {
    textAlign: "left",
    [theme.breakpoints.only("xs")]: {
      textAlign: "center",
      whiteSpace: "nowrap",
      marginRight: 15,
    },
  },
}));
const LandingFooter = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { mobileView } = props;
  const openModal = () => {
    setOpen(true);
  };

  const { t } = useTranslation();
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid container className={classes.landingFooter}>
        <Grid item xs={6} sm={5} className={classes.rightLinks}>
          <Button
            variant="outlined"
            size="small"
            color="default"
            className={classes.button}
            onClick={openModal}
          >
            {t("landingFooterAboutUsBtn")}
          </Button>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Button
            variant="outlined"
            size="small"
            color="default"
            className={classes.feedback}
            startIcon={<FeedbackIcon />}
            href="https://forms.office.com/r/qiV0Ym335M"
            target="_blank"
            rel="noopener"
          >
            {t("landingFooterFeedbackBtn")}
          </Button>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Link
            href="https://www.bridgeconn.com/"
            target="_blank"
            className={classes.companyLink}
          >
            <Typography className={classes.text}>
              © 2020{" "}
              {mobileView ? t("landingCompanyMob") : t("landingCompanyDesktop")}
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

const mapStateToProps = (state) => {
  return {
    mobileView: state.local.mobileView,
  };
};
export default connect(mapStateToProps)(LandingFooter);
