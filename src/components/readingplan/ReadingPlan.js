import React, { useState, useMemo, useEffect } from "react";
import Calendar from "react-calendar";
import DateCalendar from "react-date-picker";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Close from "../common/Close";
import Box from "@material-ui/core/Box";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Select from "react-select";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const BigTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#ffd580",
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[4],
    border: "1px solid orange",
    fontSize: 16,
  },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 82,
  },
  main: {
    top: 134,
    bottom: 0,
    paddingTop: 30,
    overflow: "scroll",
    position: "absolute",
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
      width: "100%",
      padding: 10,
    },
  },
  container: {
    width: "100%",
    marginTop: 60,
    [theme.breakpoints.only("xs")]: {
      marginTop: 0,
    },
  },
  refBox: {
    [theme.breakpoints.only("xs")]: {
      display: "flex",
    },
  },
  heading: {
    paddingBottom: 10,
    paddingLeft: 15,
    borderBottom: "1px solid #f1ecec",
    display: "flex",
    width: "100%",
    height: "2.75em",
    [theme.breakpoints.only("xs")]: {
      paddingBottom: "3.5rem",
    },
  },
  calendar: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
    [theme.breakpoints.down("sm")]: { width: "80%" },
  },
  message: {
    margin: 18,
  },
  listItem: {
    borderBottom: "1px solid lightgray",
  },
  title: {
    paddingLeft: 35,
    paddingBottom: 12,
    marginBottom: 20,
    borderBottom: "1px solid #f1ecec",
    display: "flex",
    width: "100%",
  },
  refText: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "1rem",
    },
  },
  select: {
    width: 200,
  },
  closeButton: {
    marginTop: 7,
    marginRight: 15,
  },
  loading: {
    paddingLeft: 20,
  },
}));

const ReadingPlan = (props) => {
  const classes = useStyles();
  const { setValue1, bookList, mobileView, readingPlans } = props;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState("");
  const [planData, setPlanData] = useState("");
  const [readingList, setReadingList] = useState([]);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = React.useState(false);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const getBookText = (dataRef, text) => {
    let ref = dataRef.split(" ");
    let book = bookList.find((element) => element.book_code === ref[0]);
    let verse = text.split(":")[1];

    if (verse) {
      verse = ":" + verse;
    } else {
      verse = "";
    }
    return book ? book.short + " " + ref[1] + verse : "";
  };

  //Open reference
  const openChapter = (event) => {
    let element = event.currentTarget;
    let ref = element.getAttribute("data-ref").split(" ");
    let book = bookList.find((element) => element.book_code === ref[0]);
    if (book) {
      setValue1("versesSelected", []);
      setValue1("bookCode", ref[0]);
      setValue1("chapter", parseInt(ref[1]));
    }
  };

  const API = useMemo(
    () => axios.create({ baseURL: process.env.REACT_APP_BIBLE_PLANS_URL }),
    []
  );
  useEffect(() => {
    if (readingPlans) {
      setPlans(readingPlans);
      setPlan(readingPlans[0]);
    }
  }, [readingPlans]);

  useEffect(() => {
    if (plan) {
      setLoading(true);
      API.get(plan.value).then(function (response) {
        setPlanData(response.data);
        setLoading(false);
      });
    }
  }, [API, plan]);

  useEffect(() => {
    if (planData.length !== 0) {
      const month = String(selectedDate.getMonth() + 1);
      const day = String(selectedDate.getDate());
      const readingDay = month.padStart(2, "0") + "-" + day.padStart(2, "0");
      const daysPlan = planData.find(({ date }) => date === readingDay);
      setReadingList(daysPlan ? daysPlan.reading : []);
    }
  }, [planData, selectedDate]);

  return (
    <div className={classes.root}>
      <Box className={classes.title}>
        <Box flexGrow={1}>
          <Typography variant="h6"> {mobile ? "" : "Reading Plans"}</Typography>
        </Box>
        <Box flexGrow={1}>
          {plan ? (
            <Select
              className={classes.select}
              defaultValue={plan}
              onChange={(data) => setPlan(data)}
              options={plans}
              isSearchable={false}
            />
          ) : (
            ""
          )}
        </Box>
        <Box>
          <Close className={classes.closeButton} />
        </Box>
      </Box>
      <Box className={classes.main}>
        {mobileView ? null : (
          <Calendar
            className={classes.calendar}
            onChange={(date) => setSelectedDate(date)}
            value={selectedDate}
          />
        )}
        <div className={classes.container}>
          <Box className={classes.heading}>
            <Box flexGrow={1} className={classes.refBox}>
              <Typography variant="h6" className={classes.refText}>
                {(mobile ? "References" : "Bible references") +
                  " for " +
                  selectedDate.getDate() +
                  "-" +
                  months[selectedDate.getMonth()] +
                  "-" +
                  selectedDate.getFullYear()}
              </Typography>
              {mobileView ? (
                <DateCalendar
                  className={classes.calendar}
                  onChange={(date) => setSelectedDate(date)}
                  value={selectedDate}
                />
              ) : null}
            </Box>
          </Box>
          <div>
            {loading ? (
              <h3 className={classes.loading}>Loading</h3>
            ) : readingList.length !== 0 ? (
              <List component="nav">
                {readingList.map((reading, i) => {
                  const bookText = getBookText(reading.ref, reading.text);
                  return bookText ? (
                    <ListItem key={i} className={classes.listItem} button>
                      <ListItemText
                        primary={bookText}
                        data-ref={reading.ref}
                        onClick={(e) => openChapter(e)}
                      />
                    </ListItem>
                  ) : (
                    <BigTooltip
                      key={i}
                      title="The book you selected is not available in this language, please select another language"
                      placement="top-start"
                    >
                      <span>
                        <ListItem key={i} className={classes.listItem} button>
                          <Button
                            aria-label="Book not available"
                            style={{
                              textTransform: "none",
                              marginLeft: "-8px",
                            }}
                            disabled
                            endIcon={<ErrorOutlineIcon />}
                          >
                            {reading.text}
                          </Button>
                        </ListItem>
                      </span>
                    </BigTooltip>
                  );
                })}
              </List>
            ) : (
              <Typography className={classes.message}>
                No reading plan available for this date.
              </Typography>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
};
export default ReadingPlan;
