import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Fullscreen from "react-full-screen";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import MenuBar from "./MenuBar";
import Bible from "./Bible";
import FetchHighlights from "../highlight/FetchHighlights";
import BottomToolBar from "./BottomToolBar";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@material-ui/core";
import { SEARCH } from "../../store/views";
import { GREY } from "../../store/colorCode";

const useStyles = makeStyles((theme) => ({
  bible: {
    display: "flex",
    width: "100%",
    padding: "0px 0px",
    position: "absolute",
    top: 135,
    bottom: 0,
    overflow: "auto",
    marginBottom: -15,
    [theme.breakpoints.only("xs")]: {
      top: (props) => (props?.paneNo === 2 ? 61 : 121),
    },
    [theme.breakpoints.only("sm")]: {
      top: 122,
    },
  },
  fullscreen: {
    backgroundColor: "#fff",
  },
  errorSearchMessage: {
    margin: "0 auto",
    width: "90vw",
    marginTop: 20,
    maxWidth: 1191,
    padding: 15,
    paddingLeft: 25,
    border: "1px #000000",
    lineHeight: "1.8rem",
    fontSize: "16px",
    [theme.breakpoints.down("sm")]: {
      margin: "15px 10px 15px 15px",
      padding: 8,
    },
    [theme.breakpoints.up("md")]: {
      boxShadow: "1px 1px 1px 1px " + GREY,
    },
  },
  listError: {
    [theme.breakpoints.down("sm")]: {
      paddingInlineStart: 30,
    },
    "& li": {
      marginTop: 5,
    },
  },
  searchBtn: {
    boxShadow: "1px 1px 1px 1px " + GREY,
    margin: 5,
    padding: "6px 10px",
    borderRadius: 4,
  },
}));

