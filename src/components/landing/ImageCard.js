import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { BLACK } from "../../store/colorCode";
import BigTooltip from "../common/BigTooltip";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";

const I = styled("i")(({ theme }) => ({
  [`&.material-icons`]: {
    fontSize: "5.5rem",
    color: BLACK,
    marginRight: "10px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "4.5rem",
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "3.5rem",
    },
  },
}));

const LinkButton = styled(Link)(({ theme }) => ({
  display: "block",
  margin: "10px",
  [theme.breakpoints.only("xl")]: {
    display: "unset",
  },
  [theme.breakpoints.only("xl")]: {
    margin: "8px",
  },
  [theme.breakpoints.down("md")]: {
    margin: "0px",
  },
  "&:hover": {
    textDecoration: "none",
  },
}));

export default function ImageCard({ icon, type, onClick }) {
  const theme = useTheme();
  const isLarge = useMediaQuery("(min-width:1550px)");
  const { t } = useTranslation();
  const heading = {
    Read: t("landingReadTitle"),
    Study: t("landingStudyTitle"),
    Watch: t("landingWatchTitle"),
    Listen: t("landingListenTitle"),
  };
  const caption = {
    Read: t("landingReadCaption"),
    Study: t("landingStudyCaption"),
    Watch: t("landingWatchCaption"),
    Listen: t("landingListenCaption"),
  };
  return (
    <Grid item sm={3} xs={6} sx={{ p: { sm: 0, xs: 0.5 } }}>
      <LinkButton to={{ pathname: type === "Read" ? "/read" : "/study" }}>
        <BigTooltip title={caption[type]}>
          <Paper
            sx={{
              "&.MuiPaper-root": {
                margin: "0 auto",
                textAlign: "center",
                padding: "15px 30px",
                display: "flex",
                [theme.breakpoints.only("lg")]: {
                  margin: "0 5px",
                  padding: "15px 20px",
                },
                [theme.breakpoints.down("lg")]: {
                  flexDirection: "column",
                  width: "95%",
                  margin: "auto",
                },
                [theme.breakpoints.down("sm")]: {
                  width: "90%",
                  margin: "0 auto",
                },
              },
            }}
            elevation={3}
            onClick={onClick}
          >
            <Box
              sx={{
                [theme.breakpoints.only("lg")]: {
                  display: "flex",
                  alignItems: "center",
                },
              }}
            >
              <I className={`material-icons`}>{icon}</I>
            </Box>
            <Box
              sx={{
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  marginBottom: "8px",
                  [theme.breakpoints.only("xs")]: {
                    fontSize: "1.8rem",
                  },
                }}
              >
                {heading[type]}
              </Typography>
              <Box
                sx={{
                  fontSize: { lg: "18px", xl: "20px" },
                  height: isLarge ? "85px" : "115px",
                  display: "flex",
                  [theme.breakpoints.down("lg")]: {
                    display: "none",
                  },
                }}
              >
                {caption[type]}
              </Box>
            </Box>
          </Paper>
        </BigTooltip>
      </LinkButton>
    </Grid>
  );
}
