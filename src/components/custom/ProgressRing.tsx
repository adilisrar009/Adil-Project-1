import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProgressRingProps {
  percentage: number;
  label: string;
  size?: number;
  strokeWidth?: number;
  delay?: number;
}

export const ProgressRing = ({ 
  percentage, 
  label, 
  size = 150, 
  strokeWidth = 8,
  delay = 0 
}: ProgressRingProps) => {
  const ringRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayPercentage, setDisplayPercentage] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    const ring = ringRef.current;
    const container = containerRef.current;
    if (!ring || !container) return;

    const ctx = gsap.context(() => {
      // Animate the stroke
      gsap.fromTo(
        ring,
        { strokeDashoffset: circumference },
        {
          strokeDashoffset: offset,
          duration: 1.5,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate the percentage counter
      gsap.to(
        { value: 0 },
        {
          value: percentage,
          duration: 1.5,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: function () {
            setDisplayPercentage(Math.round(this.targets()[0].value));
          },
        }
      );
    }, container);

    return () => {
      ctx.revert();
    };
  }, [percentage, offset, circumference, delay]);

  return (
    <div ref={containerRef} className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            ref={ringRef}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#d1e29d"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            className="progress-ring-circle"
          />
        </svg>
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl md:text-3xl font-bold text-lime">
            {displayPercentage}%
          </span>
        </div>
      </div>
      <span className="mt-4 text-lg text-white/80">{label}</span>
    </div>
  );
};
