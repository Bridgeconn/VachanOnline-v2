import React from "react";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import ListItem from "@mui/material/ListItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { BLACK } from "../../store/colorCode";
const I = styled("i")({ left: 15, position: "relative" });
const DictionaryCombo = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  //function to set the bible dictionary when clicked
  const setDictionary = (event) => {
    handleClose();
    props.setDictionary(
      "selectedDictionary",
      JSON.parse(decodeURIComponent(event.currentTarget.getAttribute("value")))
    );
  };
  return (
    <>
      <Button
        aria-controls="dictionary-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        sx={{
          fontSize: "1rem",
          textTransform: "capitalize",
          backgroundColor: "#fff",
          border: "1px solid #fff",
          marginY: 0,
          marginX: 1.25,
          width: { lg: "auto", md: "50%", sm: "50%" },
          left: { xs: 0 },
          color: BLACK,
        }}
      >
        {props.selectedDictionary.code}
        <I className={`material-icons`}>keyboard_arrow_downn</I>
      </Button>
      {!props.dictionaries || props.dictionaries.length === 0 ? (
        ""
      ) : (
        <Menu
          elevation={0}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          id="dictionary-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{
            [`.MuiMenu-paper`]: {
              maxHeight: "calc(100vh - 170px)",
              width: 300,
              border: "1px solid #d3d4d5",
            },
            [`.MuiMenu-list`]: {
              padding: 0,
            },
          }}
        >
          {props.dictionaries.map((languages, i) => (
            <Accordion
              defaultExpanded={true}
              sx={{
                backgroundColor: "#eaeaea",
                boxShadow: "none",
                "&.Mui-expanded": {
                  margin: 0,
                },
              }}
              key={i}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  [`.MuiAccordionSummary-root`]: {
                    textTransform: "capitalize",
                    borderBottom: "1px solid #b7b7b726",
                    "&.Mui-expanded": {
                      minHeight: 50,
                    },
                  },
                  [`.MuiAccordionSummary-content`]: {
                    marginTop: 1.25,
                    margginRight: 1.25,
                    marginLeft: 0,
                    marginBottom: 0,
                    "&.Mui-expanded": {
                      marginTop: 1.5,
                      marginRight: 1.5,
                      marginLeft: 0,
                      marginBottom: 0,
                    },
                  },
                }}
              >
                <Typography sx={{ fontSize: "1rem" }}>
                  {languages.language}
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ padding: 0 }}>
                <List
                  sx={{
                    backgroundColor: "white",
                    boxShadow: "none",
                    paddingTop: 0,
                    paddingRight: 0,
                    paddingBottom: 0,
                    paddingLeft: 2.5,
                    width: "100%",
                  }}
                >
                  {languages.dictionaries.map((item, i) => (
                    <ListItem
                      key={i}
                      value={encodeURIComponent(JSON.stringify(item))}
                      onClick={setDictionary}
                      sx={{ fontSize: "1rem", cursor: "pointer" }}
                    >
                      {item.code} : {item.name}
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

export default DictionaryCombo;
