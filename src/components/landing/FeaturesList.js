import React from "react";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import Link from "@mui/material/Link";
import { Dialog } from "@mui/material";
import { Box } from "@mui/material";
import { BLACK } from "../../store/colorCode";

const FeaturesList = () => {
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
      <Link
        sx={{
          fontSize: 14,
        }}
        href={url}
        target="_blank"
      >
        {text}
      </Link>
    );
  };
  return (
    <>
      <Link
        sx={{
          fontSize: 14,
        }}
        href="#"
        onClick={openFeatures}
      >
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
        <DialogTitle id="scroll-dialog-title">
          <Box
            sx={{
              marginBottom: "-10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" gutterBottom>
              {t("featuresList")}
            </Typography>
          </Box>
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
          <Button
            onClick={featuresClose}
            variant="outlined"
            sx={{
              color: BLACK,
              border: "1px solid rgba(0, 0, 0, 0.23)",
              "&:hover": {
                backgroundColor: BLACK + "0a",
                border: "1px solid rgba(0, 0, 0, 0.23)",
              },
            }}
          >
            {t("commonClose")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default FeaturesList;
