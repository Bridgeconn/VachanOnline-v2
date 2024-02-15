import React from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import { getAudioBibleObject } from "../common/utility";
import Setting from "../read/Setting";
import BookCombo from "../common/BookCombo";
import Version from "../common/Version";
import Bookmark from "../bookmark/Bookmark";
import { AUDIO } from "../../store/views";
import Tooltip from "@mui/material/Tooltip";
import { BLACK, GREY, WHITE } from "../../store/colorCode";
import Close from "../common/Close";
import ParallelScroll from "@mui/icons-material/ImportExport";
import ShareIcon from "@mui/icons-material/Share";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Help from "../common/Help";
import { Button, Menu, Snackbar } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";

const StyleDiv = styled("div")(({ theme }) => ({
  padding: 0,
  width: "30px",
  marginTop: "20px",
  marginRight: 2,
  color: "default",
  cursor: "pointer",
  [theme.breakpoints.only("sm")]: {
    width: "25px",
  },
}));

const MenuBar = (props) => {
  const theme = useTheme();
  let {
    setValue,
    paneNo,
    setFullscreen,
    versions,
    version,
    language,
    sourceId,
    chapter,
    verseData,
    versionBooks,
    versionSource,
    fontSize,
    fontFamily,
    lineView,
    isHoverVerse,
    bookCode,
    audio,
    userDetails,
    parallelView,
    printRef,
    printNotes,
    setPrintNotes,
    printHighlights,
    setPrintHighlights,
    mobileView,
    parallelScroll,
    toggleParallelScroll,
    errorMessage,
  } = props;
  const { t } = useTranslation();
  function goFull() {
    setFullscreen(true);
  }
  const [settingsAnchor, setSettingsAnchor] = React.useState(null);
  const [metadataList, setMetadataList] = React.useState("");
  const [audioBible, setAudioBible] = React.useState({});
  const [audioIcon, setAudioIcon] = React.useState("");
  const [bookmarkIcon, setBookmarkIcon] = React.useState("");
  const [bookDisplay, setBookDisplay] = React.useState("");
  const bookList = versionBooks[versionSource[sourceId]];
  const [shareAnchor, setShareAnchor] = React.useState(null);
  const [copyFeedback, setCopyFeedback] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState("");
  const open = Boolean(shareAnchor);
  const path = window.location.href;
  const location = useLocation();
  const route = location?.pathname;
  const url = route.startsWith("/read") ? "readBible" : "studyBible";
  React.useEffect(() => {
    if (bookList) {
      let book = bookList.find((element) => element.book_code === bookCode);
      if (book) {
        setBookDisplay(book.short);
      }
    }
  }, [bookList, bookCode, setBookDisplay]);

  //Set bookmark icon
  React.useEffect(() => {
    if (userDetails.uid !== null) {
      setBookmarkIcon(
        <Bookmark
          uid={userDetails.uid}
          sourceId={sourceId}
          bookCode={bookCode}
          chapter={chapter}
        />
      );
      return;
    }
    setBookmarkIcon("");
  }, [userDetails, sourceId, bookCode, chapter]);

  const closeAlert = () => {
    setAlert(false);
  };
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(path);
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
  //function to open and close settings menu
  function openSettings(event) {
    setSettingsAnchor(event.currentTarget);
  }
  function closeSettings() {
    setSettingsAnchor(null);
  }
  function openShareDialog(event) {
    setShareAnchor(event.currentTarget);
  }
  function closeShareDialog() {
    setShareAnchor(null);
  }
  //get metadata from versions object if version changed
  React.useEffect(() => {
    if (versions !== undefined) {
      const language = version.split("-");
      const languageVersions = versions.find(
        (e) => e.languageVersions[0].language.code === language[0].toLowerCase()
      );
      if (languageVersions !== undefined) {
        const versionObject = languageVersions.languageVersions.find(
          (e) => e.version.code.toUpperCase() === language[1].toUpperCase()
        );
        setValue("languageCode", versionObject.language.code);
        setMetadataList(versionObject.metadata);
      }
    }
  }, [setValue, version, versions]);
  React.useEffect(() => {
    setAudioBible(getAudioBibleObject(versions, sourceId));
  }, [versions, sourceId]);
  //if audioBible updated show audio bible icon if audio bible available
  React.useEffect(() => {
    const openAudioBible = () => {
      setValue("audio", !audio);
    };
    if (
      audioBible &&
      audioBible.url &&
      bookCode in audioBible.books &&
      parallelView !== AUDIO
    ) {
      setAudioIcon(
        <Tooltip title={t("audioBibleText")}>
          <StyleDiv onClick={openAudioBible}>
            <i className="material-icons md-23">volume_up</i>
          </StyleDiv>
        </Tooltip>
      );
    } else {
      setValue("audio", false);
      setAudioIcon("");
    }
  }, [audio, audioBible, bookCode, setValue, parallelView, t]);
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          paddingRight: { lg: 1.25, sm: 0.5, xs: 0.6875 },
          paddingLeft: { lg: 5.5, sm: 0.5, xs: 0.6875 },
          paddingY: 0,
          borderBottom: "1px solid #f1ecec",
          position: "absolute",
          height: 60,
          boxShadow: { lg: 0, xs: 1 },
          top: { lg: 72, sm: 61, xs: props.paneNo === 2 ? 0 : 60 },
          [theme.breakpoints.only("md")]: {
            padding: "0 10px 0 28px",
          },
        }}
      >
        <Box
          flexGrow={1}
          sx={{
            display: { lg: "block", md: "flex", xs: "flex" },
            alignItems: { lg: "flex-start", md: "center", xs: "center" },
          }}
        >
          <Version
            setValue={setValue}
            version={version}
            bookCode={bookCode}
            chapter={chapter}
            verseData={verseData}
            paneNo={paneNo}
            language={language}
          />
          {bookCode && errorMessage === "" ? (
            <BookCombo
              paneNo={paneNo}
              bookCode={bookCode}
              bookList={versionBooks[versionSource[sourceId]]}
              chapter={chapter}
              verseData={verseData}
              setValue={setValue}
              minimal={true}
            />
          ) : (
            ""
          )}
        </Box>
        {errorMessage === "" ? (
          <Box sx={{ display: "flex", marginLeft: { lg: 0, xs: -2 } }}>
            <StyleDiv>
              <Tooltip title={t("shareTooltip")}>
                <ShareIcon
                  fontSize="small"
                  sx={{ marginTop: "-4px" }}
                  onClick={openShareDialog}
                />
              </Tooltip>
              <Menu
                id="long-menu"
                anchorEl={shareAnchor}
                keepMounted
                open={open}
                onClose={closeShareDialog}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{
                  "& .MuiPaper-root": {
                    maxHeight: "150px",
                    marginTop: "20px",
                    width: "420px",
                    backgroundColor: WHITE,
                  },
                }}
              >
                <TextField
                  id="share-url"
                  size="small"
                  defaultValue={path}
                  sx={{ width: "96%", height: 40, margin: 1.25 }}
                  InputProps={{
                    readOnly: true,
                  }}
                  onFocus={(e) => e.target.select()}
                />
                <div>
                  <Button
                    sx={{
                      textTransform: "capitalize",
                      marginX: "auto",
                      marginY: 0,
                      display: "flex",
                      "&:hover": {
                        color: GREY,
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                      },
                      color: BLACK,
                      border: "1px solid rgba(0, 0, 0, 0.23)",
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
            </StyleDiv>
            {bookmarkIcon}
            {audioIcon}
            {parallelView ? (
              ""
            ) : (
              <Tooltip title={t("menuBarFullScreenToolTip")}>
                <StyleDiv onClick={goFull}>
                  <i className="material-icons md-23">zoom_out_map</i>
                </StyleDiv>
              </Tooltip>
            )}
            <Box
              sx={{
                padding: 0,
                width: "30px",
                marginTop: 2.5,
                marginLeft: -0.625,
                marginRight: -0.625,
                color: "default",
                cursor: "pointer",
              }}
              aria-label="More"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={openSettings}
            >
              <i className="material-icons md-23">settings</i>
            </Box>
            <Setting
              fontSize={fontSize}
              fontFamily={fontFamily}
              lineView={lineView}
              isHoverVerse={isHoverVerse}
              setValue={setValue}
              settingsAnchor={settingsAnchor}
              handleClose={closeSettings}
              printRef={printRef}
              printNotes={printNotes}
              setPrintNotes={setPrintNotes}
              printHighlights={printHighlights}
              setPrintHighlights={setPrintHighlights}
              bookDisplay={bookDisplay}
              chapter={chapter}
              paneNo={paneNo}
              metadataList={metadataList}
            />
            <Help
              iconStyle={{
                color: BLACK,
                marginTop: 2.375,
                marginRight: "2px",
                fontSize: 21,
              }}
              url={url}
            />
            {mobileView && paneNo === 1 ? (
              <Box
                sx={{
                  padding: 0,
                  width: 22,
                  marginTop: 1.875,
                  marginRight: 0.5,
                  color: "default",
                  cursor: "pointer",
                }}
                onClick={toggleParallelScroll}
              >
                {parallelScroll ? (
                  <Tooltip title={t("studyParallelScroll")}>
                    <ParallelScroll fontSize="large" style={{ color: BLACK }} />
                  </Tooltip>
                ) : (
                  <Tooltip title={t("studyParallelScrollDisabled")}>
                    <ParallelScroll fontSize="large" color="disabled" />
                  </Tooltip>
                )}
              </Box>
            ) : (
              ""
            )}
            {paneNo === 2 ? <Close /> : ""}
          </Box>
        ) : (
          ""
        )}
      </Box>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    versions: state.local.versions,
    versionBooks: state.local.versionBooks,
    userDetails: state.local.userDetails,
    versionSource: state.local.versionSource,
    parallelView: state.local.parallelView,
    mobileView: state.local.mobileView,
    parallelScroll: state.local.parallelScroll,
    errorMessage: state.local.errorMessage,
  };
};
export default connect(mapStateToProps)(MenuBar);
