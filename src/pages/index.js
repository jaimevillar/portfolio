import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Layout,
  Hero,
  About,
  Jobs,
  HowIWork,
  FounderProjects,
  Featured,
  Projects,
  Contact,
} from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location, pageContext }) => (
  <Layout location={location} pageContext={pageContext}>
    <StyledMainContainer className="fillHeight">
      <Hero />
      <About />
      <Jobs />
      <HowIWork />
      <FounderProjects />
      <Featured />
      {/*<Projects />*/}
      <Contact />
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object,
};

export default IndexPage;
