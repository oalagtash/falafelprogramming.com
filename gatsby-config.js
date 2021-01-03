module.exports = {
  siteMetadata: {
    title: `Falafel Programming Blog`,
    author: {
      name: `Oweis Alagtash`,
      summary: `I am a software developer and DevOps engineer in Frankfurt. I enjoy programming, DevOps stuff, cycling and eating falafel. Also, I am crazy about containerizing any application I see.`,
    },
    description: `This blog is all about programming and DevOps. Here I share my knowledge, thoughts and real world use cases tutorials with you.`,
    siteUrl: `https://www.falafelprogramming.com`,
    social: {
      linkedin: `https://www.linkedin.com/in/oweis-al-agtash-b2010b101`,
      github: `https://github.com/oalagtash`,
      email: `oweis.agtash@gmail.com`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
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
          purpose: `maskable`,
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,

  ],
}
