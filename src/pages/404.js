import { Styled } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <Styled.h1>404: Not Found</Styled.h1>
      <Styled.p>
        You just hit a route that doesn&#39;t exist... the sadness.
      </Styled.p>
      <Styled.a href="https://www.falafelprogramming.com">
        Go back home
      </Styled.a>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
