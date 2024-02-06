import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import { connect } from "react-redux";
import { BLACK } from "../../store/colorCode";
import * as actions from "../../store/actions";
import { useTranslation } from "react-i18next";

const Close = ({ close, className }) => {
  const { t } = useTranslation();
  return (
    <Tooltip title={t("commonClose")}>
      <IconButton size="small" onClick={close} sx={className}>
        <CloseIcon sx={{ color: BLACK }} />
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
