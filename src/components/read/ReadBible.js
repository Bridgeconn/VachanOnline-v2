import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TopBar from "./TopBar";
import BiblePane from "./BiblePane";
import BibleMenu from "./BibleMenu";
import Search from './Search';
import Commentries from '../rightmenu/Commentries';
import WordStudy from '../rightmenu/WordStudy';
import Interliner from '../rightmenu/Interliner';
import Videos from '../rightmenu/Videos';
import Images from '../rightmenu/Images';
import Articles from '../rightmenu/Articles';
import Audio from '../rightmenu/Audio';
import MyContent from './mycontent/MyContent'
import ReadingPlan from './readingplan/ReadingPlan';
import DailyDevotion from '../rightmenu/DailyDevotion'

const useStyles = makeStyles(theme => ({
  // biblePane2: {
  //   position: "absolute",
  //   width: "47.5%",
  //   height: "100%",
  //   backgroundColor: "#fff",
  //   borderRight: "1px solid #f7f7f7",
  //   overflow: "hidden",
  //   "&:nth-child(3)": {
  //     left: "47.5%",
  //     backgroundColor: "#fff",
  //   }
  // },
  biblePane2: {
    position: "absolute",
    width: "63%",
    height: "100%",
    backgroundColor: "#fff",
    borderRight: "1px solid #f7f7f7",
    overflow: "hidden",
    boxShadow: " 2px 5px 5px 2px #ddd",
    "&:nth-child(3)": {
      right: "6%",
      height: "100%",
      width: "30%",
      overflow: "auto",
      padding: " 0px 10px",
      backgroundColor: "#fff",
      boxShadow: " 2px 5px 5px 2px #ddd"
    }
  },
  biblePane3: {
    width: "5%",
    backgroundColor: "#2e639a",
    position: "absolute",
    height: "100vh",
    paddingTop: "60px",
    maxHeight: "100%",
    right: 0,
    bottom: 0,
    overflow: "hidden",
    textAlign: "center"
  },
}));
const ReadBible = () => {
  const classes = useStyles();
  return (
    <>
      <TopBar />
      <div className={classes.biblePane2}>
        <i class="material-icons">
          clear
</i>
        <BiblePane />
      </div>
      {/* <div className={classes.biblePane2}>
        <BiblePane />
      </div> */}
      {/* <div className={classes.biblePane2}>
        <Search />
      </div> */}
      {/* <div className={classes.biblePane2}>
        <Commentries />
      </div> */}
      {/* <div className={classes.biblePane2}>
        <WordStudy />
      </div> */}
      {/* <div className={classes.biblePane2}>
        <Interliner />
      </div> */}
      {/* <div className={classes.biblePane2}>
        <Videos />
      </div> */}
      {/* <div className={classes.biblePane2}>
        <Images />
      </div> */}
      {/* <div className={classes.biblePane2}>
        <Articles />
      </div> */}
      {/* <div className={classes.biblePane2}>
        <Audio />
      </div> */}
      {/* <div className={classes.biblePane2}>
        <MyContent />
      </div> */}
      {/* <div className={classes.biblePane2}>
        <ReadingPlan />
      </div> */}
      <div className={classes.biblePane2}>
        <DailyDevotion />
      </div>

      <div className={classes.biblePane3}>
        <BibleMenu />
      </div>
    </>
  );
};
export default ReadBible;