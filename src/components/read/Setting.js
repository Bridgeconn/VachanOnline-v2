import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { BLUETRANSPARENT } from "../../store/colorCode";
import PrintIcon from "@material-ui/icons/Print";
import ReactToPrint from "react-to-print";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const useStyles = makeStyles((theme) => ({
  btn: {
    marginRight: theme.spacing(1),
    display: "inline-block",
    textTransform: "none",
    textAlign: "center",
    fontSize: 16,
  },
  serif: {
    fontFamily: '"Roboto Slab", "serif"',
    textTransform: "none",
    fontSize: 16,
  },
  sans: {
    fontFamily: '"Roboto", "sans-serif"',
    textTransform: "none",
    fontSize: 16,
  },
  menu: {
    textAlign: "left",
    width: "100%",
    display: "inline-block",
    fontSize: 18,
  },
  selected: {
    background: "#c7c7c7",
    boxShadow: "inset 1px 1px 5px #9a9a9a",
  },
  formControlLabel: {
    fontSize: 18,
    marginLeft: "-17px",
    marginRight: 18,
  },
  printIcon: {
    marginRight: 20,
  },
  buttonGroup1: {
    marginLeft: 15,
  },

  buttonGroup2: {
    marginLeft: 35,
  },
}));
const ITEM_HEIGHT = 68;
const Setting = ({
  fontSize,
  fontFamily,
  lineView,
  setValue,
  settingsAnchor,
  handleClose,
  printRef,
  printNotes,
  setPrintNotes,
  printHighlights,
  setPrintHighlights,
}) => {
  const classes = useStyles();
  const open = Boolean(settingsAnchor);

  const decreaseFontSize = () => {
    setValue("fontSize", fontSize > 12 ? fontSize - 1 : fontSize);
  };

  const increaseFontSize = () => {
    setValue("fontSize", fontSize < 25 ? fontSize + 1 : fontSize);
  };

  const setFontFamily = (event) => {
    setValue("fontFamily", event.currentTarget.getAttribute("value"));
  };
  const setLineView = (event) => {
    setValue("lineView", event.target.checked);
  };
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

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
    <>
      <Menu
        id="long-menu"
        anchorEl={settingsAnchor}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 5.5,
            width: 280,
            backgroundColor: BLUETRANSPARENT,
            color: "#fff",
          },
        }}
      >
        <MenuItem className={classes.menu}>
          Font Family
          <ButtonGroup
            className={classes.buttonGroup1}
            variant="contained"
            aria-label="Large contained secondary button group"
          >
            <Button
              className={
                fontFamily === "Sans"
                  ? `${classes.sans} ${classes.selected}`
                  : classes.sans
              }
              onClick={setFontFamily}
              value="Sans"
            >
              Sans
            </Button>
            <Button
              className={
                fontFamily === "Serif"
                  ? `${classes.serif} ${classes.selected}`
                  : classes.serif
              }
              onClick={setFontFamily}
              value="Serif"
            >
              Serif
            </Button>
          </ButtonGroup>
        </MenuItem>
        <MenuItem className={classes.menu}>
          Font Size
          <ButtonGroup
            className={classes.buttonGroup2}
            variant="contained"
            aria-label="Large contained secondary button group"
          >
            <Button style={{ fontSize: 13 }} onClick={decreaseFontSize}>
              A -
            </Button>
            <Button style={{ fontSize: 16 }} onClick={increaseFontSize}>
              A +
            </Button>
          </ButtonGroup>
        </MenuItem>
        <MenuItem className={classes.menu}>
          <FormControlLabel
            labelPlacement="start"
            label={
              <Typography className={classes.formControlLabel}>
                Line View
              </Typography>
            }
            control={
              <Switch
                checked={lineView}
                onChange={setLineView}
                name="lineView"
                color="default"
              />
            }
          />
        </MenuItem>
        <MenuItem className={classes.menu} onClick={handleDialogOpen}>
          <span className={classes.printIcon}>Print/Save</span>
          <PrintIcon />
        </MenuItem>
      </Menu>
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
            content={() => printRef.current}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Setting;
