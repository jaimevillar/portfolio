import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

// Emits a schema.org ItemList of CreativeWork entries for founder projects and
// featured client work, matching what's actually visible on the homepage.
// Takes `locale` as a prop (rather than reading LocaleContext) so it can render
// unconditionally, outside the loader-gated part of the page tree.
const StructuredDataProjects = ({ locale }) => {
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
              tagline
              external
              lang
            }
          }
        }
      }
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              external
              lang
            }
            excerpt(pruneLength: 200)
          }
        }
      }
    }
  `);

  const items = [
    ...data.founderProjects.edges
      .filter(({ node }) => (node.frontmatter.lang || 'en') === locale)
      .map(({ node }) => ({
        '@type': 'CreativeWork',
        name: node.frontmatter.title,
        description: node.frontmatter.tagline,
        url: node.frontmatter.external || undefined,
        creator: { '@type': 'Person', name: 'Jaime Villar' },
      })),
    ...data.featured.edges
      .filter(({ node }) => (node.frontmatter.lang || 'en') === locale)
      .map(({ node }) => ({
        '@type': 'CreativeWork',
        name: node.frontmatter.title,
        description: node.excerpt,
        url: node.frontmatter.external || undefined,
        creator: { '@type': 'Person', name: 'Jaime Villar' },
      })),
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

StructuredDataProjects.propTypes = {
  locale: PropTypes.string,
};

StructuredDataProjects.defaultProps = {
  locale: 'en',
};

export default StructuredDataProjects;
