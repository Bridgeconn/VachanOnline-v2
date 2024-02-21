import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ReactPlayer from "react-player";
import { LIGHTGREY } from "../../store/colorCode";
import BigTooltip from "./BigTooltip";
import { t } from "i18next";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

const StyleExpandMoreIcon = (props) => (
  <ExpandMoreIcon sx={{ borderRadius: 20, fontSize: "1.6rem", boxShadow: 2 }} />
);
const StyleExpandLessIcon = (props) => (
  <ExpandLessIcon sx={{ borderRadius: 20, fontSize: "1.6rem", boxShadow: 2 }} />
);

const CustomReactPlayer = styled(ReactPlayer)(({ theme, props }) => ({
  maxHeight: "calc(100vh - 150px)",
  [theme.breakpoints.down("sm")]: {
    maxHeight: "240px",
  },
}));
const VideoCard = ({ video, playing, setPlaying, language }) => {
  const [showDesc, setShowDesc] = useState(false);

  const handleChange = () => {
    setShowDesc((prev) => !prev);
  };
  return (
    <Card
      sx={{
        padding: 0,
        display: "inline-block",
        verticalAlign: "top",
        width: "100%",
        marginBlockStart: 1.25,
        maxHeight: "200vh",
        boxSizing: "content-box",
        boxShadow: "0 2px 6px 0 hsl(0deg 0% 47% / 60%)",
      }}
      key={video?.title}
    >
      <CardContent
        sx={{
          padding: 0,
          ":last-child": {
            paddingBottom: 0,
          },
        }}
      >
        <Typography
          sx={{
            px: 2.5,
            py: 1.25,
            whiteSpace: { sm: "nowrap" },
          }}
          variant="h6"
        >
          {language === "isl" ? video?.storyNo + "." : ""} {video?.title}
        </Typography>
        <CustomReactPlayer
          playing={playing === video?.url}
          onPlay={() => setPlaying(video?.url)}
          url={video?.url}
          controls={true}
          width="100%"
          height={language === "isl" ? "500px" : "360px"}
        />
        <BigTooltip
          title={
            showDesc
              ? t("hideDescriptionSignLang")
              : t("showDescriptionSignLang")
          }
        >
          <Box
            onClick={handleChange}
            sx={{
              display: "flex",
              border: "1px solid " + LIGHTGREY,
              padding: "10px 20px",
              boxShadow: 2,
            }}
          >
            <Typography sx={{ fontSize: "1.2rem", width: "100%" }}>
              {t("descriptionSignLang")}
            </Typography>
            {showDesc ? <StyleExpandLessIcon /> : <StyleExpandMoreIcon />}
          </Box>
        </BigTooltip>
        <Collapse in={showDesc}>
          {language === "isl" ? (
            <Box sx={{ maxHeight: 200, overflow: "auto" }}>
              {video?.description?.map((el, i) => (
                <Typography
                  key={i}
                  sx={{
                    paddingY: 1.25,
                    paddingLeft: 2.5,
                    paddingRight: 1.25,
                    fontSize: "1.1rem",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  <b>{el?.time ? `${el.time} ` : ""}</b>
                  {el?.text}
                </Typography>
              ))}
            </Box>
          ) : (
            <Typography
              sx={{
                paddingY: 1.25,
                paddingLeft: 1.25,
                paddingRight: 2.5,
                fontSize: "1.1rem",
                whiteSpace: "pre-wrap",
              }}
            >
              {video["description"]}
            </Typography>
          )}
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
