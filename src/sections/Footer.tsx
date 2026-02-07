import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Heart, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { MagneticButton } from '@/components/custom/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/adil-israr-a16a47327', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:adilisrar572@gmail.com', label: 'Email' },
];

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      // Footer reveal animation
      gsap.fromTo(
        footer.querySelector('.footer-content'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footer);

    return () => {
      ctx.revert();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-black border-t border-white/10 overflow-hidden"
    >
      {/* Marquee text */}
      <div
        ref={marqueeRef}
        className="py-8 border-b border-white/5 overflow-hidden"
      >
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="text-6xl md:text-8xl font-bold text-white/[0.03] mx-8"
            >
              ADIL ISRAR • FRONTEND DEVELOPER • SHOPIFY EXPERT •
            </span>
          ))}
        </div>
      </div>

      {/* Main footer content */}
      <div className="footer-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, '#hero')}
              className="text-3xl font-bold text-lime mb-4 inline-block"
              data-cursor-hover
            >
              ADIL.
            </a>
            <p className="text-white/60 max-w-md mb-6 leading-relaxed">
              Frontend Developer & Shopify Expert based in Chakwal, Pakistan. 
              Creating intuitive and engaging user experiences with modern technologies.
            </p>
            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-lime hover:text-black transition-all duration-300 group"
                  data-cursor-hover
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white/70 group-hover:text-black transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-white/60 hover:text-lime transition-colors link-underline"
                    data-cursor-hover
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:adilisrar572@gmail.com"
                  className="text-white/60 hover:text-lime transition-colors"
                  data-cursor-hover
                >
                  adilisrar572@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+923122912494"
                  className="text-white/60 hover:text-lime transition-colors"
                  data-cursor-hover
                >
                  +92 3122912494
                </a>
              </li>
              <li className="text-white/60">
                Chakwal, Pakistan
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-lime fill-lime" /> by Adil Israr
          </p>
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll to top button */}
      <MagneticButton
        className="fixed bottom-8 right-8 w-12 h-12 bg-lime text-black rounded-full shadow-lg hover:shadow-[0_0_30px_rgba(209,226,157,0.4)] transition-shadow z-50"
        onClick={scrollToTop}
        strength={0.5}
      >
        <ArrowUp className="w-5 h-5" />
      </MagneticButton>
    </footer>
  );
};
