import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import { BLACK } from "../../store/colorCode";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Help from "../common/Help";

const useStyles = makeStyles(() => ({
  subheading: {
    fontWeight: 600,
    margin: "20px 0 10px",
  },
  bold: {
    fontWeight: 600,
  },
  underline: {
    textDecoration: "underline",
  },
  space: {
    display: "inline-block",
    paddingTop: 10,
  },
  releaseNotes: {
    color: "#3E8A61",
  },
  list: {
    "& li": {
      margin: "5px 0",
    },
  },
  helpIcon: {
    padding: "8px 12px 0",
    color: BLACK,
    fontSize: 21,
    marginTop: -10,
    cursor: "pointer",
  },
  box: {
    display: "flex",
    alignItems: "center",
  },
}));
const AboutUs = ({ handleClose, mobileView }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const addLink = (text, prefix) => {
    return (
      <Link href={prefix + text} target="_blank">
        {` ${text}`}
      </Link>
    );
  };
  const addHyperLink = (text, url) => {
    return (
      <Link href={url} target="_blank">
        {` ${text}`}
      </Link>
    );
  };
  const addStyle = (text, style) => {
    return <span className={classes[style]}>{" " + text}</span>;
  };
  return (
    <>
      <DialogTitle id="scroll-dialog-title" disableTypography={true}>
        <div className={classes.box}>
          <Typography variant="h5" gutterBottom>
            {t("landingAboutUsHead")}
          </Typography>
          <Help iconStyle={classes.helpIcon} url={"about"} />
        </div>
      </DialogTitle>
      <DialogContent dividers={true}>
        <Typography variant="h5" className={classes.subheading}>
          The Vachan Project
        </Typography>
        <Typography variant="body1" gutterBottom>
          {addStyle("VachanOnline", "bold")}{" "}
          {t("landingAboutUsVachanProjectContent1")} {". "}
          {addStyle("VachanGo", "bold")}{" "}
          {t("landingAboutUsVachanProjectContent2")}
          {addStyle("The Vachan Project", "bold")}{" "}
          {t("landingAboutUsVachanProjectContent3")}
        </Typography>
        <Typography variant="h6" className={classes.subheading}>
          {t("landingAboutUsContentTitle")}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {t("landingAboutUsContent1")}{" "}
          {addHyperLink("VachanOnline", "https://vachanonline.com")}{" "}
          {t("landingAboutUsContent2")}
          {addHyperLink(
            "VachanGo",
            "https://play.google.com/store/apps/details?id=com.bridgeconn.vachango"
          )}
          {t("landingAboutUsContent3")}
          {addHyperLink(
            "Bridge Connectivity Solutions Pvt. Ltd. (BCS)",
            "https://www.bridgeconn.com"
          )}
          {t("landingAboutUsContent4")}
        </Typography>
        <Typography variant="h6" className={classes.subheading}>
          {t("landingAboutUsTechnologyTitle")}
        </Typography>
        <Typography variant="body1">
          {t("landingAboutUsTechnologyMsg")}
        </Typography>
        <Typography variant="body1" className={classes.subheading}>
          {addHyperLink(
            t("landingAboutUsGithubRelease"),
            "https://github.com/Bridgeconn/VachanOnline-v2/releases"
          )}
        </Typography>

        <Typography variant="h6" className={classes.subheading}>
          {t("landingAboutUsContactUs")}
        </Typography>
        <Typography variant="body1" component="div" gutterBottom>
          {addLink("thevachanproject@bridgeconn.com", "mailto:")}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          {t("commonClose")}
        </Button>
      </DialogActions>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    mobileView: state.local.mobileView,
  };
};
export default connect(mapStateToProps, null)(AboutUs);
