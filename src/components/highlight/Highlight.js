import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BorderColor from "@material-ui/icons/BorderColor";
import Tooltip from "@material-ui/core/Tooltip";
import { BLUETRANSPARENT } from "../../store/colorCode";

const useStyles = makeStyles((theme) => ({
  info: {
    padding: 0,
    width: "30px",
    marginTop: 20,
    marginRight: 4,
    color: BLUETRANSPARENT,
    cursor: "pointer",
  },
}));

export default function Highlight({ highlighted, highlightClick }) {
  const classes = useStyles();
  const [highlightTitle, setHighlightTitle] = React.useState("");
  React.useEffect(() => {
    setHighlightTitle(highlighted ? "Remove Highlight" : "Add Highlight");
  }, [highlighted]);
  return (
    <div className={classes.info} onClick={highlightClick}>
      <Tooltip title={highlightTitle}>
        <BorderColor fontSize="small" />
      </Tooltip>
    </div>
  );
}
