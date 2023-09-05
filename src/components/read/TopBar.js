import React from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { InputBase, Paper, useMediaQuery } from "@material-ui/core";
import FeedbackOutlinedIcon from "@material-ui/icons/FeedbackOutlined";
import SearchIcon from "@material-ui/icons/Search";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Login from "../login/Login";
import logo from "../common/images/logo1.png";
import favicon from "../common/images/favicon_black.png";
import LoginMenu from "../login/LoginMenu";
import { getReference } from "../common/utility";
import IconButton from "@material-ui/core/IconButton";
import { BLACK, WHITE } from "../../store/colorCode";
import { SIGNBIBLE } from "../../store/views";
import { connect } from "react-redux";
import { SETVALUE, SETVALUE1 } from "../../store/actions";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    top: 0,
    display: "flex",
    width: "100%",
    position: "absolute",
    height: 74,
    [theme.breakpoints.down("sm")]: {
      height: 60,
    },
  },
  appBar: {
    background: WHITE,
    padding: "0px 10px",
    marginBottom: "10px",
    border: BLACK,
    zIndex: 900,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 0,
      padding: 0,
    },
  },
  title: {
    flexGrow: 1,
    width: "30%",
    display: "inline-block",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
    [theme.breakpoints.down("sm")]: {
      width: "10%",
    },
    "& a": {
      color: "inherit",
      textDecoration: "none",
      lineHeight: "75px",
    },
  },
  icon: {
    height: 50,
    [theme.breakpoints.down("sm")]: {
      height: 45,
    },
  },
  logo: {
    height: 60,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  button: {
    marginRight: 4,
    marginTop: 2,
  },
  feedback: {
    color: BLACK,
    marginRight: 4,
    marginTop: 2,
    "&:hover": {
      color: BLACK,
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  signBible: {
    marginTop: 2,
    marginRight: 10,
  },
  islIcon: {
    padding: "8px 8px 0",
    color: BLACK,
  },
  searchBox: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    height: 40,
    width: 350,
    marginLeft: 20,
    marginRight: 5,
  },
  searchField: {
    marginLeft: theme.spacing(1),
    flex: 1,
    [theme.breakpoints.down("sm")]: {
      width: 175,
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

const TopBar = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const [loginButton, setLoginButton] = React.useState();
  const [searchText, setSearchText] = React.useState("");
  const [showTextBox, setShowTextBox] = React.useState(false);
  const [hideIcons, setHideIcons] = React.useState(false);
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobilePortrait = useMediaQuery(theme.breakpoints.down("xs"));
  const location = useLocation();
  const path = location?.pathname;

  let {
    login,
    userDetails,
    mobileView,
    setValue1,
    setValue,
    panel1,
    versionBooks,
    versionSource,
    setParallelView,
  } = props;

  // bookList={versionBooks[versionSource[panel1.sourceId]]}
  // React.useEffect(() => {
  const bookList = versionBooks[versionSource[panel1.sourceId]];
  //   console.log(bookList);
  // }, [panel1.bookCode, panel1.sourceId, versionBooks, versionSource]);
  React.useEffect(() => {
    setLoginButton(login ? <LoginMenu userDetails={userDetails} /> : <Login />);
  }, [login, userDetails]);

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
    const search = event.target.search.value;

    if (search) {
      const ref = getReference(search, bookList);
      console.log(ref, "ref");
      if (ref && ref.verse === undefined) {
        setValue1("chapter", ref.chapter);
        setValue1("bookCode", ref.bookCode);
        setValue("errorMessage", "");
        setValue("verseSearch", "");
      } else if (ref) {
        //To show error message if invalid reference
        setValue1("chapter", ref.chapter);
        setValue1("bookCode", ref.bookCode);
        setValue1("verseData", ref.verse);
        setValue("errorMessage", "");
        setValue("verseSearch", ref.verseSearchText);
        console.log(ref.verse, "versedata");
      } else {
        setValue("errorMessage", "notFound");
        setValue("verseSearch", "");
      }
    }
  }

  const SearchButton = () => {
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
            placeholder="Enter Chapter, Verse or Passage"
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

  const ISLButton = () => {
    const Btn = () => {
      return mobileView ? (
        <i
          className={`material-icons ${classes.islIcon}`}
          onClick={setParallelView}
        >
          sign_language
        </i>
      ) : (
        <Button
          variant="outlined"
          size="small"
          className={classes.signBible}
          title="Sign Language Bible"
          aria-label="sign language bible"
          target="_blank"
          rel="noOpener"
          onClick={setParallelView}
          startIcon={<i className="material-icons">sign_language</i>}
        >
          {isTablet ? "ISLV" : "Sign Language Bible (ISLV)"}
        </Button>
      );
    };
    if (
      process.env.REACT_APP_SIGNBIBLE_URL === undefined ||
      path.startsWith("/read")
    ) {
      return "";
    }
    return path.startsWith("/study") ? Btn() : <Link to="/study">{Btn()}</Link>;
  };
  const StoriesButton = () => {
    return process.env.REACT_APP_BIBLE_STORIES_URL !== undefined ? (
      <Link to="/biblestories">
        <Button
          variant="outlined"
          size="small"
          className={classes.button}
          title="Bible Stories"
          aria-label="bible stories"
          target="_blank"
          rel="noopener"
        >
          {mobileView === true ? "Stories" : "Bible Stories"}
        </Button>
      </Link>
    ) : (
      ""
    );
  };
  const SongsButton = () => {
    return process.env.REACT_APP_SONGS_URL !== undefined ? (
      <Link to="/songs">
        {mobileView ? (
          <i className={`material-icons ${classes.islIcon}`}>music_note</i>
        ) : (
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            title="Songs"
            aria-label="songs"
            target="_blank"
            rel="noopener"
            startIcon={<i className="material-icons">music_note</i>}
          >
            Songs
          </Button>
        )}
      </Link>
    ) : (
      ""
    );
  };

  const ReadButton = () => {
    return (
      <Link to="/read">
        {isMobilePortrait ? (
          <i className={`material-icons ${classes.islIcon}`}>local_library</i>
        ) : (
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            title="Read Bible"
            aria-label="read bible"
            target="_blank"
            rel="noopener"
            startIcon={<i className="material-icons">local_library</i>}
          >
            {mobileView === true ? "Read" : "Read Bible"}
          </Button>
        )}
      </Link>
    );
  };
  const StudyButton = () => {
    return (
      <Link to="/study">
        {isMobilePortrait ? (
          <i className={`material-icons ${classes.islIcon}`}>menu_book</i>
        ) : (
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            title="Study Bible"
            aria-label="study bible"
            target="_blank"
            rel="noopener"
            startIcon={<i className="material-icons">menu_book</i>}
          >
            {mobileView === true ? "Study" : "Study Bible"}
          </Button>
        )}
      </Link>
    );
  };
  const FeedbackButton = () => {
    return (
      <Tooltip title="Feedback">
        <IconButton
          aria-label="feedback"
          className={classes.feedback}
          href="https://forms.office.com/r/qiV0Ym335M"
          target="_blank"
          rel="noopener"
        >
          <FeedbackOutlinedIcon />
        </IconButton>
      </Tooltip>
    );
  };
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <div className={classes.title}>
            <Link to="/">
              <img src={favicon} alt={"icon"} className={classes.icon} />
              <img src={logo} alt={"logo"} className={classes.logo} />
            </Link>
          </div>
          <div>{ISLButton()}</div>
          {path.startsWith("/songs") || path.startsWith("/read")
            ? ""
            : SongsButton()}

          {path.startsWith("/biblestories") || path.startsWith("/read")
            ? ""
            : StoriesButton()}
          {path.startsWith("/read") ? SearchButton() : ""}
          <div style={{ display: hideIcons ? "none" : "" }}>
            {path.startsWith("/study") ? ReadButton() : StudyButton()}
            {FeedbackButton()}
            {loginButton}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    panel1: state.local.panel1,
    versionBooks: state.local.versionBooks,
    versionSource: state.local.versionSource,
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
export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
