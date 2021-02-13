import React from "react"
import { StaticImage } from "gatsby-plugin-image"

export default function HeaderImage() {

  return <StaticImage
    src="../images/falafelprogramming-logo.webp"
    alt="Falafel Programming blog"
    placeholder="blurred"
    trim="true"
    duetone="true"
    layout="fixed"
    formats={["auto","webp","avif"]}
    width={75}
    height={75}
  />
}