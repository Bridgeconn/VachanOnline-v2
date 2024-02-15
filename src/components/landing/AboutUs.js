import React from "react";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useTranslation } from "react-i18next";
import { BLACK, GREY } from "../../store/colorCode";
import Help from "../common/Help";
import FeaturesList from "./FeaturesList";
import { styled } from "@mui/system";

const BoldSpan = styled("span")({
  fontWeight: 600,
});
const AboutUs = ({ handleClose }) => {
  const { t } = useTranslation();
  const addLink = (text, prefix) => {
    return (
      <Link href={prefix + text} target="_blank" underline="hover">
        {` ${text}`}
      </Link>
    );
  };
  const addHyperLink = (text, url) => {
    return (
      <Link href={url} target="_blank" underline="hover">
        {` ${text}`}
      </Link>
    );
  };
  return (
    <>
      <DialogTitle id="scroll-dialog-title">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h5" sx={{ flexGrow: 1 }} gutterBottom>
            {t("landingAboutUsHead")}
          </Typography>
          <Help
            iconStyle={{
              color: BLACK,
              fontSize: 21,
              marginTop: "-10px",
              cursor: "pointer",
            }}
            url={"about"}
          />
        </Box>
      </DialogTitle>
      <DialogContent dividers={true}>
        <Typography variant="h5">The Vachan Project</Typography>
        <Typography variant="body1" gutterBottom>
          <BoldSpan> VachanOnline </BoldSpan>
          {t("landingAboutUsVachanProjectContent1")}
          {". "}
          <BoldSpan>VachanGo </BoldSpan>
          {t("landingAboutUsVachanProjectContent2")}
          {". "}
          <BoldSpan>The Vachan Project </BoldSpan>
          {t("landingAboutUsVachanProjectContent3")}
        </Typography>
        <Typography variant="h5">{t("landingAboutUsContentTitle")}</Typography>
        <Typography variant="body1" gutterBottom>
          {t("landingAboutUsContent1")}{" "}
          {addHyperLink("VachanOnline", "https://vachanonline.com")}{" "}
          {t("landingAboutUsContent2")}
          {addHyperLink(
            "VachanGo",
            "https://play.google.com/store/apps/details?id=com.bridgeconn.vachango"
          )}
          {t("landingAboutUsContent3")}
          {addHyperLink(
            "Bridge Connectivity Solutions Pvt. Ltd. (BCS)",
            "https://www.bridgeconn.com"
          )}
          {t("landingAboutUsContent4")}
        </Typography>
        <Typography variant="h5">
          {t("landingAboutUsTechnologyTitle")}
        </Typography>
        <Typography variant="body1">
          {t("landingAboutUsTechnologyMsg")}
        </Typography>
        <Typography variant="h6">
          {addHyperLink(
            t("landingAboutUsGithubRelease"),
            "https://github.com/Bridgeconn/VachanOnline-v2/releases"
          )}
        </Typography>
        <FeaturesList />
        <Typography variant="h6">{t("landingAboutUsContactUs")}</Typography>
        <Typography variant="body1" component="div" gutterBottom>
          {addLink("thevachanproject@bridgeconn.com", "mailto:")}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            color: BLACK,
            border: "1px solid rgba(0, 0, 0, 0.23)",
            "&:hover": {
              color: GREY,
              border: "1px solid rgba(0, 0, 0, 0.23)",
            },
          }}
        >
          {t("commonClose")}
        </Button>
      </DialogActions>
    </>
  );
};
export default AboutUs;
