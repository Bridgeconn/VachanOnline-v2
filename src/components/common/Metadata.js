import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles(theme => ({
  info: {
    padding: 0,
    width: "30px",
    marginTop: 20,
    marginRight: "8px",
    color: "#1976D2",
    cursor: "pointer"
  },
  paper: {
    width: "80%"
  },
  metadataTitle: {
    fontSize: 26,
    padding: "5px 0 0 12px"
  },
  metadataTitleBar: {
    backgroundColor: "#2e639a",
    color: "#fff"
  },
  metadataHeading: {
    fontSize: 17,
    lineHeight: "28px",
    display: "block",
    textAlign: "end",
    fontWeight: 600
  },
  metadataText: {
    lineHeight: "28px",
    fontSize: 16,
    paddingLeft: 14
  },
  metadataRow: {
    "&:last-child": {
      marginBottom: 2
    },
    "&:nth-child(even)": {
      backgroundColor: "#cfd9e6"
    }
  },
  closeButton: {
    color: "inherit"
  }
}));
export default function Metadata({ metadataList, title, abbreviation }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  //metadata information popup
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const checkLink = text => {
    return text.startsWith("http") ? (
      <Link href={text} target="_blank">
        {text + " "}
      </Link>
    ) : (
      text + " "
    );
  };
  return (
    <div>
      {metadataList ? (
        <>
          <div
            aria-describedby={id}
            onClick={handleClick}
            className={classes.info}
          >
            <i className="material-icons md-23">info_outline</i>
          </div>
          <Popover
            id={id}
            className={classes.paper}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <Paper>
              <Grid
                justify="space-between" // Add it here :)
                container
                className={classes.metadataTitleBar}
              >
                <Grid item>
                  <Typography
                    type="title"
                    color="inherit"
                    className={classes.metadataTitle}
                  >
                    {metadataList[title] +
                      " (" +
                      metadataList[abbreviation] +
                      ")"}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    className={classes.closeButton}
                    size="medium"
                    onClick={() => {
                      setAnchorEl(null);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container>
                {Object.keys(metadataList)
                  .sort()
                  .map((item, i) => {
                    return item.trim() !== "" &&
                      metadataList[item].trim() !== "" ? (
                      <Grid
                        container
                        item
                        xs={12}
                        key={i}
                        alignItems="flex-start"
                        justify="flex-end"
                        className={classes.metadataRow}
                      >
                        <Grid item sm={4} className={classes.metadataHeading}>
                          {item}:
                        </Grid>
                        <Grid item sm={8} className={classes.metadataText}>
                          {metadataList[item].split(" ").map(checkLink)}
                        </Grid>
                      </Grid>
                    ) : (
                      ""
                    );
                  })}
              </Grid>
            </Paper>
          </Popover>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
