import { Tooltip } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
const Help = ({ mobileView, iconStyle, url }) => {
  const { t } = useTranslation();
  return (
    <>
      {process.env.REACT_APP_DOCUMENT_URL ? (
        mobileView ? (
          ""
        ) : (
          <Tooltip title={t("landingHelpBtn")} style={{ float: "right" }}>
            <Link to={process.env.REACT_APP_DOCUMENT_URL + url} target="_blank">
              <HelpOutlineIcon fontSize="small" sx={iconStyle} />
            </Link>
          </Tooltip>
        )
      ) : (
        ""
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    mobileView: state.local.mobileView,
  };
};
export default connect(mapStateToProps)(Help);
