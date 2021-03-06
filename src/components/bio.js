/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
      query BioQuery {
          avatar: file(absolutePath: { regex: "/oweis.webp/" }) {
              childImageSharp {
                  fixed(width: 50, height: 50, quality: 95) {
                      ...GatsbyImageSharpFixed
                  }
              }
          }
          site {
              siteMetadata {
                  author {
                      name
                      summary
                  }
                  social {
                      linkedin
                  }
              }
          }
      }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  // const social = data.site.siteMetadata?.social

  const avatar = data?.avatar?.childImageSharp?.fixed

  return (
    <div className="bio">
      {avatar && (
        <Image
          fixed={avatar}
          alt={author?.name || ``}
          className="bio-avatar"
          imgStyle={{
            borderRadius: `50%`
          }}
        />
      )}
      {author?.name && (
        <Styled.p>
          Written by <strong>{author.name}</strong>. <br />{" "}
          {author?.summary || null}
          {` `}
        </Styled.p>
      )}
    </div>
  )
}

export default Bio
