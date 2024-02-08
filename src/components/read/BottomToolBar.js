import React from "react";
import Highlight from "../highlight/Highlight";
import CloseIcon from "@mui/icons-material/Close";
import Note from "../note/Note";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles"
export default function BottomToolBar(props) {
  const theme = useTheme()
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
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Box
        sx={{
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
          height: "45px",
        }}
      >
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          {highlightIcon}
          <Box sx={{ marginBottom: "20px", marginLeft: "15px" }}>
            {noteIcon}
          </Box>
        </Box>
        <Box onClick={clearSelection}>
          <CloseIcon />
        </Box>
      </Box>
    </Box>
  );
}
