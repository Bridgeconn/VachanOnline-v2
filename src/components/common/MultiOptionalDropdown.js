import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { SETVALUE } from "../../store/actions";
import Select from "@material-ui/core/Select";
import i18n from "../../i18n";
import { FormControl, InputLabel } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const MultiOptionalDropdown = (props) => {
  const { setLocale, setOpen } = props;
  const langCode = ["en", "hi"];
  const multiLanguages = { en: "English", hi: "Hindi" };
  const [lang, setLang] = React.useState("");
  const { t } = useTranslation();

  const getLang = (event) => {
    setLang(event.target.value);
    i18n.changeLanguage(event.target.value);
    setLocale(event.target.value);
    localStorage.setItem("localeLang", event.target.value);
    setOpen(false);
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label"
          style={{ margin: "0 5px", padding: 0 }}
        >
          {t("selectMultiLanguage")}
        </InputLabel>
        <Select value={lang} onChange={getLang}>
          {langCode.map((text) => (
            <MenuItem key={text} value={text}>
              {multiLanguages[text]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
)(MultiOptionalDropdown);
