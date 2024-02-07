import React, { useEffect, useState } from "react";
import BookCombo from "../common/BookCombo";
import Select from "react-select";
import * as actions from "../../store/actions";
import { capitalize } from "../common/utility";
import { connect } from "react-redux";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

const CustomSelect = styled(Select)(({ theme }) => ({
  width: "200px",
  [theme.breakpoints.down("md")]: {
    width: "150px",
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
  } = props;
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");
  const [audioLangCode, setAudioLangCode] = useState("hin");
  const theme = useTheme();
  useEffect(() => {
    if (languages.length) {
      let lang = audioBible?.find((l) => l?.language?.code === languageCode);
      //If audio bible not available for bible set first language
      if (lang === undefined) {
        setLanguage(languages[0]);
      } else {
        const name = capitalize(lang?.language?.name);
        setLanguage({ value: name, label: name });
      }
    }
  }, [languageCode, languages, audioBible, setLanguage]);
  useEffect(() => {
    //Get list of languages
    if (audioBible) {
      const languageList = audioBible
        ?.map((item) => {
          const lang = capitalize(item?.language?.name);
          return { value: lang, label: lang };
        })
        .sort((a, b) => a.value.localeCompare(b.value));
      setLanguages(languageList);
    }
  }, [audioBible]);
  useEffect(() => {
    if (language) {
      const lang = language?.value?.toLowerCase();
      const obj = audioBible?.find((obj) => obj?.language?.name === lang);
      setAudioLangCode(obj?.language?.code ? obj?.language?.code : "hin");
      setAudios(obj?.audioBibles);
    }
  }, [language, audioBible, bookCode, setAudios]);
  useEffect(() => {
    const lang = audioBible.find(
      (ele) => ele?.language?.code === audioLangCode
    );
    const books = Object.keys(lang?.audioBibles[0]?.books || {});
    const filterBooks = (ele) => books?.includes(ele.book_code);
    setAudioBooks(versionBooks[audioLangCode]?.filter(filterBooks));
  }, [audioBible, audioLangCode, setAudioBooks, versionBooks]);
  return (
    <Box
      sx={{
        paddingLeft: "22px",
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.only("sm")]: {
          paddingTop: "5px",
        },
      }}
    >
      {languages && languages?.length !== 0 && (
        <CustomSelect
          value={language}
          onChange={(data) => setLanguage(data)}
          options={languages}
        />
      )}
      <Box
        sx={{
          margin: "0 5px",
        }}
      >
        <BookCombo
          bookCode={bookCode}
          bookList={audioBooks}
          chapter={chapter}
          setValue={setValue1}
          minimal={true}
        />
      </Box>
    </Box>
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
    setValue1: (name, value) =>
      dispatch({ type: actions.SETVALUE1, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AudioCombo);
