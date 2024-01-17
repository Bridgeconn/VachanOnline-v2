import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import MenuItem from "./MenuItem";
import * as views from "../../store/views";
import MenuIcon from "@mui/icons-material/Menu";
import SideDrawer from "./SideDrawer";
import { BLACK } from "../../store/colorCode";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    boxShadow: "0 -1px 4px #7e7676",
  },
  toolBar: {
    padding: 0,
    display: "flex",
    justifyContent: "space-evenly",
    [theme.breakpoints.only("sm")]: {
      minHeight: 56,
    },
  },
  text: {
    fontSize: 10,
    margin: "2px 5px",
    padding: "0 2px",
    whiteSpace: "nowrap",
  },
  menu: {
    width: 45,
    paddingTop: 6,
    paddingLeft: 10,
    color: BLACK,
    "& p": {
      color: "#000",
      fontSize: "0.65rem",
      paddingTop: 5,
    },
  },
}));

export default function BottomBar({ login }) {
  const classes = useStyles();
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
    <AppBar position="fixed" color="inherit" className={classes.appBar}>
      <Toolbar className={`bottomBar ${classes.toolBar}`}>
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
          <div className={classes.menu}>
            <MenuIcon />
            <Typography>{t("studyBottomMenuMob")}</Typography>
          </div>
        </span>
      </Toolbar>
      <SideDrawer toggleDrawer={toggleDrawer} open={open} login={login} />
    </AppBar>
  );
}
