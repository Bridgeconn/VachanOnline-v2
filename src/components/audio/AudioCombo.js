import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import * as actions from "../../store/actions";
import { capitalize } from "../common/utility";
import { GREY, LIGHTGREY, WHITE } from "../../store/colorCode";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import BookCombo from "../common/BookCombo";

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: "1rem",
    textTransform: "capitalize",
    backgroundColor: "#fff",
    border: "1px solid #fff",
    boxShadow: "1px 1px 1px 1px " + GREY,
    [theme.breakpoints.down("sm")]: {
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
    "&$expanded": {
      margin: "auto",
    },
  },
  expansionDetails: {
    backgroundColor: "#ffffff",
    boxShadow: "inset 1px 2px 2px 0px " + GREY,
    padding: "1px 0px 0px 0px",
    width: "100%",
  },
  summaryPanel: {
    textTransform: "capitalize",
    borderBottom: "1px solid #b7b7b726",
    "&$expanded": {
      minHeight: 50,
      backgroundColor: LIGHTGREY,
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
  audioBible: {
    fontSize: "1rem",
    cursor: "pointer",
  },
  versionSelected: {
    boxShadow: "inset 0 0 30px " + LIGHTGREY,
    border: "1px solid " + GREY + "70",
  },
  container: {
    padding: "0 30px",
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      margin: "auto",
    },
  },
}));
const AudioCombo = (props) => {
  const {
    bookCode,
    chapter,
    audioBible,
    audioBooks,
    setAudioBooks,
    setValue1,
    versionBooks,
    setAudios,
    languageCode,
    language,
    mobileView,
  } = props;
  const classes = useStyles();
  const classesI = `material-icons ${classes.icon}`;
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(language);
  const [languages, setLanguages] = useState([]);
  const [lang, setLang] = useState("");
  const [langCode, setLangCode] = useState(languageCode);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  function handleClose() {
    setAnchorEl(null);
  }

  const setAudioBible = (event, lan, langCode) => {
    setAnchorEl(null);
    setLang(lan);
    setLangCode(langCode);
  };
  useEffect(() => {
    if (languages.length) {
      let langs = audioBible?.find((l) => l?.language?.code === langCode);
      //If audio bible not available for bible set first language
      if (langs === undefined) {
        setLang(languages[0]);
        setLangCode(languages[0].code);
      } else {
        let langName = langs.language.name;
        let code = langs.language.code;
        const name = capitalize(langs.audioBibles[0].name);
        setLang({ value: name, label: name, name: langName });
        setLangCode(code);
      }
    }
  }, [languages, audioBible, setValue1, langCode]);
  useEffect(() => {
    //Get list of languages
    if (audioBible) {
      const languageList = audioBible?.map((item) => {
        const langs = capitalize(item?.language?.name);
        return { value: langs, label: langs, code: item?.language?.code };
      });
      // .sort((a, b) => a.value.localeCompare(b.value));
      setLanguages(languageList);
    }
  }, [audioBible]);
  useEffect(() => {
    const langs = audioBible.find((ele) => ele?.language?.code === langCode);
    const books = Object?.keys(langs?.audioBibles[0]?.books || {});
    const filterBooks = (ele) => books?.includes(ele.book_code);
    setAudioBooks(versionBooks[langCode]?.filter(filterBooks));
  }, [audioBible, langCode, setAudioBooks, versionBooks]);
  useEffect(() => {
    if (lang) {
      const obj = audioBible?.find((obj) => obj?.language?.name === lang.name);
      setAudios(obj?.audioBibles);
    }
  }, [lang, audioBible, bookCode, versionBooks, setAudios]);
  let langNameMob = lang?.value?.split("Audio")[0];
  return (
    <div className={classes.container}>
      <Button
        aria-controls="audiobible-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        classes={{ root: classes.button }}
      >
        {mobileView ? langNameMob : lang?.value}
        <i className={classesI}>keyboard_arrow_downn</i>
      </Button>
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
        id="audiobible-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{
          list: classes.list,
          paper: classes.paper,
        }}
      >
        {audioBible.map((element, i) => (
          <Accordion
            expanded={expanded === element.language.name}
            onChange={handleChange(element.language.name)}
            classes={{
              root: classes.menuRoot,
            }}
            key={i}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              classes={{
                root: classes.summaryPanel,
                content: classes.content,
              }}
            >
              <Typography className={classes.language}>
                {element.language.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ padding: 0 }}>
              <List className={classes.expansionDetails}>
                {element.audioBibles.map((item, i) => {
                  return (
                    <ListItem
                      key={i}
                      value={encodeURIComponent(JSON.stringify(item))}
                      className={`${classes.audioBible}`}
                      onClick={(e) =>
                        setAudioBible(e, item.name, element.language.code)
                      }
                    >
                      {item.name}
                    </ListItem>
                  );
                })}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Menu>
      <BookCombo
        bookCode={bookCode}
        bookList={audioBooks}
        chapter={chapter}
        setValue={setValue1}
        minimal={true}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    audioBible: state.local.audioBible,
    versionBooks: state.local.versionBooks,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE, name: name, value: value }),
    setValue1: (name, value) =>
      dispatch({ type: actions.SETVALUE1, name: name, value: value }),
    setVersionBooks: (name, value) =>
      dispatch({ type: actions.ADDVERSIONBOOKS, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AudioCombo);
// export default AudioBookCombo;
