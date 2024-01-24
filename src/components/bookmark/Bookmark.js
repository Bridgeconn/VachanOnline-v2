import React from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Tooltip from "@mui/material/Tooltip";
import { useFirebase } from "react-redux-firebase";
import { useFirebaseConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

export default function Bookmark({ uid, sourceId, bookCode, chapter }) {
  const firebase = useFirebase();
  const [bookmarked, setBookmarked] = React.useState(false);
  const [bookmarks, setBookmarks] = React.useState([]);
  const { t } = useTranslation();

  useFirebaseConnect(`users/${uid}/bookmarks/${sourceId}/${bookCode}`);
  const firebaseData = useSelector(
    ({ firebase: { data } }) =>
      data.users &&
      data.users[uid] &&
      data.users[uid].bookmarks &&
      data.users[uid].bookmarks[sourceId] &&
      data.users[uid].bookmarks[sourceId][bookCode]
  );
  React.useEffect(() => {
    setBookmarks(firebaseData || []);
  }, [firebaseData]);

  React.useEffect(() => {
    if (Object.keys(bookmarks).length !== 0) {
      setBookmarked(bookmarks.indexOf(parseInt(chapter)) > -1);
    } else {
      setBookmarked(false);
    }
  }, [bookmarks, chapter]);

  function toggleBookmark() {
    const newBookmarks = bookmarked
      ? bookmarks.filter((a) => parseInt(a) !== parseInt(chapter))
      : bookmarks.concat([parseInt(chapter)]);
    return firebase
      .ref("users/" + uid + "/bookmarks/" + sourceId + "/" + bookCode)
      .set(newBookmarks, function (error) {});
  }
  return (
    <Box
      onClick={toggleBookmark}
      sx={{
        padding: 0,
        width: "30px",
        mt: 2.5,
        mr: 0.5,
        cursor: "pointer",
      }}
    >
      {bookmarked ? (
        <Tooltip title={t("bookMarkedText")}>
          <BookmarkIcon style={{ color: "#ff0000" }} fontSize="small" />
        </Tooltip>
      ) : (
        <Tooltip title={t("addBookmarkText")}>
          <BookmarkBorderIcon fontSize="small" />
        </Tooltip>
      )}
    </Box>
  );
}
