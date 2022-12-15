import {
  Box,
  Container,
  TextField,
  Stack,
  Button,
  Avatar,
  Divider,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import { BiSend } from "react-icons/bi";
import socketIo from "socket.io-client";
import React, { useContext, useEffect, useState } from "react";
import ChatBackground from "../../assets/chatBg.jpg";
import { StyledText } from "../../styles/StyledComponents";
import { HiDotsVertical } from "react-icons/hi";
import { AiOutlineLogout } from "react-icons/ai";
import ChatContext, {
  roomAddMessageLink,
  roomConversationsLink,
  roomIdLink,
} from "../../context/ChatContext";
import axios from "axios";
import SingleMessage from "../../components/singleMessage/SingleMessage";
import MsgLoader from "../../components/msgLoader/MsgLoader";

const ENDPOINT = "http://localhost:8000";
const socket = socketIo(ENDPOINT);

const Chat = () => {
  const [sentMsg, setsentMsg] = useState("");
  const [selectedFriend, setSelectedFriend] = useState("");
  const [badge, setBadge] = useState({});
  const [typing, setTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const {
    setIsLoggedIn,
    loggedInUser,
    users,
    roomId,
    setRoomId,
    conversations,
    setConversations,
    loading,
    setLoading,
  } = useContext(ChatContext);

  //setting material ui anchor for logout button
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //getting the private chats of specific friend that the logged in user chooses
  const getChat = async (friend) => {
    //defining array of users for private chat
    const currentConversationUsers = [loggedInUser, friend.username];
    setSelectedFriend(friend.username);

    //fetching roomId
    try {
      setLoading(true);
      const currentRoomId = await axios.post(roomIdLink, {
        users: currentConversationUsers,
      });

      //setting roomId after fetching it from api
      setRoomId(currentRoomId.data);

      //joining the new room
      socket.emit("join-room", currentRoomId.data);

      //getting the conversations for the first time
      await axios
        .post(roomConversationsLink, { roomId: currentRoomId.data })
        .then(({ data }) => setConversations(data));

      setLoading(false);
    } catch (error) {
      console.log(error);
    }

    //leaving the previous room before joining new one
    if (roomId) {
      socket.emit("leave-room", roomId);
    }
  };

  const sendMsg = async () => {
    //defining message to be sent to user on the other end
    const singleMessage = {
      roomId: roomId,
      sender: loggedInUser,
      receiver: selectedFriend,
      message: sentMsg,
      time: new Date(),
    };

    //checking if the friend user want to send the message to is selected or not
    if (singleMessage.receiver) {
      socket.emit("sentMessage", singleMessage);
      setConversations([...conversations, singleMessage]);
      setsentMsg("");

      //if the recipiant friend is not selected
    } else {
      alert("please select the friend you want to deliver this message!!");
      return;
    }

    //fetching the conversation between friends sorted by time
    try {
      await axios.post(roomAddMessageLink, singleMessage);
    } catch (error) {
      console.log(error);
    }
  };

  //defining function for typing functionality
  const handleInput = (e) => {
    //getting input from textfield
    setsentMsg(e.target.value);
    //emitting to backend that connected user has started typing
    socket.emit("typing-started", roomId);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    //emitting to backend that connected user has stopped typing
    setTypingTimeout(
      setTimeout(() => {
        socket.emit("typing-stopped", roomId);
      }, 1000)
    );
  };

  useEffect(() => {
    //socket event when user is online
    socket.on("user-status-online", (onlineUsers) => {
      console.log(onlineUsers);
      setBadge(onlineUsers);
    });

    //socket event when user receives a message
    socket.on("receivedMessage", (msg) => {
      setConversations([...conversations, msg]);
    });

    //socket event when user started typing
    socket.on("typing-status-started", () => {
      setTyping(true);
    });

    //socket event when user stopped typing
    socket.on("typing-status-stopped", () => {
      setTyping(false);
    });
  });

  //socket event when user comes online
  useEffect(() => {
    if (loggedInUser) {
      socket.emit("user-online", loggedInUser);
    }
  }, [loggedInUser]);

  return (
    <>
      <Box
        sx={{
          background: `url("${ChatBackground}")`,
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingTop: "3rem",
        }}
      >
        <Container
          sx={{
            display: "flex",
            gap: 5,
            marginTop: "1rem",
            padding: "3rem 2rem",
            height: "80%",
            background: "rgba(255,255,255,0.4)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,.3)",
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              padding: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              "&::-webkit-scrollbar": {
                width: "0.2rem",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,.1)",
              },
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <Badge
                  color="success"
                  overlap="circular"
                  variant="dot"
                  sx={{ display: { xs: "none", md: "block" } }}
                >
                  <Avatar
                    src="https://i.pravatar.cc/50"
                    sx={{
                      height: "2rem",
                      width: "2rem",
                      display: { xs: "none", md: "block" },
                    }}
                  />
                </Badge>
                <StyledText>{loggedInUser}</StyledText>
              </div>
              <HiDotsVertical
                style={{ cursor: "pointer" }}
                onClick={handleClick}
                id="profile--button"
                aria-controls={open ? "profile--menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                color="inherit"
              />
              <Menu
                anchorEl={anchorEl}
                id="profile--menu"
                open={open}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                    onClick={() => setIsLoggedIn(false)}
                  >
                    <AiOutlineLogout color="red" />
                    <StyledText>logout</StyledText>
                  </Box>
                </MenuItem>
              </Menu>
            </div>
            <Divider />
            <StyledText sx={{ fontWeight: 500, fontSize: "1.2rem" }}>
              Friends
            </StyledText>
            <Divider />

            {users
              .filter((users) => users.username !== loggedInUser)
              .map((user) => (
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={2}
                  sx={{
                    cursor: "pointer",
                    padding: "0.5rem",
                    borderRadius: "16px",
                    backgroundColor:
                      selectedFriend === user.username ? "#ffc078" : "",
                  }}
                  onClick={() => getChat(user)}
                  key={user._id}
                >
                  <Badge
                    color={
                      Object.values(badge).includes(user.username)
                        ? "success"
                        : "error"
                    }
                    overlap="circular"
                    variant="dot"
                    sx={{ display: { xs: "none", md: "block" } }}
                  >
                    <Avatar
                      src="https://i.pravatar.cc/50"
                      sx={{
                        height: "1.5rem",
                        width: "1.5rem",
                      }}
                    />
                  </Badge>
                  <StyledText>{user.username}</StyledText>
                </Stack>
              ))}
          </Box>
          <Box
            sx={{
              flex: 4,
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  width: "0.2rem",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(0,0,0,.1)",
                },
              }}
            >
              {loading ? (
                <MsgLoader />
              ) : conversations.length === 0 ? (
                <StyledText>Welcome to chat bees !!</StyledText>
              ) : (
                conversations.map((message, index) => (
                  <SingleMessage message={message} key={index} />
                ))
              )}
            </Box>
            <Stack
              direction="row"
              gap={3}
              justifyContent="space-between"
              alignItems="center"
              sx={{ marginTop: "2rem", position: "relative" }}
            >
              {typing && (
                <StyledText
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: "-2rem",
                    color: "#fff",
                    fontWeight: 400,
                  }}
                >
                  Typing...
                </StyledText>
              )}
              <TextField
                size="small"
                fullWidth
                color="warning"
                focused
                value={sentMsg}
                onChange={handleInput}
              />
              <Button
                variant="contained"
                color="success"
                onClick={sendMsg}
                endIcon={<BiSend />}
              >
                send
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Chat;
