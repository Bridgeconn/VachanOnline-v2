import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";

const Setting = (props) => {
  const {
    root,
    settingsAnchor,
    closeSettings,
    open,
    margin,
    menu,
    handleSliderChange,
    openSettings,
    fontSize,
    settings,
    settingsMenu,
  } = props;
  return (
    <div>
      <Tooltip
        title="Settings"
        className={settings}
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
          className: settingsMenu,
        }}
      >
        <MenuItem className={menu}>Font Size</MenuItem>
        <Divider />
        <MenuItem className={menu}>
          <div className={margin} />
          <Slider
            defaultValue={20}
            value={fontSize}
            onChange={handleSliderChange}
            valueLabelDisplay="on"
            min={12}
            max={30}
            classes={{ root: root }}
          />
        </MenuItem>
      </Menu>
    </div>
  );
};
export default Setting;
