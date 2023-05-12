import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import DictionaryCombo from "./DictionaryCombo";
import Box from "@material-ui/core/Box";
import DictionaryWordCombo from "./DictionaryWordCombo";
import Metadata from "../common/Metadata";
import { getDictionaryIndex, getDictionaryWord } from "../common/utility";
import Close from "../common/Close";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 82,
    [theme.breakpoints.down("sm")]: {
      marginTop: 60,
    },
  },
  header: {
    paddingLeft: 35,
    paddingBottom: 8,
    marginBottom: 20,
    borderBottom: "1px solid #f1ecec",
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      height: 60,
      alignItems: "center",
    },
  },
  title: {
    marginRight: 10,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  text: {
    position: "absolute",
    right: 0,
    left: 35,
    padding: "20px 20px 20px 0",
    top: 135,
    bottom: 0,
    color: "#464545",
    fontFamily: "Roboto,Noto Sans",
    overflow: "scroll",
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.00938em",
    marginBottom: -15,
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(0,0,0,.4) #eeeeee95",
    "& span": {
      fontWeight: 600,
      display: "block",
    },
    "& p": {
      marginBottom: 10,
    },
    "&::-webkit-scrollbar": {
      width: "0.45em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.4)",
      outline: "1px solid slategrey",
    },
    [theme.breakpoints.up("sm")]: {
      textAlign: "justify",
    },
    [theme.breakpoints.down("sm")]: {
      top: 120,
      left: 20,
    },
  },
  heading: {
    fontWeight: "bold",
    fontSize: "1.2em",
    padding: "10px 0",
    textTransform: "capitalize",
  },
  loading: {
    paddingLeft: 20,
  },
  metadata: {
    marginTop: -10,
  },
  closeButton: {
    marginTop: 7,
    marginRight: 15,
  },
  seeAlso: {
    textTransform: "capitalize",
  },
}));
const Dictionary = (props) => {
  const classes = useStyles();
  const [dictionaryText, setDictionaryText] = React.useState("");
  let { dictionary, version, setDictionary, mobileView } = props;
  let {
    dictionaries,
    selectedDictionary,
    dictionaryIndex,
    dictionaryWord,
    wordMeaning,
  } = dictionary;
  //Need to improve the performance of the component
  React.useEffect(() => {
    //if no dictionary selected set current language dictionary
    if (Object.entries(selectedDictionary).length === 0 && dictionaries[0]) {
      let language = version.split("-")[0];
      let dict = dictionaries.find((d) => {
        return d.languageCode === language;
      });
      if (dict === undefined) {
        dict = dictionaries[0].dictionaries[0];
      } else {
        dict = dict.dictionaries[0];
      }
      setDictionary("selectedDictionary", dict);
    }
  }, [version, selectedDictionary, dictionaries, setDictionary]);
  React.useEffect(() => {
    //if dictionary changed get dictionary index
    if (selectedDictionary && selectedDictionary.sourceId !== undefined) {
      getDictionaryIndex(selectedDictionary.sourceId, setDictionary);
    }
  }, [selectedDictionary, setDictionary]);
  React.useEffect(() => {
    //if word changed, get word meaning
    setDictionaryText("");
    if (
      selectedDictionary.sourceId !== undefined &&
      dictionaryWord !== undefined &&
      dictionaryWord.wordId !== undefined
    ) {
      getDictionaryWord(
        selectedDictionary.sourceId,
        dictionaryWord.wordId,
        setDictionary
      );
    }
  }, [selectedDictionary.sourceId, dictionaryWord, setDictionary]);
  const clean1 = (str) => {
    str = str.split(" (Translation suggestions")[0];
    str = str.split(" (अनुवाद के सुझाव")[0];
    return String(str).replace(/(?:__|[*#])|\[(.*?)\]\(.*?\)/gm, "$1");
  };
  const clean2 = (str) => {
    str = String(str).replace(/{|}/gm, "");
    return String(str).replace(/,/gm, ", ");
  };
  const clean3 = (str) => {
    str = String(str).replace(/\)\)/gm, ")");
    return String(str).replace(/(?:__|[*#])|\[(.*?)\]\(.*?\)/gm, "$1");
  };
  const clean4 = (str) => {
    str = String(str).replace(/(?:__|[*#])|\[(.*?)\]\(.*?\)/gm, "$1");
    return String(str).replace(/(:\d+) |(-\d+) /g, "$1, ");
  };
  React.useEffect(() => {
    //if word meaning changed set meaning
    if (wordMeaning && wordMeaning.keyword !== undefined) {
      let header = dictionaryWord.word;
      if (wordMeaning.wordForms.indexOf(",") >= 0) {
        header += " (" + wordMeaning.wordForms + ")";
      }
      setDictionaryText(
        <>
          <div className={classes.heading}>{header}</div>
          <div>{clean1(wordMeaning.definition)}</div>
          <div>{clean1(wordMeaning.translationHelp)}</div>
          <div className={classes.heading}>Strongs</div>
          <div>{clean2(wordMeaning.strongs)}</div>
          <div className={classes.heading}>See Also</div>
          <div className={classes.seeAlso}>{clean3(wordMeaning.seeAlso)}</div>
          <div className={classes.heading}>Ref</div>
          <div>{clean4(wordMeaning.ref)}</div>
        </>
      );
    }
  }, [classes.heading, classes.seeAlso, dictionaryWord.word, wordMeaning]);
  return (
    <div className={classes.root}>
      <Box className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          Dictionary
        </Typography>
        <Box flexGrow={1}>
          <DictionaryCombo
            dictionaries={dictionaries}
            selectedDictionary={selectedDictionary}
            setDictionary={setDictionary}
          />
          <DictionaryWordCombo
            dictionaryIndex={dictionaryIndex}
            dictionaryWord={dictionaryWord}
            setDictionary={setDictionary}
          ></DictionaryWordCombo>
        </Box>
        <Box className={classes.metadata}>
          <Metadata
            metadataList={selectedDictionary.metadata}
            title="Version Name (in Eng)"
            abbreviation="Abbreviation"
            mobileView={mobileView}
          ></Metadata>
        </Box>
        <Box>
          <Close className={classes.closeButton} />
        </Box>
      </Box>
      {dictionaryText.length === 0 ? (
        <h3 className={classes.loading}>Loading</h3>
      ) : (
        <div className={classes.text}>{dictionaryText}</div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    dictionary: state.local.dictionary,
    version: state.local.panel1.version,
    mobileView: state.local.mobileView,
  };
};
export default connect(mapStateToProps)(Dictionary);
