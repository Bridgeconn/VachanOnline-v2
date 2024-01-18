import Tooltip from "@mui/material/Tooltip";
import { withStyles } from "@mui/styles";
import { BLACK, GREY, WHITE } from "../../store/colorCode";

const BigTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: WHITE,
    color: BLACK,
    boxShadow: theme.shadows[4],
    border: "1px solid" + GREY,
    fontSize: 16,
  },
}))(Tooltip);
export default BigTooltip;
