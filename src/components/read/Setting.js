import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { BLACK, WHITE } from "../../store/colorCode";
import PrintIcon from "@mui/icons-material/Print";
import Typography from "@mui/material/Typography";
import Print from "../common/PrintBox";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const StyleMenuItem = (props) => (
  <MenuItem
    sx={{
      textAlign: "left",
      width: "100%",
      display: "inline-block",
      fontSize: 18,
    }}
  >
    {props.children}
  </MenuItem>
);
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
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <StyleMenuItem>
          {t("settingsFontFamily")}
          <ButtonGroup
            sx={{ marginLeft: 1.875 }}
            variant="contained"
            aria-label="Large contained secondary button group"
          >
            <Button
              sx={{
                fontFamily: '"Roboto", "sans-serif"',
                textTransform: "none",
                fontSize: 16,
                ...(fontFamily === "Sans" && {
                  background: "#c7c7c7",
                  boxShadow: "inset 1px 1px 5px #9a9a9a",
                }),
              }}
              onClick={setFontFamily}
              value="Sans"
            >
              {t("settingsFontSans")}
            </Button>
            <Button
              sx={{
                fontFamily: '"Roboto Slab", "serif"',
                textTransform: "none",
                fontSize: 16,
                ...(fontFamily === "Serif" && {
                  background: "#c7c7c7",
                  boxShadow: "inset 1px 1px 5px #9a9a9a",
                }),
              }}
              onClick={setFontFamily}
              value="Serif"
            >
              {t("settingsFontSerif")}
            </Button>
          </ButtonGroup>
        </StyleMenuItem>
        <MenuItem
          sx={{
            textAlign: "left",
            width: "100%",
            display: "inline-block",
            fontSize: 18,
          }}
        >
          {t("settingsFontSize")}
          <ButtonGroup
            sx={{ marginLeft: 4.375 }}
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
        <StyleMenuItem>
          <FormControlLabel
            labelPlacement="start"
            label={
              <Typography
                sx={{ fontSize: 18, marginLeft: -2.125, marginRight: 2.25 }}
              >
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
        </StyleMenuItem>
        {mobileView ? (
          ""
        ) : (
          <StyleMenuItem>
            <FormControlLabel
              labelPlacement="start"
              label={
                <Typography sx={{ fontSize: 17, marginLeft: -2.125 }}>
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
          </StyleMenuItem>
        )}
        {mobileView ? (
          <StyleMenuItem onClick={handleDialogOpen}>
            <span sx={{ marginRight: 2.5 }}>{t("PrintSave")}</span>
            <PrintIcon />
          </StyleMenuItem>
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
