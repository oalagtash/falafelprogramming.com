module.exports = {
  siteMetadata: {
    title: `Falafel Programming Blog`,
    author: {
      name: `Oweis Alagtash`,
      summary: `I am a software developer and DevOps engineer in Frankfurt. I enjoy programming, DevOps stuff, cycling and eating falafel. Also, I am crazy about containerizing any application I see.`
    },
    description: `This blog is all about programming, DevOps and Machine Learning. Here I share my knowledge, thoughts real world use cases and tutorials with you. But you might stumble on off topic posts like a falafel recipe..`,
    siteUrl: `https://www.falafelprogramming.com`,
    social: {
      linkedin: `https://www.linkedin.com/in/oweis-al-agtash-b2010b101`,
      github: `https://github.com/oalagtash`,
      email: `oweis.agtash@gmail.com`
    }
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.ANALYTICS_TRACK_ID
        // MUST BE ADDED anonymize: true,
        // MUST BE ADDED respectDNT: true,

      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Falafel Programming Blog by Oweis Alagtash`,
        short_name: `FalafelProgramming`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#62a432`,
        display: `minimal-ui`,
        icon: `content/assets/falafelprogramming-logo.webp`,
        icon_options: {
          purpose: `maskable`
        }
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-theme-ui`
  ]
}
