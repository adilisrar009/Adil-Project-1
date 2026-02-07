import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
}

export const useScrollAnimation = (
  animationCallback: (element: HTMLElement, gsapInstance: typeof gsap) => gsap.core.Timeline | gsap.core.Tween | void,
  options: ScrollAnimationOptions = {}
) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const {
      trigger,
      start = 'top 80%',
      end = 'bottom 20%',
      scrub = false,
      markers = false,
      toggleActions = 'play none none reverse',
    } = options;

    const ctx = gsap.context(() => {
      const animation = animationCallback(element, gsap);
      if (animation) {
        animationRef.current = animation;
        
        ScrollTrigger.create({
          trigger: trigger || element,
          start,
          end,
          scrub,
          markers,
          toggleActions,
          animation,
          onEnter: options.onEnter,
          onLeave: options.onLeave,
        });
      }
    }, element);

    return () => {
      ctx.revert();
    };
  }, [animationCallback, options]);

  return elementRef;
};

export const useParallax = (speed: number = 0.5) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        y: () => window.innerHeight * speed * 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, element);

    return () => {
      ctx.revert();
    };
  }, [speed]);

  return elementRef;
};

export const useRevealAnimation = (direction: 'up' | 'down' | 'left' | 'right' | 'scale' = 'up', delay: number = 0) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const getInitialState = () => {
      switch (direction) {
        case 'up':
          return { y: 50, opacity: 0 };
        case 'down':
          return { y: -50, opacity: 0 };
        case 'left':
          return { x: 50, opacity: 0 };
        case 'right':
          return { x: -50, opacity: 0 };
        case 'scale':
          return { scale: 0.8, opacity: 0 };
        default:
          return { y: 50, opacity: 0 };
      }
    };

    const ctx = gsap.context(() => {
      gsap.from(element, {
        ...getInitialState(),
        duration: 0.8,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, element);

    return () => {
      ctx.revert();
    };
  }, [direction, delay]);

  return elementRef;
};
