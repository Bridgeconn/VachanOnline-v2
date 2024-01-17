import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import makeStyles from '@mui/styles/makeStyles';
import { BLACK } from "../../store/colorCode";
import { t } from "i18next";

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
    width: 30,
    marginTop: -38,
    float: "right",
    marginRight: 5,
    cursor: "pointer",
    [theme.breakpoints.down('md')]: {
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
        title={t("commonSettings")}
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
        <MenuItem className={classes.menu}>{t("settingsFontSize")}</MenuItem>
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
