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
// import LogoutIcon from "@mui/icons-material/Logout";
//import SearchPassage from "../search/SearchPassage";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BLACK } from "../../store/colorCode";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
//import IconButton from "@mui/material/IconButton";

const I = styled("i")({ padding: "6px 6px 0", color: BLACK });
export default function SideDrawer(props) {
  const { toggleDrawer, open, setParallelView } = props;
  //const [hideIcons, setHideIcons] = React.useState(false);
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  //const isMobilePortrait = useMediaQuery(theme.breakpoints.down("sm"));
  //const location = useLocation();
  //const path = location?.pathname;

  const { t } = useTranslation();
  // const ISLButton = () => {
  // const Btn = () => {
  //   return mobileView ? (
  //     // eslint-disable-next-line react/jsx-no-undef
  //     <I className={`material-icons `} onClick={setParallelView}>
  //       sign_language
  //     </I>
  //   ) : (
  //     <Button
  //       variant="outlined"
  //       size="small"
  //       sx={{
  //         marginTop: 0.25,
  //         marginRight: 1.25,
  //         color: BLACK,
  //         border: "1px solid rgba(0, 0, 0, 0.23)",
  //         "&:hover": {
  //           backgroundColor: BLACK + "0a",
  //           border: "1px solid rgba(0, 0, 0, 0.23)",
  //         },
  //       }}
  //       title={t("ISLVBibleText")}
  //       aria-label="sign language bible"
  //       target="_blank"
  //       rel="noOpener"
  //       onClick={setParallelView}
  //       startIcon={<i className="material-icons">sign_language</i>}
  //     >
  //       {isTablet ? t("ISLVTopBarBtnTab") : t("ISLVBibleText")}
  //     </Button>
  //   );
  // };
  //   if (
  //     process.env.REACT_APP_SIGNBIBLE_URL === undefined ||
  //     path.startsWith("/read")
  //   ) {
  //     return "";
  //   }
  //   return path.startsWith("/study") ? Btn() : <Link to="/study">{Btn()}</Link>;
  // };

  // const searchBox = () => {
  //   return <SearchPassage setHideIcons={setHideIcons} />;
  // };
  return (
    <Drawer
      anchor={"bottom"}
      variant="temporary"
      open={open}
      border
      sx={{
        "& .MuiPaper-root": {
          width: "220px",
          paddingTop: "0px",
          paddingBottom: "170px",
        },
      }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to={"/read"}>
            <ListItemIcon>
              {<i className="material-icons">local_library</i>}
            </ListItemIcon>
            <ListItemText primary={t("readTopBarBtn")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to={"/study"}>
            <ListItemIcon>
              {<i className="material-icons">menu_book</i>}
            </ListItemIcon>
            <ListItemText primary={t("studyBibleTopBarBtn")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to={"/biblestories"}>
            <ListItemIcon>
              {<i className="material-icons">auto_stories</i>}
            </ListItemIcon>
            <ListItemText primary={t("bibleStoriesText")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            // component={Link}
            // to={"/study"}
            onClick={setParallelView}
          >
            <ListItemIcon>
              {<i className="material-icons">sign_language</i>}
            </ListItemIcon>
            <ListItemText primary={t("ISLVBibleText")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to={"/songs"}>
            <ListItemIcon>
              {<i className="material-icons">music_note</i>}
            </ListItemIcon>
            <ListItemText primary={t("songsText")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to={"/audiobible"}>
            <ListItemIcon>
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
          >
            <ListItemIcon>
              <HelpOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={t("landingHelpBtn")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href="https://forms.office.com/r/qiV0Ym335M"
            target="_blank"
          >
            <ListItemIcon>
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
