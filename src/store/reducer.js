import * as actions from "./actions";
import { capitalize } from "../components/common/utility";
const defaultState = {
  versions: [],
  commentaries: [],
  commentary: {},
  commentaryLang: "hindi",
  commentaryIntro: {
    sourceId: "",
    bookCode: "",
    bookIntro: "",
    images: [],
  },
  dictionary: {
    dictionaries: [],
    selectedDictionary: {},
    dictionaryIndex: [],
    dictionaryWord: {},
    wordMeaning: {},
  },
  infographics: {},
  errorMessage: "",
  hoverVerse: "",
  locale: "en",
  multiLangName: "english",
  audioBible: [],
  video: [],
  chapterVideo: [],
  readingPlans: [],
  signBible: [],
  languageInfo: [],
  playing: "",
  versionBooks: {},
  versionSource: {},
  parallelScroll: true,
  login: false,
  mobileView: false,
  openLogin: false,
  userDetails: {
    uid: null,
    email: null,
    photoURL: null,
  },
  parallelView: null,
  panel1: {
    version: "Loading...",
    sourceId: "",
    bookCode: "",
    chapter: "",
    verseData: "",
    verseSourceId: null,
    verseRef: {},
    fontSize: 16,
    fontFamily: "Sans",
    lineView: false,
    isHoverVerse: true,
    audio: false,
    versesSelected: [],
    language: "hindi",
  },
  panel2: {
    version: "Loading...",
    sourceId: "",
    bookCode: "",
    chapter: "",
    fontSize: 16,
    fontFamily: "Sans",
    lineView: false,
    isHoverVerse: true,
    audio: false,
    language: "hindi",
  },
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.SETVERSIONS:
      return {
        ...state,
        versions: action.value,
      };
    case actions.ADDVERSIONBOOKS:
      return {
        ...state,
        versionBooks: { ...state.versionBooks, [action.name]: action.value },
      };
    case actions.SETVALUE1:
      return {
        ...state,
        panel1: { ...state.panel1, [action.name]: action.value },
      };
    case actions.SETVALUE2:
      return {
        ...state,
        panel2: { ...state.panel2, [action.name]: action.value },
      };
    case actions.COPYPANEL1:
      let { versesSelected, ...panel2 } = state.panel1;
      return {
        ...state,
        panel2: { ...panel2, versesSelected: [] },
      };
    case actions.SYNCPANEL:
      let { bookCode, chapter } = state[action.from]
        ? state[action.from]
        : state.panel1
        ? state.panel1
        : state.panel2;
      let bookList =
        state.versionBooks[state.versionSource[state[action.to]?.sourceId]];
      let parallelScroll = state.parallelScroll;
      let message = "";
      if (bookList?.findIndex((e) => e.book_code === bookCode) === -1) {
        //If parallell book not available don't change it
        chapter = state[action.to].chapter;
        bookCode = state[action.to].bookCode;
        parallelScroll = false;
        const ver = capitalize(state[action.to].version);
        message = action.t("reduxBookNotAvailable", { ver });
      }
      return {
        ...state,
        parallelScroll: parallelScroll,
        [action.to]: {
          ...state[action.to],
          bookCode: bookCode,
          chapter: chapter,
          message: message,
        },
      };
    case actions.SETVALUE:
      return {
        ...state,
        [action.name]: action.value,
      };
    case actions.SETDICTIONARY:
      return {
        ...state,
        dictionary: { ...state.dictionary, [action.name]: action.value },
      };
    default:
      return state;
  }
};
export default reducer;
