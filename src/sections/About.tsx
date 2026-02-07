import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const text = textRef.current;
    const watermark = watermarkRef.current;

    if (!section || !heading || !text || !watermark) return;

    const ctx = gsap.context(() => {
      // Heading typewriter effect
      const headingText = heading.textContent || '';
      heading.textContent = '';

      gsap.to(heading, {
        duration: 0.5,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          onEnter: () => {
            let i = 0;
            const typeInterval = setInterval(() => {
              if (i < headingText.length) {
                heading.textContent += headingText[i];
                i++;
              } else {
                clearInterval(typeInterval);
              }
            }, 50);
          },
        },
      });

      // Text word stagger reveal
      const words = text.querySelectorAll('.word');
      gsap.fromTo(
        words,
        { opacity: 0.1, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.02,
          duration: 0.3,
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      );

      // Watermark horizontal scroll
      gsap.to(watermark, {
        x: '-30%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const aboutText = `As a skilled front-end developer, I have a passion for creating intuitive and engaging user experiences. With 3 years of hands-on experience in front-end development, I have a strong foundation in modern technologies such as HTML, CSS, JavaScript, and jQuery. I have a track record of successfully completing projects from start to finish, consistently delivering high-quality work that meets the needs of my clients. In addition to my technical expertise, I am a proactive problem-solver with excellent communication and collaboration skills.`;

  const words = aboutText.split(' ');

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex items-center py-20 md:py-32 bg-black overflow-hidden"
    >
      {/* Watermark text */}
      <div
        ref={watermarkRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap pointer-events-none select-none"
      >
        <span className="text-[15vw] font-bold text-white/[0.02] tracking-tight">
          PASSION • DEDICATION • CREATIVITY • PASSION • DEDICATION • CREATIVITY •
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12 md:mb-20">
          <h2
            ref={headingRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-lime"
          >
            About //
          </h2>
        </div>

        {/* About text */}
        <p
          ref={textRef}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/80 leading-relaxed font-light"
        >
          {words.map((word, index) => (
            <span key={index} className="word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 ">
          {[
            { value: '3+', label: 'Years Experience' },
            { value: '50+', label: 'Projects Completed' },
            { value: '20+', label: 'Happy Clients' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center md:text-left group flex flex-col"
            >
              <span className="block text-4xl md:text-5xl font-bold text-lime mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">
                {stat.value}
              </span>
              <span className="text-sm text-white/50">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-lime/10 rounded-full animate-pulse-glow" />
      <div className="absolute bottom-20 left-20 w-20 h-20 bg-lime/5 rounded-full blur-xl" />
    </section>
  );
};
