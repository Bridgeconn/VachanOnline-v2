import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Tooltip from "@material-ui/core/Tooltip";
import { useFirebase } from "react-redux-firebase";
import { useFirebaseConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  bookmark: {
    padding: 0,
    width: "30px",
    marginTop: 20,
    marginRight: 4,
    cursor: "pointer",
    [theme.breakpoints.only("sm")]: {
      width: 25,
    },
  },
}));
export default function Bookmark({ uid, sourceId, bookCode, chapter }) {
  const classes = useStyles();
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
    <div onClick={toggleBookmark} className={classes.bookmark}>
      {bookmarked ? (
        <Tooltip title={t("bookMarkedText")}>
          <BookmarkIcon style={{ color: "#ff0000" }} fontSize="small" />
        </Tooltip>
      ) : (
        <Tooltip title={t("addBookmarkText")}>
          <BookmarkBorderIcon fontSize="small" />
        </Tooltip>
      )}
    </div>
  );
}
