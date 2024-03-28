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
import { SETVALUE } from "../../store/actions";
import { SIGNBIBLE } from "../../store/views";
import { connect } from "react-redux";
const I = styled("i")({ padding: "6px 6px 0", color: BLACK });
function TopBarDrawer(props) {
  const { toggleDrawer, open, setParallelView, parallelView } = props;
  const location = useLocation();
  const path = location?.pathname;

  const { t } = useTranslation();
  return (
    <Drawer
      open={open}
      border
      sx={{
        "& .MuiPaper-root": {
          width: "198px",
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
              {<I className="material-icons">local_library</I>}
            </ListItemIcon>
            <ListItemText primary={t("readTopBarBtn")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to={"/study"}
            onClick={() => setParallelView(null)}
            disabled={path.startsWith("/study") && parallelView !== "SIGNBIBLE"}
            sx={{
              "&:hover": {
                color: BLACK,
              },
            }}
          >
            <ListItemIcon sx={{ color: BLACK }}>
              {<I className="material-icons">menu_book</I>}
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
              {<I className="material-icons">auto_stories</I>}
            </ListItemIcon>
            <ListItemText primary={t("bibleStoriesText")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to={"/study"}
            onClick={() => setParallelView(SIGNBIBLE)}
            sx={{
              "&:hover": {
                color: BLACK,
              },
            }}
            disabled={path.startsWith("/study") && parallelView === "SIGNBIBLE"}
          >
            <ListItemIcon sx={{ color: BLACK }}>
              {<I className="material-icons">sign_language</I>}
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
              {<I className="material-icons">music_note</I>}
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
              {<I className="material-icons">headphones</I>}
            </ListItemIcon>
            <ListItemText primary={t("audioBibleText")} />
          </ListItemButton>
        </ListItem>
        {process.env.REACT_APP_DOCUMENT_URL && (
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href={process.env.REACT_APP_DOCUMENT_URL}
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
        )}
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
const mapStateToProps = (state) => {
  return {
    parallelView: state.local.parallelView,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setParallelView: (value) =>
      dispatch({ type: SETVALUE, name: "parallelView", value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TopBarDrawer);
