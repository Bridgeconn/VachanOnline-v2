import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import { styled } from "@mui/system";
import { BLACK } from "../../store/colorCode";
import { t } from "i18next";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const StyledMenuItem = styled(MenuItem)(() => ({
  textAlign: "center",
  width: "100%",
  display: "inline-block",
  fontSize: 18,
}));

const StyledSlider = styled(Slider)({
  color: BLACK,
  height: 1,
  marginTop: 5,
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: BLACK,
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const Setting = (props) => {
  const theme = useTheme();
  const { fontSize, setFontSize } = props;
  const [settingsAnchor, setSettingsAnchor] = useState(null);

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
        sx={{
          padding: 0,
          width: 30,
          marginTop: -38,
          float: "right",
          marginRight: 5,
          cursor: "pointer",
          [theme.breakpoints.down("md")]: {
            marginTop: 0,
          },
        }}
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
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ width: "250px" }}>
          <StyledMenuItem>{t("settingsFontSize")}</StyledMenuItem>
          <Divider />
          <StyledMenuItem>
            <Box
              sx={{
                height: theme.spacing(5),
              }}
            />
            <StyledSlider
              defaultValue={20}
              value={fontSize}
              onChange={handleSliderChange}
              valueLabelDisplay="on"
              min={12}
              max={30}
            />
          </StyledMenuItem>
        </Box>
      </Menu>
    </div>
  );
};
export default Setting;
