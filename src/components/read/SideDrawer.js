import * as React from "react";
import * as views from "../../store/views";
import { Drawer, makeStyles } from "@material-ui/core";
import MenuItem from "./MenuItem";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  list: {
    width: 220,
    paddingTop: 10,
  },
});

export default function SideDrawer(props) {
  const { login, toggleDrawer, open } = props;
  const classes = useStyles();

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
      classes={{ paper: classes.list }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div className="bottomBar">
        <Item
          icon="comment"
          title={t("sideDrawerCommentaries")}
          item={views.DRAWERCOMMENTARY}
        />
        {process.env.REACT_APP_SIGNBIBLE_URL !== undefined ? (
          <Item
            icon="sign_language"
            title={t("sideDrawerISLVBible")}
            item={views.DRAWERSIGNBIBLE}
          />
        ) : (
          ""
        )}
        <Item
          icon="image"
          title={t("sideDrawerInfographics")}
          item={views.INFOGRAPHICS}
        />
        <Item
          icon="volume_up"
          title={t("sideDrawerAudioBible")}
          item={views.AUDIO}
        />
        <Item
          icon="videocam"
          title={t("sideDrawerVideos")}
          item={views.VIDEO}
        />
        <Item
          icon="format_shapes"
          title={t("sideDrawerDictionaries")}
          item={views.DICTIONARY}
        />
        <LoginItem
          icon="bookmark"
          title={t("studyBookmarksTitle")}
          item={views.BOOKMARK}
        />
        <LoginItem
          icon="border_color"
          title={t("sideDrawerHighlights")}
          item={views.HIGHLIGHT}
        />
        <LoginItem icon="note" title={t("sideDrawerNotes")} item={views.NOTE} />
      </div>
    </Drawer>
  );
}
