import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ReactPlayer from "react-player";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    position: "absolute",
    top: 94,
    bottom: 0,
    paddingLeft: 15
  },
  container: {
    top: 40,
    bottom: 0,
    overflow: "scroll",
    position: "absolute",
    width: "calc(100% - 15px)",
    paddingTop: 12,
    "&::-webkit-scrollbar": {
      width: "0.45em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.4)",
      outline: "1px solid slategrey"
    }
  },
  heading: {
    borderBottom: "1px solid #f1ecec",
    display: "flex",
    width: "100%",
    height: "2em"
  },
  language: {
    fontSize: "1.1rem",
    textTransform: "capitalize"
  },
  menuRoot: {
    border: "1px solid #dddddd",
    boxShadow: "none",
    "&$expanded": {
      margin: 0
    }
  },
  expanded: {},
  expansionDetails: {
    boxShadow: "none",
    padding: "0 0 0 20px",
    width: "100%"
  },
  summaryPanel: {
    textTransform: "capitalize",
    borderBottom: "1px solid #b7b7b785",
    backgroundColor: "#efefef",
    "&$expanded": {
      minHeight: 50
    }
  },
  content: {
    margin: "10px 0",
    "&$expanded": {
      margin: "12px 0"
    }
  },
  audioBible: {
    display: "block",
    paddingLeft: 0,
    fontSize: "1rem"
  },
  player: {
    marginTop: 5,
    "& audio": {
      outlineWidth: 0
    }
  }
}));
const Audio = props => {
  const classes = useStyles();
  const [message, setMessage] = React.useState("");
  let { audioBible, bookCode, chapter } = props;
  React.useEffect(() => {
    if (audioBible.length === 0 || audioBible.success === false) {
      setMessage("No audio bibles available");
    } else {
      let index = audioBible.findIndex(language => {
        let bookIndex = language.audioBibles.findIndex(a =>
          a.books.hasOwnProperty(bookCode)
        );
        return bookIndex !== -1;
      });
      if (index === -1) {
        setMessage("No audio bibles available for this book");
      } else {
        setMessage("");
      }
    }
  }, [audioBible, bookCode]);
  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.heading}>
        Audio Bibles
      </Typography>
      <div className={classes.container}>
        {message || audioBible.success === false || (
          <div>
            {audioBible.map((language, i) => {
              //Assume that the whole book is there, not searching for chapter
              let bookIndex = language.audioBibles.findIndex(a =>
                a.books.hasOwnProperty(bookCode)
              );
              return bookIndex === -1 ? (
                ""
              ) : (
                <ExpansionPanel
                  defaultExpanded={true}
                  classes={{
                    root: classes.menuRoot,
                    expanded: classes.expanded
                  }}
                  key={i}
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    classes={{
                      root: classes.summaryPanel,
                      expanded: classes.expanded,
                      content: classes.content
                    }}
                  >
                    <Typography className={classes.language}>
                      {language.language.name}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails style={{ padding: 0 }}>
                    <List className={classes.expansionDetails}>
                      {language.audioBibles.map((audio, i) => {
                        let url =
                          audio.url +
                          bookCode +
                          "/" +
                          chapter +
                          "." +
                          audio.format;
                        return audio.books.hasOwnProperty(bookCode) ? (
                          <ListItem
                            key={i}
                            value={audio.name}
                            className={classes.audioBible}
                          >
                            {audio.name}
                            <ReactPlayer
                              key={i}
                              url={url}
                              controls
                              width="100%"
                              height="50px"
                              className={classes.player}
                            />
                          </ListItem>
                        ) : (
                          ""
                        );
                      })}
                    </List>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default Audio;
