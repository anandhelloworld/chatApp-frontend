import { Button, styled, Typography } from "@mui/material";

export const StyledText = styled(Typography)({
  fontWeight: "bold",
  fontFamily: "'Nunito', sans-serif",
});

export const StyledBeeImage = styled("img")({
  position: "absolute",
  top: "7rem",
  right: 0,
  width: "50%",
});

export const StyledSideBeeImage = styled("img")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "15rem",
});

export const StyledGlassContainer = styled("div")({
  background: "rgba(255, 255, 255, 0.05)",
  bordeRadius: "16px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(3.7px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "5px",
  padding: "3rem",
});

export const DisplayProps = {
  display: "flex",
  justifyContent: { md: "start", xs: "center" },
  alignItems: "center",
  height: "100vh",
};

export const StyledButton = styled(Button)({
  width: "7rem",
  backgroundColor: "#66a80f",
  marginTop: "1rem",
  "&:hover": {
    backgroundColor: "#94d82d",
  },
});

export const StyledTextField = styled("input")({
  width: "auto",
  padding: "0.3rem 1rem",
  fontFamily: "'Nunito', sans-serif",
  fontSize: "1rem",
  fontWeight: 600,
  border: `1px solid #ff4e00`,
  borderRadius: "15px",
  outline: "none",
  background: "#ffd43b",
});
