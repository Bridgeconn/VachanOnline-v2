import React from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import DictionaryCombo from "./DictionaryCombo";
import Box from "@mui/material/Box";
import DictionaryWordCombo from "./DictionaryWordCombo";
import Metadata from "../common/Metadata";
import { getDictionaryIndex, getDictionaryWord } from "../common/utility";
import Close from "../common/Close";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { BLACK } from "../../store/colorCode";
import Help from "../common/Help";
const Heading = styled("div")({
  fontWeight: "bold",
  fontSize: "1.2em",
  padding: "10px 0",
  textTransform: "capitalize",
});
const LoadingHeading = styled("h3")({
  paddingLeft: 20,
});
const Dictionary = (props) => {
  const [dictionaryText, setDictionaryText] = React.useState("");
  let { dictionary, version, setDictionary, mobileView } = props;
  let {
    dictionaries,
    selectedDictionary,
    dictionaryIndex,
    dictionaryWord,
    wordMeaning,
  } = dictionary;

  const { t } = useTranslation();
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
          <Heading>{header}</Heading>
          <div>{clean1(wordMeaning.definition)}</div>
          <div>{clean1(wordMeaning.translationHelp)}</div>
          <Heading>{t("strongsText")}</Heading>
          <div>{clean2(wordMeaning.strongs)}</div>
          <Heading>{t("seeAlsoText")}</Heading>
          <Box sx={{ textTransform: "capitalize" }}>
            {clean3(wordMeaning.seeAlso)}
          </Box>
          <Heading>{t("refText")}</Heading>
          <div>{clean4(wordMeaning.ref)}</div>
        </>
      );
    }
  }, [dictionaryWord.word, t, wordMeaning]);
  return (
    <Box sx={{ width: "100%", marginTop: { lg: 10.25, xs: 7.5 } }}>
      <Box
        sx={{
          paddingLeft: { lg: 4.375, xs: 0 },
          paddingBottom: { lg: 1, xs: 0 },
          marginBottom: 2.5,
          height: { lg: "auto", xs: 60 },
          alignItems: "center",
          borderBottom: "1px solid #f1ecec",
          display: "flex",
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginRight: 1.25,
            display: { lg: "block", xs: "none" },
          }}
        >
          {t("studyDictionaryTitle")}
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
        <Box
          sx={{
            display: "flex",
            marginTop: 0.5,
            flexWrap: "nowrap",
            marginLeft: { lg: -0.625, xs: 0 },
          }}
        >
          <Box sx={{ marginTop: -1.25 }}>
            <Metadata
              metadataList={selectedDictionary.metadata}
              title="Version Name (in Eng)"
              abbreviation="Abbreviation"
              mobileView={mobileView}
            ></Metadata>
          </Box>
          <Help
            iconStyle={{
              color: BLACK,
              fontSize: 19.5,
              marginTop: 1.375,
              marginRight: 0.625,
            }}
            url={"dictionaries"}
          />
          <Close className={{ marginTop: 0.875, marginRight: 1.875 }} />
        </Box>
      </Box>
      {dictionaryText.length === 0 ? (
        <LoadingHeading>Loading</LoadingHeading>
      ) : (
        <Box
          sx={{
            position: "absolute",
            right: 0,
            left: { lg: 35, xs: 20 },
            top: { lg: 135, xs: 120 },
            bottom: 0,
            color: "#464545",
            fontFamily: "Roboto,Noto Sans",
            overflow: "scroll",
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: "0.00938em",
            marginBottom: -1.875,
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0,0,0,.4) #eeeeee95",
            textAlign: { lg: "left", xs: "justify" },
            "& span": {
              fontWeight: 600,
              display: "block",
            },
            "& p": {
              marginBottom: 10,
            },
            "-webkit-scrollbar": {
              width: "0.45em",
            },
            "-webkit-scrollbar-track": {
              WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            },
            "-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.4)",
              outline: "1px solid slategrey",
            },
          }}
        >
          {dictionaryText}
        </Box>
      )}
    </Box>
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
