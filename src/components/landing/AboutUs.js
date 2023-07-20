import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

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
}));
const AboutUs = ({ handleClose }) => {
  const classes = useStyles();
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
      <DialogTitle
        className={classes.title}
        id="scroll-dialog-title"
        disableTypography={true}
      >
        <Typography variant="h5" gutterBottom>
          About Us
        </Typography>
      </DialogTitle>
      <DialogContent dividers={true}>
        <Typography variant="h5" className={classes.subheading}>
          The Vachan Project
        </Typography>
        <Typography variant="body1" gutterBottom>
          {addStyle("VachanOnline", "bold")} is a premier cross platform Bible
          study tool in Indian languages. {addStyle("VachanGo", "bold")} is a
          companion mobile app for this website.
          {addStyle("The Vachan Project", "bold")} was established to provide
          free access to digital scripture engagement resources. You are free to
          use this for your personal Bible study or small groups and gatherings.
          Please note that many of the resources available are copyrighted.
          These are being made available here on VachanOnline under multiple
          licensing arrangements. Hence, the content is not for further
          redistribution in any other format or platform without explicit
          permission from the original copyright owners.
        </Typography>
        <Typography variant="h6" className={classes.subheading}>
          Content
        </Typography>
        <Typography variant="body1" gutterBottom>
          The content on{" "}
          {addHyperLink("VachanOnline", "https://vachanonline.com")} and
          {addHyperLink(
            "VachanGo",
            "https://play.google.com/store/apps/details?id=com.bridgeconn.vachango"
          )}
          , is being made available under a collaborative arrangement with
          multiple partners and
          {addHyperLink(
            "Bridge Connectivity Solutions Pvt. Ltd. (BCS)",
            "https://www.bridgeconn.com"
          )}
          ; who is the localization and technology partner.
        </Typography>
        <Typography variant="h6" className={classes.subheading}>
          Technology
        </Typography>
        <Typography variant="body1">
          BCS team has developed this platform inspired by similar initiatives
          in other countries. A cloud based, API driven, Biblical Computing
          engine - VachanEngine is the back-end of this. These Vachan APIs can
          be made available for digital content delivery on request.
        </Typography>
        <Typography variant="body1" className={classes.subheading}>
          {addHyperLink(
            "GitHub Release Notes",
            "https://github.com/Bridgeconn/VachanOnline-v2/releases"
          )}
          .
        </Typography>

        <Typography variant="h6" className={classes.subheading}>
          Contact Us
        </Typography>
        <Typography variant="body1" component="div" gutterBottom>
          {addLink("thevachanproject@bridgeconn.com", "mailto:")}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </>
  );
};
export default AboutUs;
