import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    title: 'Shopify Developer',
    company: 'Conversion Kings',
    period: 'Sep 2025 - Present',
    description: 'Currently working as a Shopify Developer at Conversion Kings, developing and customizing Shopify themes, implementing Liquid code, optimizing store performance, and creating responsive, conversion-focused eCommerce experiences aligned with client business goals.',
    achievements: [
      'Developed custom Shopify themes from scratch',
      'Optimized store performance and loading speeds',
      'Implemented advanced Liquid code solutions',
      'Created conversion-focused UI/UX designs',
    ],
    color: 'from-lime/20 to-lime/5',
  },
  {
    title: 'Junior Frontend Developer',
    company: 'Infinity Creatives',
    period: 'Feb 2025 - Sep 2025',
    description: 'Worked as a Junior Frontend Developer at Infinity Creatives for six months, building responsive web interfaces using HTML, CSS, JavaScript, and Tailwind CSS while collaborating with designers to implement user-friendly, visually appealing layouts.',
    achievements: [
      'Built responsive web interfaces',
      'Collaborated with design team on UI/UX',
      'Implemented modern CSS frameworks',
      'Delivered projects on tight deadlines',
    ],
    color: 'from-white/10 to-white/5',
  },
];

export const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cardsContainer = cardsContainerRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !cardsContainer || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Stacked card scroll effect
      cards.forEach((card, index) => {
        const isLast = index === cards.length - 1;
        
        if (!isLast) {
          gsap.to(card, {
            y: -100,
            opacity: 0,
            scale: 0.9,
            scrollTrigger: {
              trigger: cardsContainer,
              start: () => `top+=${index * 100} top`,
              end: () => `top+=${(index + 1) * 100} top`,
              scrub: true,
              pin: false,
            },
          });
        }

        // Card entrance animation
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Company name parallax
      const companyNames = section.querySelectorAll('.company-name');
      companyNames.forEach((name) => {
        gsap.to(name, {
          x: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: name,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-20 md:py-32 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lime/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-lime mb-4">
            Work Experience //
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            My professional journey and the companies I&apos;ve had the privilege to work with.
          </p>
        </div>

        {/* Experience cards */}
        <div ref={cardsContainerRef} className="space-y-8">
          {experienceData.map((job, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="relative"
            >
              {/* Large company name background */}
              <div className="absolute -top-8 left-0 overflow-hidden pointer-events-none">
                <span className="company-name text-6xl md:text-8xl lg:text-9xl font-bold text-white/[0.03] whitespace-nowrap">
                  {job.company}
                </span>
              </div>

              {/* Card */}
              <div className="relative glass-strong rounded-3xl p-6 md:p-10 overflow-hidden group card-hover">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${job.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-lime/10 rounded-2xl flex items-center justify-center">
                        <Briefcase className="w-7 h-7 text-lime" />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">
                          {job.title}
                        </h3>
                        <p className="text-lime font-medium">{job.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-white/50 glass px-4 py-2 rounded-full">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{job.period}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-3xl">
                    {job.description}
                  </p>

                  {/* Achievements */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {job.achievements.map((achievement, achIndex) => (
                      <div
                        key={achIndex}
                        className="flex items-center gap-3 text-white/60"
                      >
                        <div className="w-2 h-2 bg-lime rounded-full flex-shrink-0" />
                        <span className="text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>

                  {/* View more link */}
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-lime hover:text-white transition-colors group/link"
                      data-cursor-hover
                    >
                      <span className="text-sm font-medium">View Projects</span>
                      <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-20 left-10 w-40 h-40 border border-lime/5 rounded-full" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-lime/5 rounded-full blur-2xl" />
    </section>
  );
};
