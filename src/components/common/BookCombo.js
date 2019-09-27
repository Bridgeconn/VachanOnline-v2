import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { getChapters } from "../common/utillity";
const useStyles = makeStyles(theme => ({
  button: {
    left: theme.spacing(1),
    fontSize: "1rem",
    margin: 9,
    padding: "6px 0 6px 19px",
    textTransform: "none",
    backgroundColor: "#fff",
    border: "1px solid #fff"
  },
  icon: {
    left: 15,
    position: "relative"
  },
  root: {
    width: "100%",
    maxWidth: 680,
    backgroundColor: "#eaeaea",
    textTransform: "capitalize",
    maxHeight: "calc(100vh - 150px)",

  },
  paper: {
    position: "relative",
    maxHeight: "calc(100vh - 150px)",
    width: 680,
    backgroundColor: "#eaeaea",
    color: "#2a2a2a",


  },
  book: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
    paddingBottom: 1,
    display: "inline-block",
    width: 140,
    transition: "width 500ms ease-out, height 500ms ease-out",
    textAlign: "center",
    padding: "0px 0px",
    fontSize: "11px",
    border: "1px solid #d2d2d2c9",
  },
  // active: {
  //   backgroundColor: "#00aaff"
  // },
  openBook: {
    border: "1px solid #ccc",
    backgroundColor: "#3f7ad2",
    color: "#fff"
  },
  chapter: {
    marginRight: 7,
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(0),
    display: "inline-block",
    width: 50,
    border: "1px solid #ccc",
    backgroundColor: "#ffffff",
    textAlign: "center",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  }
}));
export default function BookCombo({
  book,
  bookList,
  bookCode,
  chapterList,
  chapter,
  sourceId,
  setValue
}) {
  const classes = useStyles();
  //book combo button ref
  const bookDropdown = React.useRef(null);
  //last book count in book drop down to show list of chapters in
  const [bookOpen, setBookOpen] = React.useState(4);
  const [selectedChapterList, setSelectedChapterList] = React.useState(
    chapterList
  );
  const [selectedBookIndex, setSelectedBookIndex] = React.useState(4);
  React.useEffect(() => {
    if (bookList !== undefined) {
      setBookOpen(bookList.length < 4 ? bookList.length : 4);
    }
  }, [bookList]);
  React.useEffect(() => {
    setSelectedChapterList(chapterList);
  }, [chapterList]);
  React.useEffect(() => {
    if (book !== "Loading..." && book !== "" && bookList !== undefined) {
      setBookOpen(bookList.findIndex(e => e.bibleBookFullName === book) + 1);
    }
  }, [bookList, book]);
  //book to highlight on clicking
  const [bookOpened, setBookOpened] = React.useState("");
  //function to set book once its clicked and open the chapter list for it
  function bookClicked(event) {
    if (bookOpen !== event.currentTarget.innerText) {
      let index = parseInt(event.currentTarget.getAttribute("data-count"));
      let row = parseInt((index + 3) / 4);
      let lastRow = parseInt((bookList.length + 3) / 4);
      setBookOpen(lastRow === row ? bookList.length : row * 4);
      setBookOpened(event.currentTarget.getAttribute("value"));
      setValue("chapterList", []);
      getChapters(
        setValue,
        sourceId,
        event.currentTarget.getAttribute("data-bookcode"),
        false,
        setSelectedChapterList
      );
    } else {
      setBookOpen("");
    }
  }
  const [openCombo, setOpenCombo] = React.useState(false);
  function openMenu(event) {
    setOpenCombo(true);
    getChapters(setValue, sourceId, bookCode);
  }
  function closeMenu() {
    setBookOpened(book);
    setSelectedChapterList(chapterList);
    setOpenCombo(false);
    setBookOpen(selectedBookIndex);
  }
  const clickChapter = event => {
    setSelectedBookIndex(bookOpen);
    closeMenu();
    let reference = event.currentTarget
      .getAttribute("data-reference")
      .split(" ");
    setValue("chapter", reference.pop());
    setValue("book", reference.join(" "));
    setValue(
      "bookCode",
      event.currentTarget.getAttribute("data-bookcode").toLowerCase()
    );
  };
  const classesI = `material-icons ${classes.icon}`;
  return (
    <>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={openMenu}
        ref={bookDropdown}
        classes={{ root: classes.button }}
      >
        {book} {chapter}
        <i className={classesI}>keyboard_arrow_downn</i>
      </Button>
      {bookList === undefined || bookList.length === 0 ? (
        ""
      ) : (
          <Menu
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            id="customized-menu"
            anchorEl={bookDropdown.current}
            keepMounted
            open={openCombo}
            onClose={closeMenu}
            classes={{ paper: classes.paper }}
          >
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              className={classes.root}
            >
              {bookList.map((item, i) => {
                let open =
                  bookOpened === item.bibleBookFullName ? classes.openBook : "";
                var bookActive =
                  bookCode === item.abbreviation ? classes.active : "";
                return (
                  <React.Fragment key={item.bibleBookID}>
                    <ListItem
                      value={item.bibleBookFullName}
                      data-bookcode={item.abbreviation}
                      data-sourceid={item.sourceId}
                      data-count={i + 1}
                      button
                      onClick={event => bookClicked(event)}
                      className={`${classes.book} ${open} ${bookActive}`}
                    >
                      <ListItemText primary={item.bibleBookFullName} />
                    </ListItem>
                    {bookOpen === i + 1 && selectedChapterList ? (
                      <Collapse
                        in={
                          selectedChapterList && selectedChapterList.length !== 0
                        }
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {selectedChapterList.map((item, i) => {
                            var chapterActive =
                              item.chapter.reference === book + " " + chapter
                                ? classes.active
                                : "";
                            return (
                              <ListItem
                                value={item.chapter.number}
                                key={item.chapter.chapterId}
                                data-reference={item.chapter.reference}
                                data-bookcode={item.bibleBookCode}
                                button
                                className={`${classes.chapter} ${chapterActive}`}
                                onClick={clickChapter}
                              >
                                {item.chapter.number}
                              </ListItem>
                            );
                          })}
                        </List>
                      </Collapse>
                    ) : (
                        ""
                      )}
                  </React.Fragment>
                );
              })}
            </List>
          </Menu>
        )}
    </>
  );
}
