import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(() => ({
  box: {
    marginBottom: -10,
    display: "flex",
    alignItems: "center",
  },
  link: {
    fontSize: 14,
    paddingLeft: 8,
  },
}));
const FeaturesList = ({ handleClose }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const baseURL = "https://vachandev-um.netlify.app/";
  const addHyperLink = (text, url) => {
    return (
      <Link className={classes.link} href={url} target="_blank">
        {` ${text}`}
      </Link>
    );
  };
  return (
    <>
      <DialogTitle id="scroll-dialog-title" disableTypography={true}>
        <div className={classes.box}>
          <Typography variant="h5" gutterBottom>
            {t("featuresList")}
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent dividers={true}>
        <span>
          <ul style={{ fontSize: 16 }}>
            <li>
              {t("readTopBarBtn")}
              {addHyperLink(t("learnMore"), baseURL + "readBible")}
            </li>
            <li>
              {t("studyBibleTopBarBtn")}
              {addHyperLink(t("learnMore"), baseURL + "studyBible")}
            </li>
            <li>
              {t("ISLVTopBarBtnToolTip")}
              {addHyperLink(t("learnMore"), baseURL + "signLanguageBible")}
            </li>
            <li>{t("searchPassage")} </li>
            <li>
              {t("bibleTextSearch")}
              {addHyperLink(t("learnMore"), baseURL + "searchBible")}
            </li>
            <li>
              {t("songsText")}
              {addHyperLink(t("learnMore"), baseURL + "songs")}
            </li>
            <li>
              {t("openBibleStories")}
              {addHyperLink(t("learnMore"), baseURL + "bibleStories")}
            </li>
            <li>
              {t("commentariesText")}
              {addHyperLink(t("learnMore"), baseURL + "commentaries")}
            </li>
            <li>
              {t("infographicsText")}
              {addHyperLink(t("learnMore"), baseURL + "infographics")}
            </li>
            <li>
              {t("audioBibleText")}
              {addHyperLink(t("learnMore"), baseURL + "audioBible")}
            </li>
            <li>
              {t("videosText")}
              {addHyperLink(t("learnMore"), baseURL + "videos")}
            </li>
            <li>
              {t("readingPlansText")}
              {addHyperLink(t("learnMore"), baseURL + "readingPlans")}
            </li>
            <li>
              {t("dictionariesText")}
              {addHyperLink(t("learnMore"), baseURL + "dictionaries")}
            </li>
            <li>
              {t("personalisation")}
              {addHyperLink(t("learnMore"), baseURL + "signIn")}
            </li>
            <li>
              {t("bookmarksText")}, {t("highlightsText")}
              {addHyperLink(t("learnMore"), baseURL + "bookmarks")}
            </li>
            <li>
              {t("richTextNotes")}
              {addHyperLink(t("learnMore"), baseURL + "/notes")}
            </li>
            <li>{t("oralBibles")}</li>
            <li>{t("mobileFriendly")}</li>
            <li>{t("multiLanguageInterface")}</li>
            <li>{t("printSavePdf")} </li>
          </ul>
          {addHyperLink(t("learnWebsite"), baseURL + "websiteNavigation")}
        </span>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          {t("commonClose")}
        </Button>
      </DialogActions>
    </>
  );
};
export default FeaturesList;
