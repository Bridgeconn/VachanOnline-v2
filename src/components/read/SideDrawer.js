import * as React from "react";
import * as views from "../../store/views";
import { Drawer } from "@mui/material";
import MenuItem from "./MenuItem";
import { useTranslation } from "react-i18next";

export default function SideDrawer(props) {
  const { login, toggleDrawer, open } = props;

  const { t } = useTranslation();
  const Item = ({ icon, title, item }) => (
    <MenuItem icon={icon} title={title} item={item} base="drawer" />
  );
  const LoginItem = ({ icon, title, item }) => (
    <span
      onClick={!login ? (e) => e.stopPropagation() : null}
      onKeyDown={!login ? (e) => e.stopPropagation() : null}
    >
      <MenuItem icon={icon} title={title} item={item} base="drawer" />
    </span>
  );
  return (
    <Drawer
      anchor={"right"}
      open={open}
      sx={{
        "& .MuiPaper-root": {
          width: "220px",
          paddingTop: "10px",
        },
      }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div className="bottomBar">
        <Item
          icon="comment"
          title={t("commentariesText")}
          item={views.DRAWERCOMMENTARY}
        />
        {process.env.REACT_APP_SIGNBIBLE_URL !== undefined ? (
          <Item
            icon="sign_language"
            title={t("ISLVBibleText")}
            item={views.DRAWERSIGNBIBLE}
          />
        ) : (
          ""
        )}
        <Item
          icon="image"
          title={t("infographicsText")}
          item={views.INFOGRAPHICS}
        />
        <Item icon="volume_up" title={t("audioBibleText")} item={views.AUDIO} />
        <Item icon="videocam" title={t("videosText")} item={views.VIDEO} />
        <Item
          icon="format_shapes"
          title={t("dictionariesText")}
          item={views.DICTIONARY}
        />
        <LoginItem
          icon="bookmark"
          title={t("bookmarksText")}
          item={views.BOOKMARK}
        />
        <LoginItem
          icon="border_color"
          title={t("highlightsText")}
          item={views.HIGHLIGHT}
        />
        <LoginItem icon="note" title={t("commonNotes")} item={views.NOTE} />
      </div>
    </Drawer>
  );
}
