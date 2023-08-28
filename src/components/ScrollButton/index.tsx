import { Box, Button } from "@mui/material"
import React from "react"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
export const ScrollButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <Box
      sx={{
        position: "fixed",
        right: 1,
        bottom: 1,
        zIndex: 1,
        cursor: "pointer",
      }}
    >
      <Button onClick={scrollToTop} sx={{ width: 5 }}>
        <ArrowDropUpIcon fontSize="large" />
      </Button>
    </Box>
  )
}
