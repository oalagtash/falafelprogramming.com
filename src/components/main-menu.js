import React from "react"
import { Link } from "gatsby"
import HeaderImage from "./header-image"
import MainMenuStyles from "../styles/main-menu.module.css"

const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

const MainMenu = ({ location, title, children }) => {
  // const rootPath = `${__PATH_PREFIX__}/`
  // const isRootPath = location.pathname === rootPath
  let header


  // if (isRootPath) {
  header = (
    <div>
      <header>
        <Link to="/">
          <div className={MainMenuStyles.mainMenuLogo}>
            <HeaderImage/>
          </div>
          <div className={MainMenuStyles.mainMenuWebsiteNameContainer}>
            <div className={MainMenuStyles.mainMenuWebsiteNameOne}>Falafel</div>
            <div className={MainMenuStyles.mainMenuWebsiteNameTwo}>Programming</div>
          </div>
        </Link>
        <div className={MainMenuStyles.mainMenuRight}>
          <ul>
            <ListLink to="/">Blog</ListLink>
          </ul>
        </div>
      </header>
    </div>
  )
  // } else {
  //   header = (
  //     <Link className="header-link-home" to="/">
  //       {title}
  //     </Link>
  //   )
  // }

  return (
    <header className={MainMenuStyles.mainMenu}>{header}</header>
  )
}

export default MainMenu