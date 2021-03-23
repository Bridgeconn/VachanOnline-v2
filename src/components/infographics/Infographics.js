import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { connect } from "react-redux";
import { getInfographics } from "../common/utillity";
import Close from "../common/Close";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "absolute",
    top: 94,
    bottom: 0,
  },
  container: {
    top: 40,
    bottom: 0,
    overflow: "scroll",
    position: "absolute",
    paddingTop: 12,
    width: "100%",
    paddingLeft: 15,
    height: "calc(100% - 40px)",
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
  },
  heading: {
    borderBottom: "1px solid #f1ecec",
    display: "flex",
    width: "100%",
    height: "2.75em",
    paddingLeft: 15,
  },
  title: {
    paddingTop: 4,
    borderTop: "1px solid #f1ecec",
    width: "100%",
    height: "2em",
  },
  card: {
    minWidth: 170,
    width: 170,
    display: "inline-block",
    marginRight: 20,
    marginTop: 10,
    cursor: "pointer",
  },
  closeButton: {
    marginRight: 15,
    marginTop: -6,
  },
}));
const Infographics = (props) => {
  const classes = useStyles();
  let { infographics, languageCode, bookCode, setValue } = props;
  const [message, setMessage] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [bookData, setBookData] = React.useState([]);
  let options = {
    toolbar: {
      flipHorizontal: false,
      flipVertical: false,
    },
  };
  //If language code changed get infographics for language
  React.useEffect(() => {
    getInfographics(languageCode, setValue);
  }, [languageCode, setValue]);
  //If infographics or book changed update Book data and message to show
  React.useEffect(() => {
    if (bookCode && infographics && infographics.books) {
      const found = infographics.books.find(
        (element) => element.bookCode === bookCode
      );
      if (found) {
        setBookData(found.infographics);
        setMessage("");
      } else {
        setBookData([]);
        setMessage("No infographics available for this book");
      }
    }
  }, [bookCode, infographics]);
  //If infographics updated updated url to fetch from
  React.useEffect(() => {
    if (infographics.message && infographics.message !== "") {
      setMessage(infographics.message);
      setUrl("");
    } else if (infographics.url && infographics.url !== "") {
      setMessage("");
      setUrl(infographics.url);
    }
  }, [infographics]);
  return (
    <div className={classes.root}>
      <Box className={classes.heading}>
        <Box flexGrow={1}>
          <Typography variant="h6">Infographics</Typography>
        </Box>
        <Box>
          <Close className={classes.closeButton} />
        </Box>
      </Box>

      {message !== "" ? (
        message
      ) : (
        <div className={classes.container}>
          <RViewer
            options={options}
            imageUrls={bookData.map((i) => url + "/" + i.fileName)}
          >
            {/*Iterate over infographics for the book and show thumbnails in cards*/}
            {bookData.map((pic, index) => {
              return (
                <RViewerTrigger index={index} key={index}>
                  <Card className={classes.card}>
                    <CardMedia
                      component="img"
                      alt={pic.title}
                      height="200"
                      image={url + "/thumbs/" + pic.fileName}
                      title={pic.title}
                    />
                    <CardContent>
                      <Typography className={classes.title} gutterBottom>
                        {pic.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </RViewerTrigger>
              );
            })}
          </RViewer>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    infographics: state.local.infographics,
    languageCode: state.local.panel1.languageCode,
    bookCode: state.local.panel1.bookCode,
  };
};
export default connect(mapStateToProps)(Infographics);
