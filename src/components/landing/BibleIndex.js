import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import BookCombo from "../common/BookCombo";
import Version from "../common/Version";
import BigTooltip from "../common/BigTooltip";
import { BLACK, GREY, WHITE } from "../../store/colorCode";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";

const BibleIndex = (props) => {
  const theme = useTheme();
  const { panel1, setValue, versionBooks, versionSource } = props;
  const { version, book, bookCode, sourceId, chapter, verseData, language } =
    panel1;

  const { t } = useTranslation();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        marginBottom: "-40px",
        [theme.breakpoints.down("sm")]: {
          marginBottom: "-10px",
        },
        justifyContent:"center"
      }}
    >
      <Paper
        sx={{
            margin: "auto",
            position: "relative",
            bottom: "70px",
            height: "auto",
            padding: "15px 30px",
            backgroundColor: WHITE,
            [theme.breakpoints.down("sm")]: {
              bottom: "25px",
              width: "100%",
            },
        }}
        elevation={3}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: BLACK,
            textAlign: "center",
            fontSize: "20px",
            paddingTop: "10px",
          }}
        >
          {t("landingSelectBibleHeading")}
        </Typography>
        <Box
          sx={{
            [theme.breakpoints.down("md")]: {
              display: "flex",
              whiteSpace: "nowrap",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          <Version
            setValue={props.setValue}
            version={version}
            landingPage={true}
            bookCode={bookCode}
            chapter={chapter}
            verseData={verseData}
            language={language}
          />
          {bookCode !== "" && bookCode !== undefined ? (
            <BookCombo
              book={book}
              bookCode={bookCode}
              bookList={versionBooks[versionSource[sourceId]]}
              chapter={chapter}
              setValue={setValue}
              minimal={false}
              landingPage={true}
            />
          ) : (
            ""
          )}
          <Link
            to={{
              pathname: "/study",
            }}
          >
            <BigTooltip title={t("landingStartBtnToolTip")}>
              <Button
                variant="contained"
                sx={{
                  margin: theme.spacing(1.5),
                  backgroundColor: "#fff",
                  boxShadow: "1px 1px 1px 1px " + GREY,
                  height: "42px",
                  "& hover": {
                    textDecoration: "none",
                  },
                  [theme.breakpoints.down("md")]: {
                    margin: "0px",
                    width: "60%",
                    marginTop: "0px",
                    marginBottom: "2px",
                  },
                  [theme.breakpoints.only("sm")]: {
                    margin: theme.spacing(1.5),
                  },
                  color:BLACK
                }}
              >
                {t("landingStartBtn")}
              </Button>
            </BigTooltip>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    panel1: state.local.panel1,
    versionBooks: state.local.versionBooks,
    versionSource: state.local.versionSource,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE1, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BibleIndex);
