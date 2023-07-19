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
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { BLACK, GREY } from "../store/colorCode";
import TopBar from "../components/read/TopBar";
import Setting from "../components/common/Setting";

const drawerWidth = 400;
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  root: {
    display: "flex",
    [theme.breakpoints.down("sm")]: { display: "block" },
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
    marginTop: 60,
  },
  songs: {
    paddingLeft: 10,
    paddingRight: 10,
    [theme.breakpoints.down("sm")]: {
      marginTop: 182,
      paddingLeft: 15,
      paddingRight: 25,
    },
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
  },
  listDirection: {
    textAlign: "left",
  },
  drawerContainer: {
    overflow: "auto",
    fontSize: "1.2rem",
  },
  mobile: {
    width: "100%",
    position: "fixed",
    top: 60,
    backgroundColor: "white",
    borderBottom: "1px solid #f1ecec",
    zIndex: 1,
  },
  mobileHeading: { textAlign: "center", borderBottom: "1px solid #f1ecec" },
  heading: {
    background:
      "linear-gradient(109.6deg, rgb(137, 191, 221) 11.2%, rgb(150, 144, 204) 100.2%)",
    marginTop: 62,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: { display: "none" },
    lineHeight: "1.5",
  },
  lyricsHeading: {
    lineHeight: "1.255",
    margin: "5px 0",
    textAlign: "center",
    color: "rgb(150, 144, 204)",
    textShadow: "1px 1px 2px hsl(246 37% 47% / 1)",
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
    maxWidth: "90%",
    display: "flex",
  },
  box: {
    padding: 20,
    whiteSpace: "pre-wrap",
    position: "absolute",
    overflow: "auto",
    height: "calc(100% - 253px)",
    width: "calc(100% - 400px)",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "calc(100% - 312px)",
    },
  },
  player: {
    margin: 10,
    width: "calc(100% - 20px)",
    "& audio": {
      outlineWidth: 0,
    },
  },
  playerBox: {
    position: "absolute",
    width: "calc(100% - 400px)",
    bottom: 0,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  songList: {
    marginLeft: 10,
    flexGrow: 1,
    maxWidth: 300,
  },
  content: {
    flexGrow: 1,
  },
}));
const Songs = (props) => {
  const [languageJson, setLanguageJson] = React.useState({});
  const [lang, setLang] = React.useState("");
  const [fontSize, setFontSize] = React.useState(20);
  const [songs, setSongs] = React.useState([]);
  const [currentSong, setCurrentSong] = React.useState(null);
  const [lyrics, setLyrics] = React.useState("");

  const { userDetails, login } = props;
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        const _songs = response?.data?.songs.filter(
          (song) => song?.lyrics !== "Not Available"
        );
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
        <TopBar login={login} userDetails={userDetails} mobileView={isMobile} />
      </AppBar>
      <div className={classes.root}>
        {isMobile === true ? (
          <Box className={classes.mobile}>
            <Box className={classes.mobileHeading}>
              <Typography variant="h4">Songs</Typography>
            </Box>
            <Box className={classes.mobileBox}>
              <Box p={1} flexGrow={1} className={classes.mobileComboBox}>
                <FormControl
                  variant="outlined"
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
                <FormControl variant="outlined" className={classes.songList}>
                  {songs?.length > 0 && currentSong && (
                    <Select
                      value={JSON.stringify(currentSong)}
                      onChange={songSelect}
                    >
                      {songs?.map((song, y) => (
                        <MenuItem
                          className={classes.listDirection}
                          key={y}
                          value={JSON.stringify(song)}
                        >
                          {y + 1 + ". " + song?.name}
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
              <FormControl variant="outlined" className={classes.formControl}>
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
                {songs?.map((song, y) => (
                  <ListItem key={y} className={classes.listDirection}>
                    {y + 1 + "."}
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
        <main className={classes.content}>
          <Typography variant="h3" className={classes.heading}>
            Songs
          </Typography>
          <div className={classes.songs} style={{ fontSize: fontSize }}>
            <Typography variant="h4" className={classes.lyricsHeading}>
              {currentSong?.name}
            </Typography>
          </div>
          <Divider />
          <div className={classes.container} style={{ fontSize: fontSize }}>
            <div className={classes.box}>{lyrics}</div>
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
        </main>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    login: state.local.login,
    userDetails: state.local.userDetails,
  };
};

export default connect(mapStateToProps, null)(Songs);
