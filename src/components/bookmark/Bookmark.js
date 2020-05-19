import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { useFirebase } from "react-redux-firebase";
import { useFirebaseConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  info: {
    padding: 0,
    width: "30px",
    marginTop: 20,
    marginRight: "8px",
    color: "#1976D2",
    cursor: "pointer",
  },
}));
export default function Bookmark({ uid, sourceId, bookCode, chapter }) {
  const classes = useStyles();
  const firebase = useFirebase();
  const [bookmarked, setBookmarked] = React.useState(false);

  useFirebaseConnect(`users/${uid}/bookmarks/${sourceId}/${bookCode}`);
  const bookmarks =
    useSelector(
      ({ firebase: { data } }) =>
        data.users &&
        data.users[uid] &&
        data.users[uid].bookmarks &&
        data.users[uid].bookmarks[sourceId] &&
        data.users[uid].bookmarks[sourceId][bookCode]
    ) || [];

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
      .set(newBookmarks, function (error) {
        if (error) {
          console.log("bookmark update error");
        } else {
          console.log("bookmark updated succesfully");
        }
      });
  }
  return (
    <div onClick={toggleBookmark} className={classes.info}>
      {bookmarked ? (
        <BookmarkIcon fontSize="small" />
      ) : (
        <BookmarkBorderIcon fontSize="small" />
      )}
    </div>
  );
}
