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
import { useSelector } from "react-redux";
import { getBookbyCode, capitalize } from "../common/utillity";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 94,
  },
  heading: {
    paddingBottom: 10,
    paddingLeft: 15,
    marginBottom: 20,
    borderBottom: "1px solid #f1ecec",
    display: "flex",
    width: "100%",
    height: "2em",
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
  },
  message: {
    margin: 18,
  },
  listItem: {
    borderBottom: "1px solid lightgray",
  },
}));
const Highlights = (props) => {
  const classes = useStyles();
  const { uid, versions, setValue, getRegionalBookName } = props;
  const [highlightList, setHighlightList] = React.useState([]);
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
                    verse: verse,
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
    <div className={classes.root}>
      <Typography variant="h6" className={classes.heading}>
        Highlights
      </Typography>
      <div className={classes.list}>
        {highlights && Object.keys(highlights).length !== 0 ? (
          <List component="nav">
            {highlightList.map((highlight, i) => {
              return (
                <ListItem
                  key={i}
                  className={classes.listItem}
                  data-sourceid={highlight.sourceId}
                  data-bookcode={highlight.bookCode}
                  data-chapter={highlight.chapter}
                  data-book={highlight.book}
                  onClick={openHighlight}
                  button
                >
                  <ListItemText
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
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Typography className={classes.message}>
            Select a verse to Highlight
          </Typography>
        )}
      </div>
    </div>
  );
};
export default Highlights;
