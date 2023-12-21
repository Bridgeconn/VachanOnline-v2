import React, { useMemo, useEffect } from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
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
import TopBar from "../read/TopBar";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Box, Typography } from "@material-ui/core";
import { BLACK, GREY } from "../../store/colorCode";
import VideoCard from "../common/VideoCard";
import { useTranslation } from "react-i18next";
import Help from "../common/Help";
import { connect } from "react-redux";
import { getObsLanguageData } from "../common/utility";
import * as actions from "../../store/actions";

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
    paddingLeft: 20,
    paddingRight: 30,
    [theme.breakpoints.up("md")]: { marginTop: 140 },
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    "& img": {
      margin: "auto",
      display: "flex",
      width: "70%",
    },
    [theme.breakpoints.down("sm")]: {
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
  },
  loading: {
    fontSize: 30,
  },
  helpIcon: {
    marginTop: -40,
    float: "right",
    marginRight: 30,
    cursor: "pointer",
    fontSize: 21,
    color: BLACK,
    padding: "0 5px",
  },
  mobileHeading: { textAlign: "center", borderBottom: "1px solid #f1ecec" },
  heading: {
    backgroundColor: "white",
    position: "fixed",
    marginTop: 62,
    textAlign: "center",
    paddingTop: 10,
    [theme.breakpoints.down("sm")]: { display: "none" },
    width: "calc(100% - 400px)",
  },
  text: {
    lineHeight: "1.255",
  },
  linkList: {
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
  mobileTooltip: {
    marginTop: 15,
  },
  settingsMenu: {
    maxHeight: 68 * 4.5,
    width: 250,
  },
  slider: {
    color: BLACK,
  },
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
  language: {
    width: "100%",
  },
  languageSelect: {
    fontSize: "1rem",
    lineHeight: 1.2,
    maxWidth: 200,
  },
  container: {
    margin: "0 20px",
    padding: "12px 10px 15px 10px",
    marginTop: 140,
    [theme.breakpoints.down("sm")]: {
      padding: "0 10px",
      margin: "0 3px",
      marginTop: 180,
    },
  },
}));

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
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const styleProps = {
    lang: lang,
    rtlList: rtlList,
  };
  const classes = useStyles(styleProps);
  const storyClass = rtlList.includes(lang)
    ? `${classes.stories} ${classes.storyDirection}`
    : classes.stories;
  const listClass = rtlList.includes(lang) ? classes.listDirection : "";

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
      <Typography className={classes.languageSelect}>
        <span className={classes.languageNameOrigin}>
          {`${langObj?.languageName}`}
        </span>
      </Typography>
    );
  };
  const languageSelect = () => (
    <Select
      value={lang}
      onChange={changeLang}
      classes={{
        selectMenu: classes.languageMenu,
        select: classes.languageSelected,
      }}
      renderValue={renderName}
    >
      {obsLanguageInfo.map((text, y) => (
        <MenuItem
          key={y}
          value={text?.langCode}
          className={
            rtlList.includes(text?.langCode) ? classes.listDirection : ""
          }
        >
          <Typography className={classes.language}>
            <span className={classes.languageNameOrigin}>
              {`${text?.languageName}`}
            </span>
            <span className={classes.languageName}>{`${text?.language}`}</span>
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
      <div className={classes.root}>
        {mobile === true ? (
          <Box className={classes.mobile}>
            <Box className={classes.mobileHeading}>
              <Typography variant="h4">{t("bibleStoriesText")}</Typography>
            </Box>
            <Box className={classes.mobileBox}>
              <Box p={1} flexGrow={1} className={classes.mobileComboBox}>
                <FormControl
                  variant="outlined"
                  style={{
                    maxWidth: mobile === true ? "120px" : "50%",
                    minWidth: "180px",
                  }}
                >
                  {languageSelect()}
                </FormControl>
                <FormControl
                  variant="outlined"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  {manifest.length > 0 && (
                    <Select
                      value={String(parseInt(storyId))}
                      onChange={storySetter}
                    >
                      {manifest.map((text, y) => (
                        <MenuItem
                          className={listClass}
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
                  className={classes.mobileTooltip}
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
                  <MenuItem>{t("settingsFontSize")}</MenuItem>
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
                {languageSelect()}
              </FormControl>
              <div>
                <Tooltip
                  title={t("commonSettings")}
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
                  <MenuItem className={classes.menu}>
                    {t("settingsFontSize")}
                  </MenuItem>
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
                {manifest.map((text, y) => (
                  <ListItem key={y} value={text} className={listClass}>
                    <Link
                      className={classes.linkList}
                      href="#"
                      data-id={y + 1}
                      onClick={(e) => getStory(e)}
                    >
                      {y + 1 + ". " + text}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </div>
          </Drawer>
        )}
        <main>
          <div className={classes.heading}>
            <Typography variant="h3" className={classes.text}>
              {t("bibleStoriesText")}
            </Typography>
            <Help iconStyle={classes.helpIcon} url={"bibleStories"} />
            <Divider />
          </div>
          {isLoading ? (
            <div className={`${classes.container} ${classes.loading}`}>
              {t("loadingMessage")}...
            </div>
          ) : lang === "isl" ? (
            <div className={classes.container}>
              {islStories ? (
                <VideoCard
                  video={stories}
                  playing={playing}
                  language={"isl"}
                  setPlaying={setPlaying}
                />
              ) : (
                <div className={classes.loading}>{t("loadingMessage")}...</div>
              )}
            </div>
          ) : (
            <div className={storyClass} style={{ fontSize: fontSize }}>
              {typeof stories === "string" && (
                <Markdown rehypePlugins={[rehypeHighlight]}>{stories}</Markdown>
              )}
            </div>
          )}
        </main>
      </div>
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
