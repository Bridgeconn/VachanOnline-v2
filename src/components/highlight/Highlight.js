import React from "react";
import BorderColor from "@mui/icons-material/BorderColor";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import Circle from "@mui/icons-material/LensRounded";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { useFirebase } from "react-redux-firebase";
import * as color from "../../store/colorCode";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

const ColorBox = styled("div")({
  padding: 6,
  display: "flex",
});
function Highlight(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const firebase = useFirebase();
  const { selectedVerses, setSelectedVerses, refUrl, highlights, mobileView } =
    props;

  const { t } = useTranslation();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const colors = [
    { code: "a", class: { color: color.YELLOW } },
    { code: "b", class: { color: color.GREEN } },
    { code: "c", class: { color: color.CYAN } },
    { code: "d", class: { color: color.PINK } },
    { code: "e", class: { color: color.ORANGE } },
  ];
  const open = Boolean(anchorEl);
  const colorClicked = (event) => {
    const color = event.currentTarget.getAttribute("data-code");
    //close popover
    setAnchorEl(null);
    //append a if no color set ie default yellow for old data
    //remove old highlights for selected verses
    let newHighlights = highlights
      .map((a) => (a.toString().includes(":") ? a : a + ":a"))
      .filter((a) => !selectedVerses.includes(parseInt(a.split(":")[0])));
    //add highlight with current color for selected verses if color not clear
    if (color !== "clear") {
      const colorVerses = selectedVerses.map((a) => `${a}:${color}`);
      newHighlights = newHighlights.concat(colorVerses).sort((a, b) => {
        return parseInt(a + "".split(":")[0]) - parseInt(b + "".split(":")[0]);
      });
    }
    return firebase.ref(refUrl).set(newHighlights, function (error) {
      if (error) {
        console.log("Highlight update error");
      } else {
        setSelectedVerses([]);
      }
    });
  };
  return (
    <div>
      {mobileView ? (
        <ColorBox>
          {colors.map((color, i) => (
            <Circle
              key={i}
              data-code={color.code}
              onClick={colorClicked}
              fontSize="large"
              sx={color.class}
            />
          ))}
          <Tooltip title={t("ClearHighlightToolTip")}>
            <NotInterestedIcon
              data-code="clear"
              onClick={colorClicked}
              fontSize="large"
              color="disabled"
            />
          </Tooltip>
        </ColorBox>
      ) : (
        <>
          <Box
            sx={{
              padding: 0,
              width: "30px",
              marginTop: 2.5,
              marginRight: 0.5,
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            <Tooltip title={t("highlightsText")}>
              <BorderColor fontSize="small" />
            </Tooltip>
          </Box>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            sx={{
              [`&.MuiPopover-paper `]: {
                marginTop: 0.5,
                borderRadius: 10,
              },
            }}
          >
            <ColorBox>
              {colors.map((color, i) => (
                <Circle
                  key={i}
                  data-code={color.code}
                  onClick={colorClicked}
                  fontSize="large"
                  sx={color.class}
                />
              ))}
              <Tooltip title={t("ClearHighlightToolTip")}>
                <NotInterestedIcon
                  data-code="clear"
                  onClick={colorClicked}
                  fontSize="large"
                  color="disabled"
                />
              </Tooltip>
            </ColorBox>
          </Popover>
        </>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    mobileView: state.local.mobileView,
  };
};
export default connect(mapStateToProps)(Highlight);