const BiblePane = (props) => {
  const {
    setValue,
    paneData,
    ref1,
    scroll,
    paneNo,
    singlePane,
    userDetails,
    toggleParallelScroll,
    mobileView,
    setMainValue,
    errorMessage,
  } = props;
  const styleProps = {
    paneNo: paneNo,
  };
  const classes = useStyles(styleProps);
  const [fullscreen, setFullscreen] = React.useState(false);
  const [selectedVerses, setSelectedVerses] = React.useState([]);
  const [highlights, setHighlights] = React.useState([]);
  const [fetchHighlights, setFetchHighlights] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");
  const [refUrl, setRefUrl] = React.useState("");
  const { sourceId, bookCode, chapter, versesSelected, message, verseData } =
    paneData;
  const printRef = React.useRef();
  const [printNotes, setPrintNotes] = React.useState(true);
  const [printHighlights, setPrintHighlights] = React.useState(true);
  const location = useLocation();
  const path = location?.pathname;

  function goToSearch() {
    setMainValue("parallelView", SEARCH);
    setMainValue("errorMessage", "");
    setMainValue("isTextSearch", "");
  }
  const textSearchMessage = (
    <div className={classes.errorSearchMessage}>
      <h6>
        <b>NO RESULTS FOUND</b>
        <br />
        <br />
        Please try the following:
      </h6>
      If you are searching for a word in the bible, click the button{" "}
      <Link
        to={{
          pathname: "/study",
        }}
      >
        <Button
          variant="outlined"
          size="small"
          title="Search Text"
          aria-label="search text"
          target="_blank"
          rel="noOpener"
          onClick={goToSearch}
          className={classes.searchBtn}
        >
          Search Text
        </Button>
      </Link>
    </div>
  );
  const notFoundMessage = (
    <div className={classes.errorSearchMessage}>
      <ul className={classes.listError}>
        <li>
          Double-check spelling, you can use either book code,full book name or
          local book name
        </li>
        <li>
          For a Chapter search, Make sure there is a space between book name and
          chapter
        </li>
        <li>
          For a verse search, use this format. eg: psalms 5:8 or psalms 5:8,10
        </li>
        <li>For a passage search, use this format. eg: psalms 5:10-15</li>
        <li>
          If you are searching for a word in the bible, click the button below{" "}
          <br />
          <Link
            to={{
              pathname: "/study",
            }}
          >
            <Button
              variant="outlined"
              size="small"
              title="Search Text"
              aria-label="search text"
              target="_blank"
              rel="noOpener"
              onClick={goToSearch}
              className={classes.searchBtn}
            >
              Search Text
            </Button>
          </Link>
        </li>
      </ul>
    </div>
  );
  const bookNotFound = (
    <div className={classes.errorSearchMessage}>
      <h6>
        <b>BOOK NOT FOUND</b>
      </h6>
      <br />
      Please try the following:
      <li>
        Double-check spelling, you can use either book code,full book name or
        local book name
      </li>
      <li>Make sure there is a space between book name and chapter</li>
      <li>
        Please use the above book drop down (second one) to see the list of
        books
      </li>
    </div>
  );
  const referenceNotFound = (
    <div className={classes.errorSearchMessage}>
      <h6>
        <b>BIBLE REFERENCE NOT FOUND IN CURRENT BIBLE</b>
      </h6>
      <br />
      Please try the following:
      <ul className={classes.listError}>
        <li>Make sure there is a space between book name and chapter</li>
        <li>Search for another reference</li>
        <li>Change Bible using Version dropdown (first dropdown)</li>
        <li>
          You can use Book dropdown (second dropdown)to read the required
          chapter, verse or passage
        </li>
      </ul>
    </div>
  );
  const invalidFormat = (
    <div className={classes.errorSearchMessage}>
      <h6>
        <b>INVALID SEARCH FORMAT</b>
      </h6>
      <br />
      Please try the following:
      <ul className={classes.listError}>
        <li>
          Don't use special characters except <b>, : -</b>
        </li>
        <li>
          Double-check spelling, you can use either book code,full book name or
          local book name
        </li>
        <li>
          {" "}
          Make sure there is a space between book name and chapter, eg:gen 49 or
          നഹൂം 1 or यहूदा 1
        </li>
        <li>
          You can use Book dropdown (second one)to see the book name and chapter
        </li>
        <li>
          For a verse search, use this format. ഇയ്യോബ് 42:2 or genesis 12:2,3 or
          रूत 2:12,13
        </li>
        <li>
          For a passage search, use this format. Eg:rev 1:13-16 or 1 योहान
          4:8-10
        </li>
      </ul>
    </div>
  );
  //........
  function showMessage() {
    if (errorMessage === "textSearch") {
      return textSearchMessage;
    }
    if (errorMessage === "bookNotFound") {
      return bookNotFound;
    }
    if (errorMessage === "referenceNotFound") {
      return referenceNotFound;
    }
    if (errorMessage === "invalidFormat") {
      return invalidFormat;
    }
    return notFoundMessage;
  }

  React.useEffect(() => {
    const closeAlert = () => {
      //After showing message remove it
      setValue("message", "");
    };
    //If message not empty show alert Message
    setAlertMessage(
      message && message !== "" ? (
        <Snackbar
          open={true}
          autoHideDuration={8000}
          onClose={closeAlert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={closeAlert}
            severity="warning"
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        ""
      )
    );
  }, [message, setValue]);
  //if no uesr logged in reset selected verses
  React.useEffect(() => {
    if (Object.keys(userDetails).length === 0 || userDetails.uid === null) {
      setSelectedVerses([]);
    }
  }, [setSelectedVerses, userDetails]);
  // Reset errorMessage value as empty
  React.useEffect(() => {
    if (path.startsWith("/study")) {
      setMainValue("errorMessage", "");
      setMainValue("isTextSearch", "");
      setValue("verseData", "");
    }
  }, [path, setMainValue, setValue]);
  React.useEffect(() => {
    setSelectedVerses(versesSelected);
  }, [setSelectedVerses, versesSelected]);

  React.useEffect(() => {
    if (Object.keys(userDetails).length !== 0 && userDetails.uid !== null) {
      setFetchHighlights(
        <FetchHighlights
          sourceId={sourceId}
          bookCode={bookCode}
          chapter={chapter}
          uid={userDetails.uid}
          setHighlights={setHighlights}
        />
      );
      setRefUrl(
        `users/${userDetails.uid}/highlights/${sourceId}/${bookCode}/${chapter}`
      );
    } else {
      setFetchHighlights("");
      setHighlights([]);
    }
  }, [userDetails, sourceId, bookCode, chapter, setHighlights, setRefUrl]);
  return (
    <>
      <div>
        {fetchHighlights}
        <MenuBar
          {...paneData}
          paneNo={paneNo}
          setFullscreen={setFullscreen}
          setValue={setValue}
          selectedVerses={selectedVerses}
          setSelectedVerses={setSelectedVerses}
          highlights={highlights}
          refUrl={refUrl}
          printRef={printRef}
          printNotes={printNotes}
          setPrintNotes={setPrintNotes}
          toggleParallelScroll={toggleParallelScroll}
          printHighlights={printHighlights}
          setPrintHighlights={setPrintHighlights}
        />
        <Grid container className={classes.bible}>
          <Grid item xs={12}>
            <Fullscreen
              enabled={fullscreen}
              onChange={(fullscreen) => setFullscreen(fullscreen)}
              className={classes.fullscreen}
            >
              {errorMessage === "" ? (
                <Bible
                  {...paneData}
                  setValue={setValue}
                  ref1={ref1}
                  scroll={scroll}
                  paneNo={paneNo}
                  singlePane={singlePane}
                  selectedVerses={selectedVerses}
                  setSelectedVerses={setSelectedVerses}
                  highlights={highlights}
                  printRef={printRef}
                  printNotes={printNotes}
                  printHighlights={printHighlights}
                  versesSelected={versesSelected}
                  languageCode={paneData.languageCode}
                />
              ) : (
                showMessage()
              )}
              {alertMessage}
            </Fullscreen>
          </Grid>
        </Grid>
        {mobileView &&
        errorMessage === "" &&
        userDetails.uid !== null &&
        selectedVerses?.length > 0 ? (
          <BottomToolBar
            selectedVerses={selectedVerses}
            setSelectedVerses={setSelectedVerses}
            refUrl={refUrl}
            setRefUrl={setRefUrl}
            highlights={highlights}
            setHighlights={setHighlights}
            sourceId={sourceId}
            bookCode={bookCode}
            chapter={chapter}
            verse={verseData}
            paneNo={paneNo}
            userDetails={userDetails}
          />
        ) : null}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    mobileView: state.local.mobileView,
    userDetails: state.local.userDetails,
    errorMessage: state.local.errorMessage,
    isTextSearch: state.local.isTextSearch,
    searchErrorType: state.local.searchErrorType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMainValue: (name, value) =>
      dispatch({
        type: actions.SETVALUE,
        name: name,
        value: value,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BiblePane);
