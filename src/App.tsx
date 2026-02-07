import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useLenis } from '@/hooks/useLenis';
import { CustomCursor } from '@/components/custom/CustomCursor';
import { GrainOverlay } from '@/components/custom/GrainOverlay';

import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Education } from '@/sections/Education';
import { Experience } from '@/sections/Experience';
import { Skills } from '@/sections/Skills';
import { Languages } from '@/sections/Languages';
import { Projects } from '@/sections/Projects';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Initialize smooth scroll
  useLenis();

  useEffect(() => {
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Handle reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      gsap.globalTimeline.timeScale(0);
      document.documentElement.style.scrollBehavior = 'auto';
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative bg-black min-h-screen">
      {/* Custom cursor */}
      <CustomCursor />
      
      {/* Grain overlay */}
      <GrainOverlay />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Languages />
        <Projects />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
