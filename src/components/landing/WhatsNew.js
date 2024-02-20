import React from "react";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import Link from "@mui/material/Link";
import FeaturesList from "./FeaturesList";
import { BLACK } from "../../store/colorCode";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const WhatsNew = ({ handleClose }) => {
  const theme = useTheme();
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
      <DialogTitle id="scroll-dialog-title">
        <Box
          sx={{
            marginBottom: "-10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            {t("WhatsNew")}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers={true}>
        <span>
          <Typography gutterBottom style={{ fontWeight: 800, fontSize: 17 }}>
            {t("featureAdditions")}:
          </Typography>
          <ul style={{ fontSize: 16, paddingLeft: 17 }}>
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
          <ul style={{ fontSize: 16, paddingLeft: 17 }}>
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
          sx={{
            marginTop: "3px",
            padding: "2px 10px",
            fontSize: 14,
            height: "30px",
            color: BLACK,
            border: "1px solid rgba(0, 0, 0, 0.23)",
            "&:hover": {
              backgroundColor: BLACK + "0a",
              border: "1px solid rgba(0, 0, 0, 0.23)",
            },
            [theme.breakpoints.down("md")]: {
              fontSize: 12,
            },
          }}
          onClick={handleClose}
        >
          {t("commonClose")}
        </Button>
      </DialogActions>
    </>
  );
};
export default WhatsNew;
