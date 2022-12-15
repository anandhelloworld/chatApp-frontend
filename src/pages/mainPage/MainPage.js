import { Box, Paper } from "@mui/material";
import LoginPageImage from "../../assets/register-login-img.png";
import SideBeeImage from "../../assets/side-bee.png";
import React, { useContext } from "react";
import {
  StyledBeeImage,
  StyledSideBeeImage,
  DisplayProps,
} from "../../styles/StyledComponents";
import Register from "../register/Register";
import ChatContext from "../../context/ChatContext";
import Login from "../login/Login";

const MainPage = () => {
  const { isLoginPage } = useContext(ChatContext);

  return (
    <Paper
      sx={{
        height: "100vh",
        backgroundImage: "linear-gradient(#ec9f05,#ff4e00)",
      }}
    >
      <StyledBeeImage
        src={LoginPageImage}
        sx={{ display: { xs: "none", md: "block" } }}
      />
      <Box sx={DisplayProps}>{isLoginPage ? <Login /> : <Register />}</Box>
      <StyledSideBeeImage src={SideBeeImage} />
    </Paper>
  );
};

export default MainPage;
