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
    marginLeft: 400,
    paddingLeft: 5,
    marginTop: 20,
    paddingTop: 10,
    marginRight: 425,
    paddingBottom: 20,
    border: "1px #000000",
    boxShadow: "1px 1px 1px 1px " + GREY,
    lineHeight: "1.8rem",
    fontSize: "16px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 10,
      marginRight: 10,
    },
  },
  listError: {
    paddingLeft: 10,
    // paddingRight: 10,
    paddingTop: 5,
    // paddingBottom: 10,
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
  }
  const notFoundMessage = (
    <div className={classes.errorSearchMessage}>
      <span className={classes.listError}>
        <b>Sorry, we didn't find any results for your search</b>
        <br />
        <li className={classes.listError}>
          Double-check spelling, you can use either book code,full book name or
          local book name
        </li>
        <li className={classes.listError}>
          For a Chapter search, Make sure there are spaces between book name and
          chapter
        </li>
        <li className={classes.listError}>
          For a verse search, use this format. eg: psalms 5:8 or psalms 5:8,10
        </li>
        <li className={classes.listError}>
          For a passage search, use this format. eg: psalms 5:10-15
        </li>
        <li className={classes.listError}>
          If you are searching for a word, click here &nbsp;
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
            >
              Search Text
            </Button>
          </Link>
        </li>
      </span>
    </div>
  );
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
              ) : errorMessage === "notFound" ? (
                notFoundMessage
              ) : (
                ""
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
