import React, { useState, useMemo, useEffect } from "react";
import Calendar from "react-calendar";
import Close from "../common/Close";
import Box from "@mui/material/Box";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Select from "react-select";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { BLACK, GREY } from "../../store/colorCode";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import Help from "../common/Help";
import { styled } from "@mui/system";
import { ListItemButton } from "@mui/material";

const BigTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffd580",
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[4],
    border: "1px solid orange",
    fontSize: 16,
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  width: 200,
  padding: "0 15px",
  [theme.breakpoints.only("xs")]: {
    width: 190,
    padding: "0 15px",
  },
}));

const StyledDatePicker = styled(ReactDatePicker)(({ theme }) => ({
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  width: "50%",
  [theme.breakpoints.down("sm")]: { width: 120, marginTop: 6 },
}));

const StyledCalendar = styled(Calendar)(({ theme }) => ({
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  width: "50%",
  [theme.breakpoints.down("sm")]: { width: 120, marginTop: 6 },
}));

const Heading = styled("h3")({ paddingLeft: 20 });

const ReadingPlan = (props) => {
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
      sx={{
        [`&.MuiButton-root`]: {
          textTransform: "capitalize",
          backgroundColor: "#fff",
        },
        color: BLACK,
      }}
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
    <Box sx={{ width: "100%", marginTop: { lg: 10.125, sm: 8.75, xs: 0.625 } }}>
      <Box
        sx={{
          paddingLeft: { lg: 4.375, xs: 1.875 },
          paddingBottom: 1.5,
          marginBottom: 2.5,
          borderBottom: "1px solid #f1ecec",
          display: "flex",
          width: "100%",
          boxShadow: { lg: 0, xs: 1 },
        }}
      >
        <Box flexGrow={1}>
          {mobileView ? null : (
            <Typography variant="h6"> {t("readingPlansText")}</Typography>
          )}
        </Box>
        <Box flexGrow={1}>
          {plan ? (
            <Box sx={{ display: { lg: "block", xs: "flex" } }}>
              <StyledSelect
                defaultValue={plan}
                onChange={(data) => setPlan(data)}
                options={plans}
                isSearchable={false}
              />
              {mobileView ? (
                <StyledDatePicker
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
            </Box>
          ) : (
            ""
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Help
            iconStyle={{
              color: BLACK,
              marginTop: 0.625,
              fontSize: 21,
            }}
            url={"readingPlans"}
          />
          <Close
            className={{ marginTop: 0.875, marginRight: { lg: 1.875, xs: 0 } }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          top: { lg: 134, sm: 123, xs: 57 },
          bottom: 0,
          paddingTop: { md: 3.75, sm: 0, xs: 0 },
          paddingRight: { xs: 0 },
          paddingBottom: { xs: 0.625 },
          paddingLeft: { xs: 0.625 },
          overflow: "auto",
          position: "absolute",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0,0,0,.4) #eeeeee95",
          width: "100%",
          "-webkit-scrollbar": {
            width: "0.45em",
          },
          "-webkit-scrollbar-track": {
            WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.4)",
            outline: "1px solid slategrey",
          },
        }}
      >
        {mobileView ? null : (
          <StyledCalendar
            onChange={(date) => setSelectedDate(date)}
            value={selectedDate}
          />
        )}
        <Box sx={{ width: "100%", marginTop: { md: 7.5, sm: 0 } }}>
          <Box
            sx={{
              paddingBottom: 1.25,
              paddingLeft: 1.875,
              borderBottom: "1px solid #f1ecec",
              display: { md: "flex", xs: "none" },
              width: "100%",
              height: "2.75em",
            }}
          >
            <Box flexGrow={1} sx={{ display: { lg: "block", xs: "flex" } }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.25rem",
                }}
              >
                {t("readingPlanBibleRef", { ref })}
              </Typography>
            </Box>
          </Box>
          <>
            {loading ? (
              <Heading>Loading</Heading>
            ) : readingList.length !== 0 ? (
              <List
                component="nav"
                sx={{
                  bottom: 50,
                  top: 0,
                }}
              >
                {readingList.map((reading, i) => {
                  const bookText = getBookText(reading.ref, reading.text);
                  return bookText ? (
                    <ListItemButton
                      key={i}
                      sx={{ borderBottom: "1px solid lightgray" }}
                    >
                      <ListItemText
                        primary={bookText}
                        data-ref={reading.ref}
                        onClick={(e) => openChapter(e)}
                      />
                    </ListItemButton>
                  ) : (
                    <BigTooltip
                      key={i}
                      title={t("readingPlanBookNotAvailableToolTip")}
                      arrow
                    >
                      <span>
                        <ListItem
                          key={i}
                          sx={{ borderBottom: "1px solid lightgray" }}
                        >
                          <Button
                            aria-label="Book not available"
                            sx={{
                              textTransform: "none",
                              marginLeft: -1,
                            }}
                            disabled
                            endIcon={<ErrorOutlineIcon />}
                          >
                            {reading.text}
                          </Button>
                          {mobileView ? (
                            <Typography
                              sx={{
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
              <Typography sx={{ margin: 2.25 }}>
                {t("noReadingPlanAvailable")}
              </Typography>
            )}
          </>
        </Box>
      </Box>
    </Box>
  );
};
export default ReadingPlan;
