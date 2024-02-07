import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Select from "react-select";
import Close from "../common/Close";
import BookCombo from "../common/BookCombo";
import Player from "../common/Player";
import Box from "@mui/material/Box";
import Help from "../common/Help";
import * as actions from "../../store/actions";
import { capitalize, getShortBook } from "../common/utility";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { BLACK } from "../../store/colorCode";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";

const CustomSelect = styled(Select)(({ theme }) => ({
  width: 200,
  [theme.breakpoints.down("md")]: {
    width: 150,
  },
}));
const Audio = (props) => {
  const theme = useTheme();
const {
    audioBible,
    bookCode,
    chapter,
    books,
    languageCode,
    mobileView,
    setValue,
    versionBooks,
  } = props;

  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");
  const [hasAudio, setHasAudio] = useState(false);
  const [audios, setAudios] = useState(null);
  const [book, setBook] = useState("");
  const [message, setMessage] = useState("");
  const [audioLangCode, setAudioLangCode] = useState("hin");
  const [audioBooks, setAudioBooks] = useState([]);

  const { t } = useTranslation();
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
      const value = language.value;
      const OBTBibles = [
        "Bommala",
        "Dommri",
        "Kachha",
        "Kongaru",
        "Mayla marathi",
        "Thakalika",
      ];
      if (mobileView) {
        //In mobile view there is only single pane view with the book combo, it will set the first available book
        setMessage("");
      } else if (OBTBibles.includes(value)) {
        const message = t("audioMessage1", { value });
        setMessage(message);
      } else {
        setMessage(t("audioMessage", { value }));
      }
      const obj = audioBible?.find((obj) => obj?.language?.name === lang);
      setAudioLangCode(obj?.language?.code ? obj?.language?.code : "hin");
      setAudios(obj?.audioBibles);
      setBook(getShortBook(books, obj?.language?.code, bookCode));
      setHasAudio(obj.audioBibles?.findIndex((x) => x.books[bookCode]) !== -1);
    }
  }, [language, audioBible, bookCode, books, mobileView, t]);
  useEffect(() => {
    const lang = audioBible.find(
      (ele) => ele?.language?.code === audioLangCode
    );
    const books = Object.keys(lang?.audioBibles[0]?.books || {});
    const filterBooks = (ele) => books?.includes(ele.book_code);
    setAudioBooks(versionBooks[audioLangCode]?.filter(filterBooks));
  }, [audioBible, audioLangCode, versionBooks]);
  return (
    <Box
      sx={{
        width: "100%",
        position: "absolute",
        top: "82px",
        bottom: 0,
        [theme.breakpoints.down("md")]: {
          top: "60px",
        },
      }}
    >
      <Box
        sx={{
          borderBottom: "1px solid #f1ecec",
          display: "flex",
          width: "100%",
          paddingBottom: "12px",
          paddingLeft: "35px",
          marginBottom: "20px",
          minHeight: "51px",
          [theme.breakpoints.down("md")]: {
            alignItems: "center",
            height: "60px",
            paddingBottom: "0px",
            paddingLeft: "15px",
          },
        }}
      >
        {mobileView ? null : (
          <Box flexGrow={1}>
            <Typography variant="h5">{t("audioBibleText")}</Typography>
          </Box>
        )}
        <Box flexGrow={1} sx={{ display: "flex", alignItems: "center" }}>
          {languages && languages?.length !== 0 && (
            <CustomSelect
              value={language}
              onChange={(data) => setLanguage(data)}
              options={languages}
            />
          )}
          {mobileView ? (
            ""
          ) : book ? (
            <Typography
              sx={{
                paddingLeft: "20px",
                verticalAlign: "middle",
                fontSize: "20px",
                display: "inline-block",
                [theme.breakpoints.down("lg")]: {
                  fontSize: "16px",
                  paddingLeft: "5px",
                },
              }}
            >
              {book} {chapter}
            </Typography>
          ) : (
            ""
          )}
          {mobileView && bookCode ? (
            <BookCombo
              bookCode={bookCode}
              bookList={audioBooks}
              chapter={chapter}
              setValue={setValue}
              minimal={true}
              screen={"audio"}
            />
          ) : null}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Help
            sx={{
              padding: "8px 12px 0",
              color: BLACK,
              marginTop: "5px",
              fontSize: "21px",
            }}
            url={"audioBible"}
          />
          <Close sx={{ marginRight: "15px", marginTop: "7px" }} />
        </Box>
      </Box>
      <Box
        sx={{
          top: "52px",
          bottom: 0,
          overflow: "scroll",
          position: "absolute",
          width: "100%",
          padding: "20px 4px 20px 15px",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0,0,0,.4) #eeeeee95",
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
          [theme.breakpoints.down("md")]: {
            top: "60px",
            height: "calc(100vh - 160px)",
          },
        }}
      >
        {(audioBible?.length === 0 || audioBible?.success === false) && (
          <h5
            sx={{
              paddingLeft: "20px",
              whiteSpace: "pre-wrap",
              lineHeight: "1.8rem",
            }}
          >
            {t("studyAudioBibleNotAvailableMsg")}
          </h5>
        )}
        {hasAudio ? (
          <Player
            audios={audios}
            bookCode={bookCode}
            chapter={chapter}
            languageCode={languageCode}
          />
        ) : (
          <h5
            sx={{
              paddingLeft: "20px",
              whiteSpace: "pre-wrap",
              lineHeight: "1.8rem",
            }}
          >
            {message}
          </h5>
        )}
      </Box>
    </Box>
  );
};
const mapStateToProps = (state) => {
  return {
    mobileView: state.local.mobileView,
    versionBooks: state.local.versionBooks,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE1, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Audio);
