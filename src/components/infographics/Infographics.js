import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { connect } from "react-redux";
import Close from "../common/Close";
import Box from "@material-ui/core/Box";
import Viewer from "react-viewer";
import Select from "react-select";
import { capitalize, getShortBook } from "../common/utility";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "absolute",
    top: 82,
    bottom: 0,
  },
  container: {
    top: 52,
    bottom: 0,
    overflow: "scroll",
    position: "absolute",
    width: "100%",
    padding: "12px 4px 0 15px",
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
  },
  heading: {
    borderBottom: "1px solid #f1ecec",
    display: "flex",
    width: "100%",
    paddingBottom: 12,
    paddingLeft: 35,
    marginBottom: 20,
    minHeight: 51,
  },
  title: {
    paddingTop: 4,
    borderTop: "1px solid #f1ecec",
    width: "100%",
    height: "2em",
  },
  card: {
    minWidth: 170,
    width: 170,
    display: "inline-block",
    marginRight: 20,
    marginTop: 10,
    cursor: "pointer",
  },
  closeButton: {
    marginRight: 15,
    marginTop: 7,
  },
  select: {
    width: 200,
    [theme.breakpoints.down("sm")]: {
      width: 130,
    },
  },
  message: {
    paddingLeft: 20,
  },
}));
const Infographics = (props) => {
  const classes = useStyles();
  let { infographics, languageCode, bookCode, versionBooks } = props;
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [bookData, setBookData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");

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
          found.infographics.map((item) => {
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
        setMessage(`No Infographics available in ${lang} for ${book}`);
      }
    }
  }, [infographics, bookCode, language, versionBooks]);

  return (
    <div className={classes.root}>
      <Box className={classes.heading}>
        <Box flexGrow={1}>
          <Typography variant="h6">Infographics</Typography>
        </Box>
        <Box flexGrow={1}>
          {languages && languages?.length !== 0 && (
            <Select
              className={classes.select}
              value={language}
              onChange={(data) => setLanguage(data)}
              options={languages}
            />
          )}
        </Box>
        <Box>
          <Close className={classes.closeButton} />
        </Box>
      </Box>
      <div className={classes.container}>
        {bookData?.length > 0 &&
          bookData.map((pic, index) => {
            return (
              <Card
                key={index}
                className={classes.card}
                onClick={() => {
                  setVisible(true);
                  setActiveIndex(index);
                }}
              >
                <CardMedia
                  component="img"
                  alt={pic.title}
                  height="200"
                  image={url + "/thumbs/" + pic.fileName}
                  title={pic.title}
                />
                <CardContent>
                  <Typography className={classes.title} gutterBottom>
                    {pic.title}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        {message && <h5 className={classes.message}>{message}</h5>}
        <Viewer
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          images={bookData}
          activeIndex={activeIndex}
          scalable={false}
        />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    infographics: state.local.infographics,
    languageCode: state.local.panel1.languageCode,
    bookCode: state.local.panel1.bookCode,
    versionBooks: state.local.versionBooks,
  };
};
export default connect(mapStateToProps)(Infographics);
