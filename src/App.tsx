import "./App.css"
import React, { useState } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Header, Footer } from "./components"
import { AppRouter } from "./components"
import AppLoading from "./components/AppLoading/index"
import "@fontsource/merriweather"
import "@fontsource/merriweather/700.css"
import "@fontsource/work-sans"
import "@fontsource/work-sans/300.css"
import "@fontsource/work-sans/500.css"
import { ScrollButton } from "./components/ScrollButton"
import AlertComponent from "./components/Alert"

const App: React.FC = () => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 300) {
      setVisible(true)
    } else if (scrolled <= 300) {
      setVisible(false)
    }
  }
  window.addEventListener("scroll", toggleVisible)
  return (
    <ThemeProvider
      theme={createTheme({
        typography: {
          fontFamily: "Work Sans",
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: () => ({
                backgroundColor: "#66dfd5",
                textTransform: "none",
                color: "#221c35",
                border: "0 !important",
                borderRadius: 0,
                "&:hover": {
                  backgroundColor: "#4cebde",
                },
              }),
            },
          },
          MuiCheckbox: {
            styleOverrides: {
              root: () => ({
                borderRadius: "2px",
                marginRight: "9px",
                width: "20px",
                height: "20px",
                background: "#F4F4F4",
                color: "transparent",
                "&:hover": {
                  boxShadow: "0 0 0 0.2rem rgb(103,223,212,0.5)",
                },
                "&.Mui-checked": {
                  color: "#66DFD5",
                  background: "black",
                },
                svg: {
                  fontSize: 28,
                },
              }),
            },
          },
          MuiInput: {
            styleOverrides: {
              root: () => ({
                height: "40px",
                background: "#f4f4f4",
                borderRadius: "0 !important",
                padding: "8px 15px 8px 12px",
                fontWeight: 300,
                fontSize: "14px",
                lineHeight: "24px",
                color: "#221C35",
                outline: "none",
                "&.Mui-focused": {
                  outline: "1px auto #00e2d6",
                  backgroundColor: "#fff",
                  ".MuiSelect-select": {
                    backgroundColor: "transparent",
                  },
                },
                ".MuiInputAdornment-root>.MuiTypography-root": {
                  fontWeight: 300,
                  fontSize: "14px",
                  lineHeight: "24px",
                  color: "#221C35",
                },
              }),
            },
          },
          MuiRadio: {
            styleOverrides: {
              root: () => ({
                width: "22px",
                height: "22px",
                marginRight: "9px",
                "&.Mui-checked": {
                  color: "#221C35",
                },
              }),
            },
          },
          MuiFormControlLabel: {
            styleOverrides: {
              root: () => ({
                marginLeft: 0,
              }),
            },
          },
          MuiMenuItem: {
            styleOverrides: {
              root: () => ({
                height: "40px",
                "&:hover": {
                  background: "#00E2D6 !important",
                },
              }),
            },
          },
        },
      })}
    >
      <AlertComponent />
      <Header />
      <AppRouter />
      <Footer />
      <AppLoading />
      {visible && <ScrollButton />}
    </ThemeProvider>
  )
}

export default App
