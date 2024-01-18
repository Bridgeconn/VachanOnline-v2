import React from "react";
import { makeStyles } from '@mui/styles';
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import ListItem from "@mui/material/ListItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { GREY, LIGHTGREY, WHITE } from "../../store/colorCode";

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: "1rem",
    textTransform: "capitalize",
    backgroundColor: "#fff",
    border: "1px solid #fff",
    boxShadow: "1px 1px 1px 1px " + GREY,
    [theme.breakpoints.down("md")]: {
      maxWidth: 130,
      margin: "9px 5px",
    },
    [theme.breakpoints.up("md")]: {
      left: theme.spacing(0),
      marginRight: 10,
    },
  },
  list: {
    padding: 0,
  },
  menuRoot: {
    backgroundColor: WHITE,
    boxShadow: "none",
    border: "1px solid #00000020",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&.Mui-expanded": {
      margin: "auto",
    },
  },
  expanded: {},
  expansionDetails: {
    backgroundColor: "#ffffff",
    boxShadow: "inset 1px 2px 2px 0px " + GREY,
    padding: "1px 0px 0px 0px",
    width: "100%",
  },
  summaryPanel: {
    textTransform: "capitalize",
    borderBottom: "1px solid #b7b7b726",
    "&.Mui-expanded": {
      minHeight: 50,
      backgroundColor: LIGHTGREY,
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
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
  paper: {
    maxHeight: "calc(100vh - 170px)",
    width: 300,
    border: "1px solid #d3d4d5",
  },
  language: {
    fontSize: "1rem",
  },
  commentary: {
    fontSize: "1rem",
    cursor: "pointer",
  },
  versionSelected: {
    boxShadow: "inset 0 0 30px " + LIGHTGREY,
    border: "1px solid " + GREY + "70",
  },
}));
const CommentaryCombo = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { commentary, setValue, commentaryLang } = props;
  const [expanded, setExpanded] = React.useState(commentaryLang);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
    setExpanded(commentaryLang);
  }
  //function to set the bible commentary when clicked
  const setCommentary = (event, lan) => {
    setAnchorEl(null);
    props.setCommentary(
      JSON.parse(decodeURIComponent(event.currentTarget.getAttribute("value")))
    );
    setValue("commentaryLang", lan);
  };
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const classesI = `material-icons ${classes.icon}`;
  function currentVersion(item) {
    return item?.code === commentary?.code &&
      item?.metadata["Language Name"] === commentary?.metadata["Language Name"]
      ? classes.versionSelected
      : "";
  }
  React.useEffect(() => {
    if (commentaryLang) {
      setExpanded(commentaryLang);
    }
  }, [commentaryLang]);
  return (
    <>
      <Button
        aria-controls="commentary-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        classes={{ root: classes.button }}
      >
        {commentary.code}
        <i className={classesI}>keyboard_arrow_downn</i>
      </Button>
      {!props.commentaries || props.commentaries.length === 0 ? (
        ""
      ) : (
        <Menu
          elevation={0}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          id="commentary-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          classes={{
            list: classes.list,
            paper: classes.paper,
          }}
        >
          {props.commentaries.map((languages, i) => (
            <Accordion
              expanded={expanded === languages.language}
              onChange={handleChange(languages.language)}
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
                  {languages.commentaries.map((item, i) => {
                    var versionActive = currentVersion(item);
                    return (
                      <ListItem
                        key={i}
                        value={encodeURIComponent(JSON.stringify(item))}
                        className={`${classes.commentary} ${versionActive}`}
                        onClick={(e) => setCommentary(e, languages.language)}
                      >
                        {item.code.toUpperCase()} : {item.name}
                      </ListItem>
                    );
                  })}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Menu>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    commentaryLang: state.local.commentaryLang,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CommentaryCombo);
