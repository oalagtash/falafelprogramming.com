import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default function HeaderImage() {
  const data = useStaticQuery(graphql`
      query {
          file(relativePath: { eq: "falafelprogramming-logo.webp" }) {
              childImageSharp {
                  fixed(width: 75, height:75) {
                      ...GatsbyImageSharpFixed
                  }
            }
          }
      }
  `)

  return <Img
    fixed={data.file.childImageSharp.fixed}
    alt="Falafel Programming blog"
  />
}