const path = require(`path`)
const { createRemoteFileNode, createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
          ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId
        }
      })
    })
  }
}

exports.onCreateNode = async ({
                                node,
                                actions,
                                store,
                                cache,
                                createNodeId,
                                getNode
                              }) => {

  const { createNodeField } = actions
  const { createNode } = actions

  if (node.internal.type === `MarkdownRemark`) {

    // Create the slug for each post
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value
    })

    // Check if post has a remote or a local image
    if (isValidURL(node.frontmatter.featuredImage)) {

      let fileNode = await createRemoteFileNode({
        url: node.frontmatter.featuredImage, // string that points to the URL of the image
        parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
        createNode, // helper function in gatsby-node to generate the node
        createNodeId, // helper function in gatsby-node to generate the node id
        cache, // Gatsby's cache
        store // Gatsby's Redux store
      })
      // if the file was created, attach the new node to the parent node
      if (fileNode) {
        node.featuredImg___NODE = fileNode.id
      }
    }


  }

  // TODO local image https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createSchemaCustomization
  // For all MarkdownRemark nodes that have a featured image url, call createRemoteFileNode

}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  // TODO add other social links
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      linkedin: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
      featuredImg: File @link(from: "featuredImg___NODE")
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      featuredImage: String
      featuredImageAlt: String
    }

    type Fields {
      slug: String
    }
  `)
}

function isValidURL(str) {
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}
