import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Linkedin } from 'lucide-react';
import { MagneticButton } from '@/components/custom/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const title = titleRef.current;
    const role = roleRef.current;
    const details = detailsRef.current;
    const bgText = bgTextRef.current;

    if (!section || !image || !title || !role || !details || !bgText) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Background text animation
      tl.fromTo(
        bgText,
        { opacity: 0, scale: 1.1 },
        { opacity: 0.05, scale: 1, duration: 1.5 },
        0
      );

      // Profile image animation
      tl.fromTo(
        image,
        { scale: 1.2, filter: 'blur(20px)', opacity: 0 },
        { scale: 1, filter: 'blur(0px)', opacity: 1, duration: 1.2 },
        0
      );

      // Title character animation
      const chars = title.querySelectorAll('.char');
      tl.fromTo(
        chars,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, duration: 0.8 },
        0.2
      );

      // Role card 3D flip
      tl.fromTo(
        role,
        { rotateX: 90, opacity: 0, transformOrigin: 'center bottom' },
        { rotateX: 0, opacity: 1, duration: 0.8 },
        0.6
      );

      // Details slide in
      const detailItems = details.querySelectorAll('.detail-item');
      tl.fromTo(
        detailItems,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
        0.8
      );

      // Scroll-based parallax
      gsap.to(image, {
        y: 150,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(bgText, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(title, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  // 3D tilt effect on image
  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = image.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rotateX = ((e.clientY - centerY) / rect.height) * -10;
      const rotateY = ((e.clientX - centerX) / rect.width) * 10;

      gsap.to(image, {
        rotateX,
        rotateY,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    image.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      image.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const contactDetails = [
    { icon: Phone, text: '+92 3122912494', href: 'tel:+923122912494' },
    { icon: Mail, text: 'adilisrar572@gmail.com', href: 'mailto:adilisrar572@gmail.com' },
    { icon: MapPin, text: 'Chakwal, Pakistan', href: '#' },
    { icon: Linkedin, text: 'LinkedIn Profile', href: 'https://linkedin.com/in/adil-israr-a16a47327' },
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-dark-gray to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-lime/5 via-transparent to-transparent" />
      </div>

      {/* Background text */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="text-[20vw] font-bold text-stroke-thick opacity-0 whitespace-nowrap">
          ADIL ISRAR
        </span>
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Image */}
          <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
            <div
              ref={imageRef}
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-lime/20 rounded-full blur-[80px] animate-pulse-glow" />
              
              {/* Image container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-lime/30 glow-lime">
                <img
                  src="/images/profile.png"
                  alt="Adil Israr"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badges */}
              <div className="absolute -right-4 top-1/4 glass px-4 py-2 rounded-full animate-float">
                <span className="text-lime text-sm font-medium">3+ Years Exp.</span>
              </div>
              <div className="absolute -left-4 bottom-1/4 glass px-4 py-2 rounded-full animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-lime text-sm font-medium">Shopify Expert</span>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="text-center lg:text-left order-1 lg:order-2">
            {/* Name */}
            <h1
              ref={titleRef}
              className="text-responsive-hero font-bold text-white leading-none mb-6"
            >
              {'ADIL ISRAR'.split('').map((char, index) => (
                <span key={index} className="char inline-block">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>

            {/* Role */}
            <div
              ref={roleRef}
              className="inline-block glass px-6 py-3 rounded-full mb-8"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <span className="text-lg sm:text-xl text-lime font-medium">
                Frontend Developer & Shopify Expert
              </span>
            </div>

            {/* Description */}
            <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Crafting intuitive and engaging user experiences with modern technologies. 
              Specialized in building responsive, conversion-focused eCommerce solutions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <MagneticButton
                className="px-8 py-4 bg-lime text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(209,226,157,0.4)] transition-shadow duration-300"
                onClick={() => {
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View My Work
              </MagneticButton>
              <MagneticButton
                className="px-8 py-4 border border-lime text-lime font-semibold rounded-full hover:bg-lime/10 transition-colors duration-300"
                onClick={() => {
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get In Touch
              </MagneticButton>
            </div>

            {/* Contact Details */}
            <div ref={detailsRef} className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {contactDetails.map((detail, index) => (
                <a
                  key={index}
                  href={detail.href}
                  target={detail.href.startsWith('http') ? '_blank' : undefined}
                  rel={detail.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="detail-item glass px-4 py-2 rounded-full flex items-center gap-2 hover:border-lime/50 transition-all duration-300 group"
                  data-cursor-hover
                >
                  <detail.icon className="w-4 h-4 text-lime group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                    {detail.text}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-lime rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
