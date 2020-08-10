import * as actions from "./actions";
const defaultState = {
  versions: [],
  commentaries: [],
  commentary: {},
  dictionary: {
    dictionaries: [],
    selectedDictionary: {},
    dictionaryIndex: [],
    dictionaryWord: {},
    wordMeaning: {},
  },
  infographics: {},
  audioBible: [],
  video: [],
  versionBooks: {},
  versionSource: {},
  parallelScroll: true,
  login: false,
  openLogin: false,
  userDetails: {
    uid: null,
    email: null,
    photoURL: null,
  },
  setParallelView: null,
  panel1: {
    version: "Loading...",
    sourceId: "",
    bookCode: "",
    chapter: "",
    fontSize: 16,
    fontFamily: "Sans",
    lineView: true,
    audio: false,
    audioBible: {},
    versesSelected: [],
  },
  panel2: {
    version: "Loading...",
    sourceId: "",
    bookCode: "",
    chapter: "",
    fontSize: 16,
    fontFamily: "Sans",
    lineView: true,
    audio: false,
    audioBible: {},
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
      let { book, bookCode, chapterList, chapter } = state[action.from];
      return {
        ...state,
        [action.to]: {
          ...state[action.to],
          book: book,
          bookCode: bookCode,
          chapterList: chapterList,
          chapter: chapter,
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
