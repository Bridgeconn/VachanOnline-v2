import React, { useMemo, useEffect, useCallback } from "react";
import Drawer from "@mui/material/Drawer";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ReactPlayer from "react-player";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import axios from "axios";
import Setting from "../common/Setting";
import TopBar from "../read/TopBar";
import Help from "../common/Help";
import { BLACK, GREY, WHITE } from "../../store/colorCode";
import { useTranslation } from "react-i18next";

const drawerWidth = 350;
const Songs = () => {
  const [languageJson, setLanguageJson] = React.useState({});
  const [lang, setLang] = React.useState("");
  const [fontSize, setFontSize] = React.useState(20);
  const [songs, setSongs] = React.useState([]);
  const [currentSong, setCurrentSong] = React.useState(null);
  const [lyrics, setLyrics] = React.useState("");

  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
      <Box
        sx={{
          display: "flex",
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            marginTop: 7.625,
          },
        }}
      >
        {isMobile === true ? (
          <Box>
            <Box
              sx={{
                color: WHITE,
                textShadow: "1px 1px 2px hsl(246 37% 47% / 1)",
                textAlign: "center",
                background:
                  "linear-gradient(109.6deg, rgb(137, 191, 221) 11.2%, rgb(150, 144, 204) 90.2%)",
              }}
            >
              <Typography variant="h4">{t("songsText")}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                [theme.breakpoints.down("md")]: {
                  alignItems: "center",
                },
              }}
            >
              <Box p={1} flexGrow={1} sx={{ display: "flex" }}>
                <FormControl size="small" sx={{ minWidth: 100 }}>
                  <Select variant="outlined" value={lang} onChange={getLang}>
                    {Object.keys(languageJson).map((text) => (
                      <MenuItem
                        key={text}
                        value={text}
                        sx={{ textAlign: "left" }}
                      >
                        {languageJson[text]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  size="small"
                  sx={{ marginLeft: 1.25, flexGrow: 1, maxWidth: 300 }}
                >
                  {songs?.length > 0 && currentSong && (
                    <Select
                      variant="outlined"
                      value={JSON.stringify(currentSong)}
                      onChange={songSelect}
                    >
                      {songs?.map((song, y) => (
                        <MenuItem
                          sx={{ textAlign: "left" }}
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
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              zIndex: 1000,
              "& .MuiPaper-root": {
                width: drawerWidth,
              },
            }}
            variant="permanent"
          >
            <Box
              sx={{ marginTop: 8.125, backgroundColor: "rgb(137, 191, 221)" }}
            >
              <FormControl
                size="small"
                sx={{ margin: theme.spacing(1), minWidth: 200 }}
              >
                <Select variant="outlined" value={lang}>
                  {Object.keys(languageJson).map((text) => (
                    <MenuItem
                      key={text}
                      value={text}
                      sx={{ textAlign: "left" }}
                    >
                      {languageJson[text]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Setting fontSize={fontSize} setFontSize={setFontSize} />
            </Box>
            <Divider />
            <Box sx={{ overflow: "auto", fontSize: "1.2rem" }}>
              <List>
                {songs?.map((song) => (
                  <ListItem key={song.sno} sx={{ textAlign: "left" }}>
                    {song.sno + "."}
                    <Link
                      sx={{
                        marginLeft: 0.625,
                        cursor: "pointer",
                        color: BLACK,
                        "&:hover": {
                          color: GREY,
                        },
                      }}
                      onClick={() => setCurrentSong(song)}
                      underline="hover"
                    >
                      {song.name}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        )}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
            height: "calc(100vh - 65px)",
            marginTop: 8.125,
            [theme.breakpoints.down("md")]: {
              height: "calc(100vh - 160px)",
              marginTop: 0,
            },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: "2rem",
              color: WHITE,
              background:
                "linear-gradient(109.6deg, rgb(137, 191, 221) 11.2%, rgb(150, 144, 204) 100.2%)",
              textAlign: "center",
              [theme.breakpoints.down("md")]: { display: "none" },
              lineHeight: "1.8",
              height: 56,
            }}
          >
            {isLarge ? t("songsPageTitleDesktop") : t("songsText")}
            <Help
              iconStyle={{
                fontSize: 21,
                float: "right",
                marginRight: 3.75,
                marginTop: 2.5,
                color: BLACK,
              }}
              url={"songs"}
            />
          </Typography>
          <Typography
            variant="h4"
            sx={{
              lineHeight: "1.65",
              margin: "0.625px 0",
              textAlign: "center",
              color: "rgb(150, 144, 204)",
              textShadow: "6px 4px 7px rgb(143 143 145 / 83%)",
              fontSize: "1.6rem",
            }}
          >
            {currentSong?.sno}. {currentSong?.name}
          </Typography>
          <Divider />
          <Box
            sx={{
              padding: 2.5,
              whiteSpace: "pre-wrap",
              overflow: "auto",
              flexGrow: 1,
              width: "100%",
            }}
            style={{ fontSize: fontSize }}
          >
            {lyrics}
          </Box>
          {currentSong?.url !== undefined ? (
            <Box sx={{ width: "100%" }}>
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
                sx={{
                  margin: 10,
                  width: "calc(100% - 20px)",
                  "& audio": {
                    outlineWidth: 0,
                  },
                }}
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
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );
};

export default Songs;
