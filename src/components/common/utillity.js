import { API } from "../../store/api";
import { bibleBooks } from "../../store/bibleData";
//Function to get the bible versions
export const getVersions = (
  setVersions,
  setValue,
  setVersionBooks,
  setVersionSource
) => {
  API.get("bibles")
    .then(function (response) {
      const versions = response.data
        .map((obj) => {
          let langauage = { language: obj.language, languageVersions: [] };
          for (let i in obj.languageVersions) {
            let metadata = obj.languageVersions[i].metadata;
            if (metadata && metadata.Latest === "True") {
              delete obj.languageVersions[i].metadata.Latest;
              langauage.languageVersions.push(obj.languageVersions[i]);
            } else {
            }
          }
          return langauage;
        })
        .filter((obj) => obj.languageVersions.length > 0);
      setVersions(versions);
      if (versions.length > 0) {
        let version = versions[0].languageVersions[0];
        try {
          version = versions
            .find((e) => e.language === "hindi")
            .languageVersions.find((e) => e.version.code === "IRV");
        } catch (e) {
          //hindi IRV version not available use first versions
        }
        setValue(
          "version",
          version.language.code + "-" + version.version.code.toUpperCase()
        );
        setValue("sourceId", version.sourceId);
        getAllBooks(setVersionBooks, setValue);
        let versionSource = {};
        for (let lang of versions) {
          for (let ver of lang.languageVersions) {
            versionSource[ver.sourceId] = ver.language.code;
          }
        }
        setVersionSource(versionSource);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};
//Function to get the bible books
export const getAllBooks = (setVersionBooks, setValue) => {
  API.get("booknames")
    .then(function (response) {
      for (let item of response.data) {
        item.bookNames.sort(function (a, b) {
          return a.book_id - b.book_id;
        });
        setVersionBooks(item.language.code, item.bookNames);
      }
      if (response.data && response.data.length > 0) {
        setValue("bookCode", "jhn");
        setValue("chapter", "1");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
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
//Function to get the commentary for a chaper
export const getCommentaryForChaper = (sourceId, book, chapter, setText) => {
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
//Function to get the infographics index
export const getInfographics = (languageCode, setValue) => {
  API.get("infographics/" + languageCode)
    .then(function (response) {
      setValue("infographics", response.data);
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
  for (var i = 0; i < versions.length; i++) {
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
