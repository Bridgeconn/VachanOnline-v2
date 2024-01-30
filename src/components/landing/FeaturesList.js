import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import { BLACK } from "../../store/colorCode";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(() => ({
  subheading: {
    fontWeight: 600,
    margin: "20px 0 10px",
  },
  bold: {
    fontWeight: 600,
  },
  helpIcon: {
    padding: "8px 12px 0",
    color: BLACK,
    fontSize: 21,
    marginTop: -10,
    cursor: "pointer",
  },
  box: {
    marginBottom: -10,
    display: "flex",
    alignItems: "center",
  },
}));
const FeaturesList = ({ handleClose }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const addHyperLink = (text, url) => {
    return (
      <Link href={url} target="_blank">
        {` ${text}`}
      </Link>
    );
  };
  return (
    <>
      <DialogTitle id="scroll-dialog-title" disableTypography={true}>
        <div className={classes.box}>
          <Typography variant="h6" gutterBottom style={{ fontWeight: 800 }}>
            {t("featuresList")}
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent dividers={true}>
        <span>
          <ul style={{ fontSize: 16 }}>
            <li>
              {t("readTopBarBtn")}{" "}
              {addHyperLink(
                t("learnMore"),
                "https://vachandev-um.netlify.app/readBible"
              )}
            </li>
            <li>
              {t("studyBibleTopBarBtn")}{" "}
              {addHyperLink(
                t("learnMore"),
                "https://vachandev-um.netlify.app/studyBible"
              )}
            </li>
            <li>
              {t("ISLVTopBarBtnToolTip")}{" "}
              {addHyperLink(
                t("learnMore"),
                "https://vachandev-um.netlify.app/signLanguageBible"
              )}
            </li>
            <li>{t("searchPassage")} </li>
            <li>
              {t("bibleTextSearch")}{" "}
              {addHyperLink(
                t("learnMore"),
                "https://vachandev-um.netlify.app/searchBible"
              )}
            </li>
            <li>
              {t("songsText")}{" "}
              {addHyperLink(
                t("learnMore"),
                "https://vachandev-um.netlify.app/songs"
              )}
            </li>
            <li>
              {t("openBibleStories")}
              {addHyperLink(
                t("learnMore"),
                "https://vachandev-um.netlify.app/bibleStories"
              )}
            </li>
            <li>
              {t("commentariesText")}{" "}
              {addHyperLink(
                t("learnMore"),
                "https://vachandev-um.netlify.app/commentaries"
              )}
            </li>
            <li>
              {" "}
              {t("infographicsText")}{" "}
              {addHyperLink(
                t("learnMore"),
                "https://vachandev-um.netlify.app/infographics"
              )}
            </li>
            <li>
              {t("audioBibleText")}{" "}
              {addHyperLink(
                t("learnMore"),
                "https://vachandev-um.netlify.app/audioBible"
              )}
            </li>
            <li>
              {t("videosText")}{" "}
              {addHyperLink(
                t("learnMore"),
                "https://vachandev-um.netlify.app/videos"
              )}
            </li>
            <li>
              {t("readingPlansText")}{" "}
              {addHyperLink(
                t("learnMore"),
                "https://vachandev-um.netlify.app/readingPlans"
              )}
            </li>
            <li>
              {t("dictionariesText")}{" "}
              {addHyperLink(
                t("learnMore"),
                "https://vachandev-um.netlify.app/dictionaries"
              )}
            </li>
            <li>
              {t("personalisation")}{" "}
              {addHyperLink(
                t("learnMore"),
                "https://vachandev-um.netlify.app/signIn"
              )}
            </li>
            <li>
              {t("bookmarksText")}, {t("highlightsText")}{" "}
              {addHyperLink(
                t("learnMore"),
                "https://vachandev-um.netlify.app/bookmarks"
              )}
            </li>
            <li>{t("richTextNotes")}</li>
            <li>{t("oralBibles")}</li>
            <li>{t("mobileFriendly")}</li>
            <li>{t("printSavePdf")} </li>
          </ul>
          {addHyperLink(
            t("learnWebsite"),
            "https://vachandev-um.netlify.app/websiteNavigation"
          )}
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
