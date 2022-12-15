import { Backdrop, Stack } from "@mui/material";
import React, { useContext } from "react";
import ChatContext, {
  initialRegisterValues,
  registerUserLink,
} from "../../context/ChatContext";
import axios from "axios";
import {
  StyledGlassContainer,
  StyledText,
  StyledTextField,
  StyledButton,
} from "../../styles/StyledComponents";
import Loader from "../../components/loader/Loader";

const Register = () => {
  const {
    setIsLoginPage,
    registerDetails,
    setRegisterDetails,
    loading,
    setLoading,
    errorToast,
    successToast,
  } = useContext(ChatContext);

  const handleChange = (e) => {
    setRegisterDetails({ ...registerDetails, [e.target.name]: e.target.value });
  };

  const handleRegisterUser = async () => {
    if (registerDetails.password !== registerDetails.confirmPassword) {
      errorToast("Password mismatched !!");
      setRegisterDetails(initialRegisterValues);
      return;
    }

    try {
      setLoading(true);
      const registrationDetails = await axios.post(
        registerUserLink,
        registerDetails
      );

      registrationDetails.status === 200
        ? successToast(registrationDetails.data.msg)
        : errorToast(registrationDetails.data.msg);

      setRegisterDetails(initialRegisterValues);
      setIsLoginPage(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StyledGlassContainer
        sx={{ marginLeft: { md: "12rem", xs: 0 }, marginTop: "7rem" }}
      >
        <StyledText variant="h4" component="div" mb={3}>
          Register
        </StyledText>
        <Stack direction="column" gap={2}>
          <div>
            <StyledText>username</StyledText>
            <StyledTextField
              size="small"
              label="username"
              type="text"
              name="username"
              value={registerDetails.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <StyledText>password</StyledText>
            <StyledTextField
              size="small"
              label="password"
              type="password"
              name="password"
              value={registerDetails.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <StyledText>confirm password</StyledText>
            <StyledTextField
              size="small"
              label="password"
              type="password"
              name="confirmPassword"
              value={registerDetails.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <StyledText sx={{ fontSize: "small" }}>
            Already have an account?{" "}
            <span
              style={{ color: "#1864ab", cursor: "pointer" }}
              onClick={() => setIsLoginPage(true)}
            >
              Login
            </span>
          </StyledText>
          <StyledButton variant="contained" onClick={handleRegisterUser}>
            Register
          </StyledButton>
        </Stack>
      </StyledGlassContainer>
      <div>
        <Backdrop
          sx={{
            color: "#fff",
            backdropFilter: "blur(5px)",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={loading}
        >
          <Loader />
        </Backdrop>
      </div>
    </>
  );
};

export default Register;
