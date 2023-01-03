import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import NoteIcon from "@material-ui/icons/NoteOutlined";
import { connect } from "react-redux";
import Highlight from "../highlight/Highlight";
import { Tooltip } from "@material-ui/core";
import Note from "../note/Note";
import { BLUETRANSPARENT } from "../../store/colorCode";

const useStyles = makeStyles({
  root: {
    width: "100%",
    flexGrow: 0,
    position: "absolute",
    top: "auto",
    bottom: 55,
    justifyContent: "space-evenly",
    boxShadow: "0 -1px 4px #b3b6bf",
  },
  info: {
    padding: 0,
    width: "30px",
    marginTop: 20,
    marginRight: 4,
    color: BLUETRANSPARENT,
    cursor: "pointer",
  },
  marginGap: {
    marginBottom: 20,
  },
});
function BottomToolBar(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [highlightIcon, setHighlightIcon] = React.useState("");
  const [noteIcon, setNoteIcon] = React.useState("");

  const {
    userDetails,
    selectedVerses,
    setSelectedVerses,
    refUrl,
    highlights,
    sourceId,
    bookCode,
    chapter,
  } = props;
  React.useEffect(() => {
    if (userDetails.uid !== null) {
      if (selectedVerses && selectedVerses.length > 0) {
        setHighlightIcon(
          <Highlight
            selectedVerses={selectedVerses}
            setSelectedVerses={setSelectedVerses}
            refUrl={refUrl}
            highlights={highlights}
          />
        );
        return;
      }
    } else {
      setHighlightIcon("");
    }
  }, [
    userDetails,
    selectedVerses,
    classes.info,
    setSelectedVerses,
    refUrl,
    highlights,
  ]);
  //Set note icon
  React.useEffect(() => {
    if (userDetails.uid !== null) {
      if (selectedVerses && selectedVerses.length > 0) {
        setNoteIcon(
          <Note
            uid={userDetails.uid}
            selectedVerses={selectedVerses}
            setSelectedVerses={setSelectedVerses}
            sourceId={sourceId}
            bookCode={bookCode}
            chapter={chapter}
          />
        );
        return;
      } else {
        setNoteIcon(
          <Tooltip title="Select Verses">
            <div className={classes.info}>
              <NoteIcon fontSize="small" color="disabled" />
            </div>
          </Tooltip>
        );
      }
    } else {
      setNoteIcon("");
    }
  }, [
    userDetails,
    selectedVerses,
    setSelectedVerses,
    sourceId,
    bookCode,
    chapter,
    classes.info,
  ]);
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction icon={highlightIcon} />
      <BottomNavigationAction icon={noteIcon} className={classes.marginGap} />
    </BottomNavigation>
  );
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.local.userDetails,
  };
};
export default connect(mapStateToProps)(BottomToolBar);
