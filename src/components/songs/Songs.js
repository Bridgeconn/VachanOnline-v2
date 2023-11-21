import React, { useMemo, useEffect, useCallback } from "react";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ReactPlayer from "react-player";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Box, Typography } from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Setting from "../common/Setting";
import TopBar from "../read/TopBar";
import { BLACK, GREY, WHITE } from "../../store/colorCode";
import { t } from "i18next";

const drawerWidth = 350;
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  root: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      marginTop: 61,
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 1000,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    marginTop: 65,
    backgroundColor: "rgb(137, 191, 221)",
  },
  listDirection: {
    textAlign: "left",
  },
  drawerContainer: {
    overflow: "auto",
    fontSize: "1.2rem",
  },
  mobileHeading: {
    color: WHITE,
    textShadow: "1px 1px 2px hsl(246 37% 47% / 1)",
    textAlign: "center",
    background:
      "linear-gradient(109.6deg, rgb(137, 191, 221) 11.2%, rgb(150, 144, 204) 90.2%)",
  },
  heading: {
    fontSize: "2rem",
    color: WHITE,
    background:
      "linear-gradient(109.6deg, rgb(137, 191, 221) 11.2%, rgb(150, 144, 204) 100.2%)",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: { display: "none" },
    lineHeight: "1.8",
    height: 56,
  },
  lyricsHeading: {
    lineHeight: "1.255",
    margin: "5px 0",
    textAlign: "center",
    color: "rgb(150, 144, 204)",
    textShadow: "6px 4px 7px rgb(143 143 145 / 83%)",
    fontSize: "1.6rem",
  },
  linkList: {
    marginLeft: 5,
    color: BLACK,
    "&:hover": {
      color: GREY,
    },
  },
  mobileBox: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
    },
  },
  mobileLangCombo: {
    minWidth: 100,
  },
  mobileComboBox: {
    display: "flex",
  },
  box: {
    padding: 20,
    whiteSpace: "pre-wrap",
    overflow: "auto",
    flexGrow: 1,
    width: "100%",
  },
  player: {
    margin: 10,
    width: "calc(100% - 20px)",
    "& audio": {
      outlineWidth: 0,
    },
  },
  playerBox: {
    width: "100%",
  },
  songList: {
    marginLeft: 10,
    flexGrow: 1,
    maxWidth: 300,
  },
  islIcon: {
    fontSize: 21,
    float: "right",
    marginRight: 30,
    marginTop: 20,
    color: BLACK,
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    height: "calc(100vh - 65px)",
    marginTop: 65,
    [theme.breakpoints.down("sm")]: {
      height: "calc(100vh - 160px)",
      marginTop: 0,
    },
  },
}));
const Songs = () => {
  const [languageJson, setLanguageJson] = React.useState({});
  const [lang, setLang] = React.useState("");
  const [fontSize, setFontSize] = React.useState(20);
  const [songs, setSongs] = React.useState([]);
  const [currentSong, setCurrentSong] = React.useState(null);
  const [lyrics, setLyrics] = React.useState("");

  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isLarge = useMediaQuery("(min-width:1150px)");
  const getLang = (event) => {
    setLang(event.target.value);
  };
  const songSelect = useCallback((event) => {
    const song = JSON.parse(event?.target?.value);
    setCurrentSong(song);
  }, []);
  const API = useMemo(
    () => axios.create({ baseURL: process.env.REACT_APP_SONGS_URL }),
    []
  );
  useEffect(() => {
    API.get("languages.json").then(function (response) {
      setLanguageJson(response.data);
      setLang(Object.keys(response.data)[0] || "");
    });
  }, [API]);
  useEffect(() => {
    if (lang !== "") {
      API.get(lang + "/manifest.json").then(function (response) {
        const _songs = response?.data?.songs
          .filter((song) => song?.lyrics !== "Not Available")
          .map((song, i) => {
            song["sno"] = i + 1;
            return song;
          });
        setSongs(_songs);
        setCurrentSong(_songs[0]);
      });
    }
  }, [API, lang]);

  useEffect(() => {
    if (
      currentSong?.lyrics !== undefined &&
      currentSong?.lyrics !== "Not Available" &&
      lang !== ""
    ) {
      API.get(lang + "/" + currentSong?.lyrics).then(function (response) {
        setLyrics(response?.data);
      });
    }
  }, [API, currentSong, lang]);
  return (
    <>
      <AppBar position="fixed">
        <TopBar />
      </AppBar>
      <div className={classes.root}>
        {isMobile === true ? (
          <Box className={classes.mobile}>
            <Box className={classes.mobileHeading}>
              <Typography variant="h4">{t("songsText")}</Typography>
            </Box>
            <Box className={classes.mobileBox}>
              <Box p={1} flexGrow={1} className={classes.mobileComboBox}>
                <FormControl
                  variant="outlined"
                  size="small"
                  className={classes.mobileLangCombo}
                >
                  <Select value={lang} onChange={getLang}>
                    {Object.keys(languageJson).map((text) => (
                      <MenuItem
                        key={text}
                        value={text}
                        className={classes.listDirection}
                      >
                        {languageJson[text]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  variant="outlined"
                  size="small"
                  className={classes.songList}
                >
                  {songs?.length > 0 && currentSong && (
                    <Select
                      value={JSON.stringify(currentSong)}
                      onChange={songSelect}
                    >
                      {songs?.map((song, y) => (
                        <MenuItem
                          className={classes.listDirection}
                          key={y}
                          data-id={y + 1}
                          value={JSON.stringify(song)}
                        >
                          {song?.sno + ". " + song?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </FormControl>
              </Box>
              <Box p={1}>
                <Setting fontSize={fontSize} setFontSize={setFontSize} />
              </Box>
            </Box>
            <Divider />
          </Box>
        ) : (
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <FormControl
                variant="outlined"
                size="small"
                className={classes.formControl}
              >
                <Select value={lang}>
                  {Object.keys(languageJson).map((text) => (
                    <MenuItem
                      key={text}
                      value={text}
                      className={classes.listDirection}
                    >
                      {languageJson[text]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Setting fontSize={fontSize} setFontSize={setFontSize} />
            </div>
            <Divider />
            <div className={classes.drawerContainer}>
              <List>
                {songs?.map((song) => (
                  <ListItem key={song.sno} className={classes.listDirection}>
                    {song.sno + "."}
                    <Link
                      className={classes.linkList}
                      href="#"
                      onClick={() => setCurrentSong(song)}
                    >
                      {song.name}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </div>
          </Drawer>
        )}
        <div className={classes.content}>
          <Typography variant="h3" className={classes.heading}>
            {isLarge ? t("songsPageTitleDesktop") : t("songsText")}{" "}
            <Link
              to={process.env.REACT_APP_DOCUMENT_URL + "songs"}
              target="_blank"
            >
              <i className={`material-icons ${classes.islIcon}`}>
                help_outline
              </i>
            </Link>
          </Typography>
          <Typography variant="h4" className={classes.lyricsHeading}>
            {currentSong?.sno}. {currentSong?.name}
          </Typography>
          <Divider />
          <div className={classes.box} style={{ fontSize: fontSize }}>
            {lyrics}
          </div>
          {currentSong?.url !== undefined ? (
            <div className={classes.playerBox}>
              <Divider />
              <ReactPlayer
                url={
                  process.env.REACT_APP_SONGS_URL +
                  lang +
                  "/" +
                  currentSong?.url
                }
                controls
                width="calc(100% - 20px)"
                height="50px"
                className={classes.player}
                onError={() =>
                  console.log(
                    "error",
                    process.env.REACT_APP_SONGS_URL +
                      lang +
                      "/" +
                      currentSong?.url
                  )
                }
                config={{
                  file: {
                    attributes: {
                      controlsList: "nodownload",
                    },
                  },
                }}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Songs;
