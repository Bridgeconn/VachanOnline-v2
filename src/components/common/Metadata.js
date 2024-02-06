import React from "react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { BLACK } from "../../store/colorCode";
import { useTranslation } from "react-i18next";
import { Box, popoverClasses } from "@mui/material";
export default function Metadata({
  metadataList,
  title,
  abbreviation,
  mobileView,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  //metadata information popup
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  const { t } = useTranslation();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const checkLink = (text) => {
    return text.startsWith("http") ? (
      <Link href={text} key={text} target="_blank" underline="hover">
        {text + " "}
      </Link>
    ) : (
      text + " "
    );
  };
  return (
    <>
      {metadataList ? (
        <>
          <Tooltip title={t("informationText")}>
            <Box
              aria-describedby={id}
              onClick={handleClick}
              sx={{
                padding: 0,
                width: "30px",
                marginTop: 2.5,
                marginRight: 0.5,
                color: BLACK,
                cursor: "pointer",
              }}
            >
              <i className="material-icons md-23">info_outline</i>
            </Box>
          </Tooltip>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{
              [`& .${popoverClasses.paper}`]: {
                width: { lg: "40%", xs: "95%" },
                minWidth: { lg: 550, md: 600, xs: "unset" },
              },
            }}
          >
            <Paper>
              <Grid
                justifyContent="space-between" // Add it here :)
                container
                sx={{
                  boxShadow: 4,
                  marginBottom: 0.5,
                  color: BLACK,
                }}
              >
                <Grid item>
                  <Typography
                    type="title"
                    color="inherit"
                    sx={{
                      fontSize: "1.3em",
                      paddingTop: 1.375,
                      paddingBottom: 0,
                      paddingLeft: 1.5,
                      paddingRight: 0,
                    }}
                  >
                    {mobileView
                      ? metadataList[abbreviation]
                      : metadataList[title] +
                        " (" +
                        metadataList[abbreviation] +
                        ")"}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    sx={{
                      color: "inherit",
                    }}
                    size="medium"
                    onClick={() => {
                      setAnchorEl(null);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  maxHeight: { sm: "80vh" },
                  overflow: { sm: "scroll" },
                }}
              >
                {Object.keys(metadataList)
                  .sort()
                  .map((item, i) => {
                    const ignoredKeys = ["baseUrl", "Latest", "VerseLabel"];
                    if (ignoredKeys.includes(item)) {
                      return null;
                    } else {
                      return item.trim() !== "" &&
                        metadataList[item].trim() !== "" ? (
                        <Grid
                          container
                          item
                          xs={12}
                          key={i}
                          alignItems="flex-start"
                          sx={{
                            paddingLeft: 0.625,
                            ":last-child": {
                              marginBottom: 0.25,
                            },
                            ":nth-child(even)": {
                              backgroundColor: "#eaeaea",
                            },
                          }}
                        >
                          <Grid
                            item
                            md={4}
                            sx={{
                              fontSize: 17,
                              lineHeight: "28px",
                              display: "block",
                              fontWeight: 600,
                            }}
                          >
                            {item} :
                          </Grid>
                          <Grid
                            item
                            md={8}
                            sx={{
                              lineHeight: "28px",
                              fontSize: 16,
                              paddingLeft: { sm: 0.625, lg: 1.75 },
                            }}
                          >
                            {metadataList[item].split(" ").map(checkLink)}
                          </Grid>
                        </Grid>
                      ) : (
                        ""
                      );
                    }
                  })}
              </Grid>
            </Paper>
          </Popover>
        </>
      ) : (
        ""
      )}
    </>
  );
}
