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
    fontSize: "1.2rem",
  },
  bold: {
    fontWeight: 600,
  },
  space: {
    display: "inline-block",
    paddingTop: 10,
  },
}));
const AboutUs = ({ handleClose }) => {
  const classes = useStyles();
  const addLink = (text, prefix) => {
    return (
      <Link href={prefix + text} target="_blank">
        {" " + text}
      </Link>
    );
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
        <Typography variant="h6" className={classes.subheading} gutterBottom>
          Vachan Online
        </Typography>
        <Typography variant="body1" gutterBottom>
          {addLink("VachanOnline.com", "https://")} is the premier Bible study
          website in Indian languages. It is part of The Vachan Project to
          provide free access to digital scripture engagement resources. It is
          an initiative of Friends of Agape (FOA), USA. The content herein is
          not for reuse or redistribution in any other format or platform
          without explicit permission as multiple licensing strategies are
          involved.
        </Typography>
        <Typography variant="h6" className={classes.subheading} gutterBottom>
          Translation Partners
        </Typography>
        <Typography variant="body1" gutterBottom>
          Bridge Connectivity Solutions Pvt. Ltd. (BCS) and its
          translation/localization partners; unfoldingWord, Wycliffe Associates,
          Crossway, Bridgeway Publications, BibleProject, and Visual Unit are
          involved in localisation of content and providing licenses to use on
          this site.
        </Typography>
        <Typography variant="h6" className={classes.subheading} gutterBottom>
          Technology Provider
        </Typography>
        <Typography variant="body1" gutterBottom>
          Bridge Connectivity Solutions Pvt. Ltd. (BCS) developed this platform
          from scratch with the in-house team of developers inspired from
          similar websites in other countries. VachanEngine is the back-end of
          this. Vachan APIs for permissions for digital content delivery can be
          made available for many products please contact us at
          {addLink("thevachanproject@gmail.com", "mailto:")}. Also visit our
          company website
          {addLink("www.bridgeconn.com", "https://")}
        </Typography>
        <Typography variant="h6" className={classes.subheading} gutterBottom>
          Source Code
        </Typography>
        <Typography variant="body1" gutterBottom>
          Current Code On GitHub: <br />
          {addLink("https://github.com/Bridgeconn/VachanOnline-v2", "")} <br />
          <span className={classes.space}>
            Previous versions Forked from Digital Bible Society’s Browser
            Bible-3 (InScript) by John Dyer on GitHub.
          </span>
        </Typography>
        <Typography variant="h6" className={classes.subheading} gutterBottom>
          Release Notes (1/06/2020) v1.0
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span className={classes.bold}>Platform Update:</span> We are making a
          major technology change in this release. Code from Browser Bible-3
          (InScript) is now replaced with a brand new web application in ReactJS
          powered by Postgres APIs (VachanEngine) in the back-end. A companion
          mobile app written in ReactNative is also being released. The older
          legacy site will still be available for sometime on
          {addLink("www.vachanonline.net", "https://")}.
        </Typography>
        <Typography variant="h6" className={classes.subheading} gutterBottom>
          Content Additions (using Vachan API’s):
        </Typography>
        <Typography variant="body1" component="div" gutterBottom>
          <ul>
            <li>
              Bibles: Updated versions of IRV Bibles in available Indian Gateway
              Languages + ESV English Bible
            </li>
            <li>
              Commentary: Hindi IRV Notes + Bridgeway Bible Commentary (English)
              + ESV Global Study Bible Notes (English)
            </li>
            <li>Dictionary: Hindi IRV Dictionary</li>
            <li>Infographics: VisualUnit - Hindi</li>
            <li>Audio: Hindi IRV NT Bible</li>
            <li>Video: BibleProject - English + Hindi + Telugu</li>
          </ul>
        </Typography>
        <Typography variant="h6" className={classes.subheading} gutterBottom>
          Feature Additions:
        </Typography>
        <Typography variant="body1" component="div" gutterBottom>
          <ul>
            <li>Cleaner Bible reading pane with section-headings.</li>
            <li>
              Parallel 2-pane feature to display Bibles and other content.
            </li>
            <li>Added Commentary, Dictionary, & Infographics</li>
            <li>Added Audio Player.</li>
            <li>Embedded YouTube Video Player.</li>
            <li>Personalisation and sync using simple login.</li>
            <li>Bookmarks, Highlights & Notes.</li>
            <li>Simple Bible search.</li>
            <li>Changed website colors.</li>
            <li>Dynamic Data powered by VachanEngine</li>
          </ul>
        </Typography>
        <Typography variant="h6" className={classes.subheading} gutterBottom>
          Operations Update:
        </Typography>
        <Typography variant="body1" component="div" gutterBottom>
          <ul>
            <li>Added DigitalOcean Spaces with CDN to serve Audio & Video</li>
            <li>Added Firebase for personalisation and synchronisation</li>
          </ul>
        </Typography>
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
