import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ReactPlayer from "react-player";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/system";
const CustomReactPlayer = styled(ReactPlayer)(() => ({
  marginTop: "5px",
  "& audio": {
    outlineWidth: 0,
  },
}));

const Player = (props) => {
  const { audios, bookCode, chapter, languageCode } = props;
  const [playing, setPlaying] = React.useState("");

  React.useEffect(() => {
    setPlaying("");
  }, [bookCode, chapter, languageCode]);
  return (
    <List>
      {audios?.map((audio, i) => {
        const { url, format, books, name, sourceId } = audio;
        const audioUrl = url + bookCode + "/" + chapter + "." + format;
        return books.hasOwnProperty(bookCode) ? (
          <Card
            sx={{
              border: "1px solid #dddddd",
              boxShadow: "none",
              marginRight: "4px",
            }}
            key={i}
          >
            <CardHeader
              title={name}
              sx={{
                textTransform: "capitalize",
                borderBottom: "1px solid #b7b7b785",
                minHeight: "50px",
                padding: "0 15px",
              }}
            />
            <CardContent sx={{ padding: 0 }}>
              <ListItem
                key={name}
                value={name}
                sx={{
                  display: "block",
                  padding: "16px",
                  fontSize: "1.1rem",
                  borderBottom: "1px solid #b7b7b785",
                  "&:last-child": {
                    borderBottom: "none",
                    paddingBottom: 0,
                  },
                }}
              >
                <CustomReactPlayer
                  playing={playing === sourceId}
                  url={audioUrl}
                  onPlay={() => setPlaying(sourceId)}
                  controls
                  width="100%"
                  height="50px"
                  config={{
                    file: {
                      attributes: {
                        controlsList: "nodownload",
                      },
                    },
                  }}
                />
              </ListItem>
            </CardContent>
          </Card>
        ) : (
          ""
        );
      })}
    </List>
  );
};
export default Player;
