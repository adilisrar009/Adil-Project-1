import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProgressRing } from '@/components/custom/ProgressRing';

gsap.registerPlugin(ScrollTrigger);

const languagesData = [
  { name: 'Urdu', percentage: 100, description: 'Native Speaker' },
  { name: 'English', percentage: 80, description: 'Professional Working Proficiency' },
];

export const Languages = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;

    if (!section || !heading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="languages"
      className="relative py-20 md:py-32 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-gray to-black opacity-50" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16 md:mb-24">
          <h2
            ref={headingRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-lime mb-4"
          >
            Languages //
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Communication is key. Here are the languages I speak.
          </p>
        </div>

        {/* Language rings */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {languagesData.map((language, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative mb-8">
                <ProgressRing
                  percentage={language.percentage}
                  label={language.name}
                  size={200}
                  strokeWidth={10}
                  delay={index * 0.3}
                />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-lime/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {language.name}
              </h3>
              <p className="text-white/50">{language.description}</p>

              {/* Proficiency indicators */}
              <div className="flex gap-2 mt-6">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i < Math.ceil(language.percentage / 20)
                        ? 'bg-lime'
                        : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-20 glass rounded-2xl p-8 text-center">
          <p className="text-white/70 text-lg">
            <span className="text-lime font-semibold">Bonus:</span> I also understand 
            <span className="text-white font-medium"> Punjabi</span> and 
            <span className="text-white font-medium"> Arabic</span> at a conversational level.
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-lime rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-20 w-3 h-3 bg-lime/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
    </section>
  );
};
