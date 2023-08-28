import React from "react"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import "./Footer.scss"
import linkedImage from "src/resources/images/linkedin.png"
import FSCS_Protected from "src/resources/images/FSCS_Protected.svg"
import SearchIcon from "@mui/icons-material/Search"
import { Button } from "@mui/material"

export const Footer: React.FC = () => {
  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>
        {new Date().getFullYear()}
      </Typography>
    )
  }

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#00e2d6",
          padding: "50px 0px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ alignItems: "center", flexDirection: "column" }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Merriweather",
              fontSize: "44px",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            We're here to help
          </Typography>
          <Typography sx={{ fontSize: 24, fontWeight: 300, marginTop: "10px" }}>
            Alba Bank - For the next step on your business journey.
          </Typography>
        </Box>

        <Box className="link custom-btn" sx={{ borderBottom: "1px solid" }}>
          <Button
            href="/contact/"
            sx={{
              color: "#221c35",
              fontSize: "16px",
              lineHeight: "24px",
              fontWeight: 400,
              marginTop: "15px",
              textTransform: "none",
              padding: "2px 0",
              background: "transparent !important",
            }}
          >
            Talk to us today
          </Button>
        </Box>
      </Box>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-item   col-lg-3 col-md-5 col-12 col">
              <div
                className="item  item_text-below text-left "
                data-os-animation=""
                data-os-animation-delay=""
              >
                <div className="inner  ">
                  <div className="info info_align-bottom">
                    <p className="heading footer-heading">Alba Bank Limited</p>
                    <div className="text footer-text">
                      <p>
                        5 Redwood Crescent
                        <br />
                        East Kilbride&nbsp;
                        <br />
                        G74 5PA
                      </p>
                      <p>enquiries@albabank.co.uk</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-item offset-lg-1 offset-md-1 col-lg-4 col-md-6 col-12 col">
              <div className="item  item_search-links">
                <div className="inner">
                  <p className="heading footer-heading">Browse the site</p>
                  <div className="site-search">
                    <form
                      role="search"
                      action="/search-results/"
                      method="get"
                      name="searchForm"
                    >
                      <fieldset>
                        <div className="form-group">
                          <label
                            className="control-label d-none"
                            htmlFor="search_field"
                          >
                            Search the site
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="search_field"
                            aria-label="Search the site"
                            placeholder="Search the site"
                          />
                        </div>
                        <button
                          type="button"
                          aria-label="Search"
                          className="btn base-btn-bg base-btn-text base-btn-borders btn-search"
                        >
                          <SearchIcon />
                        </button>
                      </fieldset>
                    </form>
                  </div>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* <Box sx={{ display: "flex", flexDirection: "column" }}> */}
                    <nav className="quick-links">
                      <ul>
                        <li>
                          <a href="/">Home</a>
                        </li>

                        <li>
                          <a href="/our-journey/">Our Journey</a>
                        </li>
                        <li>
                          <a href="/who-we-are/">Who We Are</a>
                        </li>
                        <li>
                          <a href="/people/">Our People</a>
                        </li>

                        <li>
                          <a href="/news/">News</a>
                        </li>
                        <li>
                          <a href="/contact/">Contact</a>
                        </li>
                      </ul>
                    </nav>
                    {/* </Box>
                    <Box sx={{ display: "flex" }}> */}
                    {/* <nav className="quick-links">
                        <ul>
                        </ul>
                      </nav>
                    </Box> */}
                  </Box>
                </div>
              </div>
            </div>
            <div className="footer-item offset-lg-1  col-lg-3 col-md-12 col-12 col">
              <Box
                className="inner"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    padding: 1.8,
                  }}
                >
                  <a
                    href="https://www.linkedin.com/company/albabank/"
                    target="_blank"
                    title="Link will open in a new window/tab"
                  >
                    <img
                      className="lazypreload ls-is-cached lazyloaded"
                      src={linkedImage}
                      height="60px"
                      data-src={linkedImage}
                      alt="https://www.linkedin.com/company/albabank/"
                    />
                  </a>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <a
                    href="https://www.linkedin.com/company/albabank/"
                    target="_blank"
                    title="Link will open in a new window/tab"
                  >
                    <img
                      className="lazypreload ls-is-cached lazyloaded"
                      src={FSCS_Protected}
                      height="180"
                      width="180"
                      data-src={FSCS_Protected}
                      alt="https://www.linkedin.com/company/albabank/"
                    />
                  </a>
                </Box>
              </Box>
            </div>
            <div className="footer-item   col-lg-12 col-md-3 col-12 col">
              <div
                className="item  item_text-below text-left "
                data-os-animation=""
                data-os-animation-delay=""
              >
                <div className="inner  ">
                  <div className="info info_align-bottom">
                    <div className="text footer-text">
                      <p>
                        Alba Bank Limited is a company registered in Scotland
                        (company number SC586124) and its registered office is:
                        Redwood House, 5 Redwood Crescent, Peel Park, East
                        Kilbride, South Lanarkshire, Scotland, G74 5PA. Alba
                        Bank Limited is authorised by the Prudential Regulation
                        Authority and regulated by the Financial Conduct
                        Authority and the Prudential Regulation Authority
                        (Financial Services Register number 849944).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <nav className="footer-navigation">
              <ul style={{ paddingLeft: 0 }}>
                <li>
                  <div>© 2023</div>
                </li>
                <li>
                  <a href="/sitemap/">Sitemap</a>
                </li>
                <li>
                  <a href="/privacy-policy/">Privacy Policy</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </Box>
  )
}
