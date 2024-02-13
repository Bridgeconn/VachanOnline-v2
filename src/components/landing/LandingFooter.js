import React from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import AboutUs from "./AboutUs";
import FeedbackIcon from "@material-ui/icons/Feedback";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { BLACK, GREY, WHITE } from "../../store/colorCode";
import { useTranslation } from "react-i18next";
import FeedbackOutlinedIcon from "@material-ui/icons/FeedbackOutlined";
import IconButton from "@material-ui/core/IconButton";
import WhatsNew from "./WhatsNew";
import { Badge, useMediaQuery } from "@material-ui/core";

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
      padding: "unset",
      paddingTop: 6,
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
  const [whatsNewOpen, setWhatsNewOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"));
  const openModal = () => {
    setOpen(true);
  };
  const openWhatsNew = () => {
    setWhatsNewOpen(true);
  };

  const whatsNewClose = () => {
    setWhatsNewOpen(false);
  };

  const { t } = useTranslation();
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid container className={classes.landingFooter}>
        <Grid item xs={4} sm={3} className={classes.rightLinks}>
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
        <Grid item xs={4} sm={3} className={classes.rightLinks}>
          <Badge color="error" variant="dot">
            <Button
              variant="outlined"
              size="small"
              color="default"
              className={classes.button}
              onClick={openWhatsNew}
              style={{ fontWeight: 800 }}
            >
              {t("WhatsNew")}
            </Button>
          </Badge>
        </Grid>
        <Grid item xs={5} sm={1} md={2}>
          {isTablet ? (
            <IconButton
              aria-label="feedback"
              className={classes.feedback}
              href="https://forms.office.com/r/qiV0Ym335M"
              target="_blank"
              rel="noopener"
            >
              <FeedbackOutlinedIcon />
            </IconButton>
          ) : (
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
          )}
        </Grid>

        <Grid item xs={6} sm={5} md={4}>
          <Link
            href="https://www.bridgeconn.com/"
            target="_blank"
            className={classes.companyLink}
          >
            <Typography className={classes.text}>
              {t("landingCompanyYear")}{" "}
              {isMobile ? t("landingCompanyMob") : t("landingCompanyDesktop")}
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
      <Dialog
        open={whatsNewOpen}
        onClose={whatsNewClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={true}
        maxWidth="md"
      >
        <WhatsNew handleClose={whatsNewClose} />
      </Dialog>
    </>
  );
};

export default LandingFooter;
