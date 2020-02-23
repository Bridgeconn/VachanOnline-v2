import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import * as views from "../../store/views";
import TopBar from "./TopBar";
import BiblePane from "./BiblePane";
import Commentary from "../commentary/Commentary";
import Dictionary from "../dictionary/Dictionary";
import Infographics from "../infographics/Infographics";
import BibleMenu from "./BibleMenu";
import { getCommentaries, getDictionaries } from "../common/utillity";

const useStyles = makeStyles(theme => ({
  biblePane1: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRight: "1px solid #f7f7f7",
    overflow: "hidden"
  },
  biblePane2: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: "#fff",
    borderRight: "1px solid #f7f7f7",
    overflow: "hidden",
    "&:nth-child(2)": {
      right: 0,
      backgroundColor: "#fff"
    }
  },
  biblePane: {
    position: "absolute",
    height: "100%",
    [theme.breakpoints.only("xs")]: {
      width: "100%"
    },
    [theme.breakpoints.up("sm")]: {
      width: "calc(100% - 65px)"
    }
  },
  rightMenu: {
    width: 65,
    backgroundColor: "#2e639a",
    position: "absolute",
    height: "100vh",
    paddingTop: "60px",
    maxHeight: "100%",
    right: 0,
    bottom: 0,
    overflow: "hidden",
    textAlign: "center",
    [theme.breakpoints.only("xs")]: {
      display: "none"
    }
  }
}));
const ReadBible = props => {
  const classes = useStyles();
  //ref to get bible panes 1 & 2
  const bibleText1 = React.useRef();
  const bibleText2 = React.useRef();
  //used to sync bibles in paralle bibles on scroll
  const [sync, setSync] = React.useState(0);
  //flag to prevent looping of on scroll event
  let ignoreScrollEvents = false;
  //function to implement parallel scroll
  const getScroll = React.useCallback((paneNo, parallelScroll, setSync) => {
    //check flag to prevent looping of on scroll event
    if (ignoreScrollEvents) {
      ignoreScrollEvents = false;
      return;
    }
    if (!parallelScroll) {
      return;
    }
    let text1 = bibleText1.current;
    let text2 = bibleText2.current;
    if (
      text1 !== undefined &&
      text2 !== undefined &&
      text1 !== null &&
      text2 !== null
    ) {
      //if parallel scroll on scroll proportinal to scroll window
      if (paneNo === 1) {
        ignoreScrollEvents = true;
        text2.scrollTop =
          (text1.scrollTop / (text1.scrollHeight - text1.offsetHeight)) *
          (text2.scrollHeight - text2.offsetHeight);
        setSync(1);
      } else if (paneNo === 2) {
        ignoreScrollEvents = true;
        text1.scrollTop =
          (text2.scrollTop / (text2.scrollHeight - text2.offsetHeight)) *
          (text1.scrollHeight - text1.offsetHeight);
        setSync(2);
      }
    }
  }, []);
  const [parallelView, setParallelView] = React.useState("");
  function menuClick(view) {
    //if closing commentary then reset selected commentary
    if (parallelView === view && view === views.COMMENTARY) {
      props.setValue("commentary", {});
    }
    setParallelView(parallelView === view ? "" : view);
  }
  let { setValue1, setValue2, copyPanel1, panel1, panel2 } = props;
  //sync bible on scroll if parallel scroll on
  React.useEffect(() => {
    if (sync === 1) {
      if (panel2.book !== panel1.book) {
        setValue2("book", panel1.book);
        setValue2("bookCode", panel1.bookCode);
        setValue2("chapterList", panel1.chapterList);
      }
      if (panel2.chapter !== panel1.chapter) {
        setValue2("chapter", panel1.chapter);
      }
    }
    if (sync === 2) {
      if (panel1.book !== panel2.book) {
        setValue1("book", panel2.book);
        setValue1("bookCode", panel2.bookCode);
        setValue1("chapterList", panel2.chapterList);
      }
      if (panel1.chapter !== panel2.chapter) {
        setValue1("chapter", panel2.chapter);
      }
    }
    setSync(0);
  }, [panel1, panel2, props, setValue1, setValue2, sync]);
  React.useEffect(() => {
    //if commentaries not loaded fetch list of commentaries
    if (props.commentaries.length === 0) {
      getCommentaries(props.setValue);
    }
  }, [props.commentaries.length, props.setValue]);
  React.useEffect(() => {
    //if dictionaries not loaded fetch list of dictionaries
    if (props.dictionaries.length === 0) {
      getDictionaries(props.setDictionary);
    }
  }, [props.dictionaries.length, props.setDictionary]);
  React.useEffect(() => {
    if (parallelView === views.PARALLELBIBLE) {
      copyPanel1();
    }
  }, [parallelView, copyPanel1]);
  const [pane, setPane] = React.useState("");
  React.useEffect(() => {
    switch (parallelView) {
      case views.PARALLELBIBLE:
        setPane(
          <>
            <div className={classes.biblePane2}>
              <BiblePane
                setValue={props.setValue1}
                paneData={props.panel1}
                ref1={bibleText1}
                scroll={getScroll}
                setSync={setSync}
                paneNo={1}
              />
            </div>
            <div className={classes.biblePane2}>
              <BiblePane
                setValue={props.setValue2}
                paneData={props.panel2}
                ref1={bibleText2}
                scroll={getScroll}
                setSync={setSync}
                paneNo={2}
              />
            </div>
          </>
        );
        break;
      case views.COMMENTARY:
        setPane(
          <>
            <div className={classes.biblePane2}>
              <BiblePane setValue={props.setValue1} paneData={props.panel1} />
            </div>
            <div className={classes.biblePane2}>
              <Commentary />
            </div>
          </>
        );
        break;
      case views.DICTIONARY:
        setPane(
          <>
            <div className={classes.biblePane2}>
              <BiblePane setValue={props.setValue1} paneData={props.panel1} />
            </div>
            <div className={classes.biblePane2}>
              <Dictionary setDictionary={props.setDictionary} />
            </div>
          </>
        );
        break;
      case views.INFOGRAPHICS:
        setPane(
          <>
            <div className={classes.biblePane2}>
              <BiblePane setValue={props.setValue1} paneData={props.panel1} />
            </div>
            <div className={classes.biblePane2}>
              <Infographics setValue={props.setValue} />
            </div>
          </>
        );
        break;
      default:
        setPane(
          <div className={classes.biblePane1}>
            <BiblePane setValue={props.setValue1} paneData={props.panel1} />
          </div>
        );
    }
  }, [classes.biblePane1, classes.biblePane2, getScroll, parallelView, props]);
  return (
    <>
      <TopBar
        pScroll={props.parallelScroll}
        setValue={props.setValue}
        parallelView={parallelView}
      />
      <div>
        <div className={classes.biblePane}>{pane}</div>
        <div className={classes.rightMenu}>
          <BibleMenu menuClick={menuClick} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    versions: state.versions,
    panel1: state.panel1,
    panel2: state.panel2,
    parallelScroll: state.parallelScroll,
    commentaries: state.commentaries,
    dictionaries: state.dictionary.dictionaries,
    infographics: state.infographics
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setValue1: (name, value) => {
      dispatch({ type: actions.SETVALUE1, name: name, value: value });
    },
    setValue2: (name, value) =>
      dispatch({ type: actions.SETVALUE2, name: name, value: value }),
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE, name: name, value: value }),
    setDictionary: (name, value) =>
      dispatch({ type: actions.SETDICTIONARY, name: name, value: value }),
    copyPanel1: () => dispatch({ type: actions.COPYPANEL1 })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReadBible);
