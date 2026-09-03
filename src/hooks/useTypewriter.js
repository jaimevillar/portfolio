import { useState, useEffect } from 'react';

/**
 * Types out each phrase, pauses, deletes it, then moves to the next one, looping forever.
 * When `paused` is true (e.g. prefers-reduced-motion), it just renders the first phrase.
 */
function useTypewriter(phrases, paused, { typingSpeed = 55, deletingSpeed = 30, pauseTime = 1800 } = {}) {
  const [text, setText] = useState(paused ? phrases[0] : '');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (paused) {
      return;
    }

    const currentPhrase = phrases[phraseIndex];
    let timeout;

    if (!isDeleting && text === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setPhraseIndex((phraseIndex + 1) % phrases.length);
    } else {
      const nextText = isDeleting
        ? currentPhrase.substring(0, text.length - 1)
        : currentPhrase.substring(0, text.length + 1);
      timeout = setTimeout(
        () => setText(nextText),
        isDeleting ? deletingSpeed : typingSpeed,
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, paused, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return paused ? phrases[0] : text;
}

export default useTypewriter;
