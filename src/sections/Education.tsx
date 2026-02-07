import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'Virtual University of Pakistan',
    period: '2024 - 2026',
    description: 'Currently pursuing a comprehensive degree in Computer Science, focusing on software development, algorithms, and modern web technologies.',
    side: 'left',
  },
  {
    degree: 'Intermediate in Computer Science',
    institution: 'Royal College of Sciences Chakwal',
    period: '2020 - 2022',
    description: 'Completed intermediate education with a focus on computer science fundamentals, programming basics, and mathematics.',
    side: 'right',
  },
];

export const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !timeline || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Timeline line draw animation
      gsap.fromTo(
        timeline,
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards 3D swing animation
      cards.forEach((card, index) => {
        const isLeft = educationData[index].side === 'left';
        
        gsap.fromTo(
          card,
          {
            rotateY: isLeft ? -90 : 90,
            opacity: 0,
            transformOrigin: isLeft ? 'right center' : 'left center',
          },
          {
            rotateY: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.3 + index * 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Timeline nodes pulse
      const nodes = section.querySelectorAll('.timeline-node');
      nodes.forEach((node, index) => {
        gsap.fromTo(
          node,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            delay: 0.5 + index * 0.3,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-20 md:py-32 bg-black overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-gray to-black opacity-50" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-lime mb-4">
            Education //
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            My academic journey and qualifications that shaped my technical foundation.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line - desktop only */}
          <div
            ref={timelineRef}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 timeline-line -translate-x-1/2"
          />

          {/* Education cards */}
          <div className="space-y-12 md:space-y-0">
            {educationData.map((edu, index) => (
              <div
                key={index}
                className={`relative md:grid md:grid-cols-2 md:gap-8 ${
                  index > 0 ? 'md:mt-16' : ''
                }`}
                style={{ perspective: '1000px' }}
              >
                {/* Timeline node - desktop only */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="timeline-dot timeline-node w-4 h-4 bg-lime rounded-full" />
                </div>

                {/* Card */}
                <div
                  ref={(el) => { cardsRef.current[index] = el; }}
                  className={`glass p-6 md:p-8 rounded-2xl card-hover ${
                    edu.side === 'right' ? 'md:col-start-2' : ''
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Icon and date */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-lime/10 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-lime" />
                    </div>
                    <div className="flex items-center gap-2 text-white/50">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{edu.period}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-lime font-medium mb-4">{edu.institution}</p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {edu.description}
                  </p>
                </div>

                {/* Empty space for alternating layout */}
                {edu.side === 'left' && <div className="hidden md:block" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-lime rounded-full animate-pulse" />
      <div className="absolute bottom-1/3 right-10 w-3 h-3 bg-lime/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
    </section>
  );
};
