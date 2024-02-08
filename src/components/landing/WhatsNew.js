import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import Link from "@material-ui/core/Link";
import FeaturesList from "./FeaturesList";
import { GREY } from "../../store/colorCode";

const useStyles = makeStyles((theme) => ({
  box: {
    marginBottom: -10,
    display: "flex",
    alignItems: "center",
  },
  button: {
    marginTop: 3,
    textTransform: "unset",
    padding: "2px 10px",
    fontSize: 16,
    height: 30,
    "&:hover": {
      color: GREY,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
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
          <Typography variant="h5" gutterBottom>
            {t("WhatsNew")}
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent dividers={true}>
        <span>
          <Typography gutterBottom style={{ fontWeight: 800, fontSize: 17 }}>
            {t("featureAdditions")}:
          </Typography>
          <ul style={{ fontSize: 16 }}>
            {/* v1.7.0 */}
            <li>{t("multiLanguageInterface")}</li>
            <li>{t("audioBibleListening")}</li>
            <li>{t("openBibleStories")}</li>
            <li>{t("highlightBibleVerse")}</li>
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
            {t("enhancements")}:
          </Typography>
          <ul style={{ fontSize: 16 }}>
            {/* v1.6.0 */}
            <li>{t("FCBHGospelVideos")} </li>
            {/* v1.5.0 */}
            <li>{t("commentaryShowBookIntro")}</li>
            <li>{t("readingPlanImprovedDateSelector")}</li>
            <li> {t("ISLVVideos")}</li>
          </ul>
          <div style={{ paddingBottom: 10 }}>
            <FeaturesList />
          </div>
          {addHyperLink(t("learnWebsite"), "https://vachandev-um.netlify.app/")}
        </span>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          size="small"
          color="default"
          className={classes.button}
          onClick={handleClose}
        >
          {t("commonClose")}
        </Button>
      </DialogActions>
    </>
  );
};
export default WhatsNew;
