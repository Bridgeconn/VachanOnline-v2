import { Tooltip } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const Help = ({ mobileView, iconStyle, url }) => {
  const { t } = useTranslation();
  return (
    <>
      {process.env.REACT_APP_DOCUMENT_URL ? (
        mobileView ? (
          ""
        ) : (
          <Tooltip title={t("landingHelpBtn")}>
            <Link to={process.env.REACT_APP_DOCUMENT_URL + url} target="_blank">
              <i className={`material-icons ${iconStyle}`}>help_outline</i>
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
