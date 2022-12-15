import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import React from "react";

const StyledBox = styled("div")({
  height: "8px",
  width: "8px",
  backgroundColor: "#fca61f",
  borderRadius: "50%",
});

const Loader = () => {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <motion.div
          animate={{ y: [0, -12, -12, 0] }}
          transition={{ repeat: Infinity }}
        >
          <StyledBox />
        </motion.div>
        <Typography variant="h5" sx={{ marginLeft: "0.8rem" }}>
          Please wait...
        </Typography>
      </Box>
    </motion.div>
  );
};

export default Loader;
