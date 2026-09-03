import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .cta-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 25px;
    margin-top: 50px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 0;
  }

  .secondary-link {
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    text-decoration: none;
    border-bottom: 1px solid var(--slate);
    padding-bottom: 2px;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      color: var(--green);
      border-bottom-color: var(--green);
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Jaime Villar.</h2>;
  const three = <h3 className="big-heading">From idea to reality.</h3>;

  const four = (
    <>
      <p>
        I help people turn an idea into a real product — building it from zero as a hands-on
        developer, or bringing technical leadership to a project that already has traction.
      </p>
    </>
  );

  const five = (
    <div className="cta-group">
      <a className="email-link" href="/#contact">
        Let's work together
      </a>
      <a className="secondary-link" href="/#jobs">
        See my experience
      </a>
    </div>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
