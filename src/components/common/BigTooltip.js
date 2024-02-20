import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { BLACK, GREY, WHITE } from "../../store/colorCode";
import { styled } from "@mui/system";

const BigTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: WHITE,
    color: BLACK,
    boxShadow: theme.shadows[4],
    border: "1px solid" + GREY,
    fontSize: 16,
  },
}));
export default BigTooltip;
