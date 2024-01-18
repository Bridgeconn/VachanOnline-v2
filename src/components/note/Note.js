import React from "react";
import { makeStyles } from "@mui/styles";
import { withStyles } from "@mui/styles";
import NoteIcon from "@mui/icons-material/NoteOutlined";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import MuiDialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import MuiDialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useFirebase } from "react-redux-firebase";
import { useFirebaseConnect } from "react-redux-firebase";
import { connect, useSelector } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import { getEditorToolbar } from "../common/utility";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  info: {
    padding: 0,
    width: "30px",
    marginTop: 20,
    marginRight: 4,
    cursor: "pointer",
  },
  paper: {
    [theme.breakpoints.down("md")]: {
      margin: 25,
    },
  },
  textField: {
    "& textarea": {
      maxHeight: 190,
    },
  },
  dialog: {
    padding: 0,
  },
  editor: {
    padding: 10,
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
          size="large"
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

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

  const { t } = useTranslation();
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
        <Tooltip title={t("commonAddNote")}>
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
          {t("commonEnterNoteMsg")}
        </Alert>
      </Snackbar>
      <Dialog
        maxWidth="md"
        fullWidth
        onClose={handleClose}
        aria-labelledby="new-note-dialog"
        open={open}
        classes={{ paper: classes.paper }}
      >
        <DialogTitle id="new-note-dialog" onClose={handleClose}>
          {t("commonNoteDialogTitle")}
        </DialogTitle>
        <DialogContent dividers className={classes.dialog}>
          <Editor
            editorState={editorState}
            editorStyle={{ height: "30vh" }}
            onEditorStateChange={handleNoteTextChange}
            placeholder={t("commonNotePlaceholder")}
            editorClassName={classes.editor}
            toolbar={getEditorToolbar(mobileView)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            {t("commonCancel")}
          </Button>
          <Button variant="outlined" onClick={saveNote}>
            {t("commonSave")}
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
