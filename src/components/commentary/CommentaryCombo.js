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
import { connect } from "react-redux";
import * as actions from "../../store/actions";

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: "1rem",
    textTransform: "capitalize",
    backgroundColor: "#fff",
    border: "1px solid #fff",
    [theme.breakpoints.only("xs")]: {
      width: "50%",
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
    border: "1px solid #00000020",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
  expansionDetails: {
    backgroundColor: "#ffffff",
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
  commentary: {
    fontSize: "1rem",
    cursor: "pointer",
  },
}));
const CommentaryCombo = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [expanded, setExpanded] = React.useState("hindi");
  const { mobileView, commentary, setValue } = props;
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  //function to set the bible commentary when clicked
  const setCommentary = (event, lan) => {
    handleClose();
    props.setCommentary(
      JSON.parse(decodeURIComponent(event.currentTarget.getAttribute("value")))
    );
    setValue("commentaryLang", lan);
  };
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const classesI = `material-icons ${classes.icon}`;
  return (
    <>
      <Button
        aria-controls="commentary-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        classes={{ root: classes.button }}
      >
        {mobileView ? commentary?.code?.slice(0, 3) : commentary.code}
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
                  {languages.commentaries.map((item, i) => (
                    <ListItem
                      key={i}
                      value={encodeURIComponent(JSON.stringify(item))}
                      onClick={(e) => setCommentary(e, languages.languageCode)}
                      className={classes.commentary}
                    >
                      {item.code.toUpperCase()} : {item.name}
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
const mapStateToProps = (state) => {
  return {
    mobileView: state.local.mobileView,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CommentaryCombo);
