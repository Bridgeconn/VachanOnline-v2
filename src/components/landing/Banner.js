import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import banner from "../common/images/banner.jpg";

const useStyles = makeStyles((theme) => ({
  legend: {
    position: "absolute",
    bottom: "25%",
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
export default function Banner({ language }) {
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
      <p
        className={classes.legend}
        style={{
          fontFamily: verse[language][2],
        }}
      >
        {verse[language][0]}
        <br />
        {verse[language][1]}
      </p>
    </div>
  );
}
