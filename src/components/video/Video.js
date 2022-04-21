import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ModalVideo from "react-modal-video";
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
    left:0,
    right:0,
    overflow: "scroll",
    position: "absolute",
    paddingTop: 12,
    paddingLeft: 15,
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
  card: {
    minWidth: 170,
    width: 170,
    display: "inline-block",
    marginRight: 20,
    marginTop: 10,
    cursor: "pointer",
  },
  video: {
    width: "48%",
    padding: 0,
    margin: "0 2% 2% 0",
    display: "inline-block",
    verticalAlign: "top",
  },
  title: {
    paddingTop:4,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  description: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  closeButton: {
    marginRight: 15,
    marginTop: -6,
  },
}));
const Video = (props) => {
  const classes = useStyles();
  let { video, bookCode, languageCode } = props;
  const [message, setMessage] = React.useState("");
  const [videoId, setVideoId] = React.useState("");
  const [videos, setVideos] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [vidLink,setVidLink] = React.useState("")
 
  //If language or book changed update videos and message to show
  React.useEffect(() => {
    if (video && bookCode && languageCode) {
      const found = video.find(
        (element) => element.language.code === languageCode
      );
      if (found) {
        if (found.books && found.books.hasOwnProperty(bookCode)) {
          setVideos(found.books[bookCode]);
          setMessage("");
        } else {
          setVideos([]);
          setMessage("No videos available for this Book");
        }
      } else {
        setVideos([]);
        setMessage("No videos available for this language");
      }
    }
  }, [video, bookCode, languageCode]);  

return (
    <div className={classes.root}>
       <Box className={classes.heading}>
        <Box flexGrow={1}>
          <Typography variant="h6">Videos</Typography>
        </Box>
        <Box>
          <Close className={classes.closeButton} />
        </Box>
      </Box>
      <div className={classes.container}>
        {videos && videos.length > 0 ? (         
          <div>
            <ModalVideo
              channel={vidLink}
              isOpen={isOpen}
              videoId={videoId}
              onClose={() => setIsOpen(false)}
            />
            {videos.map((video, i) => {   
              const videoSource= video.url.includes("vimeo")?"vimeo":"youtube";
              const videoId = videoSource==="vimeo"?video.url.split("https://vimeo.com/")[1]:video.url.split("https://youtu.be/")[1];
              const vimeoUrl = "https://raw.githubusercontent.com/Bridgeconn/vachancontentrepository/master/video/vimeo/";
              const youtubeUrl = "https://img.youtube.com/vi/";
              const thumbUrl = videoSource==="vimeo"?vimeoUrl:youtubeUrl; 
              return (
                <Card
                  key={i}
                  onClick={() => {
                    setVidLink(videoSource)
                    setVideoId(videoId);
                    setIsOpen(true);
                  }}
                  className={classes.video}
                >
                  <CardActionArea>
                  <CardMedia
                      component="img"
                      alt="Video"
                      height="244"
                      className={classes.media}
                      image={thumbUrl+videoId+"/0.jpg"}
                      title="Video"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        title={video.title}
                        className={classes.title}
                      >
                        {video.title}
                      </Typography>     
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </div>
        ) : (
          message
        )}
      </div>
    </div>
  );
};
export default Video;
