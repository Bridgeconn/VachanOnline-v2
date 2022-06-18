import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Select from "react-select";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import ReactPlayer from "react-player";
import Close from "../common/Close";
import Box from "@material-ui/core/Box";
import { capitalize } from "../common/utillity";

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
  language: {
    fontSize: "1.1rem",
    textTransform: "capitalize",
  },
  cardRoot: {
    border: "1px solid #dddddd",
    boxShadow: "none",
    marginRight: 4,
  },
  cardHeader: {
    textTransform: "capitalize",
    borderBottom: "1px solid #b7b7b785",
    backgroundColor: "#efefef",
    minHeight: 50,
    padding: "0 15px",
  },
  cardContent: {
    padding: 0,
  },
  audioBible: {
    display: "block",
    padding: 16,
    fontSize: "1.1rem",
    borderBottom: "1px solid #b7b7b785",
    "&:last-child": {
      borderBottom: "none",
      paddingBottom: 0,
    },
  },
  player: {
    marginTop: 5,
    "& audio": {
      outlineWidth: 0,
    },
  },
  closeButton: {
    marginRight: 15,
    marginTop: 7,
  },
  select: {
    width: 200,
  },
  message: {
    paddingLeft: 20,
  },
}));
const Audio = (props) => {
  const classes = useStyles();
  const { audioBible, bookCode, chapter, book } = props;
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");
  const [languageObject, setLanguageObject] = useState(null);
  const [playing, setPlaying] = useState("");

  const getBook = (code) => {
    return book[code][book[code]?.findIndex((x) => x.book_code === bookCode)]
      ?.short;
  };
  useEffect(() => {
    //Get list of languages
    if (audioBible) {
      const languageList = audioBible.map((item) => {
        const lang = capitalize(item?.language?.name);
        return { value: lang, label: lang };
      });
      setLanguages(languageList);
      setLanguage(languageList[0]);
    }
  }, [audioBible]);
  useEffect(() => {
    if (language) {
      const lang = language?.value?.toLowerCase();
      setLanguageObject(audioBible.find((obj) => obj?.language?.name === lang));
    }
  }, [language, audioBible]);
  return (
    <div className={classes.root}>
      <Box className={classes.heading}>
        <Box flexGrow={1}>
          <Typography variant="h6">Audio Bibles</Typography>
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
        <Box className={classes.icons}>
          <Close className={classes.closeButton} />
        </Box>
      </Box>
      <div className={classes.container}>
        {(audioBible.length === 0 || audioBible?.success === false) && (
          <h5 className={classes.message}>No audio bibles available</h5>
        )}
        {languageObject &&
          (getBook(languageObject?.language?.code) ? (
            <Card className={classes.cardRoot}>
              <CardHeader
                title={getBook(languageObject?.language?.code) + " " + chapter}
                className={classes.cardHeader}
              />
              <CardContent className={classes.cardContent}>
                <List>
                  {languageObject.audioBibles.map((audio, i) => {
                    const { url, format, books, name } = audio;
                    const audioUrl =
                      url + bookCode + "/" + chapter + "." + format;
                    //Using id to play one player at a time
                    const id = languageObject.language.code + i;
                    return books.hasOwnProperty(bookCode) ? (
                      <ListItem
                        key={name}
                        value={name}
                        className={classes.audioBible}
                      >
                        {name}
                        <ReactPlayer
                          playing={playing === id}
                          url={audioUrl}
                          onPlay={() => setPlaying(id)}
                          controls
                          width="100%"
                          height="50px"
                          className={classes.player}
                          config={{
                            file: {
                              attributes: {
                                controlsList: "nodownload",
                              },
                            },
                          }}
                        />
                      </ListItem>
                    ) : (
                      ""
                    );
                  })}
                </List>
              </CardContent>
            </Card>
          ) : (
            <h5 className={classes.message}>
              Audio bible not available in {language.value} for this book
            </h5>
          ))}
      </div>
    </div>
  );
};
export default Audio;
