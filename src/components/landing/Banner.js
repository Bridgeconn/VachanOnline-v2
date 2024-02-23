import React, { useEffect, useState } from "react";
import axios from "axios";
import banner from "../common/images/banner.jpg";
import { API } from "../../store/api";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions";
import { useTranslation } from "react-i18next";
import BigTooltip from "../common/BigTooltip";
import { languageCode } from "../../store/languageData";
import { BLACK, WHITE } from "../../store/colorCode";
import ShareIcon from "@mui/icons-material/Share";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import { Button, Menu, Snackbar, TextField } from "@mui/material";
import { Alert } from "@mui/material";
import { capitalize } from "../common/utility";
import { styled } from "@mui/system";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Heading = styled("h3")(({ theme }) => ({
  position: "absolute",
  top: 72,
  color: WHITE,
  fontWeight: 800,
  fontFamily: "Sans",
  fontSize: "1.2rem",
  textShadow: "1px 1px 2px " + BLACK,
  background: BLACK + "50",
  borderRadius: 10,
  padding: "4px 15px",
  [theme.breakpoints.down("sm")]: {
    top: 70,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.1rem",
  },
}));

const StyledLink = styled(Link)(() => ({
  color: WHITE,
  marginTop: 5,
  padding: 10,
  background: BLACK + "50",
  display: "inline-block",
  borderRadius: 10,
  "&:hover": {
    color: WHITE,
    textDecoration: "none",
    background: BLACK + "60",
    boxShadow: "0 0 2px " + BLACK,
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "80px",
  width: "85%",
  fontSize: "1.25rem",
  fontFamily: "Roboto Slab",
  textAlign: "center",
  transition: "opacity 0.35s ease-in-out",
  background: "none",
  top: "105px",
  [theme.breakpoints.only("md")]: {
    width: "80%",
    fontSize: "1.2rem",
  },
  [theme.breakpoints.down("sm")]: {
    top: "100px",
    width: "90%",
    fontSize: "1.1rem",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "1rem",
  },
}));

const VerseText = styled(Box)(() => ({
  display: "-webkit-box",
  WebkitLineClamp: 3,
  textOverflow: "ellipsis",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
}));

const ContainerBox = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  height: "300px",
  backgroundImage: `url(${banner})`,
  backgroundRepeat: "round",
  display: "flex",
  justifyContent: "center",
}));

