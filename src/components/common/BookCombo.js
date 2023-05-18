import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { bibleChapters, colorGroup } from "../../store/bibleData";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { BLACK, GREY, LIGHTGREY, WHITE } from "../../store/colorCode";
import Tooltip from "@material-ui/core/Tooltip";

const BigTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: WHITE,
    color: BLACK,
    boxShadow: theme.shadows[4],
    border: "1px solid" + GREY,
    fontSize: 16,
  },
}))(Tooltip);
const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: "1rem",
    margin: 9,
    padding: "6px 0 6px 12px",
    textTransform: "capitalize",
    backgroundColor: "#fff",
    border: "1px solid #fff",
    boxShadow: "1px 1px 1px 1px " + GREY,
    [theme.breakpoints.down("xs")]: {
      width: "60%",
      padding: (props) =>
        props.screen === "info" ||
        props.screen === "audio" ||
        props.screen === "video"
          ? "4px 0"
          : "6px 0",
      margin: 9,
    },
  },
  icon: {
    left: 3,
    position: "relative",
    width: 30,
    [theme.breakpoints.down("sm")]: {
      left: 0,
    },
  },
  root: {
    width: "100%",
    maxWidth: 680,
    backgroundColor: WHITE,
    textTransform: "capitalize",
    maxHeight: "calc(100vh - 150px)",
  },
  paper: {
    position: "relative",
    maxHeight: "calc(100vh - 150px)",
    width: 358,
    backgroundColor: WHITE,
    color: "#2a2a2a",
  },
  book: {
    margin: "3px 3px 4px 6px",
    paddingBottom: 1,
    display: "inline-block",
    width: 160,
    transition: "width 500ms ease-out, height 500ms ease-out",
    textAlign: "center",
    padding: "0px 0px",
    fontSize: "11px",
    border: "1px solid #d2d2d2c9",
    backgroundColor: WHITE,
  },
  bookText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: 140,
  },
  openBook: {
    border: "1px solid #ccc",
    backgroundColor: LIGHTGREY,
    color: BLACK,
    "&:hover": {
      border: "1px solid #ccc",
      backgroundColor: WHITE,
      color: BLACK,
    },
  },
  chapterList: {
    paddingTop: 5,
    border: "1px solid #d8d8d8",
    backgroundColor: "white",
  },
  chapter: {
    margin: "0 0 3px 3px",
    display: "inline-block",
    width: 45,
    border: "1px solid #ccc",
    textAlign: "center",
    padding: "8px 0",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  openChapter: {
    border: "1px solid #ccc",
    backgroundColor: LIGHTGREY,
    color: BLACK,
    "&:hover": {
      border: "1px solid #ccc",
      backgroundColor: GREY,
    },
  },
  bookName: {
    whiteSpace: "nowrap",
    minWidth: 100,
    maxWidth: 130,
    overflow: "hidden",
    textOverflow: "ellipsis",
    [theme.breakpoints.down("sm")]: {
      maxWidth: 60,
      minWidth: 60,
    },
  },
  bookNameBox: {
    [theme.breakpoints.down("sm")]: {
      whiteSpace: "nowrap",
      minWidth: 70,
      maxWidth: 80,
      overflow: "hidden",
      textOverflow: "ellipsis",
      padding: "0 5px",
    },
  },
}));
const BookCombo = (props) => {
  const {
    paneNo,
    bookCode,
    bookList,
    chapter,
    setValue,
    minimal,
    landingPage,
    parallelScroll,
    syncPanel,
    screen,
  } = props;
  //classes for styling
  const styleProps = {
    screen: screen,
  };
  const classes = useStyles(styleProps);
  const theme = useTheme();
  //if mobile then true, used to change layout
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  //book to display
  const [bookDisplay, setBookDisplay] = React.useState("");
  //open book code
  const [openBookCode, setOpenBookCode] = React.useState(bookCode);
  //Selected chapter list
  const [selectedChapterList, setSelectedChapterList] = React.useState([]);
  //Preserve chapter list on opening menu in this varible
  const [prevChapterList, setPrevChapterList] = React.useState([]);
  //book combo state
  const [comboOpen, setComboOpen] = React.useState(false);
  //chapter section row/book after which to show chapters
  const [chapterRow, setChapterRow] = React.useState();
  //book combo button ref
  const bookDropdown = React.useRef(null);
  //open book ref
  const openBookRef = React.useRef(null);
  //first chapter ref
  const firstChapterRef = React.useRef(null);
  //on changing bookcode change open book code
  React.useEffect(() => {
    setOpenBookCode(bookCode);
  }, [bookCode]);
  //on changing book code set chapter row
  React.useEffect(() => {
    bookList?.forEach((element, i) => {
      if (element.book_code === bookCode) {
        setChapterRow(Math.min(Math.floor(i / 2) * 2 + 1, bookList.length - 1));
      }
    });
  }, [bookCode, bookList]);
  //initialize chapter list when book opened changed
  React.useEffect(() => {
    if (
      openBookCode !== undefined &&
      openBookCode !== "Loading..." &&
      bookList !== undefined &&
      bookList.length > 0
    ) {
      let bookObject = bookList.find(
        (element) => element.book_code === openBookCode
      );
      if (!bookObject) {
        //If current book not available set first available book, fallback mechanism, actual check in versions
        bookObject = bookList[0];
      }
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
    }
  }, [openBookCode, bookList]);
  //if bookCode changed set book display
  React.useEffect(() => {
    if (bookList) {
      let book = bookList.find((element) => element.book_code === bookCode);
      if (!book) {
        //If current book not available set first available book, fallback mechanism, actual check in versions
        book = bookList[0];
        setValue("chapter", 1);
        setValue("bookCode", bookList[0]?.book_code);
        setValue("versesSelected", []);
      }
      setBookDisplay(book?.short);
    }
  }, [bookList, bookCode, setValue]);
  //on updating chapter row scroll it into view
  React.useEffect(() => {
    if (firstChapterRef.current != null) {
      firstChapterRef.current.scrollIntoView();
    }
    if (openBookRef.current !== null) {
      openBookRef.current.scrollIntoView();
    }
  }, [chapterRow]);
  //function to set book once its clicked and open the chapter list for it
  function bookClicked(event) {
    let clickedBookCode = event.currentTarget.getAttribute("data-bookcode");
    //if opened book clicked, close it else open it
    if (openBookCode !== clickedBookCode) {
      setChapterRow(parseInt(event.currentTarget.getAttribute("data-row")));
      setOpenBookCode(clickedBookCode);
    } else {
      setOpenBookCode("");
      setChapterRow(-1);
    }
  }
  //handle book combo opening
  function openCombo() {
    //Preserve old chapter list if no chapter selected when closing
    setPrevChapterList(selectedChapterList);
    setComboOpen(true);
    if (openBookRef.current !== null) {
      openBookRef.current.scrollIntoView();
    }
  }
  //function to handle close combo/menu
  function closeMenu(chapterSelected) {
    setComboOpen(false);
    //if chapter not selected set previously selected Book
    if (!chapterSelected) {
      setOpenBookCode(bookCode);
      setSelectedChapterList(prevChapterList);
      bookList.forEach((element, i) => {
        if (element.book_code === bookCode) {
          const lastBook = bookList.length - 1;
          setChapterRow(Math.min(Math.floor(i / 2) * 2 + 1, lastBook));
        }
      });
    }
  }
  //function to handle click chapter event
  const clickChapter = (event) => {
    closeMenu(true);
    let element = event.currentTarget;
    setValue("chapter", element.getAttribute("data-chapter"));
    setValue("bookCode", element.getAttribute("data-bookcode").toLowerCase());
    setValue("versesSelected", []);
    if (parallelScroll && paneNo) {
      syncPanel("panel" + paneNo, "panel" + ((parseInt(paneNo) % 2) + 1));
    }
  };
  return (
    <>
      <BigTooltip title="Choose a Bible book and chapter to read">
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          onClick={openCombo}
          ref={bookDropdown}
          style={
            landingPage && mobile ? { marginLeft: 0, marginRight: 15 } : {}
          }
          classes={{ root: classes.button }}
        >
          {minimal === true ? (
            <div
              className={classes.bookName}
            >{`${bookDisplay}  ${chapter}`}</div>
          ) : (
            <div className={classes.bookNameBox}>
              {`${bookDisplay} ${chapter}`}
            </div>
          )}
          <i className={`material-icons ${classes.icon}`}>
            keyboard_arrow_down
          </i>
        </Button>
      </BigTooltip>
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
          open={comboOpen}
          onClose={() => closeMenu(false)}
          classes={{ paper: classes.paper }}
        >
          {/*List of books*/}
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
          >
            {bookList.map((item, i) => {
              //set row to last column in row, handle case when last row incomplete
              const lastBook = bookList.length - 1;
              let row = Math.min(Math.floor(i / 2) * 2 + 1, lastBook);
              let open =
                openBookCode === item.book_code ? classes.openBook : "";
              return (
                <React.Fragment key={item.book_id}>
                  <ListItem
                    value={item.short}
                    data-bookcode={item.book_code}
                    data-row={row}
                    button
                    onClick={(event) => bookClicked(event)}
                    className={`${classes.book} ${open}`}
                    ref={open === "" ? null : openBookRef}
                    style={{
                      borderLeft: "4px solid" + colorGroup[item.book_code],
                    }}
                  >
                    <ListItemText
                      primary={item.short}
                      classes={{ primary: classes.bookText }}
                    />
                  </ListItem>
                  {/* if chapterRow equal to current book index show chapters */}
                  {chapterRow === i &&
                  selectedChapterList &&
                  selectedChapterList.length !== 0 ? (
                    <List
                      component="div"
                      disablePadding
                      className={classes.chapterList}
                    >
                      {selectedChapterList.map((chapterObject, i) => {
                        var chapterActive =
                          openBookCode === bookCode &&
                          chapterObject.number === parseInt(chapter)
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
                            ref={i === 0 ? firstChapterRef : null}
                          >
                            {chapterObject.number}
                          </ListItem>
                        );
                      })}
                    </List>
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
