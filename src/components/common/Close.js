import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { BLUETRANSPARENT } from "../../store/colorCode";
import * as actions from "../../store/actions";

const useStyles = makeStyles(() => ({
  closeButton: {
    color: BLUETRANSPARENT,
  },
}));

const Close = ({ close, className }) => {
  const classes = useStyles();
  return (
    <Tooltip title="Close">
      <IconButton size="small" onClick={close} className={className}>
        <CloseIcon fontSize="small" className={classes.closeButton} />
      </IconButton>
    </Tooltip>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => {
      dispatch({ type: actions.SETVALUE, name: "parallelView", value: "" });
    },
  };
};
export default connect(null, mapDispatchToProps)(Close);
