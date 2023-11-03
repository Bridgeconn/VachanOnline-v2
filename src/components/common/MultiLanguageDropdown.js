import React from "react";
import LanguageIcon from "@material-ui/icons/Language";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Menu, MenuItem } from "@material-ui/core";
import i18n from "../../i18n";
import { connect } from "react-redux";
import { SETVALUE } from "../../store/actions";

const useStyles = makeStyles((theme) => ({
  languageMenu: {
    width: 150,
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
  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };
  function setLanguage(locale) {
    i18n.changeLanguage(locale);
    setLocale(locale);
    closeLanguage();
  }
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
        value={locale}
        onChange={handleChange}
      >
        <MenuItem onClick={() => setLanguage("en")}>English</MenuItem>
        <Divider />
        <MenuItem onClick={() => setLanguage("hi")}>Hindi</MenuItem>
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
