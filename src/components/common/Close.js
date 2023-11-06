import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { BLACK } from "../../store/colorCode";
import * as actions from "../../store/actions";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  closeButton: {
    color: BLACK,
  },
}));

const Close = ({ close, className }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Tooltip title={t("commonClose")}>
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
