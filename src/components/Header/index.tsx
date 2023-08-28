import * as React from "react"
import Box from "@mui/material/Box"
import albaLogo from "src/resources/images/alba-logo.svg"

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = React.useState(null)

  React.useEffect(() => {
    let lastScrollY = window.pageYOffset

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset
      const direction = scrollY > lastScrollY ? "down" : "up"
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction)
      }
      lastScrollY = scrollY > 0 ? scrollY : 0
    }
    window.addEventListener("scroll", updateScrollDirection) // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection) // clean up
    }
  }, [scrollDirection])

  return scrollDirection
}

export function Header() {
  const scrollDirection = useScrollDirection()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  )

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <Box
      id="header"
      sx={{
        width: "100%",
        height: "90px",
        background: "#00E2D6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "sticky",
        zIndex: 2,
      }}
      className={scrollDirection === "down" ? "-top-24" : "top-0"}
    >
      <img src={albaLogo} alt="alba Logo" />
    </Box>
  )
}
