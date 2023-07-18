import React, { useMemo, useEffect, useCallback } from "react";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import Select from "@material-ui/core/Select";
import Menu from "@material-ui/core/Menu";
import Tooltip from "@material-ui/core/Tooltip";
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
import { BLACK, GREY, WHITE } from "../store/colorCode";
import TopBar from "../components/read/TopBar";

const drawerWidth = 400;
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  menu: {
    textAlign: "center",
    width: "100%",
    display: "inline-block",
    fontSize: 18,
  },
  margin: {
    height: theme.spacing(5),
  },
  settings: {
    padding: 0,
    width: "30px",
    marginTop: -46,
    float: "right",
    marginLeft: "-10px",
    marginRight: "20px",
    cursor: "pointer",
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
  stories: {
    marginTop: 200,
    paddingLeft: 15,
    paddingRight: 25,
    [theme.breakpoints.up("md")]: {
      marginTop: 140,
      paddingLeft: 10,
      paddingRight: 10,
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
    backgroundColor: "white",
    position: "fixed",
    marginTop: 62,
    textAlign: "center",
    paddingTop: 10,
    zIndex: 1,
    [theme.breakpoints.down("sm")]: { display: "none" },
    width: "calc(100% - 400px)",
  },
  text: {
    lineHeight: "1.255",
  },
  lyricsHeading: {
    lineHeight: "1.255",
    margin: "5px 0",
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
  },
  mobileLangCombo: {
    minWidth: 100,
  },
  mobileComboBox: {
    maxWidth: "90%",
    display: "flex",
  },
  mobileSettings: {
    marginTop: 15,
  },
  settingsMenu: {
    maxHeight: 68 * 4.5,
    width: 250,
  },
  slider: {
    color: BLACK,
  },
  box: {
    padding: 20,
    whiteSpace: "pre-wrap",
  },
  container: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column-reverse",
    },
  },
  player: {
    marginTop: 5,
    marginBottom: 10,
    "& audio": {
      outlineWidth: 0,
    },
  },
  playerBox: {
    position: "sticky",
    padding: "0 10px",
    bottom: 0,
    [theme.breakpoints.down("sm")]: {
      background: WHITE,
      marginTop: 30,
      padding: 0,
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
  const [settingsAnchor, setSettingsAnchor] = React.useState(null);
  const [songs, setSongs] = React.useState([]);
  const [currentSong, setCurrentSong] = React.useState(null);
  const [lyrics, setLyrics] = React.useState("");
  const open = Boolean(settingsAnchor);

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
  function openSettings(event) {
    setSettingsAnchor(event.currentTarget);
  }
  function closeSettings() {
    setSettingsAnchor(null);
  }
  const handleSliderChange = (event, newValue) => {
    setFontSize(newValue);
  };
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
                <div onClick={openSettings} className={classes.mobileSettings}>
                  <i className="material-icons md-23">more_vert</i>
                </div>
                <Menu
                  id="long-menu"
                  anchorEl={settingsAnchor}
                  keepMounted
                  open={open}
                  onClose={closeSettings}
                  PaperProps={{
                    className: classes.settingsMenu,
                  }}
                >
                  <MenuItem>Font Size</MenuItem>
                  <Divider />
                  <MenuItem className={classes.menu}>
                    <div className={classes.margin} />
                    <Slider
                      defaultValue={20}
                      value={fontSize}
                      onChange={handleSliderChange}
                      valueLabelDisplay="on"
                      min={12}
                      max={30}
                      classes={{ root: classes.slider }}
                    />
                  </MenuItem>
                </Menu>
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
              <div>
                <Tooltip
                  title="Settings"
                  className={classes.settings}
                  aria-label="More"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={openSettings}
                >
                  <i className="material-icons md-23">more_vert</i>
                </Tooltip>
                <Menu
                  id="long-menu"
                  anchorEl={settingsAnchor}
                  keepMounted
                  open={open}
                  onClose={closeSettings}
                  PaperProps={{
                    className: classes.settingsMenu,
                  }}
                >
                  <MenuItem className={classes.menu}>Font Size</MenuItem>
                  <Divider />
                  <MenuItem className={classes.menu}>
                    <div className={classes.margin} />
                    <Slider
                      defaultValue={20}
                      value={fontSize}
                      onChange={handleSliderChange}
                      valueLabelDisplay="on"
                      min={12}
                      max={30}
                      classes={{ root: classes.slider }}
                    />
                  </MenuItem>
                </Menu>
              </div>
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
          <div className={classes.heading}>
            <Typography variant="h3" className={classes.text}>
              Songs
            </Typography>
            <Divider />
          </div>
          <div className={classes.stories} style={{ fontSize: fontSize }}>
            <Typography variant="h4" className={classes.lyricsHeading}>
              {currentSong?.name}
            </Typography>
          </div>
          <div className={classes.container} style={{ fontSize: fontSize }}>
            {currentSong?.url !== undefined ? (
              <div className={classes.playerBox}>
                <ReactPlayer
                  url={
                    process.env.REACT_APP_SONGS_URL +
                    lang +
                    "/" +
                    currentSong?.url
                  }
                  controls
                  width="100%"
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
            <div className={classes.box}>{lyrics}</div>
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
