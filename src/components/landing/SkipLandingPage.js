import React from "react";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

import { BLACK } from "../../store/colorCode";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const SkipLandingPage = ({ handleClose, setSkipLandingOpen }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const handleClick = (page) => {
    localStorage.setItem("pageRedirectTo", `/${page}`);
    localStorage.setItem("skipPage", true);
    setSkipLandingOpen(false);
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
            Skip Page
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers={true}>
        <span>
          <Typography gutterBottom style={{ fontWeight: 800, fontSize: 17 }}>
            {t("skipPageHeading")}
          </Typography>
        </span>
        <Link to="/read">
          <Typography
            style={{ fontSize: 17, paddingLeft: 2 }}
            onClick={() => handleClick("read")}
          >
            1. {t("readBiblePageHeading")}
          </Typography>
        </Link>
        <Link to="/study">
          <Typography
            style={{ fontSize: 17, paddingLeft: 2 }}
            onClick={() => handleClick("study")}
          >
            2. {t("studyBiblePageHeading")}
          </Typography>
        </Link>
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
export default SkipLandingPage;
