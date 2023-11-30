import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import banner from "../common/images/banner.jpg";
import { API } from "../../store/api";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  legend: {
    position: "absolute",
    bottom: "19%",
    width: "60%",
    left: "20%",
    right: "25%",
    borderRadius: 10,
    color: "#ffffff",
    padding: 10,
    fontSize: "1.75rem",
    textAlign: "center",
    transition: "opacity 0.35s ease-in-out",
    background: "none",
    opacity: 1,
    [theme.breakpoints.only("xs")]: {
      bottom: "3%",
      fontSize: "1.65rem",
    },
  },
  heading: {
    position: "absolute",
    top: "30%",
    width: "100%",
    borderRadius: 10,
    color: "#ffffff",
    padding: 10,
    fontSize: "2rem",
    textAlign: "center",
    transition: "opacity 0.35s ease-in-out",
    background: "none",
    opacity: 1,
    [theme.breakpoints.only("xs")]: {
      bottom: "3%",
      fontSize: "1.65rem",
    },
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    paddingTop: "25%",
    height: "300px",
    backgroundImage: `url(${banner})`,
    backgroundRepeat: "round",
    backgroundSize: "cover",
    [theme.breakpoints.only("xs")]: {
      height: "240px",
    },
  },
}));
const Banner = ({ language, sourceId, panel1 }) => {
  console.log(panel1);
  const [allVerseData, setAllVerseData] = useState([]);
  const [verseRef, setVerseRef] = useState({
    b: "psa",
    c: "119",
    v: "105",
  });
  const [verseObj, setVerseObj] = useState({});
  const APIBASE = useMemo(
    () => axios.create({ baseURL: process.env.REACT_APP_DAILY_VERSE }),
    []
  );
  let newDate = new Date();
  const currentYear = newDate?.getFullYear();
  const currentMonth = newDate?.getMonth() + 1;
  const currentDay = newDate?.getDate();

  useEffect(() => {
    API.get(
      `bibles/${sourceId ? sourceId : 104}/verses/${verseRef?.b}.${
        verseRef?.c
      }.${verseRef?.v}`
    ).then(function (response) {
      setVerseObj(response.data);
    });
  }, [sourceId, verseRef]);
  useEffect(() => {
    APIBASE.get("verseData.json").then(function (response) {
      setAllVerseData(response?.data);
    });
  }, [APIBASE]);
  useEffect(() => {
    allVerseData[currentYear] &&
      allVerseData[currentYear][currentMonth].map((ele) => {
        if (ele[currentDay]) {
          setVerseRef(ele[currentDay]);
        }
        return ele[currentDay];
      });
  }, [allVerseData, currentDay, currentMonth, currentYear]);
  const classes = useStyles();
  let verse = {
    অসমীয়া: [
      "তোমাৰ আদেশবোৰৰ দ্বাৰাই মই জ্ঞান লাভ কৰোঁ;",
      "সেই বাবেই মই সকলো মিছা পথ ঘিণ কৰোঁ।",
      "Mukti",
    ],
    বাঙালি: ["তোমার বাক্য আমার চরনের প্রদীপ,", "আমার পথের আলো।", "Mukti"],
    English: [
      "Your word is a lamp to my feet,",
      "and a light to my path.",
      "Roboto",
    ],
    ગુજરાતી: [
      "મારા પગોને માટે તમારાં વચન દીવારૂપ છે",
      "અને મારા માર્ગોને માટે અજવાળારૂપ છે",
      "Shruti",
    ],
    हिंदी: [
      "तेरा वचन मेरे पाँव के लिये दीपक,",
      "और मेरे मार्ग के लिये उजियाला है।",
      "Noto Sans Devanagari",
    ],
    ಕನ್ನಡ: [
      "ನಿನ್ನ ವಾಕ್ಯವು ನನ್ನ ಕಾಲಿಗೆ ದೀಪವೂ,",
      "ನನ್ನ ದಾರಿಗೆ ಬೆಳಕೂ ಆಗಿದೆ.",
      "Tunga",
    ],
    മലയാളം: [
      "അങ്ങയുടെ വചനം എന്റെ കാലിന് ദീപവും",
      "എന്റെ പാതയ്ക്കു പ്രകാശവും ആകുന്നു.",
      "Noto Serif Malayalam",
    ],
    मराठी: [
      "तुझे वचन माझ्या पावलाकरता दिवा आहे,",
      "आणि माझ्या मार्गासाठी प्रकाश आहे.",
      "Noto Sans Devanagari",
    ],
    ଓଡିଆ: [
      "ତୁମ୍ଭ ବାକ୍ୟ ମୋ’ ଚରଣ ପାଇଁ ପ୍ରଦୀପ",
      "ଓ ମୋ’ ପଥ ପାଇଁ ଆଲୁଅ ଅଟେ।",
      "Raavi",
    ],
    ਪੰਜਾਬੀ: [
      "ਤੇਰਾ ਬਚਨ ਮੇਰੇ ਪੈਰਾਂ ਲਈ ਦੀਪਕ,",
      "ਅਤੇ ਮੇਰੇ ਰਾਹ ਦਾ ਚਾਨਣ ਹੈ।",
      "Kalinga",
    ],
    தமிழ்: [
      "உம்முடைய வசனம் என்னுடைய கால்களுக்குத் தீபமும்,",
      "என்னுடைய பாதைக்கு வெளிச்சமுமாக இருக்கிறது.",
      "Noto Serif Tamil",
    ],
    తెలుగు: ["నీ వాక్కు నా పాదాలకు దీపం,", "నా దారిలో వెలుగు.", "Gautami"],
    उर्दू: [
      "तेरा कलाम मेरे क़दमों के लिए चराग़,",
      "और मेरी राह के लिए रोशनी है।",
      "Noto Sans Devanagari",
    ],
  };

  return (
    <div className={classes.imageContainer}>
      <h2 className={classes.heading}>Verse Of The Day</h2>
      <p
        className={classes.legend}
        style={{
          fontFamily: verse[language][2],
        }}
      >
        {/* {verse[language][0]}
        <br />
        {verse[language][1]} */}
        <b>{verseObj?.reference}</b> {verseObj.verseContent?.text}
      </p>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    sourceId: state.local.panel1.sourceId,
    panel1: state.local.panel1,
  };
};
export default connect(mapStateToProps)(Banner);
