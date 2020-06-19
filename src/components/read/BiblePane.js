import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Fullscreen from "react-full-screen";
import { useFirebase } from "react-redux-firebase";
import MenuBar from "./MenuBar";
import Bible from "./Bible";
import FetchHighlights from "../highlight/FetchHighlights";

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
  },
  fullscreen: {
    backgroundColor: "#fff",
  },
}));

const BiblePane = ({
  setValue,
  paneData,
  ref1,
  scroll,
  paneNo,
  singlePane,
  userDetails,
}) => {
  const classes = useStyles();
  const [fullscreen, setFullscreen] = React.useState(false);
  const [selectedVerses, setSelectedVerses] = React.useState([]);
  const [highlighted, setHighlighted] = React.useState(false);
  const [highlights, setHighlights] = React.useState([]);
  const [fetchHighlights, setFetchHighlights] = React.useState("");

  const { sourceId, bookCode, chapter, versesSelected } = paneData;

  const firebase = useFirebase();

  React.useEffect(() => {
    if (
      highlights &&
      Array.isArray(selectedVerses) &&
      selectedVerses.length > 0
    ) {
      if (highlights && highlights.length > 0) {
        const newHighlighted = selectedVerses.every(
          (a) => highlights.indexOf(parseInt(a)) !== -1
        );
        setHighlighted(newHighlighted);
      } else {
        setHighlighted(false);
      }
    }
  }, [selectedVerses, highlights]);
  //if no uesr logged in reset selected verses
  React.useEffect(() => {
    if (Object.keys(userDetails).length === 0 || userDetails.uid === null) {
      setSelectedVerses([]);
    }
  }, [userDetails]);

  React.useEffect(() => {
    setSelectedVerses(versesSelected);
  }, [versesSelected]);

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
    } else {
      setFetchHighlights("");
    }
  }, [userDetails, sourceId, bookCode, chapter, setHighlights]);
  function highlightClick() {
    const newHighlights = !highlighted
      ? highlights.concat(selectedVerses)
      : highlights.filter((a) => selectedVerses.indexOf(parseInt(a)) === -1);
    return firebase
      .ref(
        "users/" +
          userDetails.uid +
          "/highlights/" +
          sourceId +
          "/" +
          bookCode +
          "/" +
          chapter
      )
      .set(newHighlights, function (error) {
        if (error) {
          console.log("Highlight update error");
        } else {
          console.log("Highlight updated succesfully");
          setSelectedVerses([]);
        }
      });
  }
  return (
    <>
      <div>
        {fetchHighlights}
        <MenuBar
          {...paneData}
          paneNo={paneNo}
          setFullscreen={setFullscreen}
          setValue={setValue}
          highlighted={highlighted}
          highlightClick={highlightClick}
          selectedVerses={selectedVerses}
          setSelectedVerses={setSelectedVerses}
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
              />
            </Fullscreen>
          </Grid>
        </Grid>
      </div>
      {/* </Swipeable> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.local.userDetails,
  };
};

export default connect(mapStateToProps)(BiblePane);
