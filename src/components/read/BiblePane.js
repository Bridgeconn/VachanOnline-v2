import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Fullscreen from "react-full-screen";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import MenuBar from "./MenuBar";
import Bible from "./Bible";
import FetchHighlights from "../highlight/FetchHighlights";
import BottomToolBar from "./BottomToolBar";

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
      top: (props) => (props?.paneNo === 2 ? 62 : 122),
    },
    [theme.breakpoints.only("sm")]: {
      top: 121,
    },
  },
  fullscreen: {
    backgroundColor: "#fff",
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
  const { sourceId, bookCode, chapter, versesSelected, message } = paneData;
  const printRef = React.useRef();
  const [printNotes, setPrintNotes] = React.useState(true);
  const [printHighlights, setPrintHighlights] = React.useState(true);
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
              {alertMessage}
            </Fullscreen>
          </Grid>
        </Grid>
        {mobileView &&
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
  };
};

export default connect(mapStateToProps)(BiblePane);
