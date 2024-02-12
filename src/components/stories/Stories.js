import React, { useMemo, useEffect } from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import axios from "axios";
import Drawer from "@mui/material/Drawer";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
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
import Setting from "../common/Setting";

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
  const [islStories, setIslStories] = React.useState(null);
  const [playing, setPlaying] = React.useState("");
  const [rtlList, setRtlList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { t } = useTranslation();

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
      <Typography
        sx={{
          fontSize: "1rem",
          lineHeight: 1.2,
          maxWidth: 200,
        }}
      >
        <Box
          sx={{
            float: "left",
            textTransform: "capitalize",
          }}
        >
          {`${langObj?.languageName}`}
        </Box>
      </Typography>
    );
  };
  const languageSelect = () => (
    <Select
      value={lang}
      onChange={changeLang}
      sx={{
        "& .MuiSelect-select": {
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
        minWidth: "250px",
        [theme.breakpoints.down("sm")]: {
          minWidth: "120px",
        },
      }}
      renderValue={renderName}
    >
      {obsLanguageInfo.map((text, y) => (
        <MenuItem
          key={y}
          value={text?.langCode}
          sx={{ direction: rtlList.includes(text?.langCode) ? "rtl" : "ltr" }}
        >
          <Typography sx={{ width: "100%" }}>
            <Box
              sx={{
                float: "left",
                textTransform: "capitalize",
              }}
            >
              {`${text?.languageName}`}
            </Box>
            <Box
              sx={{
                float: "right",
                textTransform: "capitalize",
                color: GREY,
              }}
            >{`${text?.language}`}</Box>
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
          [theme.breakpoints.down("sm")]: { display: "block" },
        }}
      >
        {mobile === true ? (
          <Box
            sx={{
              width: "100%",
              position: "fixed",
              top: "60px",
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
              <Box p={1} flexGrow={1} sx={{ maxWidth: "90%" }}>
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
                          sx={{
                            direction: rtlList.includes(lang) ? "rtl" : "ltr",
                          }}
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
                <Setting fontSize={fontSize} setFontSize={setFontSize} />
              </Box>
            </Box>
          </Box>
        ) : (
          <Drawer
            sx={{
              width: "400px",
              flexShrink: 0,
              zIndex: 1000,
              "& .MuiPaper-root": {
                width: "400px",
              },
            }}
            variant="permanent"
          >
            <Box
              sx={{
                marginTop: 7.5,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <FormControl
                sx={{
                  margin: theme.spacing(1),
                  minWidth: "200px",
                }}
              >
                {languageSelect()}
              </FormControl>
              <div>
                <Setting fontSize={fontSize} setFontSize={setFontSize} />
              </div>
            </Box>
            <Divider />
            <Box
              sx={{
                overflow: "auto",
                fontSize: "1.2rem",
              }}
            >
              <List>
                {manifest.map((text, y) => (
                  <ListItem
                    key={y}
                    value={text}
                    sx={{
                      direction: rtlList.includes(lang) ? "rtl" : "ltr",
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
              marginTop: "62px",
              textAlign: "center",
              paddingTop: "10px",
              [theme.breakpoints.down("sm")]: { display: "none" },
              width: "calc(100% - 400px)",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                lineHeight: "1.255",
              }}
            >
              {t("bibleStoriesText")}
            </Typography>
            <Help
              iconStyle={{
                marginTop: "-40px",
                float: "right",
                marginRight: "30px",
                cursor: "pointer",
                fontSize: 21,
                color: BLACK,
              }}
              url={"bibleStories"}
            />
            <Divider />
          </Box>
          {isLoading ? (
            <Box
              sx={{
                margin: "0 20px",
                padding: "12px 10px 15px 10px",
                marginTop: "140px",
                fontSize: 30,
                [theme.breakpoints.down("sm")]: {
                  padding: "0 10px",
                  margin: "0 3px",
                  marginTop: "180px",
                },
              }}
            >
              {t("loadingMessage")}...
            </Box>
          ) : lang === "isl" ? (
            <Box
              sx={{
                margin: "0 20px",
                padding: "12px 10px 15px 10px",
                marginTop: "140px",
                [theme.breakpoints.down("sm")]: {
                  padding: "0 10px",
                  margin: "0 3px",
                  marginTop: "180px",
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
                <div sx={{ fontSize: 30 }}>{t("loadingMessage")}...</div>
              )}
            </Box>
          ) : (
            <Box
              sx={{
                marginTop: "200px",
                paddingLeft: "20px",
                [theme.breakpoints.up("md")]: { marginTop: "140px" },
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
                paddingRight: rtlList.includes(lang) ? "50px" : "30px",
                direction: rtlList.includes(lang) ? "rtl" : "ltr",
                textAlign: rtlList.includes(lang) ? "right" : "left",
                fontSize: fontSize,
              }}
            >
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
