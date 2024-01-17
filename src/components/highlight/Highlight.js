import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import BorderColor from "@mui/icons-material/BorderColor";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import Circle from "@mui/icons-material/LensRounded";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { useFirebase } from "react-redux-firebase";
import * as color from "../../store/colorCode";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  info: {
    padding: 0,
    width: "30px",
    marginTop: 20,
    marginRight: 4,
    cursor: "pointer",
  },
  colorBox: {
    padding: 6,
    [theme.breakpoints.down('md')]: {
      display: "flex",
    },
  },
  popover: {
    marginTop: 4,
    borderRadius: 10,
  },
  yellow: {
    color: color.YELLOW,
  },
  green: {
    color: color.GREEN,
  },
  cyan: {
    color: color.CYAN,
  },
  pink: {
    color: color.PINK,
  },
  orange: {
    color: color.ORANGE,
  },
}));

function Highlight(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const firebase = useFirebase();
  const { selectedVerses, setSelectedVerses, refUrl, highlights, mobileView } =
    props;

  const { t } = useTranslation();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const colors = [
    { code: "a", class: classes.yellow },
    { code: "b", class: classes.green },
    { code: "c", class: classes.cyan },
    { code: "d", class: classes.pink },
    { code: "e", class: classes.orange },
  ];
  const open = Boolean(anchorEl);
  const colorClicked = (event) => {
    const color = event.currentTarget.getAttribute("data-code");
    //close popover
    setAnchorEl(null);
    //append a if no color set ie default yellow for old data
    //remove old highlights for selected verses
    let newHighlights = highlights
      .map((a) => (a.toString().includes(":") ? a : a + ":a"))
      .filter((a) => !selectedVerses.includes(parseInt(a.split(":")[0])));
    //add highlight with current color for selected verses if color not clear
    if (color !== "clear") {
      const colorVerses = selectedVerses.map((a) => `${a}:${color}`);
      newHighlights = newHighlights.concat(colorVerses).sort((a, b) => {
        return parseInt(a + "".split(":")[0]) - parseInt(b + "".split(":")[0]);
      });
    }
    return firebase.ref(refUrl).set(newHighlights, function (error) {
      if (error) {
        console.log("Highlight update error");
      } else {
        setSelectedVerses([]);
      }
    });
  };
  return (
    <div>
      {mobileView ? (
        <div className={classes.colorBox}>
          {colors.map((color, i) => (
            <Circle
              key={i}
              data-code={color.code}
              onClick={colorClicked}
              fontSize="large"
              className={color.class}
            />
          ))}
          <Tooltip title={t("ClearHighlightToolTip")}>
            <NotInterestedIcon
              data-code="clear"
              onClick={colorClicked}
              fontSize="large"
              color="disabled"
            />
          </Tooltip>
        </div>
      ) : (
        <>
          <div className={classes.info} onClick={handleClick}>
            <Tooltip title={t("highlightsText")}>
              <BorderColor fontSize="small" />
            </Tooltip>
          </div>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            classes={{ paper: classes.popover }}
          >
            <div className={classes.colorBox}>
              {colors.map((color, i) => (
                <Circle
                  key={i}
                  data-code={color.code}
                  onClick={colorClicked}
                  fontSize="large"
                  className={color.class}
                />
              ))}
              <Tooltip title={t("ClearHighlightToolTip")}>
                <NotInterestedIcon
                  data-code="clear"
                  onClick={colorClicked}
                  fontSize="large"
                  color="disabled"
                />
              </Tooltip>
            </div>
          </Popover>
        </>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    mobileView: state.local.mobileView,
  };
};
export default connect(mapStateToProps)(Highlight);
