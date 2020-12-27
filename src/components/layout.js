import React from "react"
import MainMenu from "./main-menu"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div>
      <MainMenu location={location} title={title} />
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()} {` `} <a href="https://www.falafelprogramming.com">Falafel Programming</a>
          , Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </div>

  )
}

export default Layout
