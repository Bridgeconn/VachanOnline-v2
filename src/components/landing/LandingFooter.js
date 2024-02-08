import React from "react";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import AboutUs from "./AboutUs";
import FeedbackIcon from "@mui/icons-material/Feedback";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import { BLACK, GREY, WHITE } from "../../store/colorCode";
import { useTranslation } from "react-i18next";
import FeedbackOutlinedIcon from "@material-ui/icons/FeedbackOutlined";
import IconButton from "@material-ui/core/IconButton";
import WhatsNew from "./WhatsNew";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@mui/material/styles";

const LandingFooter = (props) => {
  const [open, setOpen] = React.useState(false);
  const [whatsNewOpen, setWhatsNewOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"));
  const openModal = () => {
    setOpen(true);
  };
  const openWhatsNew = () => {
    setWhatsNewOpen(true);
  };

  const whatsNewClose = () => {
    setWhatsNewOpen(false);
  };

  const { t } = useTranslation();
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid
        container
        sx={{
          bottom: 0,
          position: "fixed",
          background: WHITE,
          boxShadow: 3,
          borderTop: "1px solid" + GREY,
          color: "#fff",
          paddingX: 1.875,
          paddingY: 0.625,
          marginTop: 0.625,
          textAlign: "center",
          zIndex: 1000,
          flexWrap: { lg: "wrap", xs: "nowrap" },
          "&div": {
            display: "inline-block",
            paddingTop: 3,
          },
        }}
      >
        <Grid
          item
          xs={4}
          sm={3}
          sx={{
            textAlign: { lg: "left", xs: "center" },
            whiteSpace: { lg: "wrap", xs: "nowrap" },
            marginRight: { lg: 0, xs: 1.875 },
          }}
        >
          <Button
            variant="outlined"
            size="small"
            sx={{
              marginTop: 0.375,
              textTransform: "unset",
              paddingX: 1.25,
              paddingY: 0.25,
              fontSize: { lg: 16, xs: 12 },
              "&:hover": {
                color: GREY,
              },
            }}
            onClick={openModal}
          >
            {t("landingFooterAboutUsBtn")}
          </Button>
        </Grid>
        <Grid item xs={4} sm={3}>
          <Button
            variant="outlined"
            size="small"
            color="default"
            sx={{
              marginTop: 0.375,
              textTransform: "unset",
              paddingX: 1.25,
              paddingY: 0.25,
              fontSize: { lg: 16, xs: 12 },
              "&:hover": {
                color: GREY,
              },
            }}
            onClick={openWhatsNew}
          >
            {t("WhatsNew")}
          </Button>
        </Grid>
        <Grid item xs={5} sm={1} md={2}>
          {isTablet ? (
            <IconButton
              aria-label="feedback"
              sx={{
                marginTop: 0.375,
                textTransform: "unset",
                paddingX: 1.25,
                paddingY: 0.25,
                fontSize: { lg: 16, xs: 12 },
                "&:hover": {
                  color: GREY,
                },
              }}
              href="https://forms.office.com/r/qiV0Ym335M"
              target="_blank"
              rel="noopener"
            >
              <FeedbackOutlinedIcon />
            </IconButton>
          ) : (
            <Button
              variant="outlined"
              size="small"
              sx={{
                marginTop: 0.375,
                textTransform: "unset",
                paddingX: 1.25,
                paddingY: 0.25,
                fontSize: { lg: 16, xs: 12 },
                "&:hover": {
                  color: GREY,
                },
              }}
              startIcon={<FeedbackIcon />}
              href="https://forms.office.com/r/qiV0Ym335M"
              target="_blank"
              rel="noopener"
            >
              {t("landingFooterFeedbackBtn")}
            </Button>
          )}
        </Grid>

        <Grid item xs={6} sm={5} md={4}>
          <Link
            href="https://www.bridgeconn.com/"
            target="_blank"
            sx={{
              color: BLACK,
              "&:hover": {
                color: BLACK,
                textDecoration: "none",
              },
            }}
            underline="hover"
          >
            <Typography
              sx={{
                padding: 1,
                textAlign: "right",
                display: "inline-block",
                float: { lg: "right", xs: "unset" },
                fontSize: { lg: "1rem", xs: 12 },
              }}
            >
              {t("landingCompanyYear")}{" "}
              {isMobile ? t("landingCompanyMob") : t("landingCompanyDesktop")}
            </Typography>
          </Link>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={true}
        maxWidth="md"
      >
        <AboutUs handleClose={handleClose} />
      </Dialog>
      <Dialog
        open={whatsNewOpen}
        onClose={whatsNewClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={true}
        maxWidth="md"
      >
        <WhatsNew handleClose={whatsNewClose} />
      </Dialog>
    </>
  );
};

export default LandingFooter;
