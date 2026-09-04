import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';
import { otherLocalePath } from '@utils';
import { email, socialMedia } from '@config';

// https://www.gatsbyjs.com/docs/add-seo-component/

const Head = ({ title, description, image, locale }) => {
  const { pathname } = useLocation();
  const { path: altPath, locale: altLocale } = otherLocalePath(pathname, locale);

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            siteUrl
            defaultImage: image
            twitterUsername
          }
        }
      }
    `,
  );

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jaime Villar',
    alternateName: 'jv_',
    url: siteUrl,
    image: seo.image,
    jobTitle: 'Software Engineer',
    email: `mailto:${email}`,
    sameAs: socialMedia.map(({ url }) => url),
    knowsAbout: [
      'Software Engineering',
      'Mobile Development',
      'Flutter',
      'React',
      'Node.js',
      'Python',
      'Cloud Infrastructure',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: defaultTitle,
    url: siteUrl,
    inLanguage: ['en', 'es'],
  };

  return (
    <Helmet title={title} defaultTitle={seo.title} titleTemplate={`%s | ${defaultTitle}`}>
      <html lang={locale} />

      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={locale === 'es' ? 'es_PA' : 'en_US'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      <link rel="alternate" hrefLang={locale} href={seo.url} />
      <link rel="alternate" hrefLang={altLocale} href={`${siteUrl}${altPath}`} />
      <link rel="alternate" hrefLang="x-default" href={siteUrl} />

      <meta name="google-site-verification" content="DCl7VAf9tcz6eD9gb67NfkNnJ1PKRNcg8qQiwpbx9Lk" />

      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
    </Helmet>
  );
};

export default Head;

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  locale: PropTypes.string,
};

Head.defaultProps = {
  title: null,
  description: null,
  image: null,
  locale: 'en',
};
