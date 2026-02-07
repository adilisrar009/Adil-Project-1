import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { MagneticButton } from '@/components/custom/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: 'Prolon Life',
    category: 'Shopify',
    description: 'A premium e-commerce store built on Shopify with custom theme development, advanced filtering, and seamless checkout experience.',
    image: '/images/prolon-lifr.png',
    tags: ['Shopify', 'Liquid', 'JavaScript', 'CSS'],
    liveUrl: 'https://prolonlife.com',
    githubUrl: '#',
  },
  {
    title: 'L-Nurta Health',
    category: 'Frontend',
    description: 'A modern creative agency website with stunning animations, smooth transitions, and responsive design.',
    image: '/images/nutra.png',
    tags: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    liveUrl: 'https://l-nutrahealth.com/',
    githubUrl: '#',
  },
  {
    title: 'Moxie Lash',
    category: 'E-Commerce',
    description: 'Luxury fashion brand website with elegant design, product showcase, and immersive shopping experience.',
    image: '/images/moxie.png',
    tags: ['Shopify', 'Tailwind CSS', 'jQuery'],
    liveUrl: 'https://moxielash.com/',
    githubUrl: '#',
  },
  {
    title: 'Crafti Handmade Products',
    category: 'E-Commerce',
    description: 'Elevate your everyday with masterfully crafted, artisanal pieces that blend timeless tradition with modern elegance.',
    image: '/images/crafti.png',
    tags: ['React', 'Chart.js', 'Tailwind CSS'],
    liveUrl: 'https://adil-crafti-project.vercel.app/',
    githubUrl: 'https://github.com/adilisrar009/Web-project',
  },
  {
    title: 'Travel Trip',
    category: 'Hospitality',
    description: 'Discover the world with ease—your next adventure starts here. From dream destinations to seamless bookings, we make traveling simple and unforgettable 🌍✈️',
    image: '/images/travel.png',
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://adil-travels.vercel.app/',
    githubUrl: 'https://github.com/adilisrar009/i-studio',
  },
  {
    title: 'Yoga Master',
    category: 'Fitness',
    description: 'Dynamic fitness platform with workout tracking, progress charts, and membership management.',
    image: '/images/oga.png',
    tags: ['Shopify', 'Liquid', 'CSS'],
    liveUrl: 'https://adil-yoga-production.vercel.app/',
    githubUrl: 'https://github.com/adilisrar009/yoga-classes',
  },
];

const categories = ['All', 'Shopify', 'Frontend', 'E-Commerce', 'Dashboard', 'Hospitality', 'Fitness'];

export const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter((project) => project.category === activeCategory);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;

    if (!section || !grid) return;

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll('.project-card');

      gsap.fromTo(
        cards,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, [filteredProjects]);

  // Animate cards when category changes
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll('.project-card');

    gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
      }
    );
  }, [activeCategory]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20 md:py-32 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-lime/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-lime mb-4">
            Projects //
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            A showcase of my recent work and creative endeavors.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                ? 'bg-lime text-black'
                : 'glass text-white/70 hover:text-lime hover:border-lime/50'
                }`}
              data-cursor-hover
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="project-card group relative glass rounded-2xl overflow-hidden card-hover"
            >
              {/* Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <MagneticButton
                    className="w-12 h-12 bg-lime rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform"
                    onClick={() => window.open(project.liveUrl, '_blank')}
                  >
                    <Eye className="w-5 h-5" />
                  </MagneticButton>
                  <MagneticButton
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github className="w-5 h-5" />
                  </MagneticButton>
                </div>
                {/* Category badge */}
                <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full">
                  <span className="text-xs text-lime font-medium">{project.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-lime transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/60 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* View project link */}
              <div className="px-6 pb-6">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-lime text-sm font-medium hover:gap-3 transition-all"
                  data-cursor-hover
                >
                  <span>View Project</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <MagneticButton
            className="px-8 py-4 border border-lime text-lime font-semibold rounded-full hover:bg-lime hover:text-black transition-all duration-300"
            onClick={() => {
              // Could open a modal or navigate to a projects page
              alert('More projects coming soon!');
            }}
          >
            View All Projects
          </MagneticButton>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/3 right-10 w-40 h-40 border border-lime/5 rounded-full" />
      <div className="absolute bottom-1/4 left-10 w-24 h-24 bg-lime/5 rounded-full blur-2xl" />
    </section>
  );
};
