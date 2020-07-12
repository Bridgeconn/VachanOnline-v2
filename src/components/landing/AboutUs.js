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
          The Vachan Project is the technology umbrella under which access to
          free digital scripture engagement resources is being made available to
          all. As part of this project the
          {addStyle("Vachan Online (www.vachanonline.net)", "bold")} website and
          the {addStyle("Vachan Go", "bold")} companion mobile app have been
          developed for public use. The Vachan Project is an initiative of the
          {addStyle("Friends of Agape (FOA), USA", "underline")}. The content
          herein is not for reuse or redistribution in any other format or
          platform without explicit permission as multiple licensing strategies
          are involved.
        </Typography>
        <Typography variant="h6" className={classes.subheading}>
          Translation Partners
        </Typography>
        <Typography variant="body1" gutterBottom>
          Bridge Connectivity Solutions Pvt. Ltd. (BCS) and its
          translation/localization partners; unfoldingWord, Wycliffe Associates,
          Crossway, Bridgeway Publications, BibleProject, and Visual Unit are
          involved in localisation of content and providing licenses to use on
          this site.
        </Typography>
        <Typography variant="h6" className={classes.subheading}>
          Technology Provider
        </Typography>
        <Typography variant="body1">
          Bridge Connectivity Solutions Pvt. Ltd. (BCS) developed this platform
          with an in-house team of developers inspired from similar websites in
          other countries. VachanEngine powers the backend.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Permission to use Vachan APIs can be be provided for similar digital
          content delivery for products with like minded vision. Please contact
          us at
          {addLink("thevachanproject@gmail.com", "mailto:")}. Also visit our
          company website
          {addLink("www.bridgeconn.com", "https://")}.
        </Typography>
        <Typography variant="h6" className={classes.subheading}>
          Contact Us
        </Typography>
        <Typography variant="body1" component="div" gutterBottom>
          {addLink("thevachanproject@gmail.com", "mailto:")}
        </Typography>
        <div className={classes.releaseNotes}>
          <Typography variant="h6" className={classes.subheading}>
            Release Note (13/07/2020) v1.0
          </Typography>
          {addStyle(" ", "space")}
          <Typography variant="body1" gutterBottom>
            {addStyle("Platform", "bold")}: The Vachan Online web application is
            developed in ReactJS enabled by Postgres APIs (VachanEngine) in the
            back-end. The companion mobile app Vachan Go is written in
            ReactNative.
          </Typography>
          <Typography variant="body1" className={classes.subheading}>
            {addStyle("Content: (using Vachan API’s):", "bold")}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            <ul className={classes.list}>
              <li>
                Bibles: Updated versions of IRV Bibles in all available Indian
                Gateway languages
              </li>
              <li>
                Commentary: IRV Notes (Hindi) + Mathew Henry Concise Bible
                Commentary (English) + Bridgeway Bible Commentary (English) +
                ESV Global Study Bible Notes (English)
              </li>
              <li>Dictionary: IRV Dictionary (Hindi)</li>
              <li>Infographics: VisualUnit (Hindi) *</li>
              <li>Audio: IRV NT Bible (Hindi)</li>
              <li>Video: BibleProject (English, Hindi & Telugu) *</li>
            </ul>
          </Typography>
          <Typography variant="body1" gutterBottom>
            * Not available on the Vachan Go companion mobile app
          </Typography>
          <Typography variant="body1" className={classes.subheading}>
            {addStyle("Features:", "bold")}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            <ul className={classes.list}>
              <li>Cleaner Bible reading pane with section-headings.</li>
              <li>
                Parallel 2-pane feature to display Bibles and other content.
              </li>
              <li>Added Commentary, Dictionary, & Infographics</li>
              <li>Added Audio Player.</li>
              <li>Embedded YouTube Video Player.</li>
              <li>Personalisation and sync using simple login.</li>
              <li>Bookmarks, Highlights & Notes.</li>
              <li>Basic Bible search.</li>
              <li>Dynamic Data</li>
              <li>Personalisation</li>
              <li>
                Seamless transfer of User Data between Vachan Online and Vachan
                Go.
              </li>
            </ul>
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </>
  );
};
export default AboutUs;
