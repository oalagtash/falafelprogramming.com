import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import GitHubIcon from "../images/GitHubIcon.png"
import LinkedInIcon from "../images/LinkdinIcon.png"
import GmailIcon from "../images/GmailIcon.png"

const SocialMedia = () => {
  const data = useStaticQuery(graphql`
      query SocialMediaQuery {
          site {
              siteMetadata {
                  social {
                      linkedin
                      github
                      email
                  }
              }
          }
      }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const social = data.site.siteMetadata?.social

  return (
      <div>
        <a
          href={`mailto: ${social?.email || ``}`}
          title="Email Me"
        >
          <img className="icon" src={GmailIcon} alt="Gmail" />
        </a>
        <a
          href={`${social?.github || ``}`}
          title="My open source code on GitHub"
        >
          <img className="icon" src={GitHubIcon} alt="GitHub" style={{height: "25px"}}/>
        </a>
        <a
          href={`${social?.linkedin || ``}`}
          title="My LinkedIn Profile"
        >
          <img className="icon" src={LinkedInIcon} alt="LinkedIn" />
        </a>
      </div>
        )
}

export default SocialMedia
