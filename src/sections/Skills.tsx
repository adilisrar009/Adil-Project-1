import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  { name: 'HTML', level: 95, category: 'Core' },
  { name: 'CSS', level: 90, category: 'Core' },
  { name: 'JavaScript', level: 85, category: 'Core' },
  { name: 'Tailwind CSS', level: 90, category: 'Framework' },
  { name: 'jQuery', level: 80, category: 'Library' },
  { name: 'Shopify Theme Development', level: 88, category: 'Platform' },
  { name: 'Liquid', level: 85, category: 'Platform' },
  { name: 'Responsive Design', level: 92, category: 'Skill' },
  { name: 'Git & GitHub', level: 75, category: 'Tool' },
  { name: 'Figma', level: 70, category: 'Tool' },
];

const categories = ['All', 'Core', 'Framework', 'Library', 'Platform', 'Skill', 'Tool'];

export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cloud = cloudRef.current;
    const bars = barsRef.current;

    if (!section || !cloud || !bars) return;

    const ctx = gsap.context(() => {
      // Skill cloud explosion animation
      const skillTags = cloud.querySelectorAll('.skill-tag');
      gsap.fromTo(
        skillTags,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: {
            each: 0.05,
            from: 'random',
          },
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Skill bars animation
      const barFills = bars.querySelectorAll('.skill-bar-fill');
      const barPercentages = bars.querySelectorAll('.skill-percentage');

      barFills.forEach((fill, index) => {
        const level = skillsData[index].level;
        
        gsap.fromTo(
          fill,
          { width: '0%' },
          {
            width: `${level}%`,
            duration: 1.2,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bars,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Percentage counter animation
      barPercentages.forEach((percentage, index) => {
        const level = skillsData[index].level;
        
        gsap.to(
          { value: 0 },
          {
            value: level,
            duration: 1.2,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bars,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            onUpdate: function () {
              percentage.textContent = `${Math.round(this.targets()[0].value)}%`;
            },
          }
        );
      });

      // Floating animation for skill tags
      skillTags.forEach((tag, index) => {
        gsap.to(tag, {
          y: Math.sin(index * 0.5) * 10,
          duration: 2 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  // 3D cloud rotation on mouse move
  useEffect(() => {
    const cloud = cloudRef.current;
    if (!cloud) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cloud.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rotateX = ((e.clientY - centerY) / rect.height) * -15;
      const rotateY = ((e.clientX - centerX) / rect.width) * 15;

      gsap.to(cloud, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cloud, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    cloud.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cloud.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-20 md:py-32 bg-black overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-lime/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-lime mb-4">
            Top Skills //
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life.
          </p>
        </div>

        {/* Skills Cloud */}
        <div
          ref={cloudRef}
          className="flex flex-wrap justify-center gap-4 mb-20"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {skillsData.map((skill, index) => (
            <div
              key={index}
              className="skill-tag glass px-6 py-3 rounded-full cursor-pointer hover:bg-lime/20 transition-all duration-300"
              style={{
                transform: `translateZ(${(index % 3 - 1) * 20}px)`,
              }}
              data-cursor-hover
            >
              <span className="text-white font-medium">{skill.name}</span>
            </div>
          ))}
        </div>

        {/* Skill Bars */}
        <div ref={barsRef} className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Proficiency Levels
          </h3>
          <div className="space-y-6">
            {skillsData.slice(0, 6).map((skill, index) => (
              <div key={index} className="group">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium group-hover:text-lime transition-colors">
                    {skill.name}
                  </span>
                  <span className="skill-percentage text-lime font-bold">
                    0%
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="skill-bar-fill h-full bg-gradient-to-r from-lime to-lime/70 rounded-full"
                    style={{ width: '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-16">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                index === 0
                  ? 'bg-lime text-black'
                  : 'glass text-white/70 hover:text-lime hover:border-lime/50'
              }`}
              data-cursor-hover
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-32 h-32 border border-lime/10 rounded-full animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-10 w-20 h-20 bg-lime/5 rounded-full blur-xl" />
    </section>
  );
};
