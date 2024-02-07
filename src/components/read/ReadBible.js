import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material/";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { getSignBible } from "../common/utility";
import BiblePane from "./BiblePane";
import TopBar from "./TopBar";
const ReadBible = (props) => {
  const theme = useTheme();
  let { setValue, setValue1, panel1, signBible } = props;
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
    if (isMobile) {
      setValue("mobileView", true);
    } else {
      setValue("mobileView", false);
    }
  }, [isMobile, setValue]);
  React.useEffect(() => {
    //if sign bible not loaded fetch sign bible
    if (
      signBible.length === 0 &&
      process.env.REACT_APP_SIGNBIBLE_URL !== undefined
    ) {
      getSignBible(setValue);
    }
  }, [signBible.length, setValue]);

  return (
    <>
      <TopBar />
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "#fff",
          borderRight: "1px solid #f7f7f7",
          overflow: "hidden",
        }}
      >
        <BiblePane setValue={setValue1} paneData={panel1} singlePane={true} />
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    panel1: state.local.panel1,
    signBible: state.local.signBible,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setValue1: (name, value) => {
      dispatch({ type: actions.SETVALUE1, name: name, value: value });
    },
    setValue: (name, value) =>
      dispatch({ type: actions.SETVALUE, name: name, value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReadBible);
