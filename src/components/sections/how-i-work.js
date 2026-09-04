import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { useLocale } from '../../context/LocaleContext';

const StyledHowIWorkSection = styled.section`
  max-width: 900px;

  .steps {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    margin-top: 50px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }
`;

const StyledStep = styled.div`
  ${({ theme }) => theme.mixins.boxShadow};
  padding: 30px;
  border-radius: var(--border-radius);
  background-color: var(--light-navy);
  transition: var(--transition);

  &:hover,
  &:focus-within {
    transform: translateY(-5px);
  }

  .step-label {
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }

  .step-title {
    margin: 0 0 12px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
  }

  .step-desc {
    margin: 0;
    color: var(--slate);
    font-size: var(--fz-lg);
    line-height: 1.6;
  }
`;

const COPY = {
  en: {
    heading: 'How I Work',
    steps: [
      {
        label: '01 / idea.md',
        title: 'Idea',
        desc: 'Define the real problem and scope only what needs to exist.',
      },
      {
        label: '02 / prototype.js',
        title: 'Prototype',
        desc: 'Build the smallest working version to prove it fast.',
      },
      {
        label: '03 / product.prod',
        title: 'Product',
        desc: 'Harden, ship, and iterate with real users.',
      },
    ],
  },
  es: {
    heading: 'Cómo Trabajo',
    steps: [
      {
        label: '01 / idea.md',
        title: 'Idea',
        desc: 'Defino el problema real y delimito solo lo que necesita existir.',
      },
      {
        label: '02 / prototype.js',
        title: 'Prototipo',
        desc: 'Construyo la versión mínima funcional para validarla rápido.',
      },
      {
        label: '03 / product.prod',
        title: 'Producto',
        desc: 'Endurezco, lanzo e itero con usuarios reales.',
      },
    ],
  },
};

const HowIWork = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const locale = useLocale();
  const copy = COPY[locale] || COPY.en;
  const steps = copy.steps;

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledHowIWorkSection id="how-i-work" ref={revealContainer}>
      <h2 className="numbered-heading">{copy.heading}</h2>

      <div className="steps">
        {steps.map(({ label, title, desc }, i) => (
          <StyledStep key={i}>
            <div className="step-label">{label}</div>
            <h3 className="step-title">{title}</h3>
            <p className="step-desc">{desc}</p>
          </StyledStep>
        ))}
      </div>
    </StyledHowIWorkSection>
  );
};

export default HowIWork;
