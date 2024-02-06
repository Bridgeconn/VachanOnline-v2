import React, { useEffect } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import { makeStyles } from "@mui/styles";
import { Menu, MenuItem } from "@mui/material";
import i18n from "../../i18n";
import { connect } from "react-redux";
import { SETVALUE } from "../../store/actions";
import { useTranslation } from "react-i18next";
import BigTooltip from "./BigTooltip";
import { languageCode } from "../../store/languageData";
import { LIGHTGREY } from "../../store/colorCode";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 150,
  },
  languageItem: {
    borderBottom: "1px solid " + LIGHTGREY,
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
      <BigTooltip title={t("multilingualTooltip")}>
        <LanguageIcon sx={iconstyle} onClick={openLanguage}></LanguageIcon>
      </BigTooltip>
      <Menu
        id="long-menu"
        anchorEl={languageAnchor}
        keepMounted
        open={open}
        onClose={closeLanguage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        style={{ top: 17 }}
        classes={{ list: classes.list }}
      >
        {Object.keys(languageCode).map((text) => (
          <MenuItem
            key={text}
            onClick={() => handleClick(text)}
            selected={locale === text}
            className={classes.languageItem}
          >
            {languageCode[text].name}
          </MenuItem>
        ))}
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
