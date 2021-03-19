import { Styled, Container } from "theme-ui"
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import SocialMedia from "./social-media-links"
import { StaticImage } from "gatsby-plugin-image"

const About = () => {
  const data = useStaticQuery(graphql`
    query AboutQuery {
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

  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <Container
      sx={{
        marginBottom: "75px",
        textAlign: "center",
      }}
    >
      <StaticImage
        src="../images/oweis.webp"
        alt={author?.name || ``}
        className="about-avatar"
        imgStyle={{
          borderRadius: `50%`,
        }}
        placeholder="blurred"
        trim="true"
        duetone="true"
        formats={["auto", "webp", "avif"]}
        width={200}
        height={200}
      />
      <SocialMedia />
      <div>
        {author?.name && (
          <Styled.p>
            Hi, I am <strong>{author.name}</strong>, the author of this blog.{" "}
            <br />
            {author?.summary || null}
            {` `}
            <Styled.a href={`${social?.linkedin || ``}`}>
              You should connect with me on LinkedIn
            </Styled.a>
          </Styled.p>
        )}
        <Styled.p>
          This is my personal blog where I share my knowledge, thoughts, real
          world use cases and tutorials with you.
          <br />
          It is supposed to be all about programming, DevOps and Machine
          Learning, but you might stumble on off topic posts like a falafel
          recipe... <br />
        </Styled.p>
      </div>
    </Container>
  )
}

export default About
