import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledFounderProjectsSection = styled.section`
  .intro {
    margin: 0 0 40px;
    max-width: 600px;
    color: var(--slate);
    font-size: var(--fz-lg);
  }

  .founder-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 30px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`;

const StyledFounderCard = styled.div`
  ${({ theme }) => theme.mixins.boxShadow};
  padding: 35px;
  border: 1px solid var(--green);
  border-radius: var(--border-radius);
  background: linear-gradient(180deg, var(--green-tint), transparent 60%), var(--light-navy);
  transition: var(--transition);

  &:hover,
  &:focus-within {
    transform: translateY(-5px);
  }

  .founder-overline {
    margin-bottom: 16px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .founder-title {
    margin: 0 0 8px;
    color: var(--white);
    font-size: var(--fz-xxl);

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .founder-tagline {
    margin: 0 0 16px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }

  .founder-desc {
    margin: 0 0 20px;
    color: var(--slate);
    font-size: var(--fz-md);
    line-height: 1.6;
  }

  .founder-meta {
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
  }
`;

const FounderProjects = () => {
  const data = useStaticQuery(graphql`
    {
      founderProjects: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/founder-projects/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              role
              tagline
              stack
              status
              external
            }
            html
          }
        }
      }
    }
  `);

  const projects = data.founderProjects.edges.filter(({ node }) => node);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledFounderProjectsSection id="founder-projects" ref={revealContainer}>
      <h2 className="numbered-heading">Founder Projects</h2>

      <p className="intro">
        Ideas I've taken from zero to product, as a founder — not a contractor.
      </p>

      <div className="founder-grid">
        {projects.map(({ node }, i) => {
          const { title, role, tagline, stack, status, external } = node.frontmatter;

          return (
            <StyledFounderCard key={i}>
              <div className="founder-overline">{role}</div>
              <h3 className="founder-title">
                {external ? <a href={external}>{title}</a> : title}
              </h3>
              {tagline && <div className="founder-tagline">"{tagline}"</div>}
              <div className="founder-desc" dangerouslySetInnerHTML={{ __html: node.html }} />
              <div className="founder-meta">
                Stack: {stack || '[ pending ]'} &nbsp;·&nbsp; Status: {status || '[ pending ]'}
              </div>
            </StyledFounderCard>
          );
        })}
      </div>
    </StyledFounderProjectsSection>
  );
};

export default FounderProjects;
