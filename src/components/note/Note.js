import React from "react";
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
import Box from "@mui/material/Box";
import { useFirebase } from "react-redux-firebase";
import { useFirebaseConnect } from "react-redux-firebase";
import { connect, useSelector } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import { getEditorToolbar } from "../common/utility";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import { BLACK } from "../../store/colorCode";

const CustomEditor = styled(Editor)(({}) => ({
  padding: "10px",
}));

const StyledDialogTitle = styled(MuiDialogTitle)(({ theme }) => ({
  root: {
    margin: "0px",
    padding: theme.spacing(2),
  },
}));

function CustomDialogTitle(props) {
  const theme = useTheme();
  const { children, onClose, ...other } = props;
  return (
    <StyledDialogTitle {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          size="large"
          sx={{
            position: "absolute",
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </StyledDialogTitle>
  );
}

const CustomDialogActions = styled(MuiDialogActions)(({ theme }) => ({
  root: {
    margin: "10px",
    padding: theme.spacing(1),
  },
}));

function Note({
  uid,
  selectedVerses,
  setSelectedVerses,
  bookCode,
  sourceId,
  chapter,
  mobileView,
}) {
  const theme = useTheme();
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
    <Box>
      <Box
        sx={{
          padding: "0px",
          width: "30px",
          marginTop: "20px",
          marginRight: "4px",
          cursor: "pointer",
        }}
        onClick={openNoteDialog}
      >
        <Tooltip title={t("commonAddNote")}>
          <NoteIcon fontSize={mobileView ? "large" : "small"} />
        </Tooltip>
      </Box>
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
        sx={{
          [theme.breakpoints.down("md")]: {
            "& .MuiPaper-root": {
              margin: "25px",
            },
          },
        }}
      >
        <CustomDialogTitle id="new-note-dialog" onClose={handleClose}>
          {t("commonNoteDialogTitle")}
        </CustomDialogTitle>
        <DialogContent dividers sx={{ padding: "0px" }}>
          <CustomEditor
            editorState={editorState}
            editorStyle={{ height: "30vh" }}
            onEditorStateChange={handleNoteTextChange}
            placeholder={t("commonNotePlaceholder")}
              toolbar={getEditorToolbar(mobileView)}
          />
        </DialogContent>
        <CustomDialogActions>
          <Button
            variant="outlined"
            sx={{ color: BLACK, borderColor: BLACK }}
            onClick={handleClose}
          >
            {t("commonCancel")}
          </Button>
          <Button
            variant="outlined"
            onClick={saveNote}
            sx={{ color: BLACK, borderColor: BLACK }}
          >
            {t("commonSave")}
          </Button>
        </CustomDialogActions>
      </Dialog>
    </Box>
  );
}
const mapStateToProps = (state) => {
  return {
    mobileView: state.local.mobileView,
  };
};
export default connect(mapStateToProps)(Note);
