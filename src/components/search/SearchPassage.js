import { InputBase, Paper, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { SETVALUE, SETVALUE1 } from "../../store/actions";
import { BLACK } from "../../store/colorCode";
import { getReference } from "../common/utility";
import BigTooltip from "../common/BigTooltip";
import { useTranslation } from "react-i18next";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  searchBox: {
    padding: "4px 4px",
    display: "flex",
    alignItems: "center",
    height: 40,
    width: 350,
    marginLeft: 30,
    marginRight: 10,
    [theme.breakpoints.only("md")]: {
      marginLeft: 0,
      width: 300,
    },
  },
  searchField: {
    marginLeft: theme.spacing(1),
    flex: 1,
    [theme.breakpoints.down("sm")]: {
      width: 155,
    },
  },
  searchButtonMob: {
    marginTop: 1,
    padding: "5px 1px 5px",
    color: BLACK,
    paddingRight: 11,
  },
  input: {
    height: "80px",
  },
  cancelBtn: {
    marginLeft: "-10px",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  searchIcon: {
    padding: "1px 1px 1px",
    color: BLACK,
    fontSize: "33px",
  },
  searchTooltip: {
    width: "350px",
    [theme.breakpoints.only("md")]: {
      width: 300,
    },
  },
  hints: {
    fontSize: 14,
  },
  closeBtn: {
    cursor: "pointer",
  },
}));

const SearchPassage = (props) => {
  const classes = useStyles();
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
      className={classes.searchButtonMob}
      onClick={toggleText}
      target="_blank"
      rel="noopener"
      disableAutoFocus={true}
      disableEnforceFocus={true}
    >
      <i className={`material-icons ${classes.searchIcon}`}>manage_search</i>
    </IconButton>
  ) : (
    <>
      <BigTooltip title={searchHints} className={classes.searchTooltip}>
        <Paper
          component="form"
          className={classes.searchBox}
          onSubmit={showSearchResult}
        >
          <IconButton type="submit" className={classes.searchButtonMob}>
            <i className={`material-icons ${classes.searchIcon}`}>
              manage_search
            </i>
          </IconButton>
          <InputBase
            className={classes.searchField}
            placeholder={t("seachPlaceHolderTopbar")}
            inputProps={{ className: classes.input }}
            value={searchText}
            name="search"
            autoComplete="off"
            onChange={handleSearchTextChange}
          />
          {searchText && (
            <CloseIcon onClick={clearTextField} className={classes.closeBtn} />
          )}
        </Paper>
      </BigTooltip>
      {mobileView && (
        <Button className={classes.cancelBtn} onClick={handleClose}>
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
