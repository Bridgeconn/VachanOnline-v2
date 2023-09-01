import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import NoteIcon from "@material-ui/icons/NoteOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { useFirebase } from "react-redux-firebase";
import { useFirebaseConnect } from "react-redux-firebase";
import { connect, useSelector } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import { getEditorToolbar } from "../common/utility";

const useStyles = makeStyles((theme) => ({
  info: {
    padding: 0,
    width: "30px",
    marginTop: 20,
    marginRight: 4,
    cursor: "pointer",
  },
  textField: {
    "& textarea": {
      maxHeight: 190,
    },
  },
}));
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: 500,
    [theme.breakpoints.down("sm")]: {
      width: 300,
    },
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function Note({
  uid,
  selectedVerses,
  setSelectedVerses,
  bookCode,
  sourceId,
  chapter,
  mobileView,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [noteText, setNoteText] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const firebase = useFirebase();

  const closeAlert = () => {
    setAlert(false);
  };

  const handleNoteTextChange = (editorState) => {
    setNoteText(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    setEditorState(editorState);
  };

  const openNoteDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedVerses([]);
  };

  const saveNote = () => {
    if (noteText === "") {
      setAlert(true);
      return;
    }
    let noteObject = {
      createdTime: Date.now(),
      modifiedTime: Date.now(),
      body: noteText,
      verses: selectedVerses.sort((a, b) => parseInt(a) - parseInt(b)),
    };
    let notesArray =
      notes &&
      notes[sourceId] &&
      notes[sourceId][bookCode] &&
      notes[sourceId][bookCode][chapter]
        ? notes[sourceId][bookCode][chapter]
        : [] || [];
    notesArray.push(noteObject);
    return firebase
      .ref(
        "users/" + uid + "/notes/" + sourceId + "/" + bookCode + "/" + chapter
      )
      .set(notesArray, function (error) {
        if (error) {
          console.log("Note added error");
        } else {
          console.log("Note added succesfully");
          handleClose();
          setSelectedVerses([]);
        }
      });
  };

  //Get data from firebase
  useFirebaseConnect(`users/${uid}/notes`);

  const notes = useSelector(
    ({ firebase: { data } }) =>
      data.users && data.users[uid] && data.users[uid].notes
  );
  return (
    <div>
      <div className={classes.info} onClick={openNoteDialog}>
        <Tooltip title="Add Note">
          <NoteIcon fontSize={mobileView ? "large" : "small"} />
        </Tooltip>
      </div>
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
          Please enter note text
        </Alert>
      </Snackbar>
      <Dialog
        onClose={handleClose}
        aria-labelledby="new-note-dialog"
        open={open}
      >
        <DialogTitle id="new-note-dialog" onClose={handleClose}>
          Note
        </DialogTitle>
        <DialogContent dividers>
          <Editor
            editorState={editorState}
            editorStyle={{ height: "30vh" }}
            onEditorStateChange={handleNoteTextChange}
            placeholder="Write your note"
            toolbar={getEditorToolbar(mobileView)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" onClick={saveNote}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    mobileView: state.local.mobileView,
  };
};
export default connect(mapStateToProps)(Note);
