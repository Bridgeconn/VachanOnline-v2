import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddBox from "@material-ui/icons/AddBox";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import { useFirebase } from "react-redux-firebase";
import { isLoaded, isEmpty, useFirebaseConnect } from "react-redux-firebase";
import { connect, useSelector } from "react-redux";
import { getBookbyCode, capitalize, getEditorToolbar } from "../common/utility";
import Close from "../common/Close";
import Box from "@material-ui/core/Box";
import * as actions from "../../store/actions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import draftToHtml from "draftjs-to-html";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "5.278rem",
    display: "flex",
    flexDirection: "column",
    height: "calc( 100vh - 5.278rem)",
    [theme.breakpoints.down("sm")]: {
      marginTop: 60,
      height: "calc( 100vh - 60px)",
    },
  },
  paper: {
    [theme.breakpoints.down("sm")]: {
      margin: 25,
    },
  },
  heading: {
    paddingBottom: 10,
    paddingLeft: 15,
    marginBottom: 10,
    borderBottom: "1px solid #f1ecec",
    display: "flex",
    width: "100%",
    height: "3.4em",
    [theme.breakpoints.down("sm")]: {
      height: 60,
      marginBottom: 0,
      paddingBottom: 0,
      alignItems: "center",
    },
  },

  ".rdw-editor-main": {
    [theme.breakpoints.down("md")]: {
      width: "80vw",
      height: "30vh",
    },
  },
  notesHeading: {
    display: "flex",
  },
  list: {
    overflow: "auto",
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
      marginBottom: 60,
    },
  },
  message: {
    margin: 18,
  },
  listHeading: {
    borderBottom: "1px solid darkgray",
    fontWeight: 600,
    [theme.breakpoints.down("md")]: {
      justifyContent: "space-between",
    },
  },
  listItem: {
    borderBottom: "1px solid lightgray",
    paddingTop: 4,
    paddingBottom: 4,
  },
  form: {
    paddingLeft: 10,
    borderBottom: "1px solid gray",
  },
  lastModified: {
    color: "#0000008a",
    paddingTop: 18,
    [theme.breakpoints.down("md")]: {
      paddingTop: 5,
      display: "inline-block",
    },
  },
  formButtons: {
    textAlign: "right",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  button: {
    margin: "10px 5px",
  },
  addNote: {
    position: "relative",
    bottom: 5,
    padding: theme.spacing(1),
  },
  noteBody: {
    "& textarea": {
      maxHeight: 114,
    },
  },
  closeButton: {
    marginRight: 15,
    marginTop: -6,
  },
  dialog: {
    padding: 0,
  },
  editor: {
    padding: 10,
  },
}));