const Banner = ({ setValue1, locale, versions, versionBooks }) => {
  const theme = useTheme();
  const langCode = languageCode[locale].code;
  const [allVerseData, setAllVerseData] = useState();
  const [verseRef, setVerseRef] = useState({
    b: "psa",
    c: "119",
    v: "105",
  });
  const [sourceId, setSourceId] = useState("");
  const [verseObj, setVerseObj] = useState({});
  const [book, setBook] = useState("");
  const [shareAnchor, setShareAnchor] = React.useState(null);
  const [copyFeedback, setCopyFeedback] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState("");
  const open = Boolean(shareAnchor);
  const versionCode = versions.find(
    (e) => e?.languageVersions[0]?.language?.code === langCode
  )?.languageVersions[0]?.version?.code;
  const version = capitalize(langCode + "-" + versionCode);
  const verseOfTheDayRef = book
    ? `${book} ${verseObj.chapterNumber}:${verseObj.verseNumber} ` + version
    : "";
  const verseOfTheDayText = verseObj ? verseObj.verseContent?.text : "";
  const refVersionData =
    verseOfTheDayRef?.split(" ")[2]?.split("-")[0].toLowerCase() +
    "-" +
    verseOfTheDayRef?.split(" ")[2]?.split("-")[1];
  const refBCVData = verseRef?.b + "." + verseRef?.c + "." + verseRef?.v;
  const path =
    window.location.href +
    "read?version=" +
    refVersionData +
    "&reference=" +
    refBCVData;
  const textContent =
    verseOfTheDayRef + "\n" + verseOfTheDayText + "\n\n" + path;
  function openShareDialog(event) {
    setShareAnchor(event.currentTarget);
  }
  function closeShareDialog() {
    setShareAnchor(null);
  }
  const closeAlert = () => {
    setAlert(false);
  };
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(textContent);
      setAlert(true);
      setCopyFeedback(t("clipBoardCopied"));
      setAlertType("success");
      closeShareDialog();
    } catch (err) {
      console.error("Unable to copy to clipboard.", err);
      setAlert(true);
      setCopyFeedback(t("clipBoardCopiedFailed"));
      setAlertType("error");
      closeShareDialog();
    }
  };
  useEffect(() => {
    if (process.env.REACT_APP_DAILY_VERSE) {
      const APIBASE = axios.create({
        baseURL: process.env.REACT_APP_DAILY_VERSE,
      });
      APIBASE.get("verseData.json").then(function (response) {
        setAllVerseData(response?.data);
      });
    }
  }, []);
  useEffect(() => {
    let newDate = new Date();
    const currentYear = newDate?.getFullYear();
    const currentMonth = newDate?.getMonth() + 1;
    const currentDay = newDate?.getDate();
    if (allVerseData) {
      setVerseRef(allVerseData[currentYear][currentMonth][currentDay]);
    }
  }, [allVerseData]);

  useEffect(() => {
    const sourceId = versions.find(
      (e) => e?.languageVersions[0]?.language?.code === langCode
    )?.languageVersions[0]?.sourceId;
    setSourceId(sourceId);
  }, [langCode, versions]);
  useEffect(() => {
    const books = versionBooks[langCode];
    if (verseObj?.bibleBookCode) {
      const book = books?.find((i) => i.book_code === verseObj.bibleBookCode);
      setBook(book?.short);
    }
  }, [langCode, verseObj.bibleBookCode, versionBooks]);
  useEffect(() => {
    if (sourceId && verseRef) {
      const book = verseRef ? verseRef?.b : "psa";
      const chapter = verseRef ? verseRef?.c : "119";
      const verse = verseRef ? verseRef?.v : "105";
      API.get(`bibles/${sourceId}/verses/${book}.${chapter}.${verse}`).then(
        (response) => {
          setVerseObj(response.data);
        }
      );
    }
  }, [sourceId, verseRef]);
  const setURL = () => {
    setValue1("bookCode", verseRef?.b);
    setValue1("chapter", verseRef?.c);
    setValue1("verseData", verseRef?.v);
  };
  const { t } = useTranslation();
  return (
    <ContainerBox>
      <Heading>
        {t("landingVerseHeading")}
        <BigTooltip title={t("shareVerseOfTheDayTooltip")} placement="right">
          <ShareIcon
            fontSize="small"
            onClick={openShareDialog}
            sx={{
              color: WHITE,
              cursor: "pointer",
              textShadow: "1px 1px 2px " + BLACK,
              marginTop: "-1px",
              marginLeft: "8px",
            }}
          />
        </BigTooltip>
        <Menu
          id="long-menu"
          anchorEl={shareAnchor}
          keepMounted
          open={open}
          onClose={closeShareDialog}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{
            "& .MuiMenu-paper": {
              maxHeight: "450px",
              marginTop: "6px",
              width: "420px",
              alignItems: "left",
              paddingLeft: "12px",
            },
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              id="share-url"
              variant="outlined"
              size="small"
              value={textContent}
              sx={{
                width: "94%",
                margin: "7px",
                color: WHITE,
              }}
              multiline
              InputProps={{
                readOnly: true,
              }}
              onFocus={(e) => e.target.select()}
            />
            <Button
              sx={{
                textTransform: "capitalize",
                margin: "10px auto",
                color: BLACK,
                borderColor: BLACK,
                "&:hover": {
                  backgroundColor: BLACK + "0a",
                  border: "1px solid rgba(0, 0, 0, 0.23)",
                },
              }}
              variant="outlined"
              onClick={handleCopyClick}
              startIcon={<FileCopyOutlinedIcon />}
            >
              {t("copyToClipBoardBtn")}
            </Button>
          </div>
        </Menu>
        <Snackbar
          open={alert}
          autoHideDuration={800}
          onClose={closeAlert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={closeAlert}
            severity={alertType}
          >
            {copyFeedback}
          </Alert>
        </Snackbar>
      </Heading>
      <StyledBox>
        <BigTooltip
          title={t("landingVerseHeadingToolTip")}
          placement="bottom-end"
        >
          <StyledLink to={{ pathname: "/read" }} onClick={() => setURL()}>
            <VerseText>{verseObj ? verseObj.verseContent?.text : ""}</VerseText>
            <Box
              sx={{
                fontStyle: "italic",
                fontSize: "1rem",
                color: WHITE,
                [theme.breakpoints.down("xs")]: {
                  fontSize: "0.9rem",
                },
              }}
            >
              {book
                ? `${book} ${verseObj.chapterNumber}:${verseObj.verseNumber}`
                : ""}
            </Box>
          </StyledLink>
        </BigTooltip>
      </StyledBox>
    </ContainerBox>
  );
};
const mapStateToProps = (state) => {
  return {
    versions: state.local.versions,
    locale: state.local.locale,
    versionBooks: state.local.versionBooks,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setValue1: (name, value) =>
      dispatch({ type: actions.SETVALUE1, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Banner);
