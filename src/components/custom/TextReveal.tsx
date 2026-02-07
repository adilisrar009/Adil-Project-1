import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  type?: 'chars' | 'words' | 'lines';
}

export const TextReveal = ({ 
  text, 
  className = '', 
  delay = 0,
  type = 'chars' 
}: TextRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = type === 'chars' 
      ? container.querySelectorAll('.char')
      : type === 'words'
      ? container.querySelectorAll('.word')
      : container.querySelectorAll('.line');

    const ctx = gsap.context(() => {
      gsap.from(elements, {
        y: 100,
        opacity: 0,
        duration: 0.6,
        stagger: type === 'chars' ? 0.02 : type === 'words' ? 0.05 : 0.1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, [text, delay, type]);

  const renderContent = () => {
    if (type === 'chars') {
      return text.split('').map((char, index) => (
        <span key={index} className="char inline-block overflow-hidden">
          <span className="inline-block">{char === ' ' ? '\u00A0' : char}</span>
        </span>
      ));
    }

    if (type === 'words') {
      return text.split(' ').map((word, index) => (
        <span key={index} className="word inline-block overflow-hidden mr-[0.25em]">
          <span className="inline-block">{word}</span>
        </span>
      ));
    }

    return text.split('\n').map((line, index) => (
      <span key={index} className="line block overflow-hidden">
        <span className="inline-block">{line}</span>
      </span>
    ));
  };

  return (
    <div ref={containerRef} className={className}>
      {renderContent()}
    </div>
  );
};
