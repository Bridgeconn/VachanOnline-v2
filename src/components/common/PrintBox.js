import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import React from "react";
import ReactToPrint from "react-to-print";

const PrintBox = (props) => {
  const {
    printRef,
    dialogOpen,
    setPrintNotes,
    setPrintHighlights,
    printNotes,
    printHighlights,
    chapter,
    bookDisplay,
    handleDialogClose,
  } = props;

  const handleNotesChange = (event) => {
    setPrintNotes(event.target.checked);
  };
  const handleHighlightsChange = (event) => {
    setPrintHighlights(event.target.checked);
  };
  const linkToPrint = () => {
    return (
      <Button variant="contained" color="primary">
        Print
      </Button>
    );
  };
  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={dialogOpen}
      onClose={handleDialogClose}
    >
      <DialogTitle>Print Chapter</DialogTitle>
      <DialogContent dividers>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={printNotes} onChange={handleNotesChange} />
            }
            label="Notes"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={printHighlights}
                onChange={handleHighlightsChange}
              />
            }
            label="Highlights"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <ReactToPrint
          trigger={linkToPrint}
          documentTitle={`VachanOnline-${bookDisplay}-${chapter}`}
          onAfterPrint={handleDialogClose}
          content={() => printRef.current}
        />
      </DialogActions>
    </Dialog>
  );
};
export default PrintBox;
