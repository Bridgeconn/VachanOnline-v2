import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Circle from "@material-ui/icons/LensRounded";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import { useFirebase } from "react-redux-firebase";
import * as color from "../../store/colorCode";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";

const ColorBox = styled("div")({
  padding: 6,
  display: "flex",
});
function Highlight(props) {
  const firebase = useFirebase();
  const { selectedVerses, setSelectedVerses, refUrl, highlights } = props;

  const { t } = useTranslation();
  const colors = [
    { code: "a", class: { color: color.YELLOW } },
    { code: "b", class: { color: color.GREEN } },
    { code: "c", class: { color: color.CYAN } },
    { code: "d", class: { color: color.PINK } },
    { code: "e", class: { color: color.ORANGE } },
  ];
  const colorClicked = (event) => {
    const color = event.currentTarget.getAttribute("data-code");
    //close popover
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
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    mobileView: state.local.mobileView,
  };
};
export default connect(mapStateToProps)(Highlight);
