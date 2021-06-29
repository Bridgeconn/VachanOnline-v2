import React, { useMemo, useEffect } from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import axios from "axios";
import { connect } from "react-redux";
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
import { BLUETRANSPARENT } from "../../store/colorCode";

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
    color: BLUETRANSPARENT,
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
    paddingLeft: 20,
    paddingRight: 30,
    marginTop: 90,
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',

    "& img": {
      margin: "auto",
      display: "flex",
      width: "70%",
    },
    "& h1": {
      textAlign: "center",
    },
  },
  drawerContainer: {
    overflow: "auto",
    fontSize: "1.2rem",
  },
}));

const Stories = (props) => {
  const API = useMemo(
    () => axios.create({ baseURL: process.env.REACT_APP_BIBLE_STORIES_URL }),
    []
  );
  let { login, userDetails } = props;
  const classes = useStyles();

  const [storyId, setStoryId] = React.useState("01");
  const [lang, setLang] = React.useState("");
  const [stories, setStories] = React.useState();
  const [languageJson, setLanguageJson] = React.useState({});
  const [manifest, setManifest] = React.useState([]);
  const [languages, setLanguages] = React.useState([]);
  const [fontSize, setFontSize] = React.useState(20);
  const [settingsAnchor, setSettingsAnchor] = React.useState(null);
  const open = Boolean(settingsAnchor);

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
  };

  const getLang = (event) => {
    setLang(event.target.value);
  };

  useEffect(() => {
    if (lang !== "") {
      API.get(lang + "/content/" + storyId + ".md").then(function (response) {
        setStories(response.data);
      });
    }
  }, [API, storyId, lang]);

  useEffect(() => {
    if (lang !== "") {
      API.get(lang + "/manifest.json").then(function (response) {
        setManifest(response.data);
      });
    }
  }, [API, lang]);

  useEffect(() => {
    API.get("languages.json").then(function (response) {
      let languageArray = Object.keys(response.data);
      setLanguages(languageArray);
      setLanguageJson(response.data);
      setLang(languageArray[0] || "");
    });
  }, [API]);

  return (
    <>
      <AppBar position="fixed">
        <TopBar login={login} userDetails={userDetails} />
      </AppBar>

      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select value={lang} onChange={getLang}>
                {languages.map((text, y) => (
                  <MenuItem key={y} value={text}>
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
                  style: {
                    maxHeight: 68 * 4.5,
                    width: 250,
                  },
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
            <List className={classes.List}>
              {manifest.map((text, y) => (
                <ListItem className={classes.listItem} key={y} value={text}>
                  <Link href="#" data-id={y + 1} onClick={(e) => getStory(e)}>
                    {y + 1 + ". " + text}
                  </Link>
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
        <main>
          <div
            className={classes.stories}
            style={{
              fontSize: fontSize,
            }}
          >
            <Markdown rehypePlugins={[rehypeHighlight]}>{stories}</Markdown>
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

export default connect(mapStateToProps)(Stories);
