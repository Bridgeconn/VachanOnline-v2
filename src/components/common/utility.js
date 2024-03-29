import { Box } from "@mui/material";
import {
  readingPlanAPI,
  signBibleAPI,
  API,
  chapterVideoAPI,
  languageDataAPI,
  obsDataAPI,
} from "../../store/api";
import { bibleBooks, bibleChapters } from "../../store/bibleData";
import {
  punctPattern1,
  punctPattern2,
  verseCarryingMarkers,
} from "../../store/usfm";

//Function to get the bible versions
export const getVersions = (
  setVersions,
  setPaneValue,
  setVersionBooks,
  setValue,
  _version,
  _bookCode,
  _chapter,
  _verseData
) => {
  API.get("bibles")
    .then(function (response) {
      const versions = response.data
        .map((obj) => {
          let language = { language: obj.language, languageVersions: [] };
          for (let i in obj.languageVersions) {
            let metadata = obj.languageVersions[i].metadata;
            if (metadata && metadata.Latest === "True") {
              language.languageVersions.push(obj.languageVersions[i]);
            } else {
            }
          }
          return language;
        })
        .filter((obj) => obj.languageVersions.length > 0);
      setVersions(versions);
      if (versions.length > 0) {
        let version = versions[0].languageVersions[0];
        try {
          const langCode = _version?.split("-")[0] || "hin";
          const versionCode = _version?.split("-")[1] || "IRV";
          version = versions
            .find((e) => e?.languageVersions[0]?.language?.code === langCode)
            .languageVersions.find(
              (e) => e.version.code?.toUpperCase() === versionCode
            );
          if (version === undefined) {
            version = versions[0].languageVersions[0];
          }
        } catch (e) {
          // last read or hindi IRV version not available use first versions
        }
        setPaneValue(
          "version",
          version?.language?.code + "-" + version?.version?.code.toUpperCase()
        );
        setPaneValue("sourceId", version.sourceId);
        setUserSettings(setPaneValue);
        getAllBooks(
          setVersionBooks,
          setPaneValue,
          setValue,
          _bookCode,
          _chapter,
          _verseData
        );
        let versionSource = {};
        for (let lang of versions) {
          for (let ver of lang.languageVersions) {
            versionSource[ver.sourceId] = ver.language.code;
          }
        }
        setValue("versionSource", versionSource);
        setPaneValue("language", version?.language.name);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};
//Function to set User Bible settings from local storage
const setUserSettings = (setValue) => {
  const fontSize = localStorage.getItem("fontSize");
  if (fontSize) {
    setValue("fontSize", parseInt(fontSize));
  }
  const fontFamily = localStorage.getItem("fontFamily");
  if (fontFamily) {
    setValue("fontFamily", fontFamily);
  }
  const lineView = localStorage.getItem("lineView");
  const isHoverVerse = localStorage.getItem("isHoverVerse");
  if (isHoverVerse) {
    setValue("isHoverVerse", JSON.parse(isHoverVerse));
  }
  if (lineView) {
    setValue("lineView", JSON.parse(lineView));
  }
};
//Function to get the bible books
export const getAllBooks = (
  setVersionBooks,
  setPaneValue,
  setValue,
  bookCode,
  chapter,
  verseData
) => {
  API.get("booknames")
    .then(function (response) {
      for (let item of response.data) {
        item.bookNames.sort(function (a, b) {
          return a.book_id - b.book_id;
        });
        setVersionBooks(item.language.code, item.bookNames);
      }
      const languages = response.data.map((a) => a.language);
      getAllInfographics(languages, setValue);
      if (response.data && response.data.length > 0) {
        setPaneValue("bookCode", bookCode || "jhn");
        setPaneValue("chapter", chapter || "1");
        setPaneValue("verseData", verseData || "");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const nextButtonClick = (
  audioBooks,
  bookCode,
  chapter,
  setValue,
  audioBookList
) => {
  const chapters = audioBookList[bookCode];
  if (parseInt(chapter) < chapters) {
    setValue("chapter", (parseInt(chapter) + 1).toString());
    return;
  }
  audioBooks?.forEach((el, i) => {
    if (el.book_code === bookCode) {
      if (parseInt(chapter) === chapters) {
        setValue("chapter", "1");
        setValue("bookCode", audioBooks[i + 1]?.book_code);
        return;
      }
    }
  });
};
export const previousClick = (
  audioBooks,
  bookCode,
  chapter,
  setValue,
  audioBookList
) => {
  if (parseInt(chapter) > 1) {
    setValue("chapter", parseInt(chapter) - 1);
    return;
  }
  let findBook = {};
  audioBooks?.forEach((el, i, arr) => {
    if (i > 0 && el.book_code === bookCode) {
      findBook = arr[i - 1];
    }
  });
  if (findBook) {
    setValue("chapter", audioBookList[findBook.book_code]);
    setValue("bookCode", findBook.book_code);
  }
};
//Function to get the bible book name
export const getBookbyCode = (abbreviation) => {
  return bibleBooks.find((element) => element.abbreviation === abbreviation);
};
//Function to get the list of commentaries
export const getCommentaries = (setValue) => {
  let key = process.env.REACT_APP_COMMENTARY_KEY;
  key = key ? "?key=" + key : "";
  API.get("commentaries" + key)
    .then(function (response) {
      setValue("commentaries", response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
//Function to get the commentary for a chapter
export const getCommentaryForChapter = (sourceId, book, chapter, setText) => {
  let key = process.env.REACT_APP_COMMENTARY_KEY;
  key = key ? "?key=" + key : "";
  API.get("commentaries/" + sourceId + "/" + book + "/" + chapter + key)
    .then(function (response) {
      setText(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
//Function to get the list of dictionaries
export const getDictionaries = (setDictionaries) => {
  API.get("dictionaries")
    .then(function (response) {
      setDictionaries("dictionaries", response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
//Function to get the dictionary index
export const getDictionaryIndex = (sourceId, setDictionary) => {
  API.get("dictionaries/" + sourceId)
    .then(function (response) {
      setDictionary("dictionaryIndex", response.data);
      setDictionary("dictionaryWord", response.data[0]["words"][0]);
    })
    .catch(function (error) {
      console.log(error);
    });
};
//Function to get the dictionary word meaning
export const getDictionaryWord = (sourceId, wordId, setDictionary) => {
  API.get("dictionaries/" + sourceId + "/" + wordId)
    .then(function (response) {
      setDictionary("wordMeaning", response.data.meaning);
    })
    .catch(function (error) {
      console.log(error);
    });
};
//function to get all infographics
export const getAllInfographics = (languages, setValue) => {
  Promise.all(languages.map((l) => API.get("infographics/" + l.code)))
    .then((results) => {
      const info = results
        .filter((i) => i.data.url !== undefined)
        .map((a) => {
          const { languageCode, ...b } = a.data;
          b.language = languages.find((i) => i.code === languageCode);
          return b;
        });
      setValue("infographics", info);
    })
    .catch(function (error) {
      console.log(error);
    });
};

//Function to get the audiobibles
export const getAudioBibles = (setValue) => {
  API.get("audiobibles")
    .then(function (response) {
      setValue("audioBible", response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

//Function to get audioBible information from version json
export const getAudioBibleObject = (versions, sourceId) => {
  if (sourceId === "") {
    return;
  }
  for (var i = 0; i < versions?.length; i++) {
    let languageVersions = versions[i]["languageVersions"];
    for (var j = 0; j < languageVersions.length; j++) {
      if (Number(sourceId) === languageVersions[j]["sourceId"]) {
        return languageVersions[j]["audioBible"];
      }
    }
  }
};
//Function to get the videos
export const getVideos = (setValue) => {
  API.get("videos")
    .then(function (response) {
      setValue("video", response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

//Function to capitalize word
export const capitalize = (string) => {
  if (typeof string !== "string") return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getShortBook = (books, lang, bookCode) => {
  if (books) {
    const id = books[lang]?.findIndex((x) => x?.book_code === bookCode);
    if (id !== undefined) {
      return books[lang][id]?.short;
    }
  }
};
const checkValidChapter = (bookCode, chapter) => {
  if (chapter > 0 && !Number.isNaN(chapter)) {
    const chapterCount = bibleChapters[bookCode];
    return chapterCount >= chapter;
  }
  return false;
};
const getBookCode = (book, bookList) => {
  let bookCode = "";
  // check the search string contains full English Book Name
  let bookObj = bookList.find((a) => a.short === book);
  if (bookObj) {
    bookCode = bookObj.book_code;
  } else {
    bookObj = bookList.find(
      (b) =>
        b.abbr.toLowerCase() === book ||
        b.short.toLowerCase() === book ||
        b.long.toLowerCase() === book ||
        b.book_code.toLowerCase() === book
    );
    if (bookObj) {
      bookCode = bookObj.book_code;
    }
  }
  return bookCode;
};
function validVerseFormat(verse) {
  if (isNaN(verse)) {
    // check verse range
    if (verse?.match(/^[0-9-]*$/g)) {
      const [start, end, last] = verse.split("-");
      if (
        !isNaN(start) &&
        !isNaN(end) &&
        parseInt(start) <= parseInt(end) &&
        last === undefined
      ) {
        return true;
      }
    }
    // check multi verse
    if (verse?.match(/^[0-9,]*$/g)) {
      const verseArr = verse.split(",");
      if (verseArr.every((num) => num !== "" && !isNaN(num))) {
        return true;
      }
    }
    //check multi verse and passage in same chapter
    if (verse?.match(/^[0-9,-]*$/g)) {
      const verseArr = verse.split(",");
      const checkArr = (verse) => {
        if (verse.includes("-")) {
          const [start, end, last] = verse.split("-");
          if (
            !isNaN(start) &&
            !isNaN(end) &&
            parseInt(start) <= parseInt(end) &&
            last === undefined
          ) {
            return true;
          }
        } else if (verse !== "" && !isNaN(verse)) {
          return true;
        }
        return false;
      };
      if (verseArr.every(checkArr)) {
        return true;
      }
    }
  } else {
    return true;
  }
  return false;
}
//Function to get chapter and book code from reference
export const getReference = (search, bookList) => {
  const searchArr = search.split(/:/);
  const bookChapter = searchArr[0].trim();
  const verse = searchArr[1]?.replace(/\s/g, "") || "";
  if (searchArr[1]?.replace(/\s/g, "") === "" || searchArr[2] !== undefined) {
    return "invalidFormat";
  }
  if (verse && !validVerseFormat(verse)) {
    return "invalidFormat";
  }
  const searchArr1 = bookChapter.split(/\s+/);
  const chapter = Number(searchArr1.pop());
  const bookName = searchArr1.join(" ").toLowerCase();
  const refObj = bibleBooks.find(
    (b) => b.book.toLowerCase() === bookName || b.abbreviation === bookName
  );
  const refObjLocal = bookList.find(
    (b) => b.short === bookName || b.abbr === bookName
  );
  //check the search string contains valid book
  const bookCode = getBookCode(
    refObj?.abbreviation ? refObj?.abbreviation : refObjLocal?.abbr,
    bookList
  );
  //If search string has book code, then check the corresponding total chapter count
  if (bookCode) {
    if (checkValidChapter(bookCode, chapter)) {
      return { bookCode, chapter, verse };
    } else {
      return "chapterNotFound";
    }
  } else {
    return "bookNotFound";
  }
};
//Function to search Bible
export const searchBible = (sourceId, keyword, bookNames, setResult) => {
  API.get("search/" + sourceId + "?keyword=" + encodeURIComponent(keyword))
    .then(function (response) {
      response.data.keyword = response.data.keyword || keyword;
      response.data.result =
        response.data.result &&
        response.data.result.map((a) => {
          a.book = bookNames[a.bookCode];
          return a;
        });
      setResult(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const detectMob = () => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
};

export const getReadingPlans = (setValue) => {
  readingPlanAPI
    .get("manifest.json")
    .then(function (response) {
      const temp = response.data.map((plan) => {
        return { value: plan.file, label: plan.name };
      });
      setValue("readingPlans", temp);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getSignBible = (setValue) => {
  signBibleAPI
    .get("ISL.json")
    .then(function (response) {
      setValue("signBible", response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const isFeatureNew = (featureDate) => {
  let varDate = new Date(featureDate);
  let today = new Date();
  return varDate >= today ? 1 : 0;
};

export const getEditorToolbar = (mobile) => {
  return mobile
    ? {
        options: [
          "inline",
          "list",
          "link",
          "blockType",
          "fontSize",
          "colorPicker",
          "textAlign",
          "history",
        ],
        inline: {
          options: ["bold", "italic", "underline", "strikethrough"],
        },
        list: {
          inDropdown: true,
          options: ["unordered", "ordered", "indent", "outdent"],
        },
        textAlign: {
          inDropdown: true,
          options: ["left", "center", "right"],
        },
      }
    : {
        options: [
          "colorPicker",
          "image",
          "link",
          "inline",
          "blockType",
          "fontSize",
          "list",
          "textAlign",
          "history",
        ],
        inline: {
          options: ["bold", "italic", "underline", "strikethrough"],
        },
        list: {
          inDropdown: true,
          options: ["unordered", "ordered", "indent", "outdent"],
        },
        textAlign: {
          inDropdown: true,
          options: ["left", "center", "right"],
        },
      };
};

export const getChapterVideo = (setValue) => {
  chapterVideoAPI
    ?.get("fcbh_chapter.json")
    .then(function (response) {
      setValue("chapterVideo", response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const getLanguageData = (setValue) => {
  languageDataAPI
    ?.get("languageData.json")
    .then(function (response) {
      setValue("languageInfo", response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const getObsLanguageData = (setValue, setLang) => {
  obsDataAPI
    ?.get("languageData.json")
    .then(function (response) {
      setValue("obsLanguageInfo", response.data);
      setLang(response.data[0].langCode);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getVerse = (verse, sx) => {
  if (verse?.contents?.length === 1 && typeof verse?.contents[0] === "string") {
    return verse.verseText;
  }
  return parseTags(verse?.contents, sx);
};

function parseTags(tags, sx) {
  let verse = [];
  if (Array.isArray(tags)) {
    for (let item of tags) {
      if (["q1", "q2", "q3", "q4", "b"].includes(Object.keys(item)[0])) {
        verse.push(Object.keys(item)[0]);
      }
      if (typeof item === "string") {
        verse.push(item);
      } else if (typeof item === "object") {
        const tag = item.closing?.replace(/[^a-z+]/gi, "");
        if (verseCarryingMarkers.includes(tag)) {
          verse.push(parseTags(item[tag]));
        }
      } else {
        console.log("Case not handled, see tag below");
        console.log(tags);
      }
    }
  }
  let verseMap = [];
  let verseString = "";
  let previousText = "";

  verse.forEach((item, i) => {
    if (["q1", "q2", "q3", "q4", "b"].includes(item)) {
      verseMap.push(verseString);
      verseMap.push(item);
      verseString = "";
    } else {
      if (
        punctPattern1.test(item) ||
        punctPattern2.test(previousText) ||
        (typeof previousText === "string" && previousText?.endsWith(" ")) ||
        previousText === ""
      ) {
        verseString += item;
      } else if (item !== "") {
        verseString += ` ${item}`;
      }
    }
    if (i === verse.length - 1 && verseString !== "") {
      verseMap.push(verseString);
    }
    previousText = item;
  });

  let poetry = "";

  const styling = (text) => {
    if (poetry === "q1") {
      poetry = "";
      return (
        <Box sx={sx} className="poetry1">
          {text}
        </Box>
      );
    }
    if (poetry === "q2") {
      poetry = "";
      return (
        <Box sx={sx} className="poetry2">
          {text}
        </Box>
      );
    }
    if (poetry === "q3") {
      poetry = "";
      return (
        <Box sx={sx} className="poetry3">
          {text}
        </Box>
      );
    }
    if (poetry === "q4") {
      poetry = "";
      return (
        <Box sx={sx} className="poetry4">
          {text}
        </Box>
      );
    }
    return text;
  };

  const verseText = verseMap.map((text) => {
    if (["q1", "q2", "q3", "q4"].includes(text)) {
      poetry = text;
      return "";
    } else if (text === "b") {
      return <Box sx={{ display: "block", height: "10px" }}></Box>;
    } else if (text !== "") {
      return styling(text);
    }
    previousText = text;
    return "";
  });
  return verseText;
}
export const parseHeading = (item, headingSx) => {
  if (Array.isArray(item)) {
    const [first] = item;
    if (typeof first === "object") {
      const tag = Object.keys(first)[0];
      if (tag.match(/ms.?/)) {
        const heading = first[tag];
        if (heading && heading !== "" && typeof heading === "string") {
          return (
            <Box key={heading} sx={headingSx}>
              {heading}
            </Box>
          );
        }
      }
      if (tag.match(/s.?/)) {
        const heading = first[tag][0];
        if (heading && heading !== "" && typeof heading === "string") {
          return (
            <Box key={heading} sx={headingSx}>
              {heading}
            </Box>
          );
        }
      }
    }
  }
  return "";
};
export const getHeading = (item, headingSx) => {
  try {
    const { contents } = item;
    if (contents) {
      for (item of contents) {
        const heading = parseHeading(item, headingSx);
        if (heading !== "") {
          return heading;
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
  return "";
};
