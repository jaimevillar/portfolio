/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require('react');

// GA4 Measurement ID. gatsby-plugin-google-gtag requires a newer Node engine
// than this Gatsby 3 project supports, so the tag is injected directly here
// instead of through a plugin (see docs/PLAN-REDISENO-BRANDING-2026.md, Fase 5).
const GA_MEASUREMENT_ID = 'G-SLP9XDJN59';

exports.onRenderBody = ({ setHeadComponents }) => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  setHeadComponents([
    React.createElement('script', {
      key: 'gtag-src',
      async: true,
      src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
    }),
    React.createElement('script', {
      key: 'gtag-init',
      dangerouslySetInnerHTML: {
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `,
      },
    }),
  ]);
};
