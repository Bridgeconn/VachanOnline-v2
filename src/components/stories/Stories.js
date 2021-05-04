import React from "react";
import TopBar from "../read/TopBar";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import Markdown from "react-markdown";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import Slider from "@material-ui/core/Slider";
import Select from "@material-ui/core/Select";
import Menu from "@material-ui/core/Menu";
import { BLUETRANSPARENT } from "../../store/colorCode";
import Tooltip from "@material-ui/core/Tooltip";
import FormControl from "@material-ui/core/FormControl";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import rehypeHighlight from "rehype-highlight";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import axios from "axios";

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  menuHeader: {
    color: BLUETRANSPARENT,
    borderBottom: "2px solid #9a9a9a",
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

  toggle: {
    marginTop: 60,
  },
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
    marginTop: 120,
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Stories = (props) => {
  const bibleStoriesURL = process.env.REACT_APP_BIBLE_STORIES_URL;
  console.log(bibleStoriesURL);
  let { login, userDetails } = props;

  const classes = useStyles();
  const [settingsAnchor, setSettingsAnchor] = React.useState(null);
  const open = Boolean(settingsAnchor);

  const [storyId, setStoryId] = React.useState("01");
  const [lang, setLang] = React.useState("");
  const [stories, setStories] = React.useState();
  const [languageJson, setLanguageJson] = React.useState({});
  const [manifest, setManifest] = React.useState([]);
  const [Languages, setLanguages] = React.useState([]);
  const [fontSize, setFontSize] = React.useState(20);

  const handleSliderChange = (event, newValue) => {
    setFontSize(newValue);
  };
  function openSettings(event) {
    setSettingsAnchor(event.currentTarget);
  }
  function closeSettings() {
    setSettingsAnchor(null);
  }

  const getStory = (event) => {
    let element = event.currentTarget;
    let storyNum = element.getAttribute("data-id");
    while (storyNum.length < 2) storyNum = "0" + storyNum;
    setStoryId(storyNum);
  };

  const getLang = (event) => {
    let element = event.currentTarget;
    setLang(element.getAttribute("language_name"));
  };

  React.useEffect(() => {
    if (lang !== "") {
      axios({
        method: "get",
        url: bibleStoriesURL + lang + "/content/" + storyId + ".md",
      }).then(function (response) {
        let data = response.data;
        setStories(data);
      });
    }
  }, [bibleStoriesURL, storyId, setStories, lang]);

  React.useEffect(() => {
    if (lang !== "") {
      axios({
        method: "get",
        url: bibleStoriesURL + lang + "/manifest.json",
      }).then(function (response) {
        let data = response.data;
        setManifest(data);
      });
    }
  }, [bibleStoriesURL, setManifest, lang]);

  React.useEffect(() => {
    axios({
      method: "get",
      url: bibleStoriesURL + "languages.json",
    }).then(function (response) {
      let data = response.data;
      let languageArray = Object.keys(data);
      setLanguages(languageArray);
      setLanguageJson(data);
      setLang(languageArray[0] || "");
    });
  }, [bibleStoriesURL, setLanguages, setLanguageJson]);

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
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={lang}
              >
                {Languages.map((text, y) => (
                  <MenuItem
                    key={y}
                    value={text}
                    language_name={text}
                    onClick={(e) => getLang(e)}
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
                  style: {
                    maxHeight: 68 * 4.5,
                    width: 250,
                  },
                }}
              >
                <MenuItem className={`${classes.menuHeader} ${classes.menu}`}>
                  Font Size
                </MenuItem>
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
