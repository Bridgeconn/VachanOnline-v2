import React, { useMemo, useEffect } from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import Select from "@mui/material/Select";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import FormControl from "@mui/material/FormControl";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TopBar from "../read/TopBar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Typography } from "@mui/material";
import { BLACK, GREY } from "../../store/colorCode";
import VideoCard from "../common/VideoCard";
import { useTranslation } from "react-i18next";
import Help from "../common/Help";
import { connect } from "react-redux";
import { getObsLanguageData } from "../common/utility";
import * as actions from "../../store/actions";
import { styled } from "@mui/system";

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  //   formControl: {
  //     margin: theme.spacing(1),
  //     minWidth: 200,
  //   },
  //   menu: {
  //     textAlign: "center",
  //     width: "100%",
  //     display: "inline-block",
  //     fontSize: 18,
  //   },
  //   margin: {
  //     height: theme.spacing(5),
  //   },
  //   settings: {
  //     padding: 0,
  //     width: "30px",
  //     marginTop: -46,
  //     float: "right",
  //     marginLeft: "-10px",
  //     marginRight: "20px",
  //     cursor: "pointer",
  //   },
  //   root: {
  //     display: "flex",
  //     [theme.breakpoints.down("md")]: { display: "block" },
  //   },
  //   drawer: {
  //     width: drawerWidth,
  //     flexShrink: 0,
  //     zIndex: 1000,
  //   },
  //   drawerPaper: {
  //     width: drawerWidth,
  //   },
  //   drawerHeader: {
  //     marginTop: 60,
  //   },
  stories: {
    marginTop: 50,
    paddingLeft: 20,
    paddingRight: 30,
    [theme.breakpoints.up("md")]: { marginTop: 140 },
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    "& img": {
      margin: "auto",
      display: "flex",
      width: "70%",
    },
    [theme.breakpoints.down("md")]: {
      "& img": {
        width: "95%",
      },
    },
    "& h1": {
      textAlign: "center",
    },
  },
  storyDirection: {
    direction: "rtl",
    textAlign: "right",
    paddingRight: "50px",
  },
  listDirection: {
    direction: "rtl",
    textAlign: "right",
  },

  //   drawerContainer: {
  //     overflow: "auto",
  //     fontSize: "1.2rem",
  //   },
  //   mobile: {
  //     width: "100%",
  //     position: "fixed",
  //     top: 60,
  //     backgroundColor: "white",
  //     borderBottom: "1px solid #f1ecec",
  //   },
  //   loading: {
  //     fontSize: 30,
  //   },
  //   helpIcon: {
  //     marginTop: -40,
  //     float: "right",
  //     marginRight: 30,
  //     cursor: "pointer",
  //     fontSize: 21,
  //     color: BLACK,
  //     padding: "0 5px",
  //   },
  //   mobileHeading: { textAlign: "center", borderBottom: "1px solid #f1ecec" },
  //   heading: {
  //     backgroundColor: "white",
  //     position: "fixed",
  //     marginTop: 62,
  //     textAlign: "center",
  //     paddingTop: 10,
  //     [theme.breakpoints.down("md")]: { display: "none" },
  //     width: "calc(100% - 400px)",
  //   },
  //   text: {
  //     lineHeight: "1.255",
  //   },
  //   linkList: {
  //     color: BLACK,
  //     "&:hover": {
  //       color: GREY,
  //     },
  //   },
  //   mobileBox: {
  //     display: "flex",
  //   },
  //   mobileLangCombo: {
  //     minWidth: 100,
  //   },
  //   mobileComboBox: {
  //     maxWidth: "90%",
  //     display: "flex",
  //   },
  //   mobileTooltip: {
  //     marginTop: 15,
  //   },
  //   settingsMenu: {
  //     maxHeight: 68 * 4.5,
  //     width: 250,
  //   },
  //   slider: {
  //     color: BLACK,
  //   },
  languageMenu: {
    minWidth: 250,
  },
  languageSelected: {
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  languageName: {
    float: (props) => (props.rtlList?.includes(props.lang) ? "left" : "right"),
    textTransform: "capitalize",
    color: GREY,
  },
  languageNameOrigin: {
    float: (props) => (props.rtlList?.includes(props.lang) ? "right" : "left"),
    textTransform: "capitalize",
  },

  //   language: {
  //     width: "100%",
  //   },
  //   languageSelect: {
  //     fontSize: "1rem",
  //     lineHeight: 1.2,
  //     maxWidth: 200,
  //   },
  //   container: {
  //     margin: "0 20px",
  //     padding: "12px 10px 15px 10px",
  //     marginTop: 140,
  //     [theme.breakpoints.down("md")]: {
  //       padding: "0 10px",
  //       margin: "0 3px",
  //       marginTop: 180,
  //     },
  //   },
}));
const I = styled("i")({ marginRight: 7, position: "relative" });
const Stories = ({ obsLanguageInfo, setMainValue }) => {
  const API = useMemo(
    () => axios.create({ baseURL: process.env.REACT_APP_BIBLE_STORIES_URL }),
    []
  );
  const [storyId, setStoryId] = React.useState("01");
  const [lang, setLang] = React.useState("");
  const [stories, setStories] = React.useState();
  const [manifest, setManifest] = React.useState([]);
  const [fontSize, setFontSize] = React.useState(20);
  const [settingsAnchor, setSettingsAnchor] = React.useState(null);
  const [islStories, setIslStories] = React.useState(null);
  const [playing, setPlaying] = React.useState("");
  const [rtlList, setRtlList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const open = Boolean(settingsAnchor);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  // const styleProps = {
  //   lang: lang,
  //   rtlList: rtlList,
  // };
  const classes = useStyles();
  const storyClass = {
    marginTop: 6.25,
    paddingLeft: 2.5,
    paddingRight: 3.75,
    [theme.breakpoints.up("md")]: { marginTop: 17.5 },
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    "& img": {
      margin: "auto",
      display: "flex",
      width: "70%",
    },
    [theme.breakpoints.down("md")]: {
      "& img": {
        width: "95%",
      },
    },
    "& h1": {
      textAlign: "center",
    },
  };
  const storyDir = {
    direction: "rtl",
    textAlign: "right",
    paddingRight: "6.25px",
    marginTop: "6.25px",
    paddingLeft: 2.5,
    //paddingRight: 30,
    [theme.breakpoints.up("md")]: { marginTop: 17.5 },
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    "& img": {
      margin: "auto",
      display: "flex",
      width: "70%",
    },
    [theme.breakpoints.down("md")]: {
      "& img": {
        width: "95%",
      },
    },
    "& h1": {
      textAlign: "center",
    },
  };
  const storyStyling = rtlList.includes(lang) ? storyDir : storyClass;
  // const listClass = rtlList.includes(lang)
  //   ? { direction: "rtl", textAlign: "right" }
  //   : "";
  const { t } = useTranslation();
  function openSettings(event) {
    setSettingsAnchor(event.currentTarget);
  }
  function closeSettings() {
    setSettingsAnchor(null);
  }
  const handleSliderChange = (event, newValue) => {
    setFontSize(newValue);
  };

  const getStory = (event) => {
    event.preventDefault();
    let storyNum = event.currentTarget.getAttribute("data-id");
    if (storyNum.length < 2) storyNum = "0" + storyNum;
    setStoryId(storyNum);
    window.scrollTo(0, 0);
  };
  const renderName = (value) => {
    let langObj = obsLanguageInfo.find((el) => el.langCode === value);
    return (
      <Typography sx={{ fontSize: "1rem", lineHeight: 1.2, maxWidth: 200 }}>
        <span
          //className={classes.languageNameOrigin}
          sx={{
            float: rtlList?.includes(lang) ? "right" : "left",
            textTransform: rtlList?.includes(lang) ? "capitalize" : "",
          }}
        >
          {`${langObj?.languageName}`}
        </span>
      </Typography>
    );
  };
  const languageSelect = () => (
    <Select
      variant="outlined"
      value={lang}
      onChange={changeLang}
      classes={{
        select: `${classes.languageSelected} ${classes.languageMenu}`,
      }}
      // sx={{
      //   [`&.MuiSelect-select`]: {
      //     backgroundColor: "transparent",
      //     minWidth: 250,
      //   },
      // }}
      renderValue={renderName}
    >
      {obsLanguageInfo.map((text, y) => (
        <MenuItem
          key={y}
          value={text?.langCode}
          sx={{
            direction: rtlList.includes(text?.langCode) ? "rtl" : "",
            textAlign: rtlList.includes(text?.langCode) ? "right" : "",
          }}
        >
          <Typography sx={{ width: "100%" }}>
            <span
              sx={{
                float: rtlList?.includes(lang) ? "right" : "left",
                textTransform: rtlList?.includes(lang) ? "capitalize" : "",
              }}
            >
              {`${text?.languageName}`}
            </span>
            <span
              sx={{
                float: rtlList?.includes(lang) ? "left" : "right",
                textTransform: rtlList?.includes(lang) ? "capitalize" : "",
                color: rtlList?.includes(lang) ? GREY : "",
              }}
            >{`${text?.language}`}</span>
          </Typography>
        </MenuItem>
      ))}
    </Select>
  );
  React.useEffect(() => {
    getObsLanguageData(setMainValue, setLang);
  }, [setMainValue]);
  const storySetter = (event) => {
    let storyNum = event.target.value;
    if (storyNum.length < 2) storyNum = "0" + storyNum;
    setStoryId(storyNum);
  };
  const changeLang = (event) => {
    setLang(event.target.value);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (lang !== "" && lang !== "isl" && lang) {
      API.get(lang + "/content/" + storyId + ".md").then(function (response) {
        setStories(response.data);
        setIsLoading(false);
      });
    }
  }, [API, storyId, lang]);
  useEffect(() => {
    if (lang === "isl" && islStories) {
      if (islStories.length < parseInt(storyId)) {
        setStoryId("01");
        setStories(islStories?.find((el) => el?.storyNo === parseInt(storyId)));
      } else {
        setStories(islStories?.find((el) => el?.storyNo === parseInt(storyId)));
      }
      setIsLoading(false);
    }
  }, [storyId, lang, islStories]);

  useEffect(() => {
    if (lang !== "" && lang) {
      API.get(lang + "/manifest.json").then(function (response) {
        setManifest(response.data);
      });
    }
    if (lang === "isl") {
      API.get(lang + "/isl_obs.json").then(function (response) {
        setIslStories(response.data);
      });
    }
  }, [API, lang]);

  useEffect(() => {
    API.get("rtl.json").then(function (response) {
      setRtlList(response.data);
    });
  }, [API]);

  return (
    <>
      <AppBar position="fixed">
        <TopBar />
      </AppBar>
      <Box
        sx={{
          display: "flex",
          [theme.breakpoints.down("md")]: { display: "block" },
        }}
      >
        {mobile === true ? (
          <Box
            sx={{
              width: "100%",
              position: "fixed",
              top: 60,
              backgroundColor: "white",
              borderBottom: "1px solid #f1ecec",
            }}
          >
            <Box
              sx={{ textAlign: "center", borderBottom: "1px solid #f1ecec" }}
            >
              <Typography variant="h4">{t("bibleStoriesText")}</Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box p={1} flexGrow={1} sx={{ maxWidth: "90%", display: "flex" }}>
                <FormControl
                  style={{
                    maxWidth: mobile === true ? "120px" : "50%",
                    minWidth: "180px",
                  }}
                >
                  {languageSelect()}
                </FormControl>
                <FormControl
                  style={{
                    marginLeft: 5,
                  }}
                >
                  {manifest.length > 0 && (
                    <Select
                      variant="outlined"
                      value={String(parseInt(storyId))}
                      onChange={storySetter}
                    >
                      {manifest.map((text, y) => (
                        <MenuItem
                          sx={{
                            direction: rtlList.includes(text?.langCode)
                              ? "rtl"
                              : "",
                            textAlign: rtlList.includes(text?.langCode)
                              ? "right"
                              : "",
                          }}
                          //className={listClass}
                          key={y}
                          value={String(y + 1)}
                        >
                          {y + 1 + ". " + text}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </FormControl>
              </Box>
              <Box p={1}>
                <Tooltip
                  title={t("commonSettings")}
                  aria-label="More"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={openSettings}
                  sx={{ marginTop: 1.875 }}
                >
                  <I className="material-icons">more_vert</I>
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
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem>{t("settingsFontSize")}</MenuItem>
                  <Divider />
                  <MenuItem
                    sx={{
                      textAlign: "center",
                      width: "100%",
                      display: "inline-block",
                      fontSize: 18,
                    }}
                  >
                    <Box sx={{ height: theme.spacing(5) }} />
                    <Slider
                      defaultValue={20}
                      value={fontSize}
                      onChange={handleSliderChange}
                      valueLabelDisplay="on"
                      min={12}
                      max={30}
                      sx={{ [`&.MuiSlider-root`]: { color: BLACK } }}
                    />
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Box>
        ) : (
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              zIndex: 1000,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
              },
            }}
            variant="permanent"
          >
            <Box sx={{ marginTop: 7.5 }}>
              <FormControl sx={{ margin: theme.spacing(1), minWidth: 200 }}>
                {languageSelect()}
              </FormControl>
              <Box>
                <Tooltip
                  title={t("commonSettings")}
                  sx={{
                    padding: 0,
                    width: "30px",
                    marginTop: -5.75,
                    float: "right",
                    marginLeft: "-1.25px",
                    marginRight: "2.25px",
                    cursor: "pointer",
                  }}
                  aria-label="More"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={openSettings}
                >
                  <I className="material-icons">more_vert</I>
                </Tooltip>
                <Menu
                  id="long-menu"
                  anchorEl={settingsAnchor}
                  keepMounted
                  open={open}
                  onClose={closeSettings}
                  PaperProps={{
                    style: {
                      maxHeight: 68 * 4.5,
                      width: 250,
                    },
                  }}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem
                    sx={{
                      textAlign: "center",
                      width: "100%",
                      display: "inline-block",
                      fontSize: 18,
                    }}
                  >
                    {t("settingsFontSize")}
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    sx={{
                      textAlign: "center",
                      width: "100%",
                      display: "inline-block",
                      fontSize: 18,
                    }}
                  >
                    <Box sx={{ height: theme.spacing(5) }} />
                    <Slider
                      defaultValue={20}
                      value={fontSize}
                      onChange={handleSliderChange}
                      valueLabelDisplay="on"
                      min={12}
                      max={30}
                      sx={{ [`&.MuiSlider-root`]: { color: BLACK } }}
                    />
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ overflow: "auto", fontSize: "1.2rem" }}>
              <List>
                {manifest.map((text, y) => (
                  <ListItem
                    key={y}
                    value={text}
                    sx={{
                      direction: rtlList.includes(text?.langCode) ? "rtl" : "",
                      textAlign: rtlList.includes(text?.langCode)
                        ? "right"
                        : "",
                    }}
                  >
                    <Link
                      sx={{
                        color: BLACK,
                        "&:hover": {
                          color: GREY,
                        },
                      }}
                      href="#"
                      data-id={y + 1}
                      onClick={(e) => getStory(e)}
                      underline="hover"
                    >
                      {y + 1 + ". " + text}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        )}
        <main>
          <Box
            sx={{
              backgroundColor: "white",
              position: "fixed",
              marginTop: 7.75,
              textAlign: "center",
              paddingTop: 1.25,
              [theme.breakpoints.down("md")]: { display: "none" },
              width: "calc(100% - 400px)",
            }}
          >
            <Typography variant="h3" sx={{ lineHeight: "1.255" }}>
              {t("bibleStoriesText")}
            </Typography>
            <Help
              iconStyle={{
                marginTop: -5,
                float: "right",
                marginRight: 3.75,
                cursor: "pointer",
                fontSize: 21,
                color: BLACK,
                padding: "0 0.625px",
              }}
              url={"bibleStories"}
            />
            <Divider />
          </Box>
          {isLoading ? (
            <Box
              sx={`${{
                margin: "0 2.5px",
                padding: "1.5px 1.25px 1.875px 1.25px",
                marginTop: 17.5,
                [theme.breakpoints.down("md")]: {
                  padding: "0 1.25px",
                  margin: "0 0.375px",
                  marginTop: 22.5,
                },
              }} ${{ fontSize: 30 }}`}
            >
              {t("loadingMessage")}...
            </Box>
          ) : lang === "isl" ? (
            <Box
              sx={{
                margin: "0 2.5px",
                padding: "1.5px 1.25px 1.875px 1.25px",
                marginTop: 17.5,
                [theme.breakpoints.down("md")]: {
                  padding: "0 1.25px",
                  margin: "0 0.375px",
                  marginTop: 22.5,
                },
              }}
            >
              {islStories ? (
                <VideoCard
                  video={stories}
                  playing={playing}
                  language={"isl"}
                  setPlaying={setPlaying}
                />
              ) : (
                <Box sx={{ fontSize: 30 }}>{t("loadingMessage")}...</Box>
              )}
            </Box>
          ) : (
            <Box sx={storyStyling} style={{ fontSize: fontSize }}>
              {typeof stories === "string" && (
                <Markdown rehypePlugins={[rehypeHighlight]}>{stories}</Markdown>
              )}
            </Box>
          )}
        </main>
      </Box>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    obsLanguageInfo: state.local.obsLanguageInfo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setMainValue: (name, value) =>
      dispatch({ type: actions.SETVALUE, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Stories);
