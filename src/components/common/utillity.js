import API from "../../store/api";
import { bibleBooks } from "../../store/bibleData";
//Function to get the bible versions
export const getVersions = (setVersions, setValue, setVersionBooks) => {
  API.get("bibles")
    .then(function(response) {
      const versions = response.data;
      setVersions(versions);
      if (versions.length > 0) {
        setValue(
          "version",
          versions[0].languageVersions[0].language.name +
            "-" +
            versions[0].languageVersions[0].version.code.toUpperCase()
        );
        setValue("sourceId", versions[0].languageVersions[0].sourceId);
        let setFirst = true;
        for (let lang of versions) {
          for (let ver of lang.languageVersions) {
            getBooks(setValue, setVersionBooks, ver.sourceId, setFirst);
            setFirst = false;
          }
        }
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};
//Function to get the bible books
export const getBooks = (setValue, setVersionBooks, sourceId, setValues) => {
  API.get("bibles/" + sourceId + "/books")
    .then(function(response) {
      var books = response.data[0].books.sort(
        (a, b) => a.bibleBookID - b.bibleBookID
      );
      setVersionBooks(sourceId, books);
      if (setValues) {
        setValue("book", books[0].bibleBookFullName);
        setValue("bookCode", books[0].abbreviation);
        setValue("chapter", "1");
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};
//Function to get the bible book name
export const getBookbyCode = abbreviation => {
  return bibleBooks.find(element => element.abbreviation === abbreviation);
};
export const getBookByName = name => {
  return bibleBooks.find(element => element.book === name);
};
//Function to get the list of commentaries
export const getCommentaries = setValue => {
  API.get("commentaries")
    .then(function(response) {
      setValue("commentaries", response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
};
//Function to get the commentary for a chaper
export const getCommentaryForChaper = (sourceId, book, chapter, setText) => {
  API.get("commentaries/" + sourceId + "/" + book + "/" + chapter)
    .then(function(response) {
      setText(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
};
//Function to get the list of dictionaries
export const getDictionaries = setDictionaries => {
  API.get("dictionaries")
    .then(function(response) {
      setDictionaries("dictionaries", response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
};
//Function to get the dictionary index
export const getDictionaryIndex = (sourceId, setDictionary) => {
  API.get("dictionaries/" + sourceId)
    .then(function(response) {
      setDictionary("dictionaryIndex", response.data);
      setDictionary("dictionaryWord", response.data[0]["words"][0]);
    })
    .catch(function(error) {
      console.log(error);
    });
};
//Function to get the dictionary word meaning
export const getDictionaryWord = (sourceId, wordId, setDictionary) => {
  API.get("dictionaries/" + sourceId + "/" + wordId)
    .then(function(response) {
      setDictionary("wordMeaning", response.data.meaning);
    })
    .catch(function(error) {
      console.log(error);
    });
};
//Function to get the infographics index
export const getInfographics = (languageCode, setValue) => {
  API.get("infographics/" + languageCode)
    .then(function(response) {
      setValue("infographics", response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
};
//Function to get the infographics index
export const getAudioBibles = setValue => {
  API.get("audiobibles")
    .then(function(response) {
      setValue("audioBible", response.data);
    })
    .catch(function(error) {
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
