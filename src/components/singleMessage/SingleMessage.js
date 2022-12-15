import React, { useContext } from "react";
import { Box } from "@mui/material";
import { StyledText } from "../../styles/StyledComponents";
import ChatContext from "../../context/ChatContext";

const SingleMessage = ({ message }) => {
  const { loggedInUser } = useContext(ChatContext);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 0.5,
        flexDirection: "column",
        marginLeft: message.sender === loggedInUser ? "auto" : "",
        alignItems: message.sender === loggedInUser ? "flex-end" : "flex-start",
        width: "60%",
      }}
    >
      <StyledText
        sx={{
          backgroundColor:
            message.sender === loggedInUser ? "#fd7e14" : "#dee2e6",
          borderRadius:
            message.sender === loggedInUser
              ? "15px 0px 15px 15px"
              : "0px 15px 15px 15px",
          padding: "0.5rem",
          fontSize: "1rem",
          fontWeight: 500,
          wordWrap: "break-word",
          color: message.sender === loggedInUser ? "#fff" : "#000",
        }}
      >
        {message.message}
      </StyledText>
    </Box>
  );
};

export default SingleMessage;
