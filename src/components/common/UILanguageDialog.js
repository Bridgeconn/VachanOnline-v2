import React from "react";
import { Dialog, DialogContent, MenuItem, Select } from "@material-ui/core";
import { FormControl, InputLabel, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import i18n from "../../i18n";
import { SETVALUE } from "../../store/actions";
import { languageCode } from "../../store/languageData";

const UILanguageDialog = ({ setLocale }) => {
  const [open, setOpen] = React.useState(true);
  const localeLang = localStorage.getItem("i18nextLng");
  const [lang, setLang] = React.useState("");
  const { t } = useTranslation();

  const handleClose = (e, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  const handleChange = (event) => {
    setLang(event.target.value);
    i18n.changeLanguage(event.target.value);
    setLocale(event.target.value);
    setOpen(false);
  };
  return (
    <>
      {localeLang === "en-US" ? (
        <Dialog
          open={open}
          onClose={handleClose}
          scroll="paper"
          fullWidth={true}
          maxWidth="sm"
        >
          <DialogContent>
            <Typography variant="h6">User Interface Language</Typography>
            <FormControl fullWidth>
              <InputLabel id="language-select">
                {t("selectMultiLanguage")}
              </InputLabel>
              <Select value={lang} onChange={handleChange}>
                {Object.keys(languageCode).map((text) => (
                  <MenuItem key={text} value={text}>
                    {languageCode[text].name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
        </Dialog>
      ) : (
        ""
      )}
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
export default connect(mapStateToProps, mapDispatchToProps)(UILanguageDialog);
