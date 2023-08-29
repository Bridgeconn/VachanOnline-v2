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
import { SETVALUE } from "../../store/actions";
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
      width:175,
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
  const [message, setMessage] = React.useState("")
  const [showTextBox, setShowTextBox] = React.useState(false);
  const [hideIcons, setHideIcons] = React.useState(false);
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobilePortrait = useMediaQuery(theme.breakpoints.down("xs"));
  const location = useLocation();
  const path = location?.pathname;
  let { login, userDetails, setParallelView, mobileView , setValue} = props;

  React.useEffect(() => {
    setLoginButton(login ? <LoginMenu userDetails={userDetails} /> : <Login />);
  }, [login, userDetails]);

  function handleClose() {
    setShowTextBox(false);
    setHideIcons(false)
  }
  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
    if(searchText){
      setValue("searchPassage", searchText);
    }
  };

  const toggleText = () => {
    setShowTextBox((prev) => !prev);
    setHideIcons(true)
  };

  function showSearchResult(){
    if(searchText){
      const message = "Sorry, we didn't find any results for your search";
      setMessage(message);
      const ref=getReference(searchText)
      //setValue("panel1",ref)
      setSearchText("");
      console.log(ref,"reference")
      console.log(searchText,"text")
    } 
  }
  // const search = (event) => {
  //   event.preventDefault();
  //   if (searchText) {
  //     searchBible(sourceId, searchText, bookNames, setSearchResult);
  //     setSearchText("");
  //   }
  // };

 
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
        <Paper component="form" className={classes.searchBox}>
          <InputBase
            className={classes.searchField}
            placeholder="Enter Chapter, Verse or Passage"
            inputProps={{className:classes.input }}
            defaultValue={searchText}
            onChange={handleSearchTextChange}
          />
          <IconButton
            //type="submit"
            // className={classes.searchButton}
            //aria-label="search"
            onClick={showSearchResult}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        {mobileView && (
          <Button className={classes.cancelbtn} onClick={handleClose} >
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
          <div style={{display:hideIcons?"none":""}} >
          {path.startsWith("/study") ? ReadButton() : StudyButton()}
          {FeedbackButton()}
          {loginButton}</div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    searchPassage: state.local.searchPassage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setParallelView: () =>
      dispatch({ type: SETVALUE, name: "parallelView", value: SIGNBIBLE }),
    setValue: (name, value) =>
      dispatch({ type: SETVALUE, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TopBar);

