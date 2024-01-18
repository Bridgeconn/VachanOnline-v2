import React from "react";
import { makeStyles } from "@mui/styles";
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 78,
    [theme.breakpoints.only("xs")]: {
      marginTop: 4,
    },
    [theme.breakpoints.only("sm")]: {
      marginTop: 66,
    },
  },
  heading: {
    display: "flex",
    paddingBottom: 6,
    paddingLeft: 15,
    borderBottom: "1px solid #f1ecec",
    [theme.breakpoints.down("md")]: {
      boxShadow: theme.shadows[1],
    },
  },
  list: {
    position: "absolute",
    right: 0,
    left: 0,
    top: 135,
    bottom: 0,
    overflow: "scroll",
    marginBottom: -15,
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(0,0,0,.4) #eeeeee95",
    "&::-webkit-scrollbar": {
      width: "0.45em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.4)",
      outline: "1px solid slategrey",
    },
    [theme.breakpoints.only("xs")]: {
      top: 60,
      paddingBottom: 10,
    },
    [theme.breakpoints.only("sm")]: {
      top: 122,
      paddingBottom: 10,
    },
  },
  message: {
    margin: 18,
  },
  listHeading: {
    borderBottom: "1px solid darkgray",
    fontWeight: 600,
  },
  listItem: {
    borderBottom: "1px solid lightgray",
  },
  searchBox: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "98%",
  },
  searchField: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  searchTitle: {
    textAlign: "center",
  },
  searchButton: {
    padding: 10,
  },
  reference: {
    fontWeight: 600,
  },
  keyword: {
    fontWeight: 600,
    fontSize: "1.1em",
  },
  searchHeading: {
    fontWeight: 600,
    fontSize: "1.2em",
    position: "relative",
    bottom: 2,
    [theme.breakpoints.down("md")]: {
      bottom: 20,
    },
  },
  pagination: {
    height: 35,
    whiteSpace: "nowrap",
  },
  pageDisplay: {
    position: "absolute",
    right: 10,
    [theme.breakpoints.down("md")]: {
      right: "unset",
      left: 5,
      bottom: 1,
    },
  },
  pageInfo: {
    display: "inline-block",
    fontSize: 15,
    padding: "5px 10px",
  },
  pageCount: {
    display: "inline-block",
  },
  closeButton: {
    marginRight: 15,
    marginTop: 11,
  },
  box: {
    display: "flex",
    alignItems: "center",
  },
  helpIcon: {
    padding: "8px 12px 0",
    color: BLACK,
    marginTop: 10,
    fontSize: 21,
  },
}));

const Search = (props) => {
  const classes = useStyles();

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
        <span className={classes.pageDisplay}>
          <span className={classes.pageInfo}>
            {start} - {end} of {Number(total).toLocaleString()}
          </span>
          {total > 100 ? (
            <Pagination
              count={Math.ceil(total / 100)}
              page={page}
              onChange={pageChange}
              className={classes.pageCount}
            />
          ) : (
            ""
          )}
        </span>
      );
    } else {
      setPageData("");
      setPageInfo("");
    }
  }, [searchResult, page, classes]);

  //search result changed
  React.useEffect(() => {
    if (searchResult && searchResult.result && searchResult.result.length) {
      setRegex(new RegExp(`(${searchResult.keyword})`, "i"));
      setPage(1);
    } else if (searchResult.keyword) {
      setMessage(
        <span>
          {t("studyNoSearchResult")}{" "}
          <span className={classes.keyword}>{searchResult.keyword}</span>
        </span>
      );
    }
  }, [searchResult, classes, t]);

  //set keyword bold
  const highlightKeyword = (versePart, index) => {
    let className =
      versePart.localeCompare(searchResult.keyword, undefined, {
        sensitivity: "base",
      }) === 0
        ? classes.keyword
        : "";
    return (
      <span key={index} className={className}>
        {versePart}
      </span>
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
    <div className={classes.root}>
      <Box className={classes.heading}>
        <Box flexGrow={1}>
          <Paper
            component="form"
            className={classes.searchBox}
            onSubmit={search}
          >
            <InputBase
              className={classes.searchField}
              placeholder={t("studyEnterSearchText")}
              inputProps={{ "aria-label": "enter search text" }}
              value={searchText}
              onChange={handleSearchTextChange}
            />
            <IconButton
              type="submit"
              className={classes.searchButton}
              aria-label="search"
              onClick={search}
              size="large"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
        <Box className={classes.box}>
          <Help iconStyle={classes.helpIcon} url={"searchBible"} />
          <Close className={classes.closeButton} />
        </Box>
      </Box>
      <div className={classes.list}>
        {pageData && pageData.length ? (
          <List component="nav">
            <ListItem className={classes.listHeading}>
              <Typography variant="h6" className={classes.searchTitle}>
                <span className={classes.searchHeading}>
                  {searchResult.keyword}
                </span>
                {pageInfo}
              </Typography>
            </ListItem>
            {pageData.map((result, i) => {
              return (
                <ListItem
                  key={i}
                  className={classes.listItem}
                  data-bookcode={result.bookCode}
                  data-chapter={result.chapter}
                  data-verse={result.verse}
                  onClick={openReference}
                  button
                >
                  <ListItemText
                    classes={{ primary: classes.reference }}
                    primary={`${result.book} ${result.chapter}:${result.verse} `}
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {result.text.split(regex).map(highlightKeyword)}
                      </Typography>
                    }
                  />
                </ListItem>
              );
            })}
            <div className={classes.pagination}>{pageInfo}</div>
          </List>
        ) : (
          <Typography className={classes.message}>{message}</Typography>
        )}
      </div>
    </div>
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
