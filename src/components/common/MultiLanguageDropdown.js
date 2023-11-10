import React, { useEffect } from "react";
import LanguageIcon from "@material-ui/icons/Language";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Menu, MenuItem } from "@material-ui/core";
import i18n from "../../i18n";
import { connect } from "react-redux";
import { SETVALUE } from "../../store/actions";
import { LIGHTGREY } from "../../store/colorCode";

const useStyles = makeStyles((theme) => ({
  languageMenu: {
    width: 150,
  },
  selected: {
    backgroundColor: LIGHTGREY,
  },
}));
const MultiLanguageDropdown = (props) => {
  const classes = useStyles();
  const [languageAnchor, setLanguageAnchor] = React.useState(null);
  const open = Boolean(languageAnchor);
  let { locale, setLocale, iconstyle } = props;

  function openLanguage(event) {
    setLanguageAnchor(event.currentTarget);
  }
  function closeLanguage() {
    setLanguageAnchor(null);
  }
  function setLanguage(_locale) {
    i18n.changeLanguage(_locale);
    setLocale(_locale);
    closeLanguage();
  }
  useEffect(() => {
    // i18n.changeLanguage(i18n.resolvedLanguage);
    setLocale(i18n.resolvedLanguage);
  }, [setLocale]);
  return (
    <>
      <LanguageIcon className={iconstyle} onClick={openLanguage}></LanguageIcon>
      <Menu
        id="long-menu"
        anchorEl={languageAnchor}
        keepMounted
        open={open}
        onClose={closeLanguage}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        style={{ top: 20 }}
        PaperProps={{
          className: classes.languageMenu,
        }}
      >
        <MenuItem
          onClick={() => setLanguage("en")}
          className={locale === "en" ? classes.selected : ""}
        >
          English
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => setLanguage("hi")}
          className={locale === "hi" ? classes.selected : ""}
        >
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
