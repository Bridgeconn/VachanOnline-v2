import React from "react";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import AboutUs from "./AboutUs";
import FeedbackIcon from "@mui/icons-material/Feedback";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import { connect } from "react-redux";
import { BLACK, GREY, WHITE } from "../../store/colorCode";
import { useTranslation } from "react-i18next";

const LandingFooter = (props) => {
  const [open, setOpen] = React.useState(false);
  const { mobileView } = props;
  const openModal = () => {
    setOpen(true);
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
          boxShadow:
            "0px -2px 4px -1px rgba(0,0,0,0.2), 0px -4px 5px 0px rgba(0,0,0,0.14), 0px -1px 10px 0px rgba(0,0,0,0.12)",
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
          xs={6}
          sm={5}
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
        <Grid item xs={6} sm={2}>
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
        </Grid>
        <Grid item xs={12} sm={5}>
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
              {mobileView ? t("landingCompanyMob") : t("landingCompanyDesktop")}
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    mobileView: state.local.mobileView,
  };
};
export default connect(mapStateToProps)(LandingFooter);
