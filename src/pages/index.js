/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import About from "../components/about"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMdx.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <About />
        <Styled.p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </Styled.p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <About />
      <hr />
      <Styled.h1
        sx={{
          textAlign: "center",
          color: "var(--falafel-color)",
          marginTop: "25px",
          fontWeight: "700"
        }}
      >
        All Posts
      </Styled.h1>
      <hr />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <Styled.li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <Styled.a sx={{ color: "text" }} as={Link} to={post.fields.slug} itemProp="url">
                  <header>
                    <Styled.h2 sx={{ color: "inherit" }}>
                      <span itemProp="headline">{title}</span>
                    </Styled.h2>
                    <small>{post.frontmatter.date}</small>
                  </header>
                  <section>
                    <Styled.p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt
                      }}
                      itemProp="description"
                    />
                  </section>
                  <div sx={{ fontWeight: "heading" }}>Read more →</div>
                </Styled.a>
              </article>
              <hr />
            </Styled.li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
            nodes {
                excerpt
                fields {
                    slug
                }
                frontmatter {
                    date(formatString: "MMMM DD, YYYY")
                    title
                    description
                }
            }
        }
    }
`
