import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import Link from "@material-ui/core/Link";
import { Dialog } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  box: {
    marginBottom: -10,
    display: "flex",
    alignItems: "center",
  },
  link: {
    fontSize: 14,
  },
}));
const FeaturesList = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [featuresOpen, setFeaturesOpen] = React.useState(false);

  const openFeatures = () => {
    setFeaturesOpen(true);
  };

  const featuresClose = () => {
    setFeaturesOpen(false);
  };
  const addHyperLink = (text, url) => {
    return (
      <Link className={classes.link} href={url} target="_blank">
        {text}
      </Link>
    );
  };
  return (
    <>
      <Link className={classes.link} href="#" onClick={openFeatures}>
        {t("featuresList")}
      </Link>
      <Dialog
        open={featuresOpen}
        onClose={featuresClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={true}
        maxWidth="md"
      >
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
              <li>{t("readTopBarBtn")}</li>
              <li>{t("studyBibleTopBarBtn")}</li>
              <li>{t("ISLVTopBarBtnToolTip")}</li>
              <li>{t("searchPassage")} </li>
              <li>{t("bibleTextSearch")}</li>
              <li>{t("songsText")}</li>
              <li>{t("openBibleStories")}</li>
              <li>{t("commentariesText")}</li>
              <li>{t("infographicsText")}</li>
              <li>{t("audioBibleText")}</li>
              <li>{t("videosText")}</li>
              <li>{t("readingPlansText")}</li>
              <li>{t("dictionariesText")}</li>
              <li>{t("personalisation")}</li>
              <li>
                {t("bookmarksText")}, {t("highlightsText")}
              </li>
              <li>{t("richTextNotes")}</li>
              <li>{t("oralBibles")}</li>
              <li>{t("mobileFriendly")}</li>
              <li>{t("multiLanguageInterface")}</li>
              <li>{t("printSavePdf")} </li>
            </ul>
            {addHyperLink(
              t("learnWebsite"),
              "https://vachandev-um.netlify.app"
            )}
          </span>
        </DialogContent>
        <DialogActions>
          <Button onClick={featuresClose} variant="outlined">
            {t("commonClose")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default FeaturesList;
