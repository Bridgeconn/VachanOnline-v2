import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import List from "@mui/material/List";
import MenuItem from "./MenuItem";
import * as views from "../../store/views";
import { Divider } from "@mui/material";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "calc(100vh - 50px)",
    overflowY: "auto",
    overflowX: "hidden",
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(0,0,0,.4) rgba(0,0,0,.1)",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.4)",
      outline: "1px solid slategrey",
    },
  },
}));

export default function BibleMenu() {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <MenuItem
          icon="search"
          title={t("studySearchBibleTitle")}
          item={views.SEARCH}
        />
        <Divider />
        <MenuItem
          icon="import_contacts"
          title={t("parallelBibleText")}
          item={views.PARALLELBIBLE}
        />
        <Divider />
        <MenuItem
          icon="comment"
          title={t("commentariesText")}
          item={views.COMMENTARY}
        />
        <Divider />
        {process.env.REACT_APP_SIGNBIBLE_URL !== undefined ? (
          <MenuItem
            icon="sign_language"
            title={t("ISLVBibleText")}
            item={views.SIGNBIBLE}
          />
        ) : (
          ""
        )}
        <Divider />
        <MenuItem
          class="material-icons"
          icon="image_outline"
          title={t("infographicsText")}
          item={views.INFOGRAPHICS}
          variant="outlined"
        />
        <Divider />
        <MenuItem
          icon="volume_up"
          title={t("audioBibleText")}
          item={views.AUDIO}
        />
        <Divider />
        <MenuItem icon="videocam" title={t("videosText")} item={views.VIDEO} />
        <Divider />
        <MenuItem
          icon="event"
          title={t("readingPlansText")}
          item={views.READINGPLANS}
        />
        <Divider />
        <MenuItem
          icon="format_shapes"
          title={t("dictionariesText")}
          item={views.DICTIONARY}
        />
        <Divider />
        <MenuItem
          icon="bookmark"
          title={t("bookmarksText")}
          item={views.BOOKMARK}
        />
        <Divider />
        <MenuItem
          icon="border_color"
          title={t("highlightsText")}
          item={views.HIGHLIGHT}
        />
        <Divider />
        <MenuItem icon="note" title={t("commonNotes")} item={views.NOTE} />
        <Divider />
      </List>
    </div>
  );
}
