import * as React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import { BLACK } from "../../store/colorCode";
const I = styled("i")({ padding: "6px 6px 0", color: BLACK });
export default function TopBarDrawer(props) {
  const { toggleDrawer, open, setParallelView } = props;
  const location = useLocation();
  const path = location?.pathname;

  const { t } = useTranslation();
  return (
    <Drawer
      anchor={"bottom"}
      open={open}
      border
      sx={{
        "& .MuiPaper-root": {
          width: "198px",
          paddingTop: "0px",
          paddingBottom: { md: 21.5, xs: 27 },
        },
      }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem
          disablePadding
          sx={{
            "&:hover": {
              color: BLACK,
            },
          }}
        >
          <ListItemButton
            component={Link}
            to={"/read"}
            disabled={path.startsWith("/read")}
            sx={{
              "&:hover": {
                color: BLACK,
              },
            }}
          >
            <ListItemIcon sx={{ color: BLACK }}>
              {<i className="material-icons">local_library</i>}
            </ListItemIcon>
            <ListItemText primary={t("readTopBarBtn")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to={"/study"}
            disabled={path.startsWith("/study")}
            sx={{
              "&:hover": {
                color: BLACK,
              },
            }}
          >
            <ListItemIcon sx={{ color: BLACK }}>
              {<i className="material-icons">menu_book</i>}
            </ListItemIcon>
            <ListItemText primary={t("studyBibleTopBarBtn")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to={"/biblestories"}
            disabled={path.startsWith("/biblestories")}
            sx={{
              "&:hover": {
                color: BLACK,
              },
            }}
          >
            <ListItemIcon sx={{ color: BLACK }}>
              {<i className="material-icons">auto_stories</i>}
            </ListItemIcon>
            <ListItemText primary={t("bibleStoriesText")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to={"/study"}
            onClick={setParallelView}
            sx={{
              "&:hover": {
                color: BLACK,
              },
            }}
          >
            <ListItemIcon sx={{ color: BLACK }}>
              {<i className="material-icons">sign_language</i>}
            </ListItemIcon>
            <ListItemText primary={t("ISLVBibleText")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to={"/songs"}
            disabled={path.startsWith("/songs")}
            sx={{
              "&:hover": {
                color: BLACK,
              },
            }}
          >
            <ListItemIcon sx={{ color: BLACK }}>
              {<i className="material-icons">music_note</i>}
            </ListItemIcon>
            <ListItemText primary={t("songsText")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to={"/audiobible"}
            disabled={path.startsWith("/audiobible")}
            sx={{
              "&:hover": {
                color: BLACK,
              },
            }}
          >
            <ListItemIcon sx={{ color: BLACK }}>
              {<i className="material-icons">headphones</i>}
            </ListItemIcon>
            <ListItemText primary={t("audioBibleText")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href="https://vachandev-um.netlify.app/"
            target="_blank"
            sx={{
              "&:hover": {
                color: BLACK,
              },
            }}
          >
            <ListItemIcon sx={{ color: BLACK }}>
              <HelpOutlineIcon />
            </ListItemIcon>
            <ListItemText
              primary={t("landingHelpBtn")}
              sx={{
                "&:hover": {
                  color: BLACK,
                },
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href="https://forms.office.com/r/qiV0Ym335M"
            target="_blank"
            sx={{
              "&:hover": {
                color: BLACK,
              },
            }}
          >
            <ListItemIcon sx={{ color: BLACK }}>
              {" "}
              <FeedbackOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={t("landingFooterFeedbackBtn")} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