function Notes(props) {
  const {
    uid,
    versions,
    setValue,
    versesSelected,
    book,
    noteText,
    setNoteText,
    getRegionalBookName,
    close,
    panel1,
    mobileView,
  } = props;
  const [noteList, setNoteList] = React.useState([]);
  const [chapterNoteList, setChapterNoteList] = React.useState([]);
  const [versionData, setVersionData] = React.useState({});
  const [modifiedTime, setModifiedTime] = React.useState("");
  const [editObject, setEditObject] = React.useState({});
  const [noteReference, setNoteReference] = React.useState({});
  const [addNote, setAddNote] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState(false);
  const { bookCode, chapter, sourceId } = panel1;
  const [open, setOpen] = React.useState(false);
  const contentState = ContentState.createFromBlockArray(htmlToDraft(noteText));
  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(contentState)
  );
  const firebase = useFirebase();
  const closeAlert = () => {
    setAlert(false);
  };
  const styleProps = { addNote: addNote };
  const classes = useStyles(styleProps);

  const handleNoteTextChange = (editorState) => {
    setNoteText(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    setEditorState(editorState);
  };

  const clickAddNote = () => {
    if (Array.isArray(versesSelected) && versesSelected.length) {
      setAddNote(true);
    }
  };

  const resetForm = React.useCallback(() => {
    setNoteText("");
    setEditorState(EditorState.createEmpty());
    setModifiedTime("");
    setEditObject({});
    setAddNote(false);
    if (edit) {
      setValue("versesSelected", []);
      setEdit(false);
      setEditObject({});
      setNoteReference({});
    }
  }, [edit, setNoteText, setValue]);

  const saveNote = () => {
    //if no verse selected, show alert
    if (!versesSelected?.length) {
      setAlert(true);
      setAlertMessage("Please select a verse");
      return;
    }
    if (noteText === "") {
      setAlert(true);
      setAlertMessage("Please enter note text");
      return;
    }
    let noteObject = edit
      ? {
          createdTime: editObject.createdTime,
          modifiedTime: Date.now(),
          body: noteText,
          verses: versesSelected.sort((a, b) => parseInt(a) - parseInt(b)),
        }
      : {
          createdTime: Date.now(),
          modifiedTime: Date.now(),
          body: noteText,
          verses: versesSelected.sort((a, b) => parseInt(a) - parseInt(b)),
        };
    let notesArray =
      notes &&
      notes[sourceId] &&
      notes[sourceId][bookCode] &&
      notes[sourceId][bookCode][chapter]
        ? notes[sourceId][bookCode][chapter]
        : [];
    edit
      ? (notesArray[noteReference.index] = noteObject)
      : notesArray.push(noteObject);
    setOpen(false);
    return firebase
      .ref(
        "users/" + uid + "/notes/" + sourceId + "/" + bookCode + "/" + chapter
      )
      .set(notesArray, function (error) {
        if (error) {
          console.log("Note add error");
        } else {
          setValue("versesSelected", []);
          resetForm();
        }
      });
  };

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

  //check if edit form loading
  React.useEffect(() => {
    if (loading) {
      if (
        parseInt(sourceId) === parseInt(noteReference.sourceId) ||
        bookCode === noteReference.bookCode ||
        parseInt(chapter) === parseInt(noteReference.chapter)
      ) {
        setLoading(false);
        setValue("versesSelected", editObject.verses);
      }
    }
  }, [
    sourceId,
    bookCode,
    chapter,
    noteReference,
    loading,
    setValue,
    editObject.verses,
  ]);

  //if source, book, chapter changed reset edit form
  React.useEffect(() => {
    if (edit && !loading) {
      if (
        parseInt(sourceId) !== parseInt(noteReference.sourceId) ||
        bookCode !== noteReference.bookCode ||
        parseInt(chapter) !== parseInt(noteReference.chapter)
      ) {
        resetForm();
      }
    }
  }, [sourceId, bookCode, chapter, edit, noteReference, resetForm, loading]);

  useEffect(() => {
    if (addNote && !edit && !loading && versesSelected?.length === 0) {
      resetForm();
    }
  }, [addNote, edit, loading, resetForm, versesSelected?.length]);
  //Set current chapter notes
  React.useEffect(() => {
    setChapterNoteList(
      noteList.filter(
        (note) =>
          note.bookCode === bookCode &&
          parseInt(note.chapter) === parseInt(chapter)
      )
    );
  }, [noteList, bookCode, chapter, setChapterNoteList]);

  //Get data from firebase
  useFirebaseConnect(`users/${uid}/notes`);

  const notes = useSelector(
    ({ firebase: { data } }) =>
      data.users && data.users[uid] && data.users[uid].notes
  );
  const handleClose = () => {
    setOpen(false);
  };

  //When data comes from firebase put in noteList
  React.useEffect(() => {
    if (isLoaded(notes)) {
      if (!isEmpty(notes)) {
        let list = [];
        for (let [sourceId, books] of Object.entries(notes)) {
          for (let [bookCode, chapters] of Object.entries(books)) {
            for (let [chapter, verseNotes] of Object.entries(chapters)) {
              if (verseNotes) {
                verseNotes.forEach((verseNote, index) => {
                  list.push({
                    sourceId: sourceId,
                    bookCode: bookCode,
                    chapter: chapter,
                    verse: verseNote.verses.join(", "),
                    book: getRegionalBookName(bookCode, sourceId),
                    bookId: getBookbyCode(bookCode).bookId,
                    index: index,
                    modifiedTime: verseNote.modifiedTime,
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
            a.bookId - b.bookId ||
            a.chapter - b.chapter ||
            a.verse.split(",")[0] - b.verse.split(",")[0]
          );
        });
        setNoteList(result);
      }
    }
  }, [notes, versionData, getRegionalBookName]);

  //Edit Note
  const editNote = (event) => {
    setOpen(true);
    let element = event.currentTarget;
    let sourceId = element.getAttribute("data-sourceid");
    let bookCode = element.getAttribute("data-bookcode");
    let chapter = parseInt(element.getAttribute("data-chapter"));
    let index = parseInt(element.getAttribute("data-index"));
    let note = notes[sourceId][bookCode][chapter][index];
    setNoteText(note.body);
    setEditorState(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(htmlToDraft(note.body))
      )
    );
    setModifiedTime(note.modifiedTime);
    setEditObject(note);
    let noteReference = {
      sourceId: sourceId,
      bookCode: bookCode,
      chapter: chapter,
      index: index,
    };
    setNoteReference(noteReference);
    setLoading(true);
    if (!mobileView) {
      setAddNote(true);
    }
    setEdit(true);
    setValue("sourceId", sourceId);
    setValue("version", versionData[sourceId][0]);
    setValue("bookCode", bookCode);
    setValue("chapter", chapter);
    setValue(
      "languageCode",
      versionData[sourceId][0].split("-")[0].toLowerCase()
    );
  };

  const openRef = (event) => {
    let element = event.currentTarget;
    let sourceId = element.getAttribute("data-sourceid");
    let bookCode = element.getAttribute("data-bookcode");
    let chapter = parseInt(element.getAttribute("data-chapter"));
    let index = parseInt(element.getAttribute("data-index"));
    let note = notes[sourceId][bookCode][chapter][index];
    setValue("sourceId", sourceId);
    setValue("version", versionData[sourceId][0]);
    setValue("bookCode", bookCode);
    setValue("chapter", chapter);
    setValue(
      "languageCode",
      versionData[sourceId][0].split("-")[0].toLowerCase()
    );
    setValue("versesSelected", note.verses);
    if (mobileView) {
      close();
    } else {
      editNote(event);
    }
  };
  //Delete Note
  const deleteNote = (event) => {
    let sourceId = event.currentTarget.getAttribute("data-sourceid");
    let bookCode = event.currentTarget.getAttribute("data-bookcode");
    let chapter = parseInt(event.currentTarget.getAttribute("data-chapter"));
    let index = parseInt(event.currentTarget.getAttribute("data-index"));
    const newVerseList = notes[sourceId][bookCode][chapter].filter(
      (a, i) => i !== index
    );
    return firebase
      .ref(
        "users/" + uid + "/notes/" + sourceId + "/" + bookCode + "/" + chapter
      )
      .set(newVerseList, function (error) {
        if (error) {
          console.log("Note delete error");
        }
      });
  };

  return (
    <div className={classes.root}>
      {mobileView ? null : (
        <Box className={classes.heading}>
          <Box flexGrow={1}>
            <Typography variant="h6" className={classes.notesHeading}>
              Notes
              {Array.isArray(versesSelected) &&
              versesSelected.length &&
              !edit ? (
                <Tooltip title="Add Note">
                  <IconButton
                    aria-label="add"
                    className={classes.addNote}
                    onClick={clickAddNote}
                  >
                    <AddBox />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Select Verses">
                  <>
                    <IconButton
                      aria-label="add"
                      className={classes.addNote}
                      disabled
                    >
                      <AddBox />
                    </IconButton>
                  </>
                </Tooltip>
              )}
            </Typography>
          </Box>
          <Box>
            <Close className={classes.closeButton} />
          </Box>
        </Box>
      )}
      {mobileView ? (
        /* mobile view edit list */
        <Dialog
          onClose={handleClose}
          aria-labelledby="note-title"
          open={open}
          classes={{ paper: classes.paper }}
        >
          <DialogTitle id="note-title" onClose={handleClose}>
            Note for {book} {chapter}:{" "}
            {versesSelected
              ?.sort((a, b) => parseInt(a) - parseInt(b))
              .join(", ")}
          </DialogTitle>
          <DialogContent dividers className={classes.dialog}>
            <Editor
              editorState={editorState}
              editorStyle={{ height: "30vh", overflow: "auto" }}
              onEditorStateChange={handleNoteTextChange}
              editorClassName={classes.editor}
              toolbar={getEditorToolbar(true)}
            />
          </DialogContent>
          <DialogActions>
            <Grid container>
              <Grid item xs={6} className={classes.lastModified}>
                Last Modified: {new Date(modifiedTime).toLocaleString()}
              </Grid>
              <Grid item xs={6} className={classes.formButtons}>
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={saveNote}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      ) : addNote ? (
        <div className={classes.form}>
          <Typography variant="h6" gutterBottom>
            Note for {book} {chapter}:{" "}
            {versesSelected
              ?.sort((a, b) => parseInt(a) - parseInt(b))
              .join(", ")}
          </Typography>
          {/*edit note */}
          <Editor
            editorState={editorState}
            onEditorStateChange={handleNoteTextChange}
            editorStyle={{ height: "30vh" }}
            toolbar={getEditorToolbar(false)}
          />
          <Grid container>
            <Grid item xs={7} className={classes.lastModified}>
              {modifiedTime &&
                "Last Modified: " + new Date(modifiedTime).toLocaleString()}
            </Grid>
            <Grid item xs={5} className={classes.formButtons}>
              <Button
                variant="outlined"
                className={classes.button}
                onClick={resetForm}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                className={classes.button}
                onClick={saveNote}
              >
                Save
              </Button>
            </Grid>
          </Grid>
          <Snackbar
            open={alert}
            autoHideDuration={5000}
            onClose={closeAlert}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              elevation={6}
              variant="filled"
              onClose={closeAlert}
              severity="warning"
            >
              {alertMessage}
            </Alert>
          </Snackbar>
        </div>
      ) : (
        ""
      )}
      <div className={classes.list}>
        {notes && Object.keys(notes).length !== 0 ? (
          <List component="nav">
            {chapterNoteList && Object.keys(chapterNoteList).length !== 0 ? (
              <>
                <ListItem className={classes.listHeading}>
                  <Typography variant="h5">
                    Notes for {book} {chapter}
                  </Typography>
                  {mobileView ? (
                    <Close className={classes.closeButton} />
                  ) : null}
                </ListItem>
                {chapterNoteList.map((note, i) => {
                  return versionData[note.sourceId] !== undefined ? (
                    <ListItem
                      key={i}
                      className={classes.listItem}
                      data-sourceid={note.sourceId}
                      data-bookcode={note.bookCode}
                      data-chapter={note.chapter}
                      data-index={note.index}
                      onClick={openRef}
                      button
                    >
                      <ListItemText
                        primary={`${versionData[note.sourceId][0]} ${
                          note.book
                        } ${note.chapter}:${note.verse}`}
                        secondary={new Date(note.modifiedTime).toLocaleString()}
                      />
                      <ListItemSecondaryAction>
                        {mobileView && (
                          <IconButton
                            edge="end"
                            aria-label="editNote"
                            data-sourceid={note.sourceId}
                            data-bookcode={note.bookCode}
                            data-chapter={note.chapter}
                            data-index={note.index}
                            onClick={(event) => editNote(event)}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          data-sourceid={note.sourceId}
                          data-bookcode={note.bookCode}
                          data-chapter={note.chapter}
                          data-index={note.index}
                          onClick={(e) => deleteNote(e)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ) : (
                    ""
                  );
                })}
              </>
            ) : (
              ""
            )}
            <ListItem className={classes.listHeading}>
              <Typography variant="h5">All Notes</Typography>
            </ListItem>
            {noteList.map((note, i) => {
              return versionData[note.sourceId] !== undefined ? (
                <ListItem
                  key={i}
                  className={classes.listItem}
                  data-sourceid={note.sourceId}
                  data-bookcode={note.bookCode}
                  data-chapter={note.chapter}
                  data-index={note.index}
                  onClick={openRef}
                  button
                >
                  <ListItemText
                    primary={`${versionData[note.sourceId][0]} ${note.book} ${
                      note.chapter
                    }:${note.verse}`}
                    secondary={new Date(note.modifiedTime).toLocaleString()}
                  />
                  <ListItemSecondaryAction>
                    {mobileView && (
                      <IconButton
                        edge="end"
                        aria-label="editNote"
                        data-sourceid={note.sourceId}
                        data-bookcode={note.bookCode}
                        data-chapter={note.chapter}
                        data-index={note.index}
                        onClick={(event) => editNote(event)}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      data-sourceid={note.sourceId}
                      data-bookcode={note.bookCode}
                      data-chapter={note.chapter}
                      data-index={note.index}
                      onClick={(e) => deleteNote(e)}
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
            Select a verse to start making Notes
          </Typography>
        )}
      </div>
    </div>
  );
}
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
export default connect(mapStateToProps, mapDispatchToProps)(Notes);
