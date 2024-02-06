import React from "react";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFirebase } from "react-redux-firebase";
import { isLoaded, isEmpty, useFirebaseConnect } from "react-redux-firebase";
import { connect, useSelector } from "react-redux";
import { getBookbyCode, capitalize } from "../common/utility";
import Close from "../common/Close";
import Box from "@mui/material/Box";
import Help from "../common/Help";
import * as actions from "../../store/actions";
import { useTranslation } from "react-i18next";
import { BLACK } from "../../store/colorCode";

const Bookmarks = (props) => {
  const { uid, versions, setValue, getRegionalBookName, close, mobileView } =
    props;
  const [bookmarkList, setBookmarkList] = React.useState([]);
  const [versionData, setVersionData] = React.useState({});
  const firebase = useFirebase();

  const { t } = useTranslation();

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
    <Box
      sx={{
        width: "100%",
        marginTop: { xs: 7.5, lg: 11.75 },
      }}
    >
      <Box
        sx={{
          pb: { xs: 0, lg: 1.25 },
          pl: 1.875,
          mb: { sm: 0, lg: 2.5 },
          borderBottom: "1px solid #f1ecec",
          display: "flex",
          width: "100%",
          alignItems: { xs: "center" },
          height: { xs: 60, lg: 44 },
        }}
      >
        <Box flexGrow={1}>
          <Typography variant="h6">{t("bookmarksText")}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Help
            iconStyle={{
              color: BLACK,
              marginTop: -0.375,
              fontSize: 21,
            }}
            url={"bookmarks"}
          />
          <Close className={{ marginRight: 1.875, marginTop: -0.085 }} />
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          right: 0,
          left: 0,
          top: { xs: 120, lg: 135 },
          bottom: 0,
          overflow: "scroll",
          mb: -1.875,
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0,0,0,.4) #eeeeee95",
          "-webkit-scrollbar": {
            width: "0.45em",
          },
          "-webkit-scrollbar-track": {
            WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.4)",
            outline: "1px solid slategrey",
          },
        }}
      >
        {bookmarks && Object.keys(bookmarks).length !== 0 ? (
          <List component="nav">
            {bookmarkList.map((bookmark, i) => {
              return versionData[bookmark.sourceId] !== undefined ? (
                <ListItem
                  key={i}
                  sx={{ borderBottom: "1px solid lightgray" }}
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
                      size="large"
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
          <Typography sx={{ margin: 2.25 }}>{t("studyNoBookMarks")}</Typography>
        )}
      </Box>
    </Box>
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
