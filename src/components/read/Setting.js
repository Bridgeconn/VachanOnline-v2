import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { BLACK, WHITE } from "../../store/colorCode";
import PrintIcon from "@material-ui/icons/Print";
import Typography from "@material-ui/core/Typography";
import Print from "../common/PrintBox";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

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
  isHoverVerse: {
    fontSize: 17,
    marginLeft: "-17px",
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
  isHoverVerse,
  setValue,
  settingsAnchor,
  handleClose,
  printRef,
  printNotes,
  setPrintNotes,
  printHighlights,
  setPrintHighlights,
  bookDisplay,
  chapter,
  mobileView,
  paneNo,
}) => {
  const classes = useStyles();
  const open = Boolean(settingsAnchor);

  function setItem(key, value) {
    setValue(key, value);
    if (paneNo !== 2) {
      localStorage.setItem(key, value);
    }
  }
  const decreaseFontSize = () => {
    setItem("fontSize", fontSize > 12 ? fontSize - 1 : fontSize);
  };

  const increaseFontSize = () => {
    setItem("fontSize", fontSize < 25 ? fontSize + 1 : fontSize);
  };

  const setFontFamily = (event) => {
    setItem("fontFamily", event.currentTarget.getAttribute("value"));
  };
  const setVerseHover = (event) => {
    setItem("isHoverVerse", event.target.checked);
  };
  const setLineView = (event) => {
    setItem("lineView", event.target.checked);
  };
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const { t } = useTranslation();
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
            backgroundColor: WHITE,
            color: BLACK,
            marginTop: 50,
          },
        }}
      >
        <MenuItem className={classes.menu}>
          {t("settingsFontFamily")}
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
              {t("settingsFontSans")}
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
              {t("settingsFontSerif")}
            </Button>
          </ButtonGroup>
        </MenuItem>
        <MenuItem className={classes.menu}>
          {t("settingsFontSize")}
          <ButtonGroup
            className={classes.buttonGroup2}
            variant="contained"
            aria-label="Large contained secondary button group"
          >
            <Button style={{ fontSize: 13 }} onClick={decreaseFontSize}>
              {t("settingsFontSizeA")}-
            </Button>
            <Button style={{ fontSize: 16 }} onClick={increaseFontSize}>
              {t("settingsFontSizeA")}+
            </Button>
          </ButtonGroup>
        </MenuItem>
        <MenuItem className={classes.menu}>
          <FormControlLabel
            labelPlacement="start"
            label={
              <Typography className={classes.formControlLabel}>
                {t("settingsLineView")}
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
        <MenuItem className={classes.menu}>
          <FormControlLabel
            labelPlacement="start"
            label={
              <Typography className={classes.isHoverVerse}>
                {t("hoverVerse")}
              </Typography>
            }
            control={
              <Switch
                checked={isHoverVerse}
                onChange={setVerseHover}
                onClick={setVerseHover}
                name="verseHover"
                color="default"
              />
            }
          />
        </MenuItem>
        {mobileView ? (
          <MenuItem className={classes.menu} onClick={handleDialogOpen}>
            <span className={classes.printIcon}>{t("PrintSave")}</span>
            <PrintIcon />
          </MenuItem>
        ) : null}
      </Menu>
      <Print
        dialogOpen={dialogOpen}
        handleDialogClose={handleDialogClose}
        bookDisplay={bookDisplay}
        printRef={printRef}
        printHighlights={printHighlights}
        setPrintNotes={setPrintNotes}
        setPrintHighlights={setPrintHighlights}
        printNotes={printNotes}
        chapter={chapter}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    mobileView: state.local.mobileView,
  };
};
export default connect(mapStateToProps)(Setting);
