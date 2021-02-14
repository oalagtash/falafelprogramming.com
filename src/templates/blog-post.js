/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  const featuredImgAlt = post.frontmatter.featuredImageAlt
  const featuredImageCredit = post.frontmatter.featuredImageCredit
  let featuredImgFluid = post.featuredImageToRetrieve?.childImageSharp?.fluid

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
        sx={{
          // this uses the value from `theme.space[4]`
          padding: 4,
          // these use values from `theme.colors`
          color: "background",
          backgroundColor: "primary",
        }}
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p style={{ color: "var(--falafel-color-highcontrast)" }}>{post.frontmatter.date}</p>
        </header>
        {featuredImgFluid !== null &&
        <figure className="image-credit">
          <Img style={{ marginBottom: "5px", borderRadius: "4px"}}
               fluid={featuredImgFluid}
               alt={featuredImgAlt}
               title={featuredImgAlt}
               itemProp="image"/>
          <figcaption dangerouslySetInnerHTML={{ __html: featuredImageCredit}}/>
        </figure>
        }
        <MDXRenderer itemProp="articleBody">{post.body}</MDXRenderer>
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
    query BlogPostBySlug(
        $id: String!
        $previousPostId: String
        $nextPostId: String
    ) {
        site {
            siteMetadata {
                title
            }
        }
        mdx(id: { eq: $id }) {
            id
            excerpt(pruneLength: 160)
            body
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                description
                featuredImageAlt
                featuredImageCredit
            }
            featuredImageToRetrieve {
                childImageSharp {
                    fluid(maxWidth: 600) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
        previous: mdx(id: { eq: $previousPostId }) {
            fields {
                slug
            }
            frontmatter {
                title
            }
        }
        next: mdx(id: { eq: $nextPostId }) {
            fields {
                slug
            }
            frontmatter {
                title
            }
        }
    }
`
