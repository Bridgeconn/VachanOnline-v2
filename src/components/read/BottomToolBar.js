import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Highlight from "../highlight/Highlight";
import CloseIcon from "@material-ui/icons/Close";
import Note from "../note/Note";

const useStyles = makeStyles((theme) => ({
  outerDiv:{
    display:"flex",
    justifyContent:"center",
    width:"100%"
  },
  root: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    boxShadow: "0 -1px 4px #b3b6bf",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      width: "350px",
    },
    padding: "0 20px",
    backgroundColor: "white",
    height: 45,
  },
  items: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  },
  note: {
    marginBottom: 20,
    marginLeft: 15,
  }
}));
export default function BottomToolBar(props) {
  const {
    userDetails,
    selectedVerses,
    setSelectedVerses,
    refUrl,
    highlights,
    sourceId,
    bookCode,
    chapter,
    paneNo,
  } = props;
  const styleProps = {
    paneNo: paneNo,
  };
  const classes = useStyles(styleProps);
  const [highlightIcon, setHighlightIcon] = React.useState("");
  const [noteIcon, setNoteIcon] = React.useState("");
  function clearSelection() {
    setSelectedVerses([]);
  }
  React.useEffect(() => {
    if (userDetails.uid !== null) {
      if (selectedVerses?.length > 0) {
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
  }, [userDetails, selectedVerses, setSelectedVerses, refUrl, highlights]);
  //Set note icon
  React.useEffect(() => {
    if (userDetails.uid !== null) {
      if (selectedVerses?.length > 0) {
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
  ]);
  return (
    <div className={classes.outerDiv}>
    <div className={classes.root}>
      <div className={classes.items}>
        {highlightIcon}
        <div className={classes.note}>{noteIcon}</div>
      </div>
      <div onClick={clearSelection}>
        <CloseIcon />
      </div>
    </div>
    </div>
  );
}
