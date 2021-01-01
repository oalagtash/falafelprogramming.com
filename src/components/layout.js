import React from "react"
import MainMenu from "./main-menu"
import Footer from "./footer"
const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div>
      <MainMenu location={location} title={title} />
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <main>{children}</main>
        <Footer/>
      </div>
    </div>

  )
}

export default Layout
