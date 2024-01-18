import React from "react";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import ListItem from "@mui/material/ListItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: "1rem",
    textTransform: "capitalize",
    backgroundColor: "#fff",
    border: "1px solid #fff",
    margin: "0 10px",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.up("md")]: {
      left: theme.spacing(0),
    },
  },
  list: {
    padding: 0,
  },
  menuRoot: {
    backgroundColor: "#eaeaea",
    boxShadow: "none",
    "&.Mui-expanded": {
      margin: 0,
    },
  },
  expanded: {},
  expansionDetails: {
    backgroundColor: "white",
    boxShadow: "none",
    padding: "0 0 0 20px",
    width: "100%",
  },
  summaryPanel: {
    textTransform: "capitalize",
    borderBottom: "1px solid #b7b7b726",
    "&.Mui-expanded": {
      minHeight: 50,
    },
  },
  content: {
    margin: "10px 0",
    "&.Mui-expanded": {
      margin: "12px 0",
    },
  },
  icon: {
    left: 15,
    position: "relative",
  },
  paper: {
    maxHeight: "calc(100vh - 170px)",
    width: 300,
    border: "1px solid #d3d4d5",
  },
  language: {
    fontSize: "1rem",
  },
  dictionary: {
    fontSize: "1rem",
    cursor: "pointer",
  },
}));
const DictionaryCombo = (props) => {
  const classes = useStyles();
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
  const classesI = `material-icons ${classes.icon}`;
  return (
    <>
      <Button
        aria-controls="dictionary-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        classes={{ root: classes.button }}
      >
        {props.selectedDictionary.code}
        <i className={classesI}>keyboard_arrow_downn</i>
      </Button>
      {!props.dictionaries || props.dictionaries.length === 0 ? (
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
          id="dictionary-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          classes={{
            list: classes.list,
            paper: classes.paper,
          }}
        >
          {props.dictionaries.map((languages, i) => (
            <Accordion
              defaultExpanded={true}
              classes={{
                root: classes.menuRoot,
                expanded: classes.expanded,
              }}
              key={i}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                classes={{
                  root: classes.summaryPanel,
                  expanded: classes.expanded,
                  content: classes.content,
                }}
              >
                <Typography className={classes.language}>
                  {languages.language}
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ padding: 0 }}>
                <List className={classes.expansionDetails}>
                  {languages.dictionaries.map((item, i) => (
                    <ListItem
                      key={i}
                      value={encodeURIComponent(JSON.stringify(item))}
                      onClick={setDictionary}
                      className={classes.dictionary}
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
