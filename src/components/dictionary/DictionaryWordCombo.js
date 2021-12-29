import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import ListItem from "@material-ui/core/ListItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: "1rem",
    textTransform: "capitalize",
    backgroundColor: "#fff",
    border: "1px solid #fff",
    [theme.breakpoints.only("xs")]: {
      width: "30%",
    },
    [theme.breakpoints.up("sm")]: {
      left: theme.spacing(0),
      marginRight: 10,
    },
  },
  list: {
    padding: 0,
  },
  menuRoot: {
    backgroundColor: "#eaeaea",
    boxShadow: "none",
    "&$expanded": {
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
    "&$expanded": {
      minHeight: 50,
    },
  },
  content: {
    margin: "10px 0",
    "&$expanded": {
      margin: "12px 0",
    },
  },
  icon: {
    left: 15,
    position: "relative",
  },
  paper: {
    maxHeight: "calc(100vh - 150px)",
    width: 500,
    border: "1px solid #d3d4d5",
  },
  letter: {
    fontSize: "1rem",
  },
  dictionary: {
    textTransform: "capitalize",
    fontSize: "1rem",
    cursor: "pointer",
    padding: "8px 4px",
    display: "inline-block",
    width: "33%",
    verticalAlign: "top",
  },
}));
const DictionaryWordCombo = (props) => {
  const classes = useStyles();
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
  const classesI = `material-icons ${classes.icon}`;
  return (
    <>
      <Button
        aria-controls="dictionaryWord-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        classes={{ root: classes.button }}
      >
        {dictionaryWord.word}
        <i className={classesI}>keyboard_arrow_downn</i>
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
          classes={{
            list: classes.list,
            paper: classes.paper,
          }}
        >
          {dictionaryIndex.map((letters, i) => (
            <Accordion
              defaultExpanded={i === 0 ? true : false}
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
                <Typography className={classes.letter}>
                  {letters.letter}
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ padding: 0 }}>
                <List className={classes.expansionDetails}>
                  {letters.words.map((item, i) => (
                    <ListItem
                      key={i}
                      value={encodeURIComponent(JSON.stringify(item))}
                      onClick={setWord}
                      className={classes.dictionary}
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
