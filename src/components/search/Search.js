import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Pagination from "@mui/material/Pagination";
import { searchBible } from "../common/utility";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import Close from "../common/Close";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { BLACK } from "../../store/colorCode";
import Help from "../common/Help";
import { useTheme } from "@mui/material/styles";

const Search = (props) => {
  const theme = useTheme();
  const { setValue, sourceId, versionBooks, versionSource } = props;
  const [searchText, setSearchText] = React.useState("");
  const [bookNames, setBookNames] = React.useState({});
  const [searchResult, setSearchResult] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [pageData, setPageData] = React.useState("");
  const [pageInfo, setPageInfo] = React.useState("");
  const [regex, setRegex] = React.useState("");
  const [message, setMessage] = React.useState("");

  const { t } = useTranslation();

  const pageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const search = (event) => {
    event.preventDefault();
    if (searchText) {
      searchBible(sourceId, searchText, bookNames, setSearchResult);
      setSearchText("");
    }
  };

  //Set bookCode to localized book name
  React.useEffect(() => {
    if (sourceId && versionBooks && versionSource) {
      let bookList = versionBooks[versionSource[sourceId]];
      let books = {};
      bookList.forEach((book) => {
        books[book.book_code] = book.short;
      });
      setBookNames(books);
    }
  }, [versionBooks, versionSource, sourceId, setBookNames]);

  //set page data
  React.useEffect(() => {
    if (searchResult && searchResult.result && searchResult.result.length) {
      let total = searchResult.result.length;
      let start = 100 * (page - 1) + 1;
      let end = start + 99 < total ? start + 99 : total;
      setPageData(searchResult.result.slice(start - 1, end));
      setPageInfo(
        <Box
          component="span"
          sx={{
            position: "absolute",
            right: "10px",
            [theme.breakpoints.down("md")]: {
              right: "unset",
              left: "5px",
              bottom: "1px",
            },
          }}
        >
          <Box
            component="span"
            sx={{
              display: "inline-block",
              fontSize: "15px",
              padding: "5px 10px",
            }}
          >
            {start} - {end} of {Number(total).toLocaleString()}
          </Box>
          {total > 100 ? (
            <Pagination
              count={Math.ceil(total / 100)}
              page={page}
              onChange={pageChange}
              sx={{ display: "inline-block" }}
            />
          ) : (
            ""
          )}
        </Box>
      );
    } else {
      setPageData("");
      setPageInfo("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResult, page]);

  //search result changed
  React.useEffect(() => {
    if (searchResult && searchResult.result && searchResult.result.length) {
      setRegex(new RegExp(`(${searchResult.keyword})`, "i"));
      setPage(1);
    } else if (searchResult.keyword) {
      setMessage(
        <span>
          {t("studyNoSearchResult")}{" "}
          <Box component="span" sx={{ fontWeight: 600, fontSize: "1.1em" }}>
            {searchResult.keyword}
          </Box>
        </span>
      );
    }
  }, [searchResult, t]);

  //set keyword bold
  const highlightKeyword = (versePart, index) => {
    return (
      <Box
        component="span"
        key={index}
        sx={{
          fontWeight:
            versePart.localeCompare(searchResult.keyword, undefined, {
              sensitivity: "base",
            }) === 0
              ? 600
              : "unset",
          fontSize:
            versePart.localeCompare(searchResult.keyword, undefined, {
              sensitivity: "base",
            }) === 0
              ? "1.1em"
              : "unset",
        }}
      >
        {versePart}
      </Box>
    );
  };

  //Open search reference
  const openReference = (event) => {
    let element = event.currentTarget;
    let bookCode = element.getAttribute("data-bookcode");
    let chapter = parseInt(element.getAttribute("data-chapter"));
    let verse = parseInt(element.getAttribute("data-verse"));
    setValue("bookCode", bookCode);
    setValue("chapter", chapter);
    setValue("versesSelected", [verse]);
  };

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "77px",
        [theme.breakpoints.down("lg")]: {
          marginTop: "66px",
        },
        [theme.breakpoints.only("xs")]: {
          marginTop: "4px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          paddingBottom: "6px",
          paddingLeft: "15px",
          borderBottom: "1px solid #f1ecec",
          [theme.breakpoints.down("md")]: {
            boxShadow: theme.shadows[1],
          },
        }}
      >
        <Box flexGrow={1}>
          <Paper
            component="form"
            sx={{
              "&.MuiPaper-root": {
                padding: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "98%",
              },
            }}
            onSubmit={search}
          >
            <InputBase
              sx={{
                marginLeft: theme.spacing(1),
                flex: 1,
              }}
              placeholder={t("studyEnterSearchText")}
              inputProps={{ "aria-label": "enter search text" }}
              value={searchText}
              onChange={handleSearchTextChange}
            />
            <IconButton
              type="submit"
              sx={{ padding: "10px" }}
              aria-label="search"
              onClick={search}
              size="large"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Help
            iconStyle={{
              color: BLACK,
              fontSize: "21px",
            }}
            url={"searchBible"}
          />
          <Close sx={{ marginRight: "15px", marginTop: "3px" }} />
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          right: "0px",
          left: "0px",
          top: "135px",
          bottom: "0px",
          overflow: "scroll",
          marginBottom: "-15px",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0,0,0,.4) #eeeeee95",
          "&::-webkit-scrollbar": {
            width: "0.45em",
          },
          "&::-webkit-scrollbar-track": {
            WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.4)",
            outline: "1px solid slategrey",
          },
          [theme.breakpoints.only("xs")]: {
            top: "60px",
            paddingBottom: "10px",
          },
          [theme.breakpoints.only("sm")]: {
            top: "122px",
            paddingBottom: "10px",
          },
        }}
      >
        {pageData && pageData.length ? (
          <List component="nav">
            <ListItem
              sx={{
                borderBottom: "1px solid darkgray",
                fontWeight: 600,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: 600,
                    fontSize: "1.2em",
                    position: "relative",
                    bottom: "2px",
                    [theme.breakpoints.down("md")]: {
                      bottom: "20px",
                    },
                  }}
                >
                  {searchResult.keyword}
                </Box>
                {pageInfo}
              </Typography>
            </ListItem>
            {pageData.map((result, i) => {
              return (
                <ListItem
                  key={i}
                  sx={{
                    cursor: "pointer",
                    borderBottom: "1px solid lightgray",
                  }}
                  data-bookcode={result.bookCode}
                  data-chapter={result.chapter}
                  data-verse={result.verse}
                  onClick={openReference}
                >
                  <ListItemText
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontWeight: 600,
                      },
                    }}
                    primary={`${result.book} ${result.chapter}:${result.verse} `}
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {result.text.split(regex).map(highlightKeyword)}
                      </Typography>
                    }
                  />
                </ListItem>
              );
            })}
            <Box sx={{ height: "35px", whiteSpace: "nowrap" }}>{pageInfo}</Box>
          </List>
        ) : (
          <Typography sx={{ margin: "18px" }}>{message}</Typography>
        )}
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    versionBooks: state.local.versionBooks,
    versionSource: state.local.versionSource,
    sourceId: state.local.panel1.sourceId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) => {
      dispatch({ type: actions.SETVALUE1, name: name, value: value });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
