import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
const useStyles = makeStyles(theme => ({
  nested: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(0),
    display: "inline-block",
    width: 50,
    backgroundColor: "#00C4FD",
    textAlign: "center",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  book: {
    border: "1px solid #cecece26",
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
    paddingBottom: 1,
    display: "inline-block",
    width: 160,
    transition: "width 600ms ease-out, height 600ms ease-out",
    textAlign: "center",
    padding: "0px 0px",
    backgroundColor: "red"
  }
}));
const BookItem = ({
  text,
  chapterList,
  bookOpen,
  bookClicked,
  setValue,
  closeMenu
}) => {
  const classes = useStyles();
  const clickChapter = event => {
    closeMenu();
    setValue("book", text);
    setValue("chapter", event.currentTarget.getAttribute("value"));
  };

  return (
    <>
      <ListItem
        value={text}
        button
        onClick={event => bookClicked(event)}
        className={classes.book}
      >
        <ListItemText primary={text} />
      </ListItem>
      <Collapse key={text} in={bookOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {chapterList.map((chapter, i) => (
            <ListItem
              key={text + i}
              value={chapter}
              button
              className={classes.nested}
              onClick={clickChapter}
            >
              {chapter}
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};
export default BookItem;
