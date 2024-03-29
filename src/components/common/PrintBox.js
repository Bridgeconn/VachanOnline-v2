import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import ReactToPrint from "react-to-print";
import { BLACK } from "../../store/colorCode";

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

  const { t } = useTranslation();

  const handleNotesChange = (event) => {
    setPrintNotes(event.target.checked);
  };
  const handleHighlightsChange = (event) => {
    setPrintHighlights(event.target.checked);
  };
  const linkToPrint = () => {
    return (
      <Button
        variant="outlined"
        sx={{
          color: BLACK,
          border: "1px solid rgba(0, 0, 0, 0.23)",
          "&:hover": {
            backgroundColor: BLACK + "0a",
            border: "1px solid rgba(0, 0, 0, 0.23)",
          },
        }}
      >
        {t("commonPrintBtn")}
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
      <DialogTitle>{t("commonPrintChapter")}</DialogTitle>
      <DialogContent dividers>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                color="default"
                checked={printNotes}
                onChange={handleNotesChange}
              />
            }
            label={t("commonNotes")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={printHighlights}
                color="default"
                onChange={handleHighlightsChange}
              />
            }
            label={t("highlightsText")}
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          sx={{
            color: BLACK,
            border: "1px solid rgba(0, 0, 0, 0.23)",
            "&:hover": {
              backgroundColor: BLACK + "0a",
              border: "1px solid rgba(0, 0, 0, 0.23)",
            },
          }}
          onClick={handleDialogClose}
        >
          {t("commonCancel")}
        </Button>
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
