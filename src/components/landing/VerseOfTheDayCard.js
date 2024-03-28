import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useTheme } from "@mui/material/styles";

const Heading = styled("h2")(() => ({
  textTransform: "capitalize",
  textAlign: "center",
}));

const VerseOfTheDayCard = (props) => {
  const { verseObj } = props;
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        marginBottom: 8.25,
        boxShadow: "rgb(0 0 0 / 50%) 0px 3px 10px 0px",
        padding: 2.5,
        borderRadius: 4,
        marginX: 1.5,
      }}
    >
      <Heading style={{ textTransform: "capitalize" }}>
        {t("landingVerseHeading")}
      </Heading>
      <Typography sx={{ textAlign: "center", fontSize: "1.5rem" }}>
        {verseObj ? verseObj.verseContent?.text : ""}
      </Typography>
      <Box
        sx={{
          fontStyle: "italic",
          textAlign: "center",
          fontSize: { lg: "1.3rem", sx: "1rem" },
          [theme.breakpoints.down("xs")]: {
            fontSize: "0.9rem",
          },
        }}
      >
        {verseObj?.reference}
      </Box>
    </Box>
  );
};
const mapStateToProps = (state) => {
  return {
    verseObj: state.local.verseObj,
  };
};
export default connect(mapStateToProps)(VerseOfTheDayCard);
