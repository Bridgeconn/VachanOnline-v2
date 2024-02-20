import { InputBase, Paper, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { connect } from "react-redux";
import { SETVALUE, SETVALUE1 } from "../../store/actions";
import { BLACK } from "../../store/colorCode";
import { getReference } from "../common/utility";
import BigTooltip from "../common/BigTooltip";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";

const Icon = styled("i")({
  padding: "1px 1px 1px",
  color: BLACK,
  fontSize: "33px",
});
const SearchPassage = (props) => {
  const [searchText, setSearchText] = React.useState("");
  const [showTextBox, setShowTextBox] = React.useState(false);
  let {
    setHideIcons,
    mobileView,
    setValue1,
    setValue,
    panel1,
    versionBooks,
    versionSource,
  } = props;

  const { t } = useTranslation();
  const bookList = versionBooks[versionSource[panel1.sourceId]];
  const searchHints = (
    <div>
      <h5>{t("searchHints")}:-</h5>
      <h6>
        <b>{t("chapterSearch")}:</b>
      </h6>
      <span>
        <i>{t("egSearchRef")}</i> gen 49 or നഹൂം 1 or यहूदा 1
      </span>
      <h6>
        <b>{t("verseSearchRef")}:</b>
      </h6>
      <span>
        <i>{t("egSearchRef")}:</i> ഇയ്യോബ് 42:2 or genesis 12:2,3 or रूत 2:12
      </span>
      <h6>
        <b>{t("passageSearch")}</b>
      </h6>
      <span>
        <i>{t("egSearchRef")}: </i>rev 1:13-16 or 1 योहान 4:8-10,16,20-25
      </span>
    </div>
  );

  function handleClose() {
    setShowTextBox(false);
    setHideIcons(false);
    setSearchText("");
  }
  function clearTextField() {
    setSearchText("");
  }
  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const toggleText = () => {
    setShowTextBox((prev) => !prev);
    setHideIcons(true);
  };

  function showSearchResult(event) {
    event.preventDefault();
    setValue("errorMessage", "");
    const search = event.target.search.value;
    //check search text is string or not
    if (/\d/.test(search) === false) {
      setValue("errorMessage", "textSearch");
      return;
    }
    if (search) {
      const ref = getReference(search, bookList);
      if (ref === "bookNotFound") {
        setValue("errorMessage", "bookNotFound");
      } else if (ref === "chapterNotFound") {
        setValue("errorMessage", "referenceNotFound");
      } else if (ref === "invalidFormat") {
        setValue("errorMessage", "invalidFormat");
      }
      if (ref && typeof ref === "object") {
        setValue1("chapter", ref.chapter);
        setValue1("bookCode", ref.bookCode);
        setValue1("verseData", ref.verse);
        setValue("errorMessage", "");
      }
    }
  }

  return mobileView && !showTextBox ? (
    <IconButton
      type="submit"
      sx={{
        marginTop: 0.125,
        paddingX: 0.125,
        paddingY: 0.625,
        color: BLACK,
      }}
      onClick={toggleText}
      target="_blank"
      rel="noopener"
      size="large"
    >
      <Icon className={`material-icons `}>manage_search</Icon>
    </IconButton>
  ) : (
    <>
      <BigTooltip
        disableFocusListener={mobileView ? true : false}
        title={searchHints}
        sx={{
          width: { lg: 350, xs: 300 },
        }}
      >
        <Paper
          component="form"
          onSubmit={showSearchResult}
          sx={{
            paddingX: 0.4,
            paddingY: 0.4,
            display: "flex",
            alignItems: "center",
            height: 40,
            width: { lg: 350, xs: 300 },
            marginLeft: { lg: 2.5, xs: 0 },
            marginRight: { lg: 1.25, xs: 0 },
          }}
        >
          <IconButton type="submit" size="large">
            <Icon className={`material-icons`}>manage_search</Icon>
          </IconButton>
          <InputBase
            sx={{
              marginLeft: 1,
              flex: 1,
              width: { lg: "auto", xs: 155 },
              "& .MuiInputBase-input": { height: "80px" },
            }}
            placeholder={t("seachPlaceHolderTopbar")}
            value={searchText}
            name="search"
            autoComplete="off"
            onChange={handleSearchTextChange}
          />
          {searchText && (
            <CloseIcon onClick={clearTextField} sx={{ cursor: "pointer" }} />
          )}
        </Paper>
      </BigTooltip>
      {mobileView && (
        <Button
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
            paddingRight: 0,
          }}
          onClick={handleClose}
        >
          {t("commonCancel")}
        </Button>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    panel1: state.local.panel1,
    versionBooks: state.local.versionBooks,
    versionSource: state.local.versionSource,
    mobileView: state.local.mobileView,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue1: (name, value) =>
      dispatch({ type: SETVALUE1, name: name, value: value }),
    setValue: (name, value) =>
      dispatch({ type: SETVALUE, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchPassage);
