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
    margin: "0 10px",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
    },
    [theme.breakpoints.up("sm")]: {
      left: theme.spacing(0),
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
