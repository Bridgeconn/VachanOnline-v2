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
          The content on VachanOnline and VachanGo, is being made available
          under a collaborative arrangement with multiple partners and
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
        <Typography variant="h6" className={classes.subheading}>
          Source Code
        </Typography>
        <Typography variant="body1">
          The Source Code is available on
          {addHyperLink(
            "Github",
            "https://github.com/Bridgeconn/VachanOnline-v2"
          )}
          .
        </Typography>

        <div className={classes.releaseNotes}>
          <Typography variant="h6" className={classes.subheading}>
            Release Notes (17/10/2022) v1.3.3
          </Typography>
          <Typography variant="body1" className={classes.subheading}>
            {addStyle("Feature Addition:", "bold")}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            <ul className={classes.list}>
              <li>Sign Language Bible</li>
            </ul>
          </Typography>
          <Typography variant="body1" className={classes.subheading}>
            {addStyle("Enhancements:", "bold")}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            <ul className={classes.list}>
              <li>Group bible book names by colour in dropdown</li>
              <li>Landing page and mobile view UX improvements</li>
              <li>
                Add language dropdown in Infographics, audio bible, video panel
              </li>
              <li>Improve Bible panel styling</li>
            </ul>
          </Typography>
          <Typography variant="body1" className={classes.subheading}>
            {addStyle("Bug Fixes:", "bold")}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            <ul className={classes.list}>
              <li>UI Bug fixes</li>
              <li>Show appropriate messages when content unavailable</li>
            </ul>
          </Typography>
          <Typography variant="body1" className={classes.subheading}>
            {addStyle("Operational Update:", "bold")}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            <ul className={classes.list}>
              <li>Support Vimeo videos</li>
            </ul>
          </Typography>
          <Typography variant="h6" className={classes.subheading}>
            Release Notes (06/11/2021) v1.3.2
          </Typography>
          <Typography variant="body1" className={classes.subheading}>
            {addStyle("Feature Additions:", "bold")}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            <ul className={classes.list}>
              <li>
                Print / Save to pdf of Bible chapters along with the notes and
                highlights
              </li>
            </ul>
          </Typography>
          <Typography variant="h6" className={classes.subheading}>
            Release Notes (10/09/2021) v1.3.1
          </Typography>
          <Typography variant="body1" className={classes.subheading}>
            {addStyle("Operations Update:", "bold")}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            <ul className={classes.list}>
              <li>React version upgrade to 17.0.2</li>
            </ul>
          </Typography>

          <Typography variant="h6" className={classes.subheading}>
            Release Notes (19/08/2021) v1.3.0
          </Typography>
          <Typography variant="body1" className={classes.subheading}>
            {addStyle("Feature Additions:", "bold")}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            <ul className={classes.list}>
              <li>M’Cheyne Bible Reading Plan</li>
            </ul>
          </Typography>
          <Typography variant="body1" className={classes.subheading}>
            {addStyle("Enhancements:", "bold")}
          </Typography>

          <Typography variant="body1" component="div" gutterBottom>
            <ul className={classes.list}>
              <li>
                Added titles for Commentary and Dictionary panels for easy user
                navigation
              </li>
              <li>
                Added support for Urdu script, direction - right to left for
                Bible Stories
              </li>
            </ul>
          </Typography>
          <Typography variant="body1" className={classes.subheading}>
            {addStyle("Bug Fixes:", "bold")}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            <ul className={classes.list}>
              <li>Allow playing of only one Audio Bible at a time</li>
            </ul>
          </Typography>

          <Typography variant="h6" className={classes.subheading}>
            Release Notes (06/07/2021) v1.2.1
          </Typography>
          <Typography variant="body1" className={classes.subheading}>
            {addStyle("Content Additions (using Vachan API’s):", "bold")}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            <ul className={classes.list}>
              <li>Bibles: Dogri NT</li>
              <li>Audio Bible: Dogri NT, Odia IRV</li>
            </ul>
          </Typography>
          <Typography variant="body1" className={classes.subheading}>
            {addStyle("Bug Fixes:", "bold")}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            <ul className={classes.list}>
              <li>
                Added support for mobile - Bible panel, Bible stories, Landing
                page header
              </li>
              <li>
                Hide previous and next arrows on first and last chapters of
                bible
              </li>
            </ul>
          </Typography>
          <Typography variant="h6" className={classes.subheading}>
            Release Notes (24/05/2021) v1.2.0
          </Typography>
          <Typography variant="body1" className={classes.subheading}>
            {addStyle("Content Additions (using Vachan API’s):", "bold")}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            <ul className={classes.list}>
              <li>Bibles: ESV Bible, Haryanvi NT, Bilaspuri NT</li>
              <li>
                Audio Bible: Hindi IRV OT, Punjabi IRV, Bilaspuri NT, Haryanvi
                NT
              </li>
              <li>
                More Resources: Open Bible Stories (OBS) - English, Nagamese,
                Hindi, Assamese, Bengali, Odiya, Gujarati, Punjabi, Kannada,
                Malayalam, Marathi, Tamil, Telugu and Urdu
              </li>
            </ul>
          </Typography>
          <Typography variant="body1" className={classes.subheading}>
            {addStyle("Feature Additions:", "bold")}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            <ul className={classes.list}>
              <li>Added OBS as a separate resource content</li>
            </ul>
          </Typography>

          <Typography variant="body1" className={classes.subheading}>
            {addStyle("Operations Update:", "bold")}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            <ul className={classes.list}>
              <li>usfm-grammar version upgrade to 2.0.0</li>
            </ul>
          </Typography>

          <Typography variant="h6" className={classes.subheading}>
            Release Notes (05/03/2021) v1.1
          </Typography>
          <Typography variant="body1" className={classes.subheading}>
            {addStyle("Content Additions (using Vachan API’s):", "bold")}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            <ul className={classes.list}>
              <li>Bibles: Nagamese NT</li>
              <li>
                Commentary: Bridgeway Bible Commentary (Marathi & Gujarati)
              </li>
              <li>Dictionary: Easton’s Bible Dictionary (English)</li>
              <li>Videos: BibleProject (Bengali & Malayalam)</li>
            </ul>
          </Typography>
          <Typography variant="body1" className={classes.subheading}>
            {addStyle("Feature Additions:", "bold")}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            <ul className={classes.list}>
              <li>Multi-colour highlights</li>
              <li>
                Added tooltip on note button to add notes, even if no verse is
                selected
              </li>
              <li>
                Updated the parallel-scroll icon and its position on the webpage
              </li>
            </ul>
          </Typography>

          <Typography variant="body1" className={classes.subheading}>
            {addStyle("Bug Fixes:", "bold")}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            <ul className={classes.list}>
              <li>Fixed issues in highlights, notes and bookmarks</li>
              <li>Fixed Hindi font issue</li>
            </ul>
          </Typography>
          <Typography variant="body1" className={classes.subheading}>
            {addStyle("Operations Update:", "bold")}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            <ul className={classes.list}>
              <li>
                Moved the website to {addLink("vachanonline.com", "https://")},
                and the classic website to
                {addLink("legacy.vachanonline.com", "https://")}
              </li>
              <li>
                Added metadata-based filtering for only published bibles to be
                displayed on Vachan platforms
              </li>
              <li>Handle use-cases when Bible has only OT or NT books</li>
              <li>Added Google Analytics</li>
            </ul>
          </Typography>

          <Typography variant="h6" className={classes.subheading}>
            Release Notes (30/09/2020) v1.0
          </Typography>
          {addStyle(" ", "space")}
          <Typography variant="body1" gutterBottom>
            {addStyle("Platform Update:", "bold")} We are making a major
            technology change in this release. Code from Browser Bible-3
            (InScript) is now replaced with a brand new web application in
            ReactJS powered by Postgres and Python APIs (VachanEngine) in the
            back-end. A companion mobile app written in ReactNative is also
            being released. The older legacy site will still be available for
            sometime on {addLink("vachanonline.com", "https://")} .
          </Typography>
          <Typography variant="body1" className={classes.subheading}>
            {addStyle("Content Additions (using Vachan API’s):", "bold")}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            <ul className={classes.list}>
              <li>
                Bibles: Latest versions of IRV Bibles in all available Indian
                Gateway languages
              </li>
              <li>
                Commentary: IRV Notes (Hindi) + Mathew Henry Concise Bible
                Commentary (English) + Bridgeway Bible Commentary (English) +
                ESV Global Study Bible Notes (English)
              </li>
              <li>Dictionary: IRV Dictionary (Hindi)</li>
              <li>Infographics: VisualUnit (Hindi)</li>
              <li>Audio: IRV NT Bible (Hindi)</li>
              <li>Videos: BibleProject (English, Hindi & Telugu)</li>
            </ul>
          </Typography>
          <Typography variant="body1" className={classes.subheading}>
            {addStyle("Feature Additions:", "bold")}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            <ul className={classes.list}>
              <li>Clean Bible reading pane with section-headings</li>
              <li>
                Parallel 2-pane feature to display Bibles, Commentaries etc.
              </li>
              <li>Added Commentary, Dictionary & Infographics</li>
              <li>Added Audio Player</li>
              <li>Embedded YouTube Video Player</li>
              <li>Personalisation using simple login</li>
              <li>Bookmarks, Highlights & Notes</li>
              <li>Basic Bible search</li>
              <li>Changed website colors</li>
              <li>Dynamic Data powered by VachanEngine</li>
            </ul>
          </Typography>
          <Typography variant="body1" className={classes.subheading}>
            {addStyle("Operations Update:", "bold")}
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            <ul className={classes.list}>
              <li>Added DigitalOcean Spaces with CDN to serve Audio & Video</li>
              <li>Added Firebase for personalisation and synchronisation</li>
            </ul>
          </Typography>
        </div>
        <Typography variant="h6" className={classes.subheading}>
          Contact Us
        </Typography>
        <Typography variant="body1" component="div" gutterBottom>
          {addLink("thevachanproject@bridgeconn.com", "mailto:")}
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
