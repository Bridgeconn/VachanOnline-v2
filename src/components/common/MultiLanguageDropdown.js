import React, { useEffect } from "react";
import LanguageIcon from "@material-ui/icons/Language";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Menu, MenuItem, Tooltip } from "@material-ui/core";
import i18n from "../../i18n";
import { connect } from "react-redux";
import { SETVALUE } from "../../store/actions";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 150,
  },
}));
const MultiLanguageDropdown = (props) => {
  const classes = useStyles();
  const [languageAnchor, setLanguageAnchor] = React.useState(null);
  const open = Boolean(languageAnchor);
  const { locale, setLocale, iconstyle } = props;
  const { t } = useTranslation();
  function openLanguage(event) {
    setLanguageAnchor(event.currentTarget);
  }
  function closeLanguage() {
    setLanguageAnchor(null);
  }
  function handleClick(_locale) {
    i18n.changeLanguage(_locale);
    setLocale(_locale);
    closeLanguage();
  }
  useEffect(() => {
    setLocale(i18n.resolvedLanguage);
  }, [setLocale]);
  return (
    <>
      <Tooltip title={t("multilingualTooltip")}>
        <LanguageIcon
          className={iconstyle}
          onClick={openLanguage}
        ></LanguageIcon>
      </Tooltip>
      <Menu
        id="long-menu"
        anchorEl={languageAnchor}
        keepMounted
        open={open}
        onClose={closeLanguage}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        style={{ top: 17 }}
        classes={{ list: classes.list }}
      >
        <MenuItem onClick={() => handleClick("en")} selected={locale === "en"}>
          English
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleClick("hi")} selected={locale === "hi"}>
          Hindi
        </MenuItem>
      </Menu>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    locale: state.local.locale,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLocale: (value) =>
      dispatch({ type: SETVALUE, name: "locale", value: value }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiLanguageDropdown);
