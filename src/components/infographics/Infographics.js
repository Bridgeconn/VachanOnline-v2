import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { connect } from "react-redux";
import Close from "../common/Close";
import Box from "@mui/material/Box";
import Viewer from "react-viewer";
import Select from "react-select";
import Help from "../common/Help";
import { capitalize, getShortBook } from "../common/utility";
import BookCombo from "../common/BookCombo";
import * as actions from "../../store/actions";
import { useTranslation } from "react-i18next";
import { BLACK } from "../../store/colorCode";
import { styled } from "@mui/system";

const StyledSelect = styled(Select)(({ theme }) => ({
  width: 200,
  [theme.breakpoints.down("sm")]: {
    width: 130,
  },
}));

const Heading = styled("h5")({ paddingLeft: 20 });
const Infographics = (props) => {
  let { infographics, panel1, versionBooks, setValue, mobileView } = props;
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [bookData, setBookData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");
  const { languageCode, bookCode, chapter } = panel1;

  const { t } = useTranslation();

  useEffect(() => {
    //Get list of languages
    if (infographics) {
      const languageList = infographics
        ?.map((item) => {
          const lang = capitalize(item?.language?.name);
          return { value: item?.language?.code, label: lang };
        })
        .sort((a, b) => a.value.localeCompare(b.value));
      setLanguages(languageList);
    }
  }, [infographics]);
  React.useEffect(() => {
    if (languages.length) {
      let lang = infographics?.find((l) => l?.language?.code === languageCode);
      //If infographics not available for bible pane set first language
      if (lang === undefined) {
        setLanguage(languages[0]);
      } else {
        const name = capitalize(lang?.language?.name);
        setLanguage({ value: lang?.language?.code, label: name });
      }
    }
  }, [infographics, languageCode, languages, setLanguage]);
  //If language or book changed update Book data and message
  useEffect(() => {
    if (language) {
      const langObj = infographics?.find(
        (obj) => obj?.language?.code === language?.value
      );
      const found = langObj.books?.find((e) => e.bookCode === bookCode);
      if (found) {
        setBookData(
          found.infographics?.map((item) => {
            item.src = langObj.url + item.fileName;
            item.alt = item.title;
            return item;
          })
        );
        setUrl(langObj.url);
        setMessage("");
      } else {
        setBookData([]);
        setUrl("");
        const book = getShortBook(versionBooks, language.value, bookCode);
        const lang = language?.label;
        const ref = {
          lang: lang,
          book: book,
        };
        setMessage(t("studyNoInfographicsAvailable", { ref }));
      }
    }
  }, [infographics, bookCode, language, versionBooks, t]);

  return (
    <Box
      sx={{
        width: "100%",
        position: "absolute",
        top: { lg: 82, xs: 60 },
        bottom: 0,
      }}
    >
      <Box
        sx={{
          borderBottom: "1px solid #f1ecec",
          display: "flex",
          width: "100%",
          paddingBottom: { lg: 1.5, xs: 0 },
          paddingLeft: 4.375,
          minHeight: 51,
          height: { lg: "auto", xs: 60 },
          alignItems: "center",
        }}
      >
        {mobileView ? null : (
          <Box flexGrow={1}>
            <Typography variant="h6">{t("infographicsText")}</Typography>
          </Box>
        )}
        <Box
          flexGrow={1}
          sx={{
            display: { lg: "block", xs: "flex" },
            alignItems: { lg: "flex-start", xs: "center" },
          }}
        >
          {languages && languages?.length !== 0 && (
            <StyledSelect
              value={language}
              onChange={(data) => setLanguage(data)}
              options={languages}
            />
          )}
          {mobileView && bookCode ? (
            <BookCombo
              bookCode={bookCode}
              bookList={versionBooks[language.value]}
              chapter={chapter}
              setValue={setValue}
              minimal={true}
              screen={"info"}
            />
          ) : null}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Help
            iconStyle={{ color: BLACK, marginTop: 0.625, fontSize: 21 }}
            url={"infographics"}
          />
          <Close className={{ marginRight: 1.875, marginTop: 0.875 }} />
        </Box>
      </Box>
      <Box
        sx={{
          top: { lg: 52, xs: 60 },
          bottom: 0,
          overflow: "scroll",
          position: "absolute",
          width: "100%",
          paddingTop: 1.5,
          paddingRight: 0.5,
          paddingBottom: 0,
          paddingLeft: 1.875,
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0,0,0,.4) #eeeeee95",
          "&::-webkit-scrollbar": {
            width: "0.45em",
          },
          "&::-webkit-scrollbar-track": {
            WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.4)",
            outline: "1px solid slategrey",
          },
        }}
      >
        {bookData?.length > 0 &&
          bookData.map((pic, index) => {
            return (
              <Card
                key={index}
                sx={{
                  minWidth: 170,
                  width: { lg: 170, xs: "99%" },
                  display: "inline-block",
                  marginRight: { lg: 2.5, xs: 0 },
                  marginTop: 1.25,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setVisible(true);
                  setActiveIndex(index);
                }}
              >
                <CardMedia
                  component="img"
                  alt={pic.title}
                  height="200"
                  sx={{ objectFit: "contain" }}
                  image={url + "/thumbs/" + pic.fileName}
                  title={pic.title}
                />
                <CardContent>
                  <Typography
                    sx={{
                      paddingTop: 0.5,
                      borderTop: "1px solid #f1ecec",
                      width: "100%",
                      height: "2em",
                    }}
                    gutterBottom
                  >
                    {pic.title}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        {message && <Heading>{message}</Heading>}
        <Viewer
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          images={bookData}
          activeIndex={activeIndex}
          scalable={false}
        />
      </Box>
    </Box>
  );
};
const mapStateToProps = (state) => {
  return {
    infographics: state.local.infographics,
    bookCode: state.local.panel1.bookCode,
    versionBooks: state.local.versionBooks,
    mobileView: state.local.mobileView,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE1, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Infographics);
