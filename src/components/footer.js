import React from "react"
import GatsbyIcon from "../images/GatsbyIcon.png"
import SocialMedia from "./social-media-links"

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <SocialMedia />
        <a
          href="https://www.gatsbyjs.com"
          title="Built with"
        >
          <img className="icon" src={GatsbyIcon} alt="Gatsby" style={{ height: "25px" }} />
        </a>
      </div>
    </footer>
  )
}

export default Footer
