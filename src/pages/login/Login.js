import { Backdrop, Stack } from "@mui/material";
import React, { useContext } from "react";
import Loader from "../../components/loader/Loader";
import ChatContext, {
  initialLoginValues,
  loginUserLink,
} from "../../context/ChatContext";
import {
  StyledButton,
  StyledGlassContainer,
  StyledText,
  StyledTextField,
} from "../../styles/StyledComponents";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {
    loginDetails,
    setLoginDetails,
    setIsLoginPage,
    loading,
    setLoading,
    errorToast,
    successToast,
    setIsLoggedIn,
    setLoggedInUser,
    setUsers,
  } = useContext(ChatContext);

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const loginUserHandler = async () => {
    try {
      setLoading(true);
      const loginResult = await axios.post(loginUserLink, loginDetails);

      if (loginResult.status === 200) {
        successToast(loginResult.data.msg);
        setIsLoggedIn(true);
        setLoggedInUser(loginDetails.username);
        setUsers(loginResult.data.users);
        navigate("/chat");
      }
      setLoginDetails(initialLoginValues);
      setLoading(false);

      if (loginResult.status !== 200) {
        errorToast(loginResult.data.msg);
      }
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
          Login
        </StyledText>

        <Stack direction="column" gap={2}>
          <div>
            <StyledText>username</StyledText>
            <StyledTextField
              type="text"
              name="username"
              value={loginDetails.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <StyledText>password</StyledText>
            <StyledTextField
              type="password"
              name="password"
              value={loginDetails.password}
              onChange={handleChange}
            />
          </div>
          <StyledText sx={{ fontSize: "small" }}>
            no account?
            <span
              style={{ color: "#1864ab", cursor: "pointer" }}
              onClick={() => setIsLoginPage(false)}
            >
              {" "}
              Register
            </span>
          </StyledText>
          <StyledButton variant="contained" onClick={loginUserHandler}>
            login
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

export default Login;
