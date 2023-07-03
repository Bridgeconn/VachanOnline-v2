import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import BigTooltip from "./BigTooltip";
import {
  COMMENTARY,
  PARALLELBIBLE,
  READINGPLANS,
  SEARCH,
} from "../../store/views";

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: "1rem",
    margin: 9,
    padding: "6px 0 6px 12px",
    textTransform: "capitalize",
    backgroundColor: "#fff",
    border: "1px solid #fff",
    boxShadow: "1px 1px 1px 1px " + GREY,
    [theme.breakpoints.only("sm")]: {
      padding: 6,
      maxWidth: (props) => (props.parallelView ? 110 : 165),
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: 165,
      padding: (props) =>
        props.screen === "info" ||
        props.screen === "audio" ||
        props.screen === "video"
          ? 4
          : 6,
      margin: 9,
    },
  },
  icon: {
    left: 3,
    position: "relative",
    width: 30,
    [theme.breakpoints.down("sm")]: {
      left: 0,
      display: "none",
    },
  },
  root: {
    width: "100%",
    maxWidth: 680,
    backgroundColor: WHITE,
    textTransform: "capitalize",
    maxHeight: "calc(100vh - 170px)",
  },
  paper: {
    position: "relative",
    maxHeight: "calc(100vh - 170px)",
    width: 358,
    backgroundColor: WHITE,
    color: "#2a2a2a",
    "@media (max-width: 370px)": {
      width: 320,
    },
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
    "@media (max-width: 370px)": {
      margin: "3px 5px 3px 1px",
      width: 146,
    },
  },
  bookText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: 160,
    "@media (max-width: 370px)": {
      width: 140,
    },
  },
  headers: {
    margin: 4,
    display: "inline-block",
    fontWeight: "bold",
    width: 330,
    fontSize: "16px",
    height: 35,
    borderRadius: 4,
    boxShadow: "1px 1px 1px 1px" + GREY,
    textAlign: "center",
    "@media (max-width: 370px)": {
      width: 294,
    },
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
    [theme.breakpoints.down("md")]: {
      "&:hover": {
        backgroundColor: LIGHTGREY,
      },
    },
  },
  chapterList: {
    paddingTop: 5,
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
    width: "fit-content",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  bookNameBox: {
    [theme.breakpoints.down("sm")]: {
      whiteSpace: "nowrap",
      minWidth: 130,
      maxWidth: 150,
      overflow: "hidden",
      textOverflow: "ellipsis",
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
    parallelView,
    syncPanel,
    screen,
  } = props;
  //classes for styling
  const mobilePV = [PARALLELBIBLE, COMMENTARY, READINGPLANS, SEARCH];
  const parallelMV = mobilePV.includes(parallelView);
  const styleProps = {
    screen: screen,
    parallelView: parallelMV,
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
  function getChapterMap() {
    const bookMap = new Map();
    let col = 1;
    let nt = false;
    bookList.forEach((item) => {
      const { book_code, book_id } = item;
      //OT Books
      if (book_id < 40) {
        if (col === 1) {
          //get next book if exists
          const next = bookList.find(
            (i) => i.book_id > book_id && i.book_id < 40
          );
          bookMap.set(book_code, next?.book_code || book_code);
          col = 2;
        } else if (col === 2) {
          bookMap.set(book_code, book_code);
          col = 1;
        }
      } else {
        if (!nt) {
          col = 1;
          nt = true;
        }
        if (col === 1) {
          //get next book if exists
          const next = bookList.find((i) => i.book_id > book_id);
          bookMap.set(book_code, next?.book_code || book_code);
          col = 2;
        } else if (col === 2) {
          bookMap.set(book_code, book_code);
          col = 1;
        }
      }
    });
    return bookMap;
  }
  const chapterOpenMap = React.useMemo(getChapterMap, [bookList]);
  //on changing bookcode change open book code
  React.useEffect(() => {
    setOpenBookCode(bookCode);
  }, [bookCode]);
  React.useEffect(() => {
    if (paneNo !== 2) {
      localStorage.setItem("bookCode", bookCode);
      localStorage.setItem("chapter", chapter);
    }
  }, [paneNo, bookCode, chapter]);
  //on changing book code set chapter row
  React.useEffect(() => {
    setChapterRow(chapterOpenMap.get(bookCode));
  }, [bookCode, chapterOpenMap]);
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
    if (bookList?.length > 0 && bookCode) {
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
      firstChapterRef.current.scrollIntoView(true);
    }
    if (openBookRef.current !== null) {
      openBookRef.current.scrollIntoView(true);
    }
  }, [comboOpen]);
  //function to set book once its clicked and open the chapter list for it
  function bookClicked(event) {
    let clickedBookCode = event.currentTarget.getAttribute("data-bookcode");
    //if opened book clicked, close it else open it
    if (openBookCode !== clickedBookCode) {
      setChapterRow(chapterOpenMap.get(clickedBookCode));
      setOpenBookCode(clickedBookCode);
    } else {
      setOpenBookCode("");
      setChapterRow("");
    }
  }
  //handle book combo opening
  function openCombo() {
    //Preserve old chapter list if no chapter selected when closing
    setPrevChapterList(selectedChapterList);
    setComboOpen(true);
    if (openBookRef.current !== null) {
      openBookRef.current.scrollIntoView(true);
    }
  }
  function otHeader() {
    return bookList.find((item) => item.book_id <= 39) ? (
      <ListItem className={classes.headers}>OLD TESTAMENT</ListItem>
    ) : (
      ""
    );
  }
  function ntHeader(item) {
    const ntBook = bookList.find((item) => item.book_id >= 40);
    return item?.book_code === ntBook?.book_code ? (
      <ListItem className={classes.headers}>NEW TESTAMENT</ListItem>
    ) : (
      ""
    );
  }
  //function to handle close combo/menu
  function closeMenu(chapterSelected) {
    setComboOpen(false);
    //if chapter not selected set previously selected Book
    if (!chapterSelected) {
      setOpenBookCode(bookCode);
      setSelectedChapterList(prevChapterList);
      setChapterRow(chapterOpenMap.get(bookCode));
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
          {otHeader()}
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
          >
            {bookList.map((item) => {
              let open =
                openBookCode === item.book_code ? classes.openBook : "";
              return (
                <React.Fragment key={item.book_id}>
                  {ntHeader(item)}
                  <ListItem
                    value={item.short}
                    data-bookcode={item.book_code}
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
                  {chapterRow === item.book_code &&
                  selectedChapterList?.length !== 0 ? (
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
    parallelView: state.local.parallelView,
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
