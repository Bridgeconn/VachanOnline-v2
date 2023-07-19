import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { BLACK } from "../../store/colorCode";

const useStyles = makeStyles((theme) => ({
  menu: {
    textAlign: "center",
    width: "100%",
    display: "inline-block",
    fontSize: 18,
  },
  margin: {
    height: theme.spacing(5),
  },
  settings: {
    padding: 0,
    width: "30px",
    marginTop: -46,
    float: "right",
    marginLeft: "-10px",
    marginRight: "20px",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
    },
  },
  root: {
    color: BLACK,
  },
  settingsMenu: {
    maxHeight: 68 * 4.5,
    width: 250,
  },
}));

const Setting = (props) => {
  const { fontSize, setFontSize } = props;
  const [settingsAnchor, setSettingsAnchor] = useState(null);
  const classes = useStyles();

  const open = Boolean(settingsAnchor);

  function openSettings(event) {
    setSettingsAnchor(event.currentTarget);
  }
  function closeSettings() {
    setSettingsAnchor(null);
  }
  const handleSliderChange = (event, newValue) => {
    setFontSize(newValue);
  };

  return (
    <div>
      <Tooltip
        title="Settings"
        className={classes.settings}
        aria-label="More"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={openSettings}
      >
        <i className="material-icons md-23">more_vert</i>
      </Tooltip>
      <Menu
        id="long-menu"
        anchorEl={settingsAnchor}
        keepMounted
        open={open}
        onClose={closeSettings}
        PaperProps={{
          className: classes.settingsMenu,
        }}
      >
        <MenuItem className={classes.menu}>Font Size</MenuItem>
        <Divider />
        <MenuItem className={classes.menu}>
          <div className={classes.margin} />
          <Slider
            defaultValue={20}
            value={fontSize}
            onChange={handleSliderChange}
            valueLabelDisplay="on"
            min={12}
            max={30}
            classes={{ root: classes.root }}
          />
        </MenuItem>
      </Menu>
    </div>
  );
};
export default Setting;
