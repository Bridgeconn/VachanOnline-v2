import React from "react";
import { styled } from "@mui/system";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import ListItem from "@mui/material/ListItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const SpanStyle = styled("span")({
  display: "inline-block",
  width: { lg: "100%", xs: 50 },
  whiteSpace: "nowrap",
  overflow: " hidden",
  textOverflow: "ellipsis",
});
const I = styled("i")({ left: 15, position: "relative" });

const DictionaryWordCombo = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  let { dictionaryIndex, dictionaryWord, setDictionary } = props;
  function handleClose() {
    setAnchorEl(null);
  }
  //function to set the dictionary word when clicked
  const setWord = (event) => {
    handleClose();
    setDictionary(
      "dictionaryWord",
      JSON.parse(decodeURIComponent(event.currentTarget.getAttribute("value")))
    );
    setDictionary("wordMeaning", {});
  };
  return (
    <>
      <Button
        aria-controls="dictionaryWord-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        sx={{
          fontSize: "1rem",
          textTransform: "capitalize",
          backgroundColor: "#fff",
          border: "1px solid #fff",
          width: { lg: "auto", xs: "40%" },
          whiteSpace: { lg: "wrap", xs: "nowrap" },
          left: 0,
          marginRight: 1.25,
        }}
      >
        <SpanStyle>{dictionaryWord.word}</SpanStyle>
        <I className="material-icons">keyboard_arrow_downn</I>
      </Button>
      {!dictionaryIndex || dictionaryIndex.length === 0 ? (
        ""
      ) : (
        <Menu
          elevation={0}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          id="dictionaryWord-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{
            [`.MuiMenu-paper`]: {
              maxHeight: "calc(100vh - 170px)",
              width: 500,
              border: "1px solid #d3d4d5",
            },
            [`.MuiMenu-list`]: {
              padding: 0,
            },
          }}
        >
          {dictionaryIndex.map((letters, i) => (
            <Accordion
              defaultExpanded={i === 0 ? true : false}
              sx={{
                [`&.MuiAccordion-root`]: {
                  backgroundColor: "#eaeaea",
                  boxShadow: "none",
                  "&.Mui-expanded": {
                    margin: 0,
                  },
                },
              }}
              key={i}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  [`&.MuiAccordionSummary-root`]: {
                    textTransform: "capitalize",
                    borderBottom: "1px solid #b7b7b726",
                    "&.Mui-expanded": {
                      minHeight: 50,
                    },
                  },
                  [`&.MuiAccordionSummary-content`]: {
                    marginTop: 1.25,
                    marginRight: 1.25,
                    marginBottom: 0,
                    marginLeft: 0,
                    "&.Mui-expanded": {
                      marginTop: 1.5,
                      marginRight: 1.5,
                      marginBottom: 0,
                      marginLeft: 0,
                    },
                  },
                }}
              >
                <Typography sx={{ fontSize: "1rem" }}>
                  {letters.letter}
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ padding: 0 }}>
                <List
                  sx={{
                    backgroundColor: "white",
                    boxShadow: "none",
                    paddingY: 0,
                    paddingRight: 0,
                    paddingLeft: 2.5,
                    width: "100%",
                  }}
                >
                  {letters.words.map((item, i) => (
                    <ListItem
                      key={i}
                      value={encodeURIComponent(JSON.stringify(item))}
                      onClick={setWord}
                      sx={{
                        textTransform: "capitalize",
                        fontSize: "1rem",
                        cursor: "pointer",
                        paddingTop: 1,
                        paddingRight: 1,
                        paddingBottom: 0.5,
                        paddingLeft: 0.5,
                        display: "inline-block",
                        width: "33%",
                        verticalAlign: "top",
                      }}
                    >
                      {item.word}
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Menu>
      )}
    </>
  );
};

export default DictionaryWordCombo;
