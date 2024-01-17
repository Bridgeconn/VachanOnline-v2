import React, { useState, useMemo, useEffect } from "react";
import Calendar from "react-calendar";
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import Close from "../common/Close";
import Box from "@mui/material/Box";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Select from "react-select";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { BLACK, GREY } from "../../store/colorCode";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import Help from "../common/Help";

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
    [theme.breakpoints.only("xs")]: {
      marginTop: 5,
    },
    [theme.breakpoints.only("sm")]: {
      marginTop: 70,
    },
  },
  main: {
    top: 134,
    bottom: 0,
    paddingTop: 30,
    overflow: "auto",
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
      padding: "0 5px",
      top: 57,
    },
    [theme.breakpoints.only("sm")]: {
      width: "100%",
      top: 123,
      paddingTop: 0,
    },
  },
  container: {
    width: "100%",
    marginTop: 60,
    [theme.breakpoints.down('md')]: {
      marginTop: 0,
    },
  },
  refBox: {
    [theme.breakpoints.down('md')]: {
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
    [theme.breakpoints.down('md')]: {
      display: "none",
    },
  },
  calendar: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
    [theme.breakpoints.down('md')]: { width: 120, marginTop: 6 },
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
    [theme.breakpoints.down('md')]: {
      boxShadow: theme.shadows[1],
      paddingLeft: 15,
    },
  },
  refText: {
    [theme.breakpoints.down('md')]: {
      fontSize: "1rem",
      marginRight: 5,
    },
  },
  select: {
    width: 200,
    [theme.breakpoints.down('lg')]: {
      width: 150,
      padding: "0 15px",
    },
    [theme.breakpoints.only("xs")]: {
      width: 200,
      padding: "0 15px",
    },
  },
  closeButton: {
    marginTop: 7,
    marginRight: 15,
  },
  box: {
    display: "flex",
    alignItems: "center",
  },
  helpIcon: {
    padding: "8px 12px 0",
    color: BLACK,
    marginTop: 5,
    fontSize: 21,
  },
  dateContainer: {
    display: "flex",
  },
  loading: {
    paddingLeft: 20,
  },
  list: {
    [theme.breakpoints.down('md')]: {
      bottom: 50,
      top: 0,
    },
  },
  date: {
    textTransform: "capitalize",
    backgroundColor: "#fff",
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
  const [loading, setLoading] = React.useState(false);

  const { t } = useTranslation();

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
  const ref = {
    date: selectedDate.getDate(),
    month: months[selectedDate.getMonth()],
    year: selectedDate.getFullYear(),
  };
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

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <Button
      aria-haspopup="true"
      variant="contained"
      onClick={onClick}
      ref={ref}
      classes={{ root: classes.date }}
    >
      {value}
    </Button>
  ));
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
          {mobileView ? null : (
            <Typography variant="h6"> {t("readingPlansText")}</Typography>
          )}
        </Box>
        <Box flexGrow={1}>
          {plan ? (
            <div className={mobileView ? classes.dateContainer : null}>
              <Select
                className={classes.select}
                defaultValue={plan}
                onChange={(data) => setPlan(data)}
                options={plans}
                isSearchable={false}
              />
              {mobileView ? (
                <ReactDatePicker
                  className={classes.calendar}
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  withPortal
                  todayButton="Today"
                  dateFormat="dd MMM"
                  showMonthDropdown
                  minDate={new Date(new Date().getFullYear(), 0, 1)}
                  maxDate={new Date(new Date().getFullYear(), 11, 31)}
                  customInput={<CustomInput />}
                />
              ) : null}
            </div>
          ) : (
            ""
          )}
        </Box>
        <Box className={classes.box}>
          <Help iconStyle={classes.helpIcon} url={"readingPlans"} />
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
                {t("readingPlanBibleRef", { ref })}
              </Typography>
            </Box>
          </Box>
          <>
            {loading ? (
              <h3 className={classes.loading}>Loading</h3>
            ) : readingList.length !== 0 ? (
              <List component="nav" className={classes.list}>
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
                      title={t("readingPlanBookNotAvailableToolTip")}
                      arrow
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
                          {mobileView ? (
                            <Typography
                              style={{
                                color: GREY,
                                fontSize: "0.9rem",
                                float: "right",
                              }}
                            >
                              {t("readingPlanBookNotAvailableMob")}
                            </Typography>
                          ) : null}
                        </ListItem>
                      </span>
                    </BigTooltip>
                  );
                })}
              </List>
            ) : (
              <Typography className={classes.message}>
                {t("noReadingPlanAvailable")}
              </Typography>
            )}
          </>
        </div>
      </Box>
    </div>
  );
};
export default ReadingPlan;
