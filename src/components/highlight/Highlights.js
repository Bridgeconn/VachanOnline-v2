import React from "react";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFirebase } from "react-redux-firebase";
import { isLoaded, isEmpty, useFirebaseConnect } from "react-redux-firebase";
import { connect, useSelector } from "react-redux";
import { getBookbyCode, capitalize } from "../common/utility";
import Close from "../common/Close";
import Box from "@mui/material/Box";
import * as actions from "../../store/actions";
import { useTranslation } from "react-i18next";
import { BLACK } from "../../store/colorCode";
import Help from "../common/Help";
import { ListItemButton } from "@mui/material";
const Highlights = (props) => {
  const { uid, versions, setValue, getRegionalBookName, close, mobileView } =
    props;
  const [highlightList, setHighlightList] = React.useState([]);
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
  useFirebaseConnect(`users/${uid}/highlights`);
  const highlights = useSelector(
    ({ firebase: { data } }) =>
      data.users && data.users[uid] && data.users[uid].highlights
  );
  //When data comes from firebase put in highlightList
  React.useEffect(() => {
    if (isLoaded(highlights) && versionData) {
      if (!isEmpty(highlights)) {
        let list = [];
        for (let [sourceId, books] of Object.entries(highlights)) {
          for (let [bookCode, chapters] of Object.entries(books)) {
            for (let [chapter, verses] of Object.entries(chapters)) {
              if (verses) {
                verses.forEach((verse) => {
                  list.push({
                    sourceId: sourceId,
                    bookCode: bookCode,
                    chapter: chapter,
                    verse: verse.toString().split(":")[0],
                    book: getRegionalBookName(bookCode, sourceId),
                    bookId: getBookbyCode(bookCode).bookId,
                  });
                });
              }
            }
          }
        }
        //remove sources which are no longer there
        let result = list.filter((a) => versionData[a.sourceId]);
        result.sort(function (a, b) {
          return (
            a.bookId - b.bookId || a.chapter - b.chapter || a.verse - b.verse
          );
        });
        setHighlightList(result);
      }
    }
  }, [highlights, versionData, getRegionalBookName]);

  //Open highlight reference
  const openHighlight = (event) => {
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

  //Delete highlight
  const deleteHighlight = (event) => {
    let sourceId = event.currentTarget.getAttribute("data-sourceid");
    let bookCode = event.currentTarget.getAttribute("data-bookcode");
    let chapter = parseInt(event.currentTarget.getAttribute("data-chapter"));
    let verse = parseInt(event.currentTarget.getAttribute("data-verse"));
    const newVerseList = highlights[sourceId][bookCode][chapter].filter(
      (a) => parseInt(a) !== parseInt(verse)
    );
    return firebase
      .ref(
        "users/" +
          uid +
          "/highlights/" +
          sourceId +
          "/" +
          bookCode +
          "/" +
          chapter
      )
      .set(newVerseList, function (error) {
        if (error) {
          console.log("highlight delete error");
        } else {
          console.log("highlight deleted succesfully");
          setValue("versesSelected", []);
        }
      });
  };

  return (
    <Box sx={{ width: "100%", marginTop: { lg: 11, xs: 7.5 } }}>
      <Box
        sx={{
          paddingBottom: { lg: 1.25, xs: 0 },
          paddingLeft: 1.875,
          marginBottom: { lg: 2.5, xs: 0 },
          borderBottom: "1px solid #f1ecec",
          display: "flex",
          width: "100%",
          alignItems: "center",
          height: { lg: "2.75em", xs: 60 },
        }}
      >
        <Box flexGrow={1}>
          <Typography variant="h6">{t("highlightsText")}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Help
            iconStyle={{ color: BLACK, marginTop: -0.375, fontSize: 21 }}
            url={"highlights"}
          />
          <Close className={{ marginRight: 1.875, marginTop: 0.375 }} />
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          right: 0,
          left: 0,
          top: { lg: 135, xs: 120 },
          bottom: 0,
          overflow: "scroll",
          marginBottom: -1.875,
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0,0,0,.4) #eeeeee95",
          "&::-webkit-scrollbar": {
            width: "0.45em",
          },
          "&::-webkit-scrollbar-track": {
            WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.4)",
            outline: "1px solid slategrey",
          },
        }}
      >
        {highlightList && highlightList.length !== 0 ? (
          <List component="nav">
            {highlightList.map((highlight, i) => {
              return versionData[highlight.sourceId] !== undefined ? (
                <ListItemButton
                  key={i}
                  sx={{ borderBottom: "1px solid lightgray" }}
                  data-sourceid={highlight.sourceId}
                  data-bookcode={highlight.bookCode}
                  data-chapter={highlight.chapter}
                  data-book={highlight.book}
                  onClick={openHighlight}
                >
                  <ListItemText
                    onClick={mobileView ? close : null}
                    primary={`${versionData[highlight.sourceId][0]} ${
                      highlight.book
                    } ${highlight.chapter}:${highlight.verse}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      data-sourceid={highlight.sourceId}
                      data-bookcode={highlight.bookCode}
                      data-chapter={highlight.chapter}
                      data-verse={highlight.verse}
                      onClick={(e) => deleteHighlight(e)}
                      size="large"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItemButton>
              ) : (
                ""
              );
            })}
          </List>
        ) : (
          <Typography sx={{ margin: 2.25 }}>
            {t("selectVerseHighlight")}
          </Typography>
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
export default connect(mapStateToProps, mapDispatchToProps)(Highlights);
