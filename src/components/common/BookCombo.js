import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { bibleChapters, colorGroup } from "../../store/bibleData";
import { connect } from "react-redux";
import { BLACK, GREY, LIGHTGREY, WHITE } from "../../store/colorCode";
import BigTooltip from "./BigTooltip";
import { Box, ListItemButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SYNCPANEL } from "../../store/actions";
import { styled } from "@mui/system";
const I = styled("i")(({ theme }) => ({
  [`&.material-icons`]: {
    left: 3,
    position: "relative",
    width: 30,
    [theme.breakpoints.down("lg")]: {
      left: 0,
      display: "none",
    },
  },
}));

const BookCombo = (props) => {
  const {
    paneNo,
    bookCode,
    bookList,
    chapter,
    verseData,
    setValue,
    minimal,
    landingPage,
    parallelScroll,
    parallelView,
    syncPanel,
    screen,
  } = props;

  const { t } = useTranslation();
  //classes for styling
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
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const path = location?.pathname;
  const paramVersion = searchParams.get("version");

  function getChapterMap() {
    const bookMap = new Map();
    let col = 1;
    let nt = false;
    bookList?.forEach((item) => {
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
  const setParams = React.useCallback(
    (bookCode, chapter, verseData) => {
      if (path.startsWith("/read") && paramVersion !== null) {
        const verse = verseData ? "." + verseData : "";
        setSearchParams({
          version: paramVersion,
          reference: bookCode + "." + chapter + verse,
        });
      }
    },
    [paramVersion, path, setSearchParams]
  );
  const chapterOpenMap = React.useMemo(getChapterMap, [bookList]);
  //on changing bookcode change open book code
  React.useEffect(() => {
    setOpenBookCode(bookCode);
  }, [bookCode]);
  React.useEffect(() => {
    if (paneNo !== 2) {
      localStorage.setItem("bookCode", bookCode);
      localStorage.setItem("chapter", chapter);
      if (!path.startsWith("/read") && verseData !== "") {
        setValue("verseData", "");
      }
      localStorage.setItem("verseData", verseData || "");
      setParams(bookCode, chapter, verseData);
    }
  }, [
    paneNo,
    bookCode,
    chapter,
    verseData,
    landingPage,
    path,
    setValue,
    setParams,
  ]);
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
      <ListItem
        sx={{
          margin: 0.5,
          display: "inline-block",
          fontWeight: "bold",
          width: 330,
          fontSize: "16px",
          height: 35,
          borderRadius: 1,
          boxShadow: "1px 1px 1px 1px" + GREY,
          textAlign: "center",
          "@media (max-width: 370px)": {
            width: 294,
          },
        }}
      >
        {t("commonOldTestamentHead")}
      </ListItem>
    ) : (
      ""
    );
  }
  function ntHeader(item) {
    const ntBook = bookList.find((item) => item.book_id >= 40);
    return item?.book_code === ntBook?.book_code ? (
      <ListItem
        sx={{
          margin: 0.5,
          display: "inline-block",
          fontWeight: "bold",
          width: 330,
          fontSize: "16px",
          height: 35,
          borderRadius: 0.5,
          boxShadow: "1px 1px 1px 1px" + GREY,
          textAlign: "center",
          "@media (max-width: 370px)": {
            width: 294,
          },
        }}
      >
        {t("commonNewTestamentHead")}
      </ListItem>
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
    const element = event.currentTarget;
    const _chapter = element.getAttribute("data-chapter");
    const _bookCode = element.getAttribute("data-bookcode").toLowerCase();

    setValue("chapter", _chapter);
    setValue("bookCode", _bookCode);
    setValue("versesSelected", []);
    setParams(_bookCode, _chapter);
    if (parallelScroll && paneNo) {
      syncPanel("panel" + paneNo, "panel" + ((parseInt(paneNo) % 2) + 1), t);
    }
  };
  return verseData ? (
    <Typography
      variant="button"
      sx={{
        display: "inline-flex",
        fontSize: "1rem",
        textTransform: "capitalize",
        border: "1px solid #fff",
        boxShadow: "1px 1px 1px 1px " + GREY,
        margin: 0.5,
        paddingX: 1.25,
        paddingY: 0.75,
        borderRadius: 1,
        color: BLACK,
      }}
    >
      {`${bookDisplay} ${chapter}:${verseData}`}
    </Typography>
  ) : (
    <>
      <BigTooltip title={t("commonBookDropDownToolTip")}>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          onClick={openCombo}
          ref={bookDropdown}
          style={
            landingPage && mobile ? { marginLeft: 0, marginRight: 15 } : {}
          }
          sx={{
            [`&.MuiButton-root`]: {
              fontSize: "1rem",
              paddingRight: {
                lg: 0.75,
                xs:
                  screen === "info" || screen === "audio" || screen === "video"
                    ? 0.5
                    : 0.75,
              },
              paddingLeft: {
                lg: 1.5,
                xs:
                  screen === "info" || screen === "audio" || screen === "video"
                    ? 0.5
                    : 0.75,
              },
              paddingY: 0.75,
              textTransform: "capitalize",
              backgroundColor: "#fff",
              border: "1px solid #fff",
              boxShadow: "1px 1px 1px 1px " + GREY,
              maxWidth: { lg: "unset", xs: parallelView ? 120 : 140 },
              margin: { lg: 0.5, xs: 1.125 },
              color: BLACK,
              "&:hover": {
                backgroundColor: BLACK + "0a",
              },
            },
          }}
        >
          {minimal === true ? (
            <Box
              sx={{
                whiteSpace: "nowrap",
                minWidth: "100px",
                width: "fit-content",
                overflow: "hidden",
                textOverflow: "ellipsis",
                [theme.breakpoints.only("md")]: {
                  maxWidth: parallelView ? "120px" : "130px",
                },
                [theme.breakpoints.down("sm")]: {
                  maxWidth: "120px",
                },
              }}
            >{`${bookDisplay}  ${chapter}`}</Box>
          ) : (
            <Box
              sx={{
                whiteSpace: { lg: "wrap", xs: "nowrap" },
                minWidth: { sm: "unset", xs: 110 },
                maxWidth: { lg: "unset", xs: 150 },
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {`${bookDisplay} ${chapter}`}
            </Box>
          )}
          <I className={`material-icons`}>keyboard_arrow_down</I>
        </Button>
      </BigTooltip>
      {/* If no book list dont render menu */}
      {bookList === undefined || bookList.length === 0 ? (
        ""
      ) : (
        <Menu
          elevation={0}
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
          sx={{
            [`.MuiMenu-paper `]: {
              position: "relative",
              maxHeight: "calc(100vh - 170px)",
              width: 358,
              backgroundColor: WHITE,
              color: "#2a2a2a",
              "@media (max-width: 370px)": {
                width: 320,
              },
            },
          }}
        >
          {/*List of books*/}
          {otHeader()}
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            sx={{
              [`&.MuiList-root `]: {
                width: "100%",
                maxWidth: 680,
                backgroundColor: WHITE,
                textTransform: "capitalize",
                maxHeight: "calc(100vh - 170px)",
              },
            }}
          >
            {bookList.map((item) => {
              return (
                <React.Fragment key={item.book_id}>
                  {ntHeader(item)}
                  <ListItemButton
                    value={item.short}
                    data-bookcode={item.book_code}
                    onClick={(event) => bookClicked(event)}
                    sx={{
                      marginTop: 0.375,
                      marginRight: 0.375,
                      marginBottom: 0.5,
                      marginLeft: 0.75,
                      paddingBottom: 0.125,
                      display: "inline-block",
                      width: 160,
                      transition: "width 500ms ease-out, height 500ms ease-out",
                      textAlign: "center",
                      padding: 0,
                      fontSize: "11px",
                      border:
                        openBookCode === item.book_code
                          ? "1px solid #ccc"
                          : "1px solid #d2d2d2c9",
                      backgroundColor:
                        openBookCode === item.book_code ? LIGHTGREY : WHITE,
                      "@media (max-width: 370px)": {
                        margin: "3px 5px 3px 1px",
                        width: 146,
                      },
                      color: BLACK,
                      "&:hover": {
                        border: "1px solid #ccc",
                        backgroundColor: BLACK + "0a",
                        color: BLACK,
                      },
                    }}
                    ref={openBookCode !== item.book_code ? null : openBookRef}
                    style={{
                      borderLeft: "4px solid" + colorGroup[item.book_code],
                    }}
                  >
                    <ListItemText
                      primary={item.short}
                      sx={{
                        [`&.MuiListItemText-primary `]: {
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          width: 160,
                          "@media (max-width: 370px)": {
                            width: 140,
                          },
                        },
                      }}
                    />
                  </ListItemButton>
                  {/* if chapterRow equal to current book index show chapters */}
                  {chapterRow === item.book_code &&
                  selectedChapterList?.length !== 0 ? (
                    <List
                      component="div"
                      disablePadding
                      sx={{ paddingTop: 0.625, backgroundColor: "white" }}
                    >
                      {selectedChapterList.map((chapterObject, i) => {
                        return (
                          <ListItemButton
                            key={chapterObject.number}
                            data-bookcode={chapterObject.bibleBookCode}
                            data-chapter={chapterObject.number}
                            sx={{
                              marginTop: 0,
                              marginRight: 0,
                              marginBottom: 0.375,
                              marginLeft: 0.375,
                              display: "inline-block",
                              width: 45,
                              border:
                                openBookCode === bookCode &&
                                chapterObject.number === parseInt(chapter)
                                  ? "1px solid #ccc"
                                  : "1px solid #ccc",
                              textAlign: "center",
                              paddingX: 0,
                              paddingY: 1,
                              fontFamily:
                                '"Roboto", "Helvetica", "Arial", sans-serif',
                              backgroundColor:
                                openBookCode === bookCode &&
                                chapterObject.number === parseInt(chapter)
                                  ? LIGHTGREY
                                  : WHITE,
                              color: BLACK,
                              "&:hover": {
                                border: "1px solid #ccc",
                                backgroundColor: BLACK + "0a",
                              },
                            }}
                            onClick={clickChapter}
                            ref={i === 0 ? firstChapterRef : null}
                          >
                            {chapterObject.number}
                          </ListItemButton>
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
    syncPanel: (from, to, t) => {
      dispatch({ type: SYNCPANEL, from: from, to: to, t: t });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookCombo);
