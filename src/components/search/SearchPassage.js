import { InputBase, Paper, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { connect } from "react-redux";
import { SETVALUE, SETVALUE1 } from "../../store/actions";
import { BLACK, WHITE } from "../../store/colorCode";
import { SIGNBIBLE } from "../../store/views";
import { getReference } from "../common/utility";

const useStyles = makeStyles((theme) => ({
  searchBox: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    height: 40,
    width: 350,
    marginLeft: 30,
    marginRight: 10,
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
    padding: "8px 8px 0",
    color: BLACK,
  },
  paper: {
    position: "relative",
    maxHeight: "calc(100vh - 170px)",
    width: 358,
    backgroundColor: WHITE,
    color: "#2a2a2a",
    "@media (max-width: 370px)": {
      width: 320,
    },
  },
  hide: {
    display: "none",
  },
  textField: {
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
    width: 350,
  },
  input: {
    height: "80px",
  },
  cancelbtn: {
    marginLeft: "-10px",
    textTransform: "capitalize",
    fontWeight: "bold",
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

  const bookList = versionBooks[versionSource[panel1.sourceId]];

  function handleClose() {
    setShowTextBox(false);
    setHideIcons(false);
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

    if (search) {
      const ref = getReference(search, bookList);
      if (ref) {
        setValue1("chapter", ref.chapter);
        setValue1("bookCode", ref.bookCode);
        setValue1("verseData", ref.verse);
        setValue("errorMessage", "");
      } else {
        setValue("errorMessage", "notFound");
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
    >
      <SearchIcon />
    </IconButton>
  ) : (
    <>
      <Paper
        component="form"
        className={classes.searchBox}
        onSubmit={showSearchResult}
      >
        <InputBase
          className={classes.searchField}
          placeholder="Enter Bible Reference"
          inputProps={{ className: classes.input }}
          value={searchText}
          name="search"
          autoComplete="off"
          onChange={handleSearchTextChange}
        />
        <IconButton
          type="submit"
          // className={classes.searchButton}
          //aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      {mobileView && (
        <Button className={classes.cancelbtn} onClick={handleClose}>
          Cancel
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
    setParallelView: () =>
      dispatch({ type: SETVALUE, name: "parallelView", value: SIGNBIBLE }),
    setValue1: (name, value) =>
      dispatch({ type: SETVALUE1, name: name, value: value }),
    setValue: (name, value) =>
      dispatch({ type: SETVALUE, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchPassage);
