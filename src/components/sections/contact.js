import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { useLocale } from '../../context/LocaleContext';

const COPY = {
  en: {
    overline: 'What’s Next?',
    title: 'Have an idea?',
    subtitle: "Let's make it happen!",
    paragraph:
      "I'm driven by creating innovative solutions and collaborating with awesome people. Let's connect and see what we can create together!",
    cta: 'Say Hello',
  },
  es: {
    overline: '¿Qué Sigue?',
    title: '¿Tienes una idea?',
    subtitle: '¡Hagámosla realidad!',
    paragraph:
      'Me motiva crear soluciones innovadoras y colaborar con gente increíble. ¡Conectemos y veamos qué podemos construir juntos!',
    cta: 'Escríbeme',
  },
};

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const locale = useLocale();
  const copy = COPY[locale] || COPY.en;

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">{copy.overline}</h2>

      <h2 className="title">{copy.title}</h2>
      <h3 className="title">{copy.subtitle}</h3>

      <p>{copy.paragraph}</p>

      <a className="email-link" href={`mailto:${email}`}>
        {copy.cta}
      </a>
    </StyledContactSection>
  );
};

export default Contact;
