import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { useFirebase } from "react-redux-firebase";
import { isLoaded, isEmpty, useFirebaseConnect } from "react-redux-firebase";
import { connect, useSelector } from "react-redux";
import { getBookbyCode, capitalize } from "../common/utility";
import Close from "../common/Close";
import Box from "@material-ui/core/Box";
import * as actions from "../../store/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 94,
    [theme.breakpoints.down("sm")]: {
      marginTop: 60,
    },
  },
  heading: {
    paddingBottom: 10,
    paddingLeft: 15,
    marginBottom: 20,
    borderBottom: "1px solid #f1ecec",
    display: "flex",
    width: "100%",
    height: "2.75em",
    [theme.breakpoints.down("sm")]: {
      height: 60,
      marginBottom: 0,
      paddingBottom: 0,
      alignItems: "center",
    },
  },
  list: {
    position: "absolute",
    right: 0,
    left: 0,
    top: 135,
    bottom: 0,
    overflow: "scroll",
    marginBottom: -15,
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(0,0,0,.4) #eeeeee95",
    "&::-webkit-scrollbar": {
      width: "0.45em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.4)",
      outline: "1px solid slategrey",
    },
    [theme.breakpoints.down("sm")]: {
      top: 120,
    },
  },
  message: {
    margin: 18,
  },
  listItem: {
    borderBottom: "1px solid lightgray",
  },
  closeButton: {
    marginRight: 15,
    marginTop: -6,
  },
}));
const Bookmarks = (props) => {
  const classes = useStyles();
  const { uid, versions, setValue, getRegionalBookName, close, mobileView } =
    props;
  const [bookmarkList, setBookmarkList] = React.useState([]);
  const [versionData, setVersionData] = React.useState({});
  const firebase = useFirebase();

  //get version for soruceId
  React.useEffect(() => {
    if (versions) {
      let data = {};
      versions.forEach((v) => {
        if (v.languageVersions) {
          v.languageVersions.forEach((a) => {
            data[a.sourceId] = [
              capitalize(a.language.code) + "-" + a.version.code,
              a.language.name + "-" + a.version.code,
            ];
          });
        }
      });
      setVersionData(data);
    }
  }, [versions]);

  //Get data from firebase
  useFirebaseConnect(`users/${uid}/bookmarks`);
  const bookmarks = useSelector(
    ({ firebase: { data } }) =>
      data.users && data.users[uid] && data.users[uid].bookmarks
  );
  //When data comes from firebase put in bookmarkList
  React.useEffect(() => {
    if (isLoaded(bookmarks)) {
      if (!isEmpty(bookmarks)) {
        let list = [];
        for (let [sourceId, books] of Object.entries(bookmarks)) {
          for (let [bookCode, chapters] of Object.entries(books)) {
            if (chapters) {
              chapters.forEach((chapter) => {
                list.push({
                  sourceId: sourceId,
                  bookCode: bookCode,
                  chapter: chapter,
                  book: getRegionalBookName(bookCode, sourceId),
                  bookId: getBookbyCode(bookCode).bookId,
                });
              });
            }
          }
        }
        list.sort(function (a, b) {
          return a.bookId - b.bookId || a.chapter - b.chapter;
        });
        setBookmarkList(list);
      }
    }
  }, [bookmarks, getRegionalBookName]);

  //Open bookmark reference
  const openBookmark = (event) => {
    let element = event.currentTarget;
    let sourceId = element.getAttribute("data-sourceid");
    setValue("sourceId", sourceId);
    setValue("version", versionData[sourceId][0]);
    setValue("bookCode", element.getAttribute("data-bookcode"));
    setValue("chapter", parseInt(element.getAttribute("data-chapter")));
    setValue("versesSelected", []);
    setValue(
      "languageCode",
      versionData[sourceId][0].split("-")[0].toLowerCase()
    );
  };

  //Delete bookmark
  const deleteBookmark = (event) => {
    let sourceId = event.currentTarget.getAttribute("data-sourceid");
    let bookCode = event.currentTarget.getAttribute("data-bookcode");
    let chapter = parseInt(event.currentTarget.getAttribute("data-chapter"));
    const newChapterList = bookmarks[sourceId][bookCode].filter(
      (a) => parseInt(a) !== parseInt(chapter)
    );
    return firebase
      .ref("users/" + uid + "/bookmarks/" + sourceId + "/" + bookCode)
      .set(newChapterList, function (error) {
        if (error) {
          console.log("bookmark delete error");
        } else {
          console.log("bookmark deleted succesfully");
        }
      });
  };

  return (
    <div className={classes.root}>
      <Box className={classes.heading}>
        <Box flexGrow={1}>
          <Typography variant="h6">Bookmarks</Typography>
        </Box>
        <Box>
          <Close className={classes.closeButton} />
        </Box>
      </Box>
      <div className={classes.list}>
        {bookmarks && Object.keys(bookmarks).length !== 0 ? (
          <List component="nav">
            {bookmarkList.map((bookmark, i) => {
              return versionData[bookmark.sourceId] !== undefined ? (
                <ListItem
                  key={i}
                  className={classes.listItem}
                  button
                  onClick={mobileView ? close : null}
                >
                  <ListItemText
                    primary={`${versionData[bookmark.sourceId][0]} ${
                      bookmark.book
                    } ${bookmark.chapter} `}
                    data-sourceid={bookmark.sourceId}
                    data-bookcode={bookmark.bookCode}
                    data-chapter={bookmark.chapter}
                    data-book={bookmark.book}
                    onClick={(e) => openBookmark(e)}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      data-sourceid={bookmark.sourceId}
                      data-bookcode={bookmark.bookCode}
                      data-chapter={bookmark.chapter}
                      onClick={(e) => deleteBookmark(e)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ) : (
                ""
              );
            })}
          </List>
        ) : (
          <Typography className={classes.message}>
            No bookmarks added
          </Typography>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    mobileView: state.local.mobileView,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    close: () => {
      dispatch({ type: actions.SETVALUE, name: "parallelView", value: "" });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);
