import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { bibleChapters } from "../../store/bibleData";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: "1rem",
    margin: 9,
    padding: "6px 0 6px 19px",
    textTransform: "capitalize",
    backgroundColor: "#fff",
    border: "1px solid #fff",
    [theme.breakpoints.only("xs")]: {
      width: "60%",
    },
  },
  icon: {
    left: 15,
    position: "relative",
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
    width: 380,
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
  openBook: {
    border: "1px solid #ccc",
    backgroundColor: "#3f7ad2",
    color: "#fff",
    "&:hover": {
      border: "1px solid #ccc",
      backgroundColor: "#3f7ad2",
      color: "#fff",
    },
  },
  chapter: {
    marginRight: 7,
    marginLeft: 15,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(0),
    display: "inline-block",
    width: 50,
    border: "1px solid #ccc",
    backgroundColor: "#ffffff",
    textAlign: "center",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  openChapter: {
    border: "1px solid #ccc",
    backgroundColor: "#3f7ad2",
    color: "#fff",
    "&:hover": {
      border: "1px solid #ccc",
      backgroundColor: "#3f7ad2",
      color: "#fff",
    },
  },
  bookName: {
    whiteSpace: "nowrap",
    width: 100,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));
const BookCombo = ({
  paneNo,
  bookCode,
  bookList,
  chapter,
  setValue,
  minimal,
  landingPage,
  sourceId,
  parallelScroll,
  syncPanel,
}) => {
  //classes for styling
  const classes = useStyles();
  const theme = useTheme();
  //if mobile then true, used to change layout
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  //book to display
  const [book, setBook] = React.useState("");
  //book combo button ref
  const bookDropdown = React.useRef(null);
  //last book count in book drop down to show list of chapters in
  const [bookOpen, setBookOpen] = React.useState(1);
  //book to highlight on clicking
  const [bookOpened, setBookOpened] = React.useState(bookCode);
  //Selected chapter list
  const [selectedChapterList, setSelectedChapterList] = React.useState([]);
  //Preserve chapter list on opening menu in this varible
  const [prevChapterList, setPrevChapterList] = React.useState([]);
  //selected book first by default
  const [selectedBookIndex, setSelectedBookIndex] = React.useState(1);
  const bookCombo = React.useRef();
  const chapterCombo = React.useRef();
  React.useEffect(() => {
    setBookOpened(bookCode);
  }, [bookCode]);
  //initialize chapter list when book opened changed
  React.useEffect(() => {
    if (
      bookOpened !== undefined &&
      bookOpened !== "Loading..." &&
      bookList !== undefined &&
      bookList.length > 0
    ) {
      //let bookObject = getBookByName(bookOpened);
      let bookObject = bookList.find(
        (element) => element.book_code === bookOpened
      );
      let bookCode = bookObject.book_code;
      let chapters = new Array(bibleChapters[bookCode]);
      for (let i = 0; i < chapters.length; i++) {
        let number = i + 1;
        chapters[i] = {
          number: number,
          bibleBookCode: bookCode,
        };
      }
      setSelectedChapterList(chapters);
      setBookOpen(bookObject.book_id);
    }
  }, [bookOpened, bookList]);
  React.useEffect(() => {
    if (bookList) {
      let book = bookList.find((element) => element.book_code === bookCode);
      setBook(book.short);
    }
  }, [bookList, bookCode, setValue]);
  //function to set book once its clicked and open the chapter list for it
  function bookClicked(event) {
    let index = parseInt(event.currentTarget.getAttribute("data-count"));
    //To fix book combo scrolling set scroll manually
    if (
      bookCombo.current !== null &&
      chapterCombo.current !== null &&
      bookOpen < index
    ) {
      let element = bookCombo.current.parentElement.parentElement;
      element.scrollTop -= chapterCombo.current.offsetHeight;
    }
    //if opened book clicked, close it else open it
    if (bookOpen !== index) {
      setBookOpen(index);
      setBookOpened(event.currentTarget.getAttribute("data-bookcode"));
    } else {
      setBookOpen("");
    }
  }
  const [openCombo, setOpenCombo] = React.useState(false);
  function openMenu(event) {
    //Preserve old chapter list if no chapter selected
    setPrevChapterList(selectedChapterList);
    setOpenCombo(true);
  }
  //function to handle close combo/menu
  function closeMenu(bookOpen) {
    setBookOpened(bookCode);
    setSelectedChapterList(prevChapterList);
    setOpenCombo(false);
    //set bookopen variable from clickChapter else already selectedBookIndex
    setBookOpen(typeof bookOpen == "number" ? bookOpen : selectedBookIndex);
  }
  //function to handle click chapter event
  const clickChapter = (event) => {
    setSelectedBookIndex(bookOpen);
    closeMenu(bookOpen);
    let element = event.currentTarget;
    setValue("chapter", element.getAttribute("data-chapter"));
    setValue("bookCode", element.getAttribute("data-bookcode").toLowerCase());
    setValue("versesSelected", []);
    if (parallelScroll && paneNo) {
      syncPanel("panel" + paneNo, "panel" + ((parseInt(paneNo) % 2) + 1));
    }
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
        style={landingPage && mobile ? { marginLeft: "20%" } : {}}
        classes={{ root: classes.button }}
      >
        {minimal === true ? (
          <div className={classes.bookName}>{book}</div>
        ) : (
          book
        )}{" "}
        {chapter}
        <i className={classesI}>keyboard_arrow_downn</i>
      </Button>
      {/* If no book list dont render menu */}
      {bookList === undefined || bookList.length === 0 ? (
        ""
      ) : (
        <Menu
          elevation={0}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          id="customized-menu"
          anchorEl={bookDropdown.current}
          keepMounted
          open={openCombo}
          onClose={closeMenu}
          classes={{ paper: classes.paper }}
        >
          {/*List of books*/}
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
            ref={bookCombo}
          >
            {bookList.map((item, i) => {
              let open = bookOpened === item.book_code ? classes.openBook : "";
              return (
                <React.Fragment key={item.book_id}>
                  <ListItem
                    value={item.short}
                    data-bookcode={item.book_code}
                    data-sourceid={sourceId}
                    data-count={i + 1}
                    button
                    onClick={(event) => bookClicked(event)}
                    className={`${classes.book} ${open}`}
                  >
                    <ListItemText primary={item.short} />
                  </ListItem>
                  {/*Book to open*/}
                  {(bookOpen % 2 ? bookOpen + 1 : bookOpen) === i + 1 &&
                  selectedChapterList ? (
                    <Collapse
                      in={
                        selectedChapterList && selectedChapterList.length !== 0
                      }
                      timeout="auto"
                      unmountOnExit
                    >
                      {/*List of chapters*/}
                      <List component="div" disablePadding ref={chapterCombo}>
                        {selectedChapterList.map((chapterObject, i) => {
                          var chapterActive =
                            chapterObject.number === chapter
                              ? classes.openChapter
                              : "";
                          return (
                            <ListItem
                              button
                              key={chapterObject.number}
                              data-bookcode={chapterObject.bibleBookCode}
                              data-chapter={chapterObject.number}
                              className={`${classes.chapter} ${chapterActive}`}
                              onClick={clickChapter}
                            >
                              {chapterObject.number}
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
};
const mapStateToProps = (state) => {
  return {
    parallelScroll: state.local.parallelScroll,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    syncPanel: (from, to) => {
      dispatch({ type: actions.SYNCPANEL, from: from, to: to });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookCombo);
