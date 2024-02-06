import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Close from "../common/Close";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { connect } from "react-redux";
import * as views from "../../store/views";
import BookCombo from "../common/BookCombo";
import VideoCard from "../common/VideoCard";
import { useTranslation } from "react-i18next";
import { BLACK } from "../../store/colorCode";
import Help from "../common/Help";
import { bibleBooks } from "../../store/bibleData";
import parse from "html-react-parser";
import { styled } from "@mui/system";

const MessageStyle = styled("h5")({
  paddingLeft: 20,
});
const SignBible = (props) => {
  let {
    book,
    signBible,
    setValue,
    versions,
    versionBooks,
    versionSource,
    panel1,
    mobileView,
    parallelView,
  } = props;

  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [videos, setVideos] = useState();
  const [playing, setPlaying] = useState("");
  const { bookCode, chapter, sourceId } = panel1;
  const theme = useTheme();
  const mobileLandscape = useMediaQuery(theme.breakpoints.down("md"));
  const heading = mobileLandscape ? t("ISLVTopBarBtnTab") : t("ISLVBibleText");
  function getBooks(bookName) {
    let books = Object.keys(signBible?.books);
    const filterByName = (item) => books?.includes(item?.book_code);
    return bookName.filter(filterByName);
  }
  const availableBible = bibleBooks?.filter((e) => {
    return signBible?.length !== 0
      ? Object.keys(signBible["books"]).includes(e.abbreviation, e.book)
      : null;
  });
  const avlBookNames = availableBible?.map((i) => {
    return i.book;
  });
  useEffect(() => {
    if (versions.length > 0) {
      //Set default version to english for ISL
      let version = versions[0].languageVersions[0];
      try {
        version = versions
          .find((e) => e.language === "english")
          .languageVersions.find((e) => e.version.code === "ESV");
        if (version) {
          setValue(
            "version",
            version.language.code + "-" + version.version.code.toUpperCase()
          );
          setValue("sourceId", version.sourceId);
          setValue("versionCode", version.version.code.toLowerCase());
        }
      } catch (e) {
        //English ESV version not available
      }
    }
  }, [setValue, versions]);
  useEffect(() => {
    if (signBible && bookCode) {
      let books = signBible["books"];
      //Available book and chapter
      if (
        books &&
        books.hasOwnProperty(bookCode) &&
        books[bookCode].hasOwnProperty(chapter)
      ) {
        setVideos(books[bookCode][chapter]);
        setMessage("");
        //available books and unavailable chapter
      } else if (
        books &&
        books.hasOwnProperty(bookCode) &&
        !books[bookCode].hasOwnProperty(chapter)
      ) {
        const ref = {
          book: book,
          chapters: Object.keys(signBible["books"][bookCode]).length,
        };
        setVideos();
        setMessage(t("signLangNotAvailableMsg1", { ref }));
        //unavailable book and chapter
      } else {
        setVideos();
        setMessage(
          t("signLangNotAvailableMsg2", {
            bookList: `<ul>${avlBookNames
              .map((avlBookNames) => `<li>${avlBookNames}</li>`)
              .join(" ")}
                  </ul>`,
          })
        );
        setPlaying();
      }
    }
  }, [signBible, bookCode, chapter, book, t, avlBookNames]);
  return (
    <Box
      sx={{
        width: "100%",
        position: "absolute",
        top: { lg: 72, xs: parallelView === "DRAWERSIGNBIBLE" ? 60 : 0 },
        bottom: 0,
      }}
    >
      <Box
        sx={{
          borderBottom: "1px solid #f1ecec",
          display: "flex",
          width: "100%",
          paddingBottom: { lg: 1.5, xs: 0 },
          paddingLeft: 4.375,
          marginBottom: 2.5,
          height: 60,
          alignItems: "center",
        }}
      >
        <Box flexGrow={1}>
          <Typography variant="h6">{heading}</Typography>
        </Box>
        <Box flexGrow={1}>
          {mobileView && parallelView === views.DRAWERSIGNBIBLE ? (
            <BookCombo
              bookCode={bookCode}
              chapter={chapter}
              setValue={setValue}
              bookList={getBooks(versionBooks[versionSource[sourceId]])}
              minimal={true}
            />
          ) : (
            <Typography variant="h6">
              {book} {chapter}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Help
            iconStyle={{ color: BLACK, marginTop: 0.625, fontSize: 21 }}
            url={"signLanguageBible"}
          />
          <Close className={{ marginRight: 1.875, marginTop: 0.875 }} />
        </Box>
      </Box>
      <Box
        sx={{
          top: 60,
          bottom: -16,
          overflow: "scroll",
          position: "absolute",
          width: "100%",
          paddingTop: 1.5,
          paddingRight: 1.25,
          paddingBottom: 1.875,
          paddingLeft: 1.25,
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
        }}
      >
        <>
          {videos &&
            videos?.map((video, i) => {
              return (
                <VideoCard
                  key={i}
                  video={video}
                  playing={playing}
                  setPlaying={setPlaying}
                />
              );
            })}
          {message && <MessageStyle>{parse(message)}</MessageStyle>}
        </>
      </Box>
    </Box>
  );
};
const mapStateToProps = (state) => {
  return {
    versionBooks: state.local.versionBooks,
    versionSource: state.local.versionSource,
    mobileView: state.local.mobileView,
    parallelView: state.local.parallelView,
    signBible: state.local.signBible,
  };
};
export default connect(mapStateToProps)(SignBible);
