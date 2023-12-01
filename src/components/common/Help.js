import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const Help = ({ mobileView, iconStyle, url }) => {
  return (
    <>
      {process.env.REACT_APP_DOCUMENT_URL ? (
        mobileView ? (
          ""
        ) : (
          <Link to={process.env.REACT_APP_DOCUMENT_URL + url} target="_blank">
            <i className={`material-icons ${iconStyle}`}>help_outline</i>
          </Link>
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
