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
const WhatsNew = ({ handleClose }) => {
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
            {t("WhatsNew")}
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent dividers={true}>
        <span>
          <Typography gutterBottom style={{ fontWeight: 800, fontSize: 17 }}>
            {t("featureAdditions")}:-
          </Typography>
          <ul style={{ fontSize: 16 }}>
            {/* v1.7.0 */}
            <li>{t("multiLanguageInterface")}</li>
            <li>{t("audioBibleListening")}</li>
            <li>{t("openBibleStories")}</li>
            <li>{t("highlightbibleverse")}</li>
            {/* v1.6.0 */}
            <li>{t("richTextEditor")}</li>
            <li>{t("userManual")}</li>
            <li>{t("searchPassage")}</li>
            {/* v1.5.0 */}
            <li>{t("readMode")}</li>
            <li>{t("songsText")}</li>
          </ul>
          <Typography
            gutterBottom
            style={{ fontWeight: 800, fontSize: 17, paddingLeft: 2 }}
          >
            {t("enhancements")}:-
          </Typography>
          <ul style={{ fontSize: 16 }}>
            {/* v1.7.0 */}
            <li>{t("bibleVideosmobile")}</li>
            <li>{t("updateLandingPage")}</li>
            {/* v1.6.0 */}
            <li>{t("FCBHGospelVideos")} </li>
            {/* v1.5.0 */}
            <li>{t("addOTandNTheader")}</li>
            <li>{t("commentaryshowbookintro")}</li>
            <li>{t("commentaryimagesopen")}</li>
            <li>{t("readingPlanImprovedDateSelector")}</li>
            <li> {t("ISLVvideos")}</li>
            <li> {t("UXImprovements")}</li>
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
export default WhatsNew;
