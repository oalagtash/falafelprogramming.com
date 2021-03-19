/** @jsx jsx */
import { jsx, Styled, useColorMode } from "theme-ui"
import React from "react"
import { Link } from "gatsby"
import HeaderImage from "./header-image"
import MainMenuStyles from "../styles/main-menu.module.css"
import { DarkModeSwitch } from "./darkmode-toggle-icon"

const ListLink = props => (
  <li sx={{
    fontWeight: "heading",
    display: `inline-block`,
    marginRight: `1rem`,
    marginBottom: "0.25rem",
    fontSize: "3"
  }}>
    <Styled.a
      sx={{ color: "text" }}
      as={Link}
      to={props.to}>
      {props.children}
    </Styled.a>
  </li>
)


const MainMenu = ({ location, title, children }) => {

  let header

  const [colorMode, setColorMode] = useColorMode()

  const isDarkMode = colorMode !== "default"

  const toggleDarkMode = () => {
    setColorMode(colorMode === "default" ? "dark" : "default")
  }

  header = (
    <div>
      <header>
        <Link to="/">
          <div className={MainMenuStyles.mainMenuLogo}>
            <HeaderImage />
          </div>
          <div className={MainMenuStyles.mainMenuWebsiteNameContainer}>
            <div className={MainMenuStyles.mainMenuWebsiteNameOne}>Falafel</div>
            <div className={MainMenuStyles.mainMenuWebsiteNameTwo}>
              Programming
            </div>
          </div>
        </Link>
        <div className={MainMenuStyles.mainMenuRight}>
          <ul>
            <ListLink to="/">Blog</ListLink>
            <DarkModeSwitch
              style={{ marginRight: "1rem" }}
              isDarkMode={isDarkMode}
              onChange={toggleDarkMode}
              sunColor="#000"
              size={30}
            />
          </ul>
        </div>
      </header>
    </div>
  )

  return <header className={MainMenuStyles.mainMenu}>{header}</header>
}

export default MainMenu
