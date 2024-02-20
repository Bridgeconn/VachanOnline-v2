import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import MenuItem from "./MenuItem";
import * as views from "../../store/views";
import MenuIcon from "@mui/icons-material/Menu";
import SideDrawer from "./SideDrawer";
import { BLACK } from "../../store/colorCode";
import { useTranslation } from "react-i18next";

export default function BottomBar({ login }) {
  const [open, setOpen] = React.useState(false);

  const { t } = useTranslation();

  const toggleDrawer = (open) => (event) => {
    const key = event.key;
    if (event.type === "keydown" && (key === "Tab" || key === "Shift")) {
      return;
    }
    setOpen(open);
  };

  return (
    <AppBar
      position="fixed"
      color="inherit"
      sx={{ top: "auto", bottom: 0, boxShadow: "0 -1px 4px #7e7676" }}
    >
      <Toolbar
        className={`bottomBar`}
        sx={{
          padding: 0,
          display: "flex",
          justifyContent: "space-evenly",
          minHeight: 56,
        }}
      >
        <span>
          <MenuItem
            icon="import_contacts"
            title={t("parallelBibleText")}
            item={views.PARALLELBIBLE}
            base="bottom"
          />
        </span>
        <span>
          <MenuItem
            icon="comment"
            title={t("commentariesText")}
            item={views.COMMENTARY}
            base="bottom"
          />
        </span>
        <span>
          <MenuItem
            icon="event"
            title={t("readingPlansText")}
            item={views.READINGPLANS}
            base="bottom"
          />
        </span>
        <span>
          <MenuItem
            icon="search"
            title={t("studyBottomSearchMob")}
            item={views.SEARCH}
            base="bottom"
          />
        </span>
        <span onClick={toggleDrawer(true)}>
          <Box
            sx={{
              width: 45,
              paddingTop: 0.75,
              paddingLeft: 1.25,
              color: BLACK,
              "& p": {
                color: "#000",
                fontSize: "0.65rem",
                paddingTop: 0.625,
              },
            }}
          >
            <MenuIcon />
            <Typography>{t("studyBottomMenuMob")}</Typography>
          </Box>
        </span>
      </Toolbar>
      <SideDrawer toggleDrawer={toggleDrawer} open={open} login={login} />
    </AppBar>
  );
}
