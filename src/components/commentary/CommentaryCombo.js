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
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { BLACK, GREY, LIGHTGREY, WHITE } from "../../store/colorCode";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";

const I = styled("i")(({ theme }) => ({
  [`&.material-icons`]: {
    left: "15px",
    position: "relative",
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
}));

const CommentaryCombo = (props) => {
  const theme = useTheme();
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
  function currentVersion(item) {
    return item?.code === commentary?.code &&
      item?.metadata["Language Name"] === commentary?.metadata["Language Name"]
      ? {
          boxShadow: "inset 0 0 30px " + LIGHTGREY,
          border: "1px solid " + GREY + "70",
        }
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
        sx={{
          "&.MuiButton-root": {
            fontSize: "1rem",
            textTransform: "capitalize",
            backgroundColor: "#fff",
            border: "1px solid #fff",
            boxShadow: "1px 1px 1px 1px " + GREY,
            [theme.breakpoints.down("sm")]: {
              maxWidth: "130px",
              margin: "9px 5px",
            },
            [theme.breakpoints.up("md")]: {
              left: theme.spacing(0),
              marginRight: "10px",
            },
            color:BLACK,
          },
        }}
      >
        {commentary.code}
        <I className={`material-icons`}>keyboard_arrow_downn</I>
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
          sx={{
            "&. MuiList-root": {
              padding: 0,
            },
            "&. MuiPaper-root": {
              maxHeight: "calc(100vh - 170px)",
              width: "300px",
              border: "1px solid #d3d4d5",
            },
          }}
        >
          {props.commentaries.map((languages, i) => (
            <Accordion
              expanded={expanded === languages.language}
              onChange={handleChange(languages.language)}
              sx={{
                "&.MuiAccordionDetails-root": {
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
                "&.Mui-expanded": {
                  margin: "none",
                },
              }}
              key={i}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  "&.MuiAccordionSummary-root": {
                    textTransform: "capitalize",
                    borderBottom: "1px solid #b7b7b726",
                    "&.Mui-expanded": {
                      minHeight: "50px",
                      backgroundColor: LIGHTGREY,
                    },
                  },
                  "&.Mui-expanded": {},
                  "&.MuiAccordionSummary-content": {
                    margin: "10px 0",
                    "&.Mui-expanded": {
                      margin: "12px 0",
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
                    backgroundColor: "#ffffff",
                    boxShadow: "inset 1px 2px 2px 0px " + GREY,
                    padding: "1px 0px 0px 0px",
                    width: "100%",
                  }}
                >
                  {languages.commentaries.map((item, i) => {
                    var versionActive = currentVersion(item);
                    return (
                      <ListItem
                        key={i}
                        value={encodeURIComponent(JSON.stringify(item))}
                        sx={{
                          "&.Mui-selected": {
                            fontSize: versionActive ? "1rem" : "",
                            cursor: versionActive ? "pointer" : "",
                          },
                        }}
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
